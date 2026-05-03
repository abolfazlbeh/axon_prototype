# Axon — AI-Native Adaptive Learning Platform
### Product Vision & Architecture — V2

> V2 builds directly on [V1](./v1-platform-vision.md). This document does not repeat V1's stable foundations (slide pipeline, layout system, JSON DSL, async generation model). It resolves the open questions raised in V1 and adds two major architectural additions: the **Memory & Retention Engine** and the **Context Management & Vector Store** layer.

---

## Changes from V1

| Area | V1 | V2 |
|---|---|---|
| Knowledge profile | Point-in-time score per concept | Time-series with decay model |
| Session entry | Always generates new content | Memory Engine schedules reviews first |
| LLM context for agents | Not specified | Defined: structured + semantic retrieval |
| Infrastructure | PostgreSQL + object storage | + pgvector (Phase 2), dedicated vector store (Phase 3) |
| Feedback loop | Forward-only | Forward + retroactive (review scheduling) |
| Roadmap Phase 2 | Personalization | Personalization + Retention |

---

## 17. Memory & Retention Engine

### 17.1 The Core Problem

The V1 profile stores a knowledge score per concept:

```json
"knowledge": {
  "gradient_descent": 0.3,
  "backpropagation": 0.1
}
```

These scores are snapshots. They carry no information about *when* a concept was last engaged or *how fast* it is decaying. A score of `0.3` earned today and a score of `0.3` from three weeks ago without any review are treated identically — but they represent very different memory states.

The platform as described in V1 would generate excellent content but could not answer: **"What does this user actually remember right now?"**

### 17.2 Memory Model per Concept

Each knowledge entry in the user profile is expanded from a scalar to a memory record:

```json
"knowledge": {
  "gradient_descent": {
    "strength": 0.72,
    "stability_days": 14.3,
    "last_reviewed_at": "2026-04-20T18:30:00Z",
    "review_count": 3,
    "initial_acquisition_depth": 0.68,
    "predicted_retention": 0.61
  }
}
```

| Field | Meaning |
|---|---|
| `strength` | How well the concept was understood when last reviewed (0–1) |
| `stability_days` | The half-life of this memory in days — grows with each successful review |
| `last_reviewed_at` | Timestamp of last meaningful engagement (view + quiz, not just scroll) |
| `review_count` | Number of completed review cycles — each one increases stability |
| `initial_acquisition_depth` | Strength score at first learning — proxy for how deeply it was encoded |
| `predicted_retention` | Computed field: estimated recall probability at query time |

### 17.3 Retention Prediction Formula

Predicted retention at time `t` follows the forgetting curve:

```
R(t) = e^( -Δt / S )
```

Where:
- `Δt` = days since `last_reviewed_at`
- `S` = `stability_days` for this concept and user
- `R(t)` = probability of successful recall (0–1)

`stability_days` is initialized from `initial_acquisition_depth` and updated after each review:

```
S_new = S_old × (1 + k × strength_at_review)
```

Where `k` is a learning constant (empirically tuned, start with `k = 0.2`). Each successful review with high strength compounds the stability — this is what makes spaced repetition more efficient than cramming.

### 17.4 Spaced Repetition Scheduler

The Memory Engine runs a **scheduler** that answers: "What should this user review today, and in what order?"

**Trigger:** Every time a user opens a session.

**Input:** The user's full knowledge record with all memory fields.

**Algorithm:**

1. For each concept in the user's knowledge map, compute `predicted_retention` at the current timestamp.
2. Collect all concepts where `predicted_retention < REVIEW_THRESHOLD` (default: 0.70).
3. Sort by urgency: `urgency_score = (REVIEW_THRESHOLD - predicted_retention) + (days_overdue × 0.1)`.
4. Select the top N concepts (default: N = 3–5 per session, configurable).
5. For each selected concept, determine the appropriate review format:
   - `predicted_retention > 0.50` → lightweight recall prompt (single quiz item)
   - `predicted_retention 0.30–0.50` → quiz + brief re-explanation slide
   - `predicted_retention < 0.30` → full re-teach slide (treated as near-new learning)

**Output:** An ordered review plan — a list of concept IDs with their assigned review format.

### 17.5 Session Structure with Memory Engine

The session entry point changes from V1:

```
V1: User opens app
         ↓
    Generate / continue new chapter

V2: User opens app
         ↓
    Memory Engine evaluates retention state
         ↓
    ┌─────────────────────────────────────────┐
    │  Any concepts below REVIEW_THRESHOLD?   │
    └──────────┬──────────────────────────────┘
               │ YES                        NO
               ↓                            ↓
    Review session block             Proceed directly to
    (3–5 review items,               new chapter content
     5–8 minutes max)
               ↓
    Transition to new chapter content
    (or end session if user chooses)
```

The review block is **time-capped**. It should never feel like a punishment. Users see a summary at the start: "You have 4 concepts to reinforce — estimated 6 minutes. Ready?"

### 17.6 Learning Chart (Days View)

The "days chart" is the user-facing representation of the Memory Engine's state. It is not a streak calendar — it is a **memory health dashboard**.

**What it shows:**

1. **Retention curve per concept** — for each concept the user has studied, a curve showing predicted retention over the past and coming 30 days. Concepts the user reviewed multiple times show visibly flatter curves (higher stability).

2. **Review calendar** — a forward-looking view showing which days have concepts scheduled for review, based on projected retention thresholds. This makes spaced repetition legible: "You'll need to revisit gradient descent in 3 days."

3. **Memory health score** — a single aggregate metric: the average predicted retention across all concepts the user has studied. Displayed as a percentage. Motivates consistent review.

4. **Forgetting events** — when a concept drops below `0.50`, it is flagged with a visual indicator. The user can see what they are at risk of forgetting before it happens.

**Design constraint:** This chart should be the most honest screen in the product. It doesn't gamify — it informs. The goal is to make forgetting *visible*, not to make the user feel bad about it.

### 17.7 Woven Reinforcement (In-Content Callbacks)

In addition to dedicated review sessions, the slide generation pipeline is updated to support **woven reinforcement**: brief callback prompts embedded in new content slides that reference prior concepts.

**Example:** A slide on backpropagation might open with:

> "Quick check before we start: What does the gradient tell us in gradient descent? [answer prompt] — Good. Backpropagation is how we compute that gradient efficiently across a deep network."

**Implementation:** The Content Planning Agent (V1 Section 6.1) is updated to receive the user's current memory state as part of its input. If a prerequisite concept has `predicted_retention < 0.80`, the agent is instructed to prepend a lightweight recall prompt for that concept before the main slide body.

This is not a full review session — it is a one-question warm-up that re-activates the prior concept just before it is needed. It also contributes to the memory record as a lightweight review event.

---

## 18. Context Management & Vector Store

### 18.1 The LLM History Problem

Every generation agent in the V1 pipeline needs contextual awareness of what has already been taught. Without this:

- The same analogy (e.g., "walking downhill blindfolded") gets reused in multiple slides
- A concept explained on slide 3 gets re-explained on slide 11 as if new
- A quiz on slide 15 tests something the user hasn't seen yet
- Prerequisite ordering becomes inconsistent

In a short curriculum (1 chapter, 8 slides), this can be managed by passing the full slide history as context. But as the curriculum grows — multiple chapters, returning sessions, weeks of content — the full history exceeds any practical context window and becomes expensive to pass on every call.

**This is the problem a vector store solves in Axon.**

### 18.2 What Gets Embedded

Not the raw LLM conversation history. That's a common misunderstanding. What gets stored and embedded is the **learning payload** of each generated artifact:

| Artifact | What is embedded | Why |
|---|---|---|
| Each generated slide | Its `purpose` field + a brief semantic summary of concepts taught, analogies used, and questions asked | Enables semantic retrieval: "Have we already explained gradient descent intuitively?" |
| Each chapter's learning outcomes | Structured summary of all concepts covered and their depth | Enables curriculum-level coherence checks |
| Clarification dialogue answers | The user's stated goals, background, and preferences in semantic form | Enables retrieval at generation time: "What did this user say they already know?" |
| Review session results | What was reviewed, what the user got right/wrong, the explanation used | Prevents the Memory Engine from using the same failed explanation twice |

### 18.3 How Agents Use the Vector Store

At generation time, each agent retrieves relevant context rather than receiving the full history:

```
Content Planning Agent receives:
  - Current slide purpose
  - User profile (structured, from PostgreSQL)
  - Top-K semantically similar past slides  ← retrieved from vector store
  - Chapter learning outcomes so far        ← retrieved from vector store

This gives the agent enough context to:
  - Know what has already been explained (avoid repetition)
  - Know which analogies have been used (use fresh ones)
  - Know the current knowledge depth (calibrate complexity)
  - Build on prior explanations explicitly ("In the last chapter, we framed X as...")
```

The K in top-K is typically 3–5 slides. This keeps the context window bounded and focused regardless of how long the curriculum has grown.

### 18.4 Vector Store vs. Structured Database

The two stores serve different access patterns and must coexist:

| Data | Store | Access Pattern |
|---|---|---|
| User profiles, knowledge scores, memory records | PostgreSQL | Exact lookup by user ID |
| Curriculum structure, chapter metadata | PostgreSQL | Relational joins, ordered queries |
| Telemetry events | PostgreSQL (append-only) | Time-range queries, aggregations |
| Generated slide JSON (full content) | Object storage | Fetch by slide ID |
| Slide learning payloads (summaries + embeddings) | Vector store | Semantic similarity search |
| Chapter outcome summaries (embeddings) | Vector store | Semantic similarity search |
| Clarification dialogue embeddings | Vector store | Semantic search at session start |

**The vector store does not replace PostgreSQL.** It is a retrieval index over a specific class of semantic artifacts. The source of truth for all structured data remains PostgreSQL.

### 18.5 Infrastructure Recommendation by Phase

**Phase 1–2 (MVP + Personalization): pgvector**

pgvector is a PostgreSQL extension that adds a vector column type and ANN (approximate nearest neighbor) index. It runs inside the existing PostgreSQL instance — no new infrastructure, no new service to operate.

Suitable for:
- Up to ~1M stored vectors
- Query latency in the 5–50ms range
- Curricula of any reasonable length per user

**Phase 3+ (Optimization + Scale): Dedicated vector store**

When the platform has many users with long learning histories and the global optimization layer (Section 11, global bandit) needs to run cross-user semantic queries, a dedicated vector store (Qdrant, Weaviate, or Pinecone) provides:
- Horizontal scaling
- Tenant isolation
- Filtered vector search (e.g., "similar slides, same subject domain, same user level")
- Better operational tooling

**Recommendation:** Start with pgvector. The migration path to a dedicated store is straightforward — the application layer interface is the same (embed → upsert → query). Infrastructure complexity should not be introduced before the query patterns are well-understood.

### 18.6 Embedding Strategy

| Artifact | Embedding model | Dimensions | Notes |
|---|---|---|---|
| Slide learning payloads | `text-embedding-3-small` | 1536 | Cheap, sufficient for semantic dedup within a curriculum |
| Concept descriptions | `text-embedding-3-small` | 1536 | Used for prerequisite graph construction |
| User clarification answers | `text-embedding-3-small` | 1536 | Low volume, long-lived |

All embeddings are computed at write time (when the artifact is generated or submitted), not at query time. Query embeddings are computed on-the-fly and are inexpensive.

---

## 19. Updated User Learning Profile Schema

The full profile schema, incorporating V2 memory fields:

```json
{
  "userId": "usr_abc123",
  "createdAt": "2026-03-01T10:00:00Z",
  "knowledge": {
    "gradient_descent": {
      "strength": 0.72,
      "stability_days": 14.3,
      "last_reviewed_at": "2026-04-20T18:30:00Z",
      "review_count": 3,
      "initial_acquisition_depth": 0.68,
      "predicted_retention": 0.61
    },
    "backpropagation": {
      "strength": 0.45,
      "stability_days": 4.1,
      "last_reviewed_at": "2026-04-26T09:15:00Z",
      "review_count": 1,
      "initial_acquisition_depth": 0.45,
      "predicted_retention": 0.83
    }
  },
  "preferences": {
    "format": "visual",
    "pace": "slow",
    "abstraction": "intuition-first"
  },
  "weaknesses": ["mathematical notation", "high-density text slides"],
  "engagement": {
    "avg_time_per_slide_seconds": 94,
    "quiz_accuracy": 0.55,
    "preferred_layout": "two-col-right-split"
  },
  "memory_health": {
    "avg_predicted_retention": 0.74,
    "concepts_below_threshold": 2,
    "next_review_due_at": "2026-04-29T00:00:00Z"
  }
}
```

The `memory_health` block is a **computed summary** refreshed when the profile is read. It is not stored directly — it is derived from the knowledge entries at query time to avoid stale aggregates.

---

## 20. Updated Adaptive Feedback Loop

```
Content Generation
       ↓
User Interaction (slide viewed, quiz attempted, time spent)
       ↓
Signal Extraction (engagement quality, comprehension, difficulty)
       ↓
Profile Update
  ├── Knowledge score updated
  ├── Memory record updated (strength, stability recalculated)
  └── Preference signals updated
       ↓
Vector Store Update
  └── Slide learning payload embedded and upserted
       ↓
Memory Engine (runs at next session open)
  ├── Computes predicted_retention for all concepts
  ├── Identifies overdue reviews
  └── Produces review plan for session
       ↓
Next Session
  ├── [If reviews due] → Review block → New content
  └── [If no reviews due] → New content directly
       ↓
Next Slide / Chapter Generation
  └── Conditioned on: updated profile + semantically retrieved past context
```

---

## 21. Updated System Architecture

```
┌─────────────────────────────────────┐
│           User Interface            │
│  (Prompt input, slide renderer,     │
│   interaction capture, days chart,  │
│   review session UI, notifications) │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│        API / Orchestration Layer    │
│  (Session management, job queue,    │
│   profile read/write, event intake, │
│   review plan delivery)             │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│      AI Generation Pipeline         │
│                                     │
│  Clarification Agent                │
│       ↓                             │
│  Curriculum Planner Agent           │
│       ↓  (per slide)                │
│  Content Planning Agent             │
│    [receives: profile +             │
│     retrieved past slide context]   │
│       ↓                             │
│  Layout Agent                       │
│       ↓  (parallel fan-out)         │
│  Specialist Agents                  │
│  text / image / chart / quiz / code │
│       ↓                             │
│  Assembly & Coherence Agent         │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│      Learning Intelligence Layer    │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  Event Processor             │   │
│  │  (telemetry → signals)       │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  Profile Updater             │   │
│  │  (scores, preferences,       │   │
│  │   memory records)            │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  Memory Engine  [NEW]        │   │
│  │  (retention prediction,      │   │
│  │   review scheduling,         │   │
│  │   stability recalculation)   │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  Bandit Engine (Phase 3)     │   │
│  │  (A/B signals, global optim) │   │
│  └──────────────────────────────┘   │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│             Data Layer              │
│                                     │
│  PostgreSQL                         │
│    profiles, curriculum, telemetry  │
│    (+ pgvector extension: Phase 2)  │
│                                     │
│  Object Storage                     │
│    slide JSON, media assets         │
│                                     │
│  Vector Store  [NEW — Phase 2]      │
│    slide learning payload embeddings│
│    concept description embeddings   │
│    clarification dialogue embeddings│
│                                     │
│  Job Queue (Redis / BullMQ)         │
│    generation jobs, review triggers │
└─────────────────────────────────────┘
```

---

## 22. Updated Technology Stack

| Layer | Candidates | Notes |
|---|---|---|
| LLM backbone | OpenAI GPT-4o / Anthropic Claude / Google Gemini | Unchanged from V1 |
| Embedding model | OpenAI `text-embedding-3-small` | Phase 2 addition |
| Image generation | DALL-E 3 / Stable Diffusion | Phase 4 |
| Audio narration | ElevenLabs | Post-MVP |
| Frontend renderer | React (JSON DSL renderer) | Unchanged |
| Backend / API | Go or Node.js | Unchanged |
| Job queue | Redis + BullMQ / Asynq | Unchanged |
| Event pipeline | Kafka or lightweight event bus | Unchanged |
| Database (primary) | PostgreSQL | Unchanged |
| Vector store (Phase 2) | pgvector (PostgreSQL extension) | Low-friction entry point |
| Vector store (Phase 3+) | Qdrant / Weaviate / Pinecone | When cross-user scale demands it |
| Object storage | S3-compatible | Unchanged |
| Notifications | WebSocket + email | Unchanged |

---

## 23. Updated Roadmap

### Phase 1 — MVP (unchanged)
- Clarification dialogue
- Curriculum generation (1 chapter, text + chart only)
- JSON DSL slide renderer
- Basic interaction tracking (view time, quiz attempts)
- Async generation with notification

### Phase 2 — Personalization + Retention *(expanded from V1)*
- Full user profile system with memory records
- Profile-conditioned generation
- Adaptive difficulty and format selection
- Multi-chapter generation with chapter dependency
- **Memory Engine: retention prediction and review scheduling**
- **Review session UI (dedicated review block)**
- **Days chart (memory health dashboard)**
- **pgvector integration: slide learning payload embeddings**
- **Content Planning Agent updated to retrieve past context from vector store**
- **Woven reinforcement: callback prompts in new content slides**

### Phase 3 — Optimization *(unchanged)*
- Bandit-based A/B experimentation on content variants
- Reward signal design (engagement + comprehension composite)
- Content performance dashboard
- **Migrate to dedicated vector store when cross-user query volume warrants it**

### Phase 4 — Media Expansion *(unchanged)*
- Image generation integration
- Audio narration layer
- Richer layout templates

### Phase 5 — Social Layer *(unchanged)*
- Aggregated difficulty signals ("most users fail here")
- Peer-generated explanations
- Synchronized learning sessions

### Phase 6 — Advanced Intelligence *(unchanged)*
- Predictive learning models
- Automated curriculum refinement
- Domain-specific fine-tuning

---

## 24. Resolved Open Questions from V1

| V1 Open Question | Resolution in V2 |
|---|---|
| What reward signal correctly captures long-term retention? | Composite: `predicted_retention` at 7-day follow-up × quiz strength at review time. Not short-term quiz scores — those measure acquisition, not retention. |
| What is the minimum viable adaptive behavior for Week 1? | Day 1: clarification + first chapter. Day 2+: Memory Engine checks for overdue reviews before new content. The adaptive loop is active from the second session. |
| How is prerequisite ordering enforced in the curriculum planner? | Concept embeddings in the vector store enable semantic prerequisite detection: before scheduling concept B, retrieve top-K similar concepts from the store and check if any are prerequisites that haven't been taught yet. Full prerequisite graph is a Phase 3 refinement. |
| What is the wedge use case? | Still open. Candidates: programming fundamentals (high concept density, clear prerequisite ordering, objective quiz evaluation), standardized test prep (defined scope, high motivation, measurable outcomes). To be resolved before Phase 1 launch. |
| How is curriculum quality assured? | Phase 1: LLM-only with the Assembly & Coherence Agent as the quality gate. Phase 2: user feedback signals (thumbs down on a slide) trigger flagging for human review. Phase 3: bandit engine identifies low-performing slides automatically. |

---

## 25. New Open Questions (To Resolve in V3)

- **Stability constant calibration:** The `k = 0.2` constant in the stability update formula is a starting assumption. What is the right value, and should it be personalized per user (some people have stronger long-term memory than others)?
- **Review threshold personalization:** Should `REVIEW_THRESHOLD = 0.70` be the same for all users, or should it adapt based on the user's declared stakes ("I need to ace an exam" vs. "I'm learning for curiosity")?
- **Concept granularity:** The current model tracks retention at the concept level. How granular should concepts be? "Gradient descent" is a concept, but so is "the intuition of gradient descent" vs. "the math of gradient descent." Finer granularity gives better targeting; coarser granularity is easier to maintain.
- **Cross-session continuity UX:** How does the UI communicate the transition between a review block and new content without it feeling abrupt or punitive?
- **API contract between pipeline agents:** The interfaces between Clarification Agent → Curriculum Planner → Content Planning Agent → Layout Agent → Specialist Agents need formal specification before implementation. To be addressed in the engineering spec document.

---

*Document version: V2 — extends V1 with Memory & Retention Engine, Context Management & Vector Store, and resolved open questions.*
*V1 remains the baseline for all pipeline and layout architecture.*
*Next: Engineering spec document — formal API contracts between pipeline agents and data schemas.*

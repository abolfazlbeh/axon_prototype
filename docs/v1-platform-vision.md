# Axon — AI-Native Adaptive Learning Platform
### Product Vision & Architecture — V1

---

## 1. Executive Summary

Axon is an **AI-native adaptive learning platform** that transforms a user's intent ("I want to learn X") into structured, interactive, and personalized learning experiences.

Instead of static content (videos, PDFs, slides), the platform dynamically generates:

- Structured curricula (chapters → slides)
- Multimodal content (text, images, charts, code, quizzes)
- Interactive learning components
- Adaptive pathways driven by user behavior and feedback

The core innovation is a **self-improving pipeline** that continuously refines content using both individual user signals and collective learning behavior across all users.

---

## 2. Problem Statement

Current learning platforms suffer from:

- Static, one-size-fits-all content
- Low engagement and retention
- No real personalization (reordering pre-made content is not adaptation)
- No feedback loop between learner behavior and content quality

Users consume content passively. Platforms never learn.

---

## 3. Core User Flow

```
User submits a learning prompt
         ↓
AI clarification dialogue (2–5 targeted questions)
         ↓
Subject analysis & user profile bootstrapping
         ↓
Async curriculum generation (1–3 chapters)
         ↓
User notified: "Your course is ready"
         ↓
User navigates slides → interacts → signals collected
         ↓
Signals feed into profile → influence next chapter generation
```

### 3.1 Clarification Phase

Before generating anything, the system asks the user a small set of targeted questions. These questions serve **two simultaneous purposes**:

1. **Scoping the subject** — depth, focus area, what to include or skip
2. **Bootstrapping the user profile** — background level, learning goals, format preferences, available time

Example questions:
- "What's your current familiarity with this topic?"
- "Are you learning this for a specific goal or out of curiosity?"
- "How much time do you want to invest?"
- "Do you prefer intuition-first or rigorous first-principles explanations?"

The answers initialize the user's behavioral profile before any content is generated.

---

## 4. Curriculum Structure

### 4.1 Chapters

A curriculum contains **1 to 3 chapters** per generation session, determined by:

- Subject complexity
- User's declared time and depth preference
- Inferred cognitive load tolerance

A chapter is not an arbitrary unit — it represents a **coherent mental model that stands alone**. Each chapter has a clear learning outcome.

> The first chapter is generated immediately. Subsequent chapters are generated based on the user's progress and performance in the previous chapter. This means the curriculum is never fully fixed upfront — it evolves.

### 4.2 Slides

Each chapter contains a variable number of slides. Slide count and density are influenced by:

- The learning objective of the chapter
- User progress signals from previous slides
- User's inferred curiosity level, cognitive load, and feedback
- Declared preferences (pace, format)

Each slide has a **single clear purpose**: it teaches one concept, reinforces one idea, or checks one piece of understanding.

---

## 5. Async Generation Model

Content generation is **asynchronous by design**. The full pipeline for a chapter can take significant time (multi-agent calls, media generation, QA passes), and this is acceptable.

### User experience:
- User submits their prompt and completes the clarification dialogue
- System begins generation and presents an estimated wait time
- User is notified (push/email) when content is ready
- User returns to a fully generated, polished experience

### Partial readiness strategy:
- Chapter 1 is delivered as soon as it is complete
- Chapter 2 generates in the background while the user progresses through Chapter 1
- This eliminates blocking waits after the initial generation

---

## 6. Slide Generation Pipeline

Each slide goes through a **multi-phase, multi-agent pipeline**:

```
Slide purpose defined (by curriculum planner)
         ↓
Phase 1 — Content Planning Agent
   Determines: what conceptual pieces does this slide need?
   Output: ordered list of content pieces with type hints and purpose
         ↓
Phase 2 — Layout Agent
   Determines: which layout template fits these pieces?
   Output: layout template + region assignments
         ↓
Phase 3 — Specialist Agents (parallel fan-out)
   Each agent generates one content piece for its assigned region
         ↓
Phase 4 — Assembly & Coherence Check
   Assembled slide is reviewed for internal consistency
         ↓
Final: Slide JSON (DSL) stored and queued for rendering
```

### 6.1 Content Planning Agent

Given the slide's purpose and the user's current profile, this agent decides:

- What pieces of content are needed (e.g., definition, analogy, visual, check question)
- The rough size and complexity of each piece
- The logical reading order

### 6.2 Layout Agent

Given the content plan (piece types and sizes), this agent selects a layout template and assigns pieces to regions. It runs **after** the planning agent and **before** content generation, so specialist agents know exactly what space they're filling.

### 6.3 Specialist Agents (Parallel)

Once the layout is decided, content agents run in parallel — one per region:

| Agent | Generates |
|---|---|
| Text agent | Explanations, definitions, analogies |
| Chart agent | Vega-Lite specs for data visualizations |
| Image agent | Image generation prompt → image API call |
| Code agent | Code snippets with syntax highlighting |
| Quiz agent | Question + answer choices + explanation |

Because pieces are independent after planning, this phase is fully parallelizable.

### 6.4 Assembly & Coherence Check

After all pieces are generated, a final agent reviews the assembled slide:

- Does the image/chart actually illustrate what the text explains?
- Does the quiz test what this slide taught (not something else)?
- Is there contradictory or redundant content across pieces?

This pass can trigger regeneration of specific pieces without rerunning the whole pipeline.

---

## 7. Layout System

### 7.1 Layout Philosophy

Layout decisions follow two rules:

1. **Complementary content goes side by side** — a visual and its explanation belong in columns, not stacked
2. **Sequential content stacks vertically** — only when readability and logical flow justify it (heading → explanation → quiz is natural; two dense text blocks stacked is not)

### 7.2 Layout Templates

```
┌─────────────────────┐
│   Single Column     │  Full-width blocks, sequential flow
└─────────────────────┘

┌──────────┬──────────┐
│  Text    │  Image   │  Two equal columns
└──────────┴──────────┘

┌──────────┬──────────┐
│          │  Image   │  Two columns, right split into rows
│  Text    ├──────────┤
│          │  Quiz    │
└──────────┴──────────┘

┌──────────┬──────────┐
│  Chart   │  Text    │  Two columns, left split into rows
├──────────┤          │
│  Code    │          │
└──────────┴──────────┘

┌─────────────────────┐
│  Heading            │  Stacked vertical (readable sequences only)
├─────────────────────┤
│  Text               │
├─────────────────────┤
│  Quiz               │
└─────────────────────┘
```

Templates are not hardcoded visual designs — they map to named CSS Grid regions in the renderer. New templates can be added without changing the content pipeline.

### 7.3 Readability Constraint

The layout agent applies a readability heuristic before selecting a template:

- Never stack two dense text blocks
- Never stack two images without explanatory text between them
- Prefer two-column when one piece is visual and one is explanatory
- Stacked is valid for: heading → text → quiz / text → code → explanation

Over time, this heuristic can be replaced or augmented with behavioral data (e.g., users who scroll past stacked-image slides faster → penalize that pattern in the layout agent's reward signal).

---

## 8. JSON DSL (Content Schema)

All content is stored and transmitted as a **platform-agnostic JSON structure**. It is not tied to any rendering framework.

### 8.1 Slide Schema

```json
{
  "id": "slide_gradient_descent_01",
  "chapter": "chapter_01",
  "purpose": "Introduce the intuition of gradient descent using a visual analogy",
  "layout": {
    "template": "two-col-right-split",
    "regions": {
      "left":        "text_block_1",
      "right-top":   "image_1",
      "right-bottom": "quiz_1"
    }
  },
  "content": {
    "text_block_1": {
      "type": "text",
      "props": {
        "body": "Gradient descent is like walking downhill blindfolded..."
      }
    },
    "image_1": {
      "type": "image",
      "props": {
        "url": "https://...",
        "alt": "A 3D loss surface with an arrow descending toward the minimum"
      }
    },
    "quiz_1": {
      "type": "quiz",
      "props": {
        "question": "What does the gradient tell us in gradient descent?",
        "choices": ["The value of the loss", "The direction of steepest increase", "The learning rate", "The number of steps"],
        "correct": 1,
        "explanation": "The gradient points uphill, so we move opposite to it."
      }
    }
  }
}
```

### 8.2 Supported Content Types

| Type | Description |
|---|---|
| `text` | Prose, definitions, analogies, explanations |
| `heading` | Section or slide title |
| `image` | Generated or retrieved image with alt text |
| `chart` | Vega-Lite specification for data visualizations |
| `code` | Code snippet with language tag for syntax highlighting |
| `quiz` | Multiple-choice question with correct answer and explanation |
| `input` | Open-ended text response prompt |
| `simulation` | Interactive explorable (future) |
| `audio` | Narration or audio explanation (future) |

---

## 9. User Learning Profile

Raw interaction events are compressed into a persistent behavioral profile that directly influences content generation.

```json
{
  "userId": "usr_abc123",
  "knowledge": {
    "gradient_descent": 0.3,
    "backpropagation": 0.1,
    "linear_algebra_basics": 0.7
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
  }
}
```

This profile is updated after each slide interaction and used as context for the next generation pass.

---

## 10. Learning Telemetry

User behavior is captured as structured events per slide:

```json
{
  "slideId": "slide_gradient_descent_01",
  "userId": "usr_abc123",
  "sessionId": "sess_xyz",
  "events": [
    { "type": "view_start", "timestamp": "..." },
    { "type": "view_end", "duration_seconds": 112 },
    { "type": "quiz_attempt", "answer": 2, "correct": false },
    { "type": "quiz_attempt", "answer": 1, "correct": true },
    { "type": "scroll_depth", "percent": 100 }
  ]
}
```

These events are processed by the **Learning Intelligence Layer** into profile updates and content quality signals.

---

## 11. Adaptive Feedback Loop

```
Content Generation
       ↓
User Interaction (slide viewed, quiz attempted, time spent)
       ↓
Signal Extraction (engagement quality, comprehension, difficulty)
       ↓
Profile Update (knowledge estimates, preference signals)
       ↓
Next Slide / Chapter Generation (conditioned on updated profile)
```

### Per-user adaptation:
- Difficulty of next slides adjusts based on quiz performance
- Format preference (visual vs. text-heavy) adjusts based on engagement time
- Pace adjusts based on time-per-slide signals

### Global optimization (future — Phase 3):
- Multi-armed bandit approach across all users
- Reward signals: quiz performance, engagement time, retention
- A/B test explanations, layouts, and formats
- "Most users fail this concept" → trigger a remediation slide globally

---

## 12. System Architecture

```
┌─────────────────────────────────────┐
│           User Interface            │
│  (Prompt input, slide renderer,     │
│   interaction capture, notifications)│
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│        API / Orchestration Layer     │
│  (Session management, job queue,    │
│   profile read/write, event intake) │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│      AI Generation Pipeline         │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  Clarification Agent         │   │
│  └──────────┬───────────────────┘   │
│             ↓                       │
│  ┌──────────────────────────────┐   │
│  │  Curriculum Planner Agent    │   │
│  └──────────┬───────────────────┘   │
│             ↓  (per slide)          │
│  ┌──────────────────────────────┐   │
│  │  Content Planning Agent      │   │
│  └──────────┬───────────────────┘   │
│             ↓                       │
│  ┌──────────────────────────────┐   │
│  │  Layout Agent                │   │
│  └──────────┬───────────────────┘   │
│             ↓  (parallel fan-out)   │
│  ┌──────────────────────────────┐   │
│  │  Specialist Agents           │   │
│  │  text / image / chart /      │   │
│  │  quiz / code                 │   │
│  └──────────┬───────────────────┘   │
│             ↓                       │
│  ┌──────────────────────────────┐   │
│  │  Assembly & Coherence Agent  │   │
│  └──────────────────────────────┘   │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│      Learning Intelligence Layer    │
│  (Event processing, profile update, │
│   signal extraction, bandit engine) │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│             Data Layer              │
│  (Slide store, user profiles,       │
│   telemetry events, job queue)      │
└─────────────────────────────────────┘
```

---

## 13. Technology Stack (MVP Direction)

| Layer | Candidates |
|---|---|
| LLM backbone | OpenAI GPT-4o / Anthropic Claude / Google Gemini |
| Image generation | DALL-E 3 / Stable Diffusion |
| Audio narration | ElevenLabs (post-MVP) |
| Frontend renderer | React (JSON DSL renderer) |
| Backend / API | Go or Node.js |
| Job queue | Redis + worker queue (BullMQ / Asynq) |
| Event pipeline | Kafka or lightweight event bus |
| Database | PostgreSQL (profiles, curriculum) + object storage (media) |
| Notifications | WebSocket (in-app) + email |

> **MVP simplification:** Start with text + Vega-Lite charts only. Image and audio generation add cost and complexity with diminishing returns in Phase 1.

---

## 14. Roadmap

### Phase 1 — MVP
- Clarification dialogue
- Curriculum generation (1 chapter, text + chart only)
- JSON DSL slide renderer
- Basic interaction tracking (view time, quiz attempts)
- Async generation with notification

### Phase 2 — Personalization
- Full user profile system
- Profile-conditioned generation
- Adaptive difficulty and format selection
- Multi-chapter generation with chapter dependency

### Phase 3 — Optimization
- Bandit-based A/B experimentation on content variants
- Reward signal design (engagement + comprehension composite)
- Content performance dashboard

### Phase 4 — Media Expansion
- Image generation integration
- Audio narration layer
- Richer layout templates

### Phase 5 — Social Layer
- Aggregated difficulty signals ("most users fail here")
- Peer-generated explanations
- Synchronized learning sessions

### Phase 6 — Advanced Intelligence
- Predictive learning models
- Automated curriculum refinement
- Domain-specific fine-tuning

---

## 15. Key Design Decisions (Rationale Log)

| Decision | Rationale |
|---|---|
| Async generation with notification | Removes latency pressure, enables higher-quality multi-agent pipeline, better UX than watching a spinner |
| Content planning before content generation | Layout agent needs piece types and sizes before picking a template; specialist agents need to know their target region |
| Layout agent runs before specialist agents | Gives each specialist a defined context ("write a 3-sentence explanation for a two-column left region") |
| Option A: Plan first, generate second | Cleaner than generating-then-fitting; avoids content that doesn't fit any layout |
| Start without image/audio | 80% of learning value from text + structured charts at 5% of the cost and complexity |
| Chapters generated progressively | Each chapter is informed by real performance data from the previous one; not possible if the full curriculum is fixed upfront |
| Behavioral dimensions instead of IQ/EQ labels | Inferring IQ/EQ is unreliable and carries unwanted product implications; measurable behavioral proxies are more honest and useful |

---

## 16. Open Questions (To Resolve in V2)

- What is the first specific wedge use case? (coding, language learning, standardized tests, professional upskilling?)
- How is curriculum quality assured? (LLM-only, human review layer, or hybrid?)
- What is the minimum viable "adaptive" behavior for Week 1 of a user's session?
- How is prerequisite ordering enforced in the curriculum planner?
- What reward signal design correctly captures long-term learning retention (not just short-term quiz scores)?

---

*Document version: V1 — captured from initial product design session.*
*Next: V2 will address open questions, define the wedge use case, and specify the API contract between pipeline agents.*

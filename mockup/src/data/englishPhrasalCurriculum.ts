import type { Curriculum, Slide } from './curriculum'
import {
  engVisArgumentArena,
  engVisBringFan,
  engVisCourseTrack,
  engVisExamTrap,
  engVisEventuallyTimeline,
  engVisGiveVsHand,
  engVisHangParticles,
  engVisIntonationPairs,
  engVisLatticeBurst,
  engVisLookCluster,
  engVisNotebook,
  engVisPhase1Done,
  engVisPhase2Bridge,
  engVisPickUpLanes,
  engVisPrepNet,
  engVisPullOutFrame,
  engVisRegisterScale,
  engVisRunGoFlow,
  engVisSeparabilityLanes,
  engVisSpeechWave,
  engVisStormContext,
  engVisStoryChunks,
  engVisVerbParticleObject,
  engVisWorkOutHub,
  engVisNextSteps,
} from './englishPhrasalVisuals'

const CH = 'eng_pv_stream'
export const englishPhrasalVerbsCurriculum: Curriculum = {
  id: 'curr_english_pv_001',
  title: 'English: Phrasal Verbs (B2+)',
  subject: 'english',
  description:
    'A continuous slide path for learners who are already B2 and want richer, more natural phrasal verbs — usage, separability, register, and quick checks. Uses the same layout machinery as Python and Mechanics: split columns, stacked hero sections, inline HTML/SVG visuals, audio cards, and quizzes (not a wall of single-column text).',
  totalChapters: 1,
  estimatedMinutes: 55,
  streamMode: true,
  createdAt: '2026-05-10T12:00:00Z',
  chapters: [
    {
      id: CH,
      curriculumId: 'curr_english_pv_001',
      title: 'Phrasal verbs — continuous track (Phases 1 & 2)',
      summary:
        'Thirty slides in one stream. Build a usable mental map of particles, separable verbs, polysemy, and tone — then practise with varied quiz and activity slides.',
      learningOutcomes: [
        'Use common B2+ phrasal verbs in appropriate contexts',
        'Judge when a particle is separable and how stress shifts in speech',
        'Pick between near-synonyms (register and colligation)',
        'Self-correct using a simple learner notebook pattern',
      ],
      status: 'in-progress',
      progress: 0,
      slides: [
        {
          id: 'eng_pv_00',
          chapter: CH,
          purpose: 'Welcome: why this path exists',
          layout: { template: 'stacked-vertical', regions: { top: 'heading_1', middle: 'text_1', bottom: 'html_1' } },
          content: {
            heading_1: {
              type: 'heading',
              props: {
                title: 'Phrasal verbs for fluent-but-stuck learners',
                subtitle: 'You are B2 — time for texture, not basics',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `At **B2** you already handle grammar and most conversations. What often stays rough is **natural chunking** — especially **phrasal verbs** and how their **particles** stack meaning (up, off, out, through…).

This course is **one continuous track** — not separate “units”. You move slide by slide. **Phase 1** is the first **15** slides; **Phase 2** continues with **15** more (here, they are already stubbed so you can preview the full mock).

---

**How to use it**

- Say tricky sentences **out loud** — phrasal verbs live in prosody.
- Keep a tiny **particle notebook** (you will set it up later on this track).
- Treat quizzes as **data**, not exams — note which particles surprise you.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisCourseTrack,
                caption: 'Same learning stream across both halves — richer layouts kick in as the path widens.',
              },
            },
          },
        },
        {
          id: 'eng_pv_01',
          chapter: CH,
          purpose: 'Particle semantics in English',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'text_1', 'left-bottom': 'text_2', right: 'html_1' },
          },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### What is a phrasal verb?

A **verb + particle** (sometimes **+ prepositional phrase**) that behaves as **one unit of meaning**.

Examples you know: **give up**, **look for**, **come back**.

At B2+ the interesting layer is **particle family**: **out** (completion / revelation), **off** (cancellation / removal), **through** (process to the end).`,
              },
            },
            text_2: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Why they feel “unfair”

English loves **one phrase, many meanings** (*make out* = discern vs. fare vs. write). Learners who rely on single-word translations hit a wall.

**Strategy:** store **whole frames**, not glosses — e.g. *She **talked him into** staying* = persuade by talking.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisVerbParticleObject,
                caption: 'Store the whole chunk — not the translation of the verb alone.',
              },
            },
          },
        },
        {
          id: 'eng_pv_02',
          chapter: CH,
          purpose: 'Separable vs inseparable pattern',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `## Separable and inseparable (working view)

| Pattern | Sketch | Particle position with a short object |
|--------|--------|--------------------------------------|
| **Separable** (many transitive PVs) | *pick **up*** the book | Often: *pick the book **up*** / *pick **it** up* |
| **Inseparable** | *look **after*** a child | * ~~look it after~~ * |
| **Prepositional verbs** | *run **into*** someone | Object is always after the preposition |

When in doubt, trust **corpus-shaped intuition**: if you have heard *turn it on* but never *turn on it*, that is your signal.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisSeparabilityLanes,
                caption: 'Three mental lanes — where the object may land.',
              },
            },
          },
        },
        {
          id: 'eng_pv_03',
          chapter: CH,
          purpose: 'Quiz: meaning in context',
          layout: { template: 'two-col-right-split', regions: { left: 'text_1', 'right-top': 'code_1', 'right-bottom': 'quiz_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Mini script

Read the line, then answer without overthinking — your gut at B2 is already useful.`,
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `"We should call off the outdoor gig — the wind is insane."

Question: What does *call off* express here?"`,
                caption: 'One sentence, one phrasal verb',
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: 'In the line above, call off is closest to:',
                choices: ['Postpone to next week', 'Cancel completely', 'Phone everyone backstage', 'Lower the volume'],
                correct: 1,
                explanation:
                  '*Call off* = cancel (an event, a meeting). It does not mean “postpone” by itself — that might be *put off* when used that way.',
              },
            },
          },
        },
        {
          id: 'eng_pv_04',
          chapter: CH,
          purpose: 'Visual particle map (html)',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Particles are not random

**Up** often marks completion or intensity (eat **up**, clean **up**).  
**Out** often marks exhaust / explicitness (figure **out**, **find** out).

The diagram is a memory toy, not a rule table — languages leak at the edges.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: `<div style="padding:14px;border-radius:12px;background:linear-gradient(165deg,#12151c,#0d0f14);border:1px solid #1e2130;font-family:system-ui,sans-serif;color:#c8cad4;">
  <div style="font-size:10px;letter-spacing:0.1em;color:#6b7280;margin-bottom:12px;text-transform:uppercase;">Particle compass</div>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;min-height:120px;">
    <div style="width:72px;height:72px;border-radius:50%;background:rgba(108,99,255,0.12);border:2px solid rgba(108,99,255,0.4);display:flex;align-items:center;justify-content:center;font-weight:700;color:#a5b4fc;font-size:13px;">UP</div>
    <div style="width:72px;height:72px;border-radius:50%;background:rgba(52,211,153,0.1);border:2px solid rgba(52,211,153,0.35);display:flex;align-items:center;justify-content:center;font-weight:700;color:#6ee7b7;font-size:13px;">OUT</div>
    <div style="width:72px;height:72px;border-radius:50%;background:rgba(251,191,36,0.1);border:2px solid rgba(251,191,36,0.35);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fcd34d;font-size:12px;">OFF</div>
    <div style="width:72px;height:72px;border-radius:50%;background:rgba(248,113,113,0.08);border:2px dashed rgba(248,113,113,0.4);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fca5a5;font-size:11px;">THROUGH</div>
  </div>
  <p style="margin:12px 0 0;font-size:10px;color:#6b7280;text-align:center;line-height:1.4;">Sketch how verbs “orbit” common particles — then hang real phrases on each.</p>
</div>`,
                caption: 'A visual anchor for particle families (mnemonic, not a rule engine).',
              },
            },
          },
        },
        {
          id: 'eng_pv_05',
          chapter: CH,
          purpose: 'Story strip with PVs highlighted',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'text_1', 'left-bottom': 'html_1', right: 'code_1' },
          },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Reading for chunking

Skim for **verb+particle+object** chains — ignore unknown vocabulary first pass.

**Return** here after Phase 2 with fresh eyes: you should catch more chunks automatically.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisStoryChunks,
                caption: 'Colour cue for micro-story chunks on the right.',
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'text',
                code: `At six she gave up on the queue and cut across the park.
She ended up at the river and took off her boots to cool down.
"Don't run out of patience," her phone warned — it had run out of battery instead.`,
                caption: 'Micro-story: mixed separable / inseparable',
              },
            },
          },
        },
        {
          id: 'eng_pv_06',
          chapter: CH,
          purpose: 'Polysemy: work out',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `## Polysemy lab: *work out*

| Domain | Example | Sense |
|--------|---------|--------|
| **Fitness** | I **work out** twice a week. | train / exercise |
| **Problem** | Can you **work out** the total? | calculate / solve |
| **Relationship** | It didn’t **work out**. | succeed long-term |
| **Result** | It **worked out** cheaper. | end up being |

**B2+ task:** for each row, say it aloud with natural **sentence stress** — the particle or the verb carries stress depending on sense.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisWorkOutHub,
                caption: 'One surface form — several sense routes (stress moves).',
              },
            },
          },
        },
        {
          id: 'eng_pv_07',
          chapter: CH,
          purpose: 'Listening card (shadowing)',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'audio_1', 'left-bottom': 'html_1', right: 'text_1' },
          },
          content: {
            audio_1: {
              type: 'audio',
              props: {
                title: 'Connected speech: link-ups after phrasal verbs',
                duration: '2:10',
                description:
                  'Short clip-style narration: how *go on*, *carry on*, and *get back to* compress in fast speech — follow with shadowing.',
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisSpeechWave,
                caption: 'Prosody hint — blur where particles meet function words.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `**Shadowing recipe**

1. Listen once without subtitles.  
2. Hum the rhythm.  
3. Speak on top of the audio — drop to 80% speed if needed.

Focus on **linking** after particles: *carry on with* → *carry_onwith* in fast casual speech.`,
              },
            },
          },
        },
        {
          id: 'eng_pv_08',
          chapter: CH,
          purpose: 'Register swap',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'text_1', right: 'quiz_1' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisRegisterScale,
                caption: 'Not “better” — different fit for audience and genre.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Informal phrasal → more neutral single verb

Not “better” — different **stance**. Academic prose often prefers **Latinate** verbs; dialogue stays phrasal.

\`\`\`text
put up with  ~  tolerate
find out       ~  discover
come across  ~  encounter
point out      ~  indicate / note
\`\`\`
`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: 'Which sounds more at home in a casual email to a friend?',
                choices: [
                  'We need to ascertain whether the venue is booked.',
                  'We need to find out whether the venue is booked.',
                  'We ought to determine the veracity of the booking.',
                  'It is necessary to establish booking status.',
                ],
                correct: 1,
                explanation:
                  '*Find out* is conversational-neutral and natural in email to a friend. The others skew formal or written-academic.',
              },
            },
          },
        },
        {
          id: 'eng_pv_09',
          chapter: CH,
          purpose: 'Notebook ritual',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `## Three-line notebook entry (keep it tiny)

For each new phrasal verb this week:

\`1\` **Sentence** you actually said or heard.  
\`2\` **Particle guess** — why *off* / *out* / *up*?  
\`3\` **Near-miss** — one wrong verb a learner might use.

Example: *They **backed out** of the deal.* → exit / retract → *cancelled* loses the “last-minute retreat” nuance.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisNotebook,
                caption: 'Paper-light ritual — three lines beats fifty flashcards.',
              },
            },
          },
        },
        {
          id: 'eng_pv_10',
          chapter: CH,
          purpose: 'Quiz: particle choice',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'text_1', right: 'quiz_1' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisStormContext,
                caption: 'Frame the scene before you scan verbs.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Quick check

Read the **stem** twice: who acts, what event, what external pressure?

Then reach for the verb that **matches cancellation**, not “postpone” unless the text signals delay.`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: 'Choose the natural completion: “We had to ___ the match — lightning.”',
                choices: ['call off', 'call in', 'call on', 'call for'],
                correct: 0,
                explanation:
                  '*Call off* = cancel an organised event. *Call in* = summon / involve; *call on* = visit or appeal; *call for* = demand / require.',
              },
            },
          },
        },
        {
          id: 'eng_pv_11',
          chapter: CH,
          purpose: 'Colligation: bring + particle',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'text_1', right: 'text_2' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisBringFan,
                caption: 'Different particles = different frames — not five unrelated verbs.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### *bring* cluster

- **bring up** — mention / raise (a topic) **or** raise children  
- **bring about** — cause to happen  
- **bring out** — reveal a quality; publish  
- **bring round** (BrE) / **around** (AmE) — persuade; revive`,
              },
            },
            text_2: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `**Collocation check**

*bring a proposal **forward*** (≠ *bring forward* a meeting — same phrase, different object class).

When two translations collide, check the **object**: topic vs. event vs. person.`,
              },
            },
          },
        },
        {
          id: 'eng_pv_12',
          chapter: CH,
          purpose: 'htmlquiz: preposition in phrasal frame',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'text_1', right: 'quiz_1' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: `<div style="padding:14px;border-radius:12px;border:1px solid #1e2130;background:#13151c;font-family:system-ui,sans-serif;text-align:center;">
  <div style="font-size:22px;">✉️</div>
  <p style="margin:10px 0 0;font-size:11px;color:#9ca3af;line-height:1.5;">Skim for <strong style="color:#f0f1f5">chance + encounter</strong> — not “invention” or “visit”.</p>
</div>`,
                caption: 'Semantic frame before you open the options.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### *come* frames

**come across** · stumble on a fact / thing  
**come up with** · produce an idea (needs a “creation” object)  
**come over** · visit / affect mood — different argument structure.`,
              },
            },
            quiz_1: {
              type: 'htmlquiz',
              props: {
                questionPlain: 'Fill the gap with the natural phrasal verb.',
                questionHtml: `<p style="margin:0;color:#f0f1f5;font-weight:600">Which option completes this naturally?</p><p style="margin:12px 0 0;padding:12px;border-radius:8px;background:#0a0c10;border:1px solid #1e2130;font-family:ui-monospace,monospace;font-size:13px;color:#c8cad4;line-height:1.6">She only <span style="color:#6b7280">_______</span> the rumour accidentally while clearing out old emails.</p>`,
                choiceHtmls: [
                  `<div style="font-family:ui-monospace,monospace;font-size:13px;color:#c8cad4;padding:8px;background:#13151c;border-radius:6px;border:1px solid #3a3f52">came across</div><div style="margin-top:6px;font-size:10px;color:#9ca3af">encounter by chance</div>`,
                  `<div style="font-family:ui-monospace,monospace;font-size:13px;color:#c8cad4;padding:8px;background:#13151c;border-radius:6px;border:1px solid #3a3f52">came over</div><div style="margin-top:6px;font-size:10px;color:#9ca3af">visit / change mood</div>`,
                  `<div style="font-family:ui-monospace,monospace;font-size:13px;color:#c8cad4;padding:8px;background:#13151c;border-radius:6px;border:1px solid #3a3f52">came into</div><div style="margin-top:6px;font-size:10px;color:#9ca3af">inherit / enter</div>`,
                  `<div style="font-family:ui-monospace,monospace;font-size:13px;color:#c8cad4;padding:8px;background:#13151c;border-radius:6px;border:1px solid #3a3f52">came up with</div><div style="margin-top:6px;font-size:10px;color:#9ca3af">invent / supply an idea</div>`,
                ],
                correct: 0,
                explanation:
                  '*Come across* = find or encounter by chance — fits “accidentally while clearing emails”. *Come up with* needs an idea object; *come over* and *come into* skew wrong semantics.',
              },
            },
          },
        },
        {
          id: 'eng_pv_13',
          chapter: CH,
          purpose: 'Exam-style trap awareness',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `## Where B2 tests poke you

Multiple-choice items often differ by **one particle**. Read the **subject** and **object** first, not the first verb that “feels Latinate”.

**Trick:** distractors reuse the **same verb** with a wrong particle (*look at* vs *look into*).

Sleep on it: if two answers look plausible, say both aloud — the awkward one usually violates **colligation** (what can follow the verb).`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisExamTrap,
                caption: 'Exam writers love this pattern.',
              },
            },
          },
        },
        {
          id: 'eng_pv_14',
          chapter: CH,
          purpose: 'End Phase 1 — checkpoint',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `## Phase 1 complete ✓

You have moved through the **first fifteen** slides — particles, separability, polysemy, and a few quick checks.

**In a live Axon-style build:** completing Phase 1 would **unlock generation** of the next **15** slides personalised to gaps in your quizzes (here, Phase 2 is already included so you can browse the mock).

**Continue** to slide 16 when ready — same stream, no new “chapter”.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisPhase1Done,
                caption: 'Same chapter object in data — only your position on the path moves.',
              },
            },
          },
        },

        // ─── Phase 2 (slides 15–29) ───
        {
          id: 'eng_pv_15',
          chapter: CH,
          purpose: 'Phase 2 opening: wider net',
          layout: { template: 'stacked-vertical', regions: { top: 'heading_1', middle: 'text_1', bottom: 'html_1' } },
          content: {
            heading_1: {
              type: 'heading',
              props: { title: 'Phase 2 — stretch and connect ', subtitle: 'Slides 16–30 of the same stream' },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `Phase 2 **extends** the same skills: more **verbs of movement / perception / argument**, and more **dialogue-shaped** practice.

Treat this half as **spiral revision** — you will revisit Phase 1 patterns from new angles.

---

**Optional challenge**

Pick one slide per day to **rewrite** in a different register (spoken blog vs. stiff email). Phrasal verbs slide along the **formality** scale.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisPhase2Bridge,
                caption: 'Spiral path — old chunks in new discourse shells.',
              },
            },
          },
        },
        {
          id: 'eng_pv_16',
          chapter: CH,
          purpose: 'run / go families',
          layout: {
            template: 'two-col-right-split',
            regions: { left: 'text_1', 'right-top': 'html_1', 'right-bottom': 'code_1' },
          },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### *run* and *go*

- **run out of** — exhaust supply  
- **run through** — rehearse / summarise quickly  
- **run into** — meet by chance **or** hit  
- **go through with** — actually do something planned despite doubt`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisRunGoFlow,
                caption: 'Process vs depletion vs commitment — different arrows.',
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'text',
                code: `We ran through the slides at lunch —
I nearly ran out of time but
went through with the pitch anyway.`,
                caption: 'One breath; three phrasal families',
              },
            },
          },
        },
        {
          id: 'eng_pv_17',
          chapter: CH,
          purpose: 'Quiz: look cluster',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'text_1', right: 'quiz_1' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisLookCluster,
                caption: 'Only one particle here means “investigate”.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Stem reading

If the prompt is about **finding facts** or **probing responsibility**, ask whether the verb is investigative rather than social (care / admire).`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: 'Investigate a problem → which phrasal verb fits best?',
                choices: ['look into', 'look after', 'look up to', 'look forward to'],
                correct: 0,
                explanation:
                  '*Look into* = investigate. *Look after* = care for; *look up to* = admire; *look forward to* = anticipate with pleasure.',
              },
            },
          },
        },
        {
          id: 'eng_pv_18',
          chapter: CH,
          purpose: 'Argument verbs: cut / talk',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `## Argument & persuasion

| Phrasal | Gloss | Tone |
|---------|-------|------|
| **talk … round** (BrE) | persuade change of mind | informal lobbying |
| **talk … into** | persuade to DO | coercive-ish edge possible |
| **cut off** | interrupt speech | sharp, can sound rude |
| **cut down on** | reduce consumption | neutral advice |

**Fluency angle:** pair them with **softeners** (*I'm sorry to cut you off, but…*).`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisArgumentArena,
                caption: 'Stance lives in how you pair face-threatening acts.',
              },
            },
          },
        },
        {
          id: 'eng_pv_19',
          chapter: CH,
          purpose: 'Dialogue + comprehension quiz',
          layout: { template: 'two-col-right-split', regions: { left: 'code_1', 'right-top': 'text_1', 'right-bottom': 'quiz_1' } },
          content: {
            code_1: {
              type: 'code',
              props: {
                language: 'text',
                code: `A: We could put off the launch —
   the testers still haven't signed off.
B: Or we scale back the release and
   roll out fixes nightly.
A: Fine — I'll own up to the delay
   on the stand-up.`,
                caption: 'Product-team dialogue — dense PVs',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `**Scan** for verbs of deferral (*put off*), reduction (*scale back*), deployment (*roll out*), admission (*own up to*).`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: 'In the dialogue, *sign off* is closest to:',
                choices: ['Approve / clear for completion', 'Terminate employment', 'Write a farewell', 'Ignore'],
                correct: 0,
                explanation:
                  '*Sign off (on)* = give approval for something to proceed. Workplace English uses it for releases, documents, or trials.',
              },
            },
          },
        },
        {
          id: 'eng_pv_20',
          chapter: CH,
          purpose: 'Audio: intonation ladders',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'audio_1', right: 'text_1' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisIntonationPairs,
                caption: 'Pitch shape carries empathy — not the words alone.',
              },
            },
            audio_1: {
              type: 'audio',
              props: {
                title: 'Tone pairs: sympathy vs. resignation',
                duration: '1:48',
                description:
                  'Two micro-lines with *go through*, *fall apart*, *put up with* — same words, different empathy levels.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Intonation carries attitude

The **same** phrasal string can sound supportive or sarcastic depending on **tone** and pitch peak.

Listen for contrast: *Oh, you **went through** a lot* (sympathy) vs. flat *you went through the form*.`,
              },
            },
          },
        },
        {
          id: 'eng_pv_21',
          chapter: CH,
          purpose: 'Quiz: pick up senses',
          layout: {
            template: 'two-col-right-split',
            regions: { left: 'text_1', 'right-top': 'quiz_1', 'right-bottom': 'html_1' },
          },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Physical vs abstract *pick up*

Does the subject manipulate matter in space, or does the predicate describe **trend / state**?`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: 'Which use of *pick up* is NON-physical?',
                choices: [
                  'Pick up your jacket from the floor.',
                  'Business is picking up this quarter.',
                  'She picked up the kids at four.',
                  'Pick up that box carefully.',
                ],
                correct: 1,
                explanation:
                  '*Pick up* + business = improve / recover (metaphorical). The others involve lifting or fetching people/things.',
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisPickUpLanes,
                caption: 'Abstract lane = metaphor, not muscle.',
              },
            },
          },
        },
        {
          id: 'eng_pv_22',
          chapter: CH,
          purpose: 'Visual idiom map (htmlcss)',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Metaphor families

Many phrasal verbs picture **space** or **force** — you map them like small physics cartoons (fall through the cracks, carry over to next sprint).`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: `<div style="padding:12px;border-radius:10px;border:1px solid #1e2130;background:#13151c;">
  <div style="font-size:11px;color:#6b7280;margin-bottom:8px;">Metaphor sketch</div>
  <svg viewBox="0 0 280 90" width="100%" style="max-height:100px;display:block" aria-hidden="true">
    <rect x="10" y="55" width="260" height="4" fill="#3a3f52" rx="2"/>
    <circle cx="40" cy="40" r="12" fill="rgba(251,191,36,0.3)" stroke="#fbbf24"/>
    <path d="M52 40 L120 40" stroke="#6c63ff" stroke-width="2" marker-end="url(#hm)"/>
    <text x="75" y="32" fill="#a5b4fc" font-size="10" font-family="system-ui,sans-serif">hand over</text>
    <circle cx="200" cy="40" r="12" fill="rgba(52,211,153,0.25)" stroke="#34d399"/>
    <defs><marker id="hm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0 L5 2.5 L0 5 Z" fill="#6c63ff"/></marker></defs>
  </svg>
  <p style="margin:6px 0 0;font-size:10px;color:#6b7280;text-align:center">Transfer image: one entity → another across a boundary.</p>
</div>`,
                caption: 'Mnemonics tie abstract verbs to spatial stories.',
              },
            },
          },
        },
        {
          id: 'eng_pv_23',
          chapter: CH,
          purpose: 'Preposition nets',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `## Over / through / across

- **over** — often completion or transfer (*hand **over***, *think **over***).  
- **through** — duration or process to an end (*see it **through***).  
- **across** — lateral encounter / communication (*come **across***, *get **across***).

When you double-check *get across* vs *get through to*, ask: **message clarity** vs **emotional breakthrough**?`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisPrepNet,
                caption: 'Three-way contrast — different geometry of attention.',
              },
            },
          },
        },
        {
          id: 'eng_pv_24',
          chapter: CH,
          purpose: 'Quiz: hang hangover',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'text_1', right: 'quiz_1' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisHangParticles,
                caption: 'Social “hang out” spikes — others are rarer in small talk.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### Hang + particle

With people and time, **hang out** is the leisure default; test collocations aloud.`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: '“We can hang ___ for an hour — my train’s late.” Natural particle?',
                choices: ['out', 'in', 'on', 'up'],
                correct: 0,
                explanation:
                  '*Hang out* = spend leisure time together (informal). *Hang on* = wait; *hang in* is not standard as a phrasal chunk here; *hang up* ends a phone call.',
              },
            },
          },
        },
        {
          id: 'eng_pv_25',
          chapter: CH,
          purpose: 'False friends zone',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### *actually* vs phrasal rhythm

Some learners over-use **actually** as a discourse marker because a phrasal verb was missed earlier — the rhythm breaks.

**Repair strategy:** insert a chunk (*the thing is…*, *I mean…*) instead of panicking midclause.

---

### *eventually* ≠ *finally* every time

**Eventually** = at an unspecified later time in a sequence.  
**Finally** = after waiting / after obstacles — emotional closure.

Not phrasal, but B2 writers mix them beside PV-heavy drafts.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisEventuallyTimeline,
                caption: 'Nearby on the page — different temporal “shape”.',
              },
            },
          },
        },
        {
          id: 'eng_pv_26',
          chapter: CH,
          purpose: 'Quiz: get vs give frame',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'text_1', right: 'quiz_1' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisGiveVsHand,
                caption: 'Collateral verb sets love to trick you here.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### *give in* · *hand in*

**Hand in** collocates with homework. **Give in** takes humans or pressure as subject — surrender, not submission of paper.`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: 'Which sentence uses *give in* correctly?',
                choices: [
                  'She gave in her homework early.',
                  'After hours of arguing, he gave in.',
                  'Give in the form before Friday.',
                  'They gave in the keys at reception.',
                ],
                correct: 1,
                explanation:
                  '*Give in* = yield / stop resisting. It does not mean *hand in* (submit homework) or *give away* — compare with *hand in* for documents.',
              },
            },
          },
        },
        {
          id: 'eng_pv_27',
          chapter: CH,
          purpose: 'Revision lattice',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `## Rapid lattice — say each line in under two seconds

1. **Set up** the account **before** we **run out of** seats.  
2. I **came across** your note while I **sorted through** the drawer.  
3. She **talked me into** staying, then **cut me off** mid-sentence.  
4. We **brushed aside** the risk — and **paid for** it later.

**Fluency metric:** can you swap register (**brush aside** → *downplay / minimise*) without changing truth conditions?`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisLatticeBurst,
                caption: 'Tight timing forces chunk retrieval — not word-by-word translation.',
              },
            },
          },
        },
        {
          id: 'eng_pv_28',
          chapter: CH,
          purpose: 'Quiz: end on your feet',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'html_1', 'left-bottom': 'text_1', right: 'quiz_1' },
          },
          content: {
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisPullOutFrame,
                caption: 'Withdrawal from an agreement — not driving to the shoulder.',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `### *pull* cluster in decisions

Map the **object**: plan, agreement, funding — then check whether the particle marks **exit** (*pull out of*) vs **recovery** (*pull through*) vs **cohesion** (*pull together*).`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: '“If we *** the idea, we save budget and face.” Best fit:',
                choices: ['pull out of', 'pull over', 'pull through', 'pull together'],
                correct: 0,
                explanation:
                  '*Pull out of* an agreement / plan = withdraw. *Pull through* = recover from illness; *pull together* = cooperate; *pull over* = driving aside.',
              },
            },
          },
        },
        {
          id: 'eng_pv_29',
          chapter: CH,
          purpose: 'Close of stream — what next',
          layout: { template: 'stacked-vertical', regions: { top: 'heading_1', middle: 'text_1', bottom: 'html_1' } },
          content: {
            heading_1: {
              type: 'heading',
              props: {
                title: 'You reached the end of this stream',
                subtitle: 'Rinse, rotate, regenerate',
              },
            },
            text_1: {
              type: 'code',
              props: {
                language: 'markdown',
                code: `**What you can do next**

- Export your **three-line notebook** entries to a spaced-repetition deck (Anki, etc.).
- Re-run **only quiz slides** weekly — particles stick under light pressure.
- In a full Axon build, completion here would **seed** the next generated batch with verbs you missed + register goals you set in profile.

---

*This mock course is a design stub — content can be swapped for adaptive generation while keeping the same slide machinery.*

Thank you for walking the full **30 slides** in one straight line.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: engVisNextSteps,
                caption: 'How a live Axon loop might close the spiral.',
              },
            },
          },
        },
      ] satisfies Slide[],
    },
  ],
}

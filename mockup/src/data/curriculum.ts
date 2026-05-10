import { englishPhrasalVerbsCurriculum } from './englishPhrasalCurriculum'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentType =
  | 'text'
  | 'heading'
  | 'image'
  | 'chart'
  | 'code'
  | 'quiz'
  | 'input'
  | 'diagram'
  | 'audio'
  | 'video'
  | 'htmlcss'
  | 'htmlquiz'

export type LayoutTemplate =
  | 'single-col'
  | 'two-col'
  | 'two-col-right-split'
  | 'two-col-left-split'
  | 'stacked-vertical'

export interface TextContent {
  type: 'text'
  props: { body: string }
}

export interface HeadingContent {
  type: 'heading'
  props: { title: string; subtitle?: string }
}

export interface ImageContent {
  type: 'image'
  props: { url: string; alt: string; caption?: string }
}

export interface ChartContent {
  type: 'chart'
  props: { spec: object; caption?: string }
}

export interface CodeContent {
  type: 'code'
  props: { language: string; code: string; caption?: string }
}

export interface QuizContent {
  type: 'quiz'
  props: {
    question: string
    choices: string[]
    correct: number
    explanation: string
  }
}

export interface DiagramContent {
  type: 'diagram'
  props: { id: string; caption?: string }
}

export interface AudioContent {
  type: 'audio'
  props: { title: string; duration: string; description: string }
}

export interface VideoContent {
  type: 'video'
  props: { title: string; duration: string; description: string; thumbnail?: string }
}

export interface HtmlCssContent {
  type: 'htmlcss'
  props: { html: string; caption?: string }
}

export interface HtmlQuizContent {
  type: 'htmlquiz'
  props: {
    questionHtml: string
    choiceHtmls: string[]
    correct: number
    explanation: string
    questionPlain?: string
  }
}

export type SlideContent =
  | TextContent
  | HeadingContent
  | ImageContent
  | ChartContent
  | CodeContent
  | QuizContent
  | DiagramContent
  | AudioContent
  | VideoContent
  | HtmlCssContent
  | HtmlQuizContent

export interface Slide {
  id: string
  chapter: string
  purpose: string
  layout: {
    template: LayoutTemplate
    regions: Record<string, string>
  }
  content: Record<string, SlideContent>
}

export interface Chapter {
  id: string
  curriculumId: string
  title: string
  summary: string
  learningOutcomes: string[]
  slides: Slide[]
  status: 'completed' | 'in-progress' | 'locked'
  progress: number
}

export interface Curriculum {
  id: string
  title: string
  subject: string
  description: string
  totalChapters: number
  estimatedMinutes: number
  chapters: Chapter[]
  createdAt: string
  /** When true, overview UI treats the course as one continuous stream (no "Chapter N —" prefix). */
  streamMode?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSE 1: Python Programming from Scratch
// ─────────────────────────────────────────────────────────────────────────────

export const pythonCurriculum: Curriculum = {
  id: 'curr_python_001',
  title: 'Python Programming from Scratch',
  subject: 'python programming',
  description:
    'A practical introduction to Python — from variables and control flow to functions, data structures, and writing real programs. No prior experience required.',
  totalChapters: 2,
  estimatedMinutes: 50,
  createdAt: '2026-04-20T10:00:00Z',
  chapters: [
    {
      id: 'py_chapter_01',
      curriculumId: 'curr_python_001',
      title: 'Python Basics — Variables, Types & Control Flow',
      summary:
        'Get comfortable with the building blocks of Python: how data is stored, what types exist, and how to control the flow of your program with conditions and loops.',
      learningOutcomes: [
        'Declare and use variables of different types',
        'Write conditional logic with if/elif/else',
        'Use for and while loops to repeat code',
        'Understand type coercion and common type errors',
      ],
      status: 'completed',
      progress: 100,
      slides: [
        {
          id: 'py_ch01_01',
          chapter: 'py_chapter_01',
          purpose: 'Introduce Python as a language and why it is worth learning',
          layout: {
            template: 'stacked-vertical',
            regions: { top: 'heading_1', middle: 'text_1', bottom: 'quiz_1' },
          },
          content: {
            heading_1: {
              type: 'heading',
              props: {
                title: 'Why Python?',
                subtitle: 'Chapter 1 — Python Basics',
              },
            },
            text_1: {
              type: 'text',
              props: {
                body: `Python is one of the most widely used programming languages in the world — and for good reason. It reads almost like English, runs instantly without a compile step, and has libraries for nearly everything: data analysis, web development, automation, machine learning, and more.

More importantly, Python rewards the learner. You can write a working program in 5 lines on day one. That immediate feedback makes it far easier to build intuition than languages that require boilerplate before anything runs.

Here's the first Python program almost everyone writes:`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: "What will Python print when you run: print('Hello, world!')?",
                choices: [
                  "It prints: Hello, world!",
                  'It prints: print(Hello, world!)',
                  'Nothing — you need to compile first',
                  'An error, because the quotes are wrong',
                ],
                correct: 0,
                explanation:
                  "print() outputs its argument to the screen. 'Hello, world!' is a string literal — Python prints it exactly as written, without the quotes.",
              },
            },
          },
        },
        {
          id: 'py_ch01_02',
          chapter: 'py_chapter_01',
          purpose: 'Explain variables and the four core data types: int, float, str, bool',
          layout: {
            template: 'two-col',
            regions: { left: 'text_1', right: 'code_1' },
          },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `A **variable** is a named container for a value. In Python, you don't declare a type — the interpreter infers it.

**int** — whole numbers: `+ '`42`, `-7`, `0`' + `

**float** — decimal numbers: `+ '`3.14`, `-0.5`, `2.0`' + `

**str** — text, wrapped in quotes: `+ '`"hello"`, `\'world\'`' + `

**bool** — True or False (capital T/F)

Python is **dynamically typed**: the same variable can hold an int now and a string later. This is flexible but requires care — operations on mismatched types raise a TypeError.

You can always check a variable's type with **type()** — e.g. `+ '`type(42)`' + ` returns `+ '`<class \'int\'>`.',
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'python',
                code: `# Variables — no type declaration needed
name = "Alex"
age = 28
height = 1.75
is_student = True

# Check types
print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(height))    # <class 'float'>
print(type(is_student))# <class 'bool'>

# Dynamic typing — reassigning changes the type
x = 10       # int
x = "ten"    # now str — Python allows this`,
                caption: 'Variables and types in Python',
              },
            },
          },
        },
        {
          id: 'py_ch01_02b',
          chapter: 'py_chapter_01',
          purpose: 'Audio narration: how Python infers types at runtime',
          layout: {
            template: 'two-col',
            regions: { left: 'audio_1', right: 'diagram_1' },
          },
          content: {
            audio_1: {
              type: 'audio',
              props: {
                title: 'Python Type Inference — A 90-second explainer',
                duration: '1:28',
                description:
                  'A short narration walking through how Python decides what type a variable is at runtime — and why that differs from statically typed languages like Java or C++.',
              },
            },
            diagram_1: {
              type: 'diagram',
              props: {
                id: 'python-runtime-typing',
                caption:
                  'At each assignment, the name points to an object; its type is whatever that object is—decided when the code runs, not ahead of time.',
              },
            },
          },
        },
        {
          id: 'py_ch01_03',
          chapter: 'py_chapter_01',
          purpose: 'Teach if/elif/else conditional logic with real examples',
          layout: {
            template: 'two-col-right-split',
            regions: { left: 'text_1', 'right-top': 'code_1', 'right-bottom': 'quiz_1' },
          },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `**Conditionals** let your program make decisions. Python uses `+ '`if`' + `, `+ '`elif`' + ` (else if), and `+ '`else`' + ` to branch.

The key rule: **indentation defines the block**. Python uses 4 spaces (or a tab) to show which code belongs to a branch. This is not optional — wrong indentation causes an IndentationError.

Comparison operators:
- `+ '`==`' + ` equals
- `+ '`!=`' + ` not equals
- `+ '`<`, `>`, `<=`, `>=`' + ` numeric comparisons
- `+ '`in`' + ` membership (e.g. `+ '`"a" in "cat"`' + `)

Logical operators: `+ '`and`' + `, `+ '`or`' + `, `+ '`not`',
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'python',
                code: `score = 74

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Grade: {grade}")  # Grade: C

# Logical operators
age = 20
has_id = True

if age >= 18 and has_id:
    print("Entry allowed")
else:
    print("Entry denied")`,
                caption: 'if/elif/else and logical operators',
              },
            },
            quiz_1: {
              type: 'htmlquiz',
              props: {
                questionPlain: 'In Python, what determines which lines belong to an if block?',
                questionHtml: `<p style="margin:0;color:#f0f1f5;font-weight:600">In Python, what decides which lines belong to an <code style="color:#a5b4fc;font-family:ui-monospace,monospace;font-size:0.95em">if</code> block?</p><p style="margin:10px 0 0;font-size:12px;font-weight:400;color:#9ca3af;line-height:1.45">Each option shows a snippet — pick the one that reflects how Python groups a block.</p>`,
                choiceHtmls: [
                  `<div style="text-align:left"><div style="font-family:ui-monospace,monospace;font-size:12px;line-height:1.5;color:#c8cad4;background:#13151c;padding:8px;border-radius:6px;border:1px solid #3a3f52">if x &gt; 0 {<br/><span style="display:inline-block;padding-left:12px">print(x)</span><br/>}</div><div style="margin-top:6px;font-size:10px;color:#9ca3af">Braces grouping the lines</div></div>`,
                  `<div style="text-align:left"><div style="font-family:ui-monospace,monospace;font-size:12px;line-height:1.5;color:#c8cad4;background:#13151c;padding:8px;border-radius:6px;border:1px solid #3a3f52">if x &gt; 0:<br/><span style="color:#6b7280"># no indented body under the header</span></div><div style="margin-top:6px;font-size:10px;color:#9ca3af">Colon with no body lines shown</div></div>`,
                  `<div style="text-align:left"><div style="font-family:ui-monospace,monospace;font-size:12px;line-height:1.5;color:#c8cad4;background:#13151c;padding:8px;border-radius:6px;border:1px solid #3a3f52"><span style="color:#c678dd">if</span> score &gt;= 90:<br/><span style="display:inline-block;padding-left:1rem;margin-left:2px;border-left:2px solid #6c63ff;padding-left:10px">grade = &quot;A&quot;</span></div><div style="margin-top:6px;font-size:10px;color:#9ca3af">Indented lines following the header</div></div>`,
                  `<div style="text-align:left"><div style="font-family:ui-monospace,monospace;font-size:12px;line-height:1.5;color:#c8cad4;background:#13151c;padding:8px;border-radius:6px;border:1px solid #3a3f52">if x &gt; 0<br/>end</div><div style="margin-top:6px;font-size:10px;color:#9ca3af">Keyword to close the block</div></div>`,
                ],
                correct: 2,
                explanation:
                  "Python uses indentation (typically 4 spaces) to define code blocks — not curly braces like C or Java. The colon after if/elif/else marks the start of a block, but the indented lines below define its contents.",
              },
            },
          },
        },
        {
          id: 'py_ch01_04',
          chapter: 'py_chapter_01',
          purpose: 'Explain for loops and while loops with practical examples',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'code_1', 'left-bottom': 'chart_1', right: 'text_1' },
          },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `**Loops** let you repeat code without copying it. Python has two loop types:

**for loop** — iterates over a sequence (list, range, string…). Use this when you know the collection or count in advance.

**while loop** — repeats as long as a condition is True. Use this when the number of iterations is unknown.

**range()** generates a sequence of numbers:
- `+ '`range(5)`' + ` → 0, 1, 2, 3, 4
- `+ '`range(1, 6)`' + ` → 1, 2, 3, 4, 5
- `+ '`range(0, 10, 2)`' + ` → 0, 2, 4, 6, 8

**break** exits the loop immediately.
**continue** skips to the next iteration.

A common mistake: an infinite while loop (condition never becomes False). Always make sure the condition can be satisfied.`,
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'python',
                code: `# for loop with range
for i in range(1, 6):
    print(f"Step {i}")
# Step 1, Step 2, ... Step 5

# for loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit.upper())

# while loop
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1   # must increment to avoid infinite loop`,
                caption: 'for and while loops',
              },
            },
            chart_1: {
              type: 'chart',
              props: {
                caption: 'Iterations vs cumulative sum (visualizing a loop)',
                spec: {
                  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                  width: 'container',
                  height: 160,
                  background: 'transparent',
                  data: {
                    values: Array.from({ length: 10 }, (_, i) => ({
                      step: i + 1,
                      sum: ((i + 1) * (i + 2)) / 2,
                    })),
                  },
                  mark: { type: 'line', color: '#6c63ff', point: { color: '#6c63ff', size: 40 }, strokeWidth: 2 },
                  encoding: {
                    x: { field: 'step', type: 'quantitative', title: 'Iteration', axis: { labelColor: '#6b7280', titleColor: '#6b7280', gridColor: '#1e2130' } },
                    y: { field: 'sum', type: 'quantitative', title: 'Cumulative Sum', axis: { labelColor: '#6b7280', titleColor: '#6b7280', gridColor: '#1e2130' } },
                  },
                },
              },
            },
          },
        },
        {
          id: 'py_ch01_04b',
          chapter: 'py_chapter_01',
          purpose: 'Video walkthrough: tracing a for loop step by step in a debugger',
          layout: {
            template: 'two-col',
            regions: { left: 'video_1', right: 'text_1' },
          },
          content: {
            video_1: {
              type: 'video',
              props: {
                title: 'Loop Walkthrough — Tracing Execution Step by Step',
                duration: '2:15',
                description:
                  'Watch a for loop execute line by line in a Python debugger — see exactly how the loop variable updates, when the condition is checked, and what break does to the flow.',
              },
            },
            text_1: {
              type: 'text',
              props: {
                body: `**What the video covers:**

Using a debugger is the single best way to build an intuitive feel for how loops execute.

**Step-through key moments:**

1. **Loop setup** — range() creates an iterator before the first iteration begins
2. **Each iteration** — the loop variable gets the next value
3. **break vs continue** — see the difference visually as the flow jumps
4. **After the loop** — the loop variable still exists in scope

**The mental model to build:**

Think of a for loop as an implicit pointer scanning across a sequence. Each iteration the pointer advances one step and delivers the value at that position.

When the pointer reaches the end, the loop exits cleanly. break is like teleporting the pointer to after the loop immediately.`,
              },
            },
          },
        },
        {
          id: 'py_ch01_05',
          chapter: 'py_chapter_01',
          purpose: 'Summarize Chapter 1 and preview functions in Chapter 2',
          layout: { template: 'single-col', regions: { main: 'text_1' } },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `## Chapter 1 Summary

You've covered the core building blocks of Python:

**Variables & types** — int, float, str, bool. Python infers types; use type() to inspect.

**Conditionals** — if/elif/else with indentation defining blocks. Comparison and logical operators.

**Loops** — for loops iterate over sequences; while loops repeat until a condition fails. break and continue control flow within loops.

---

**Up next: Functions & Data Structures**

Chapter 2 introduces functions — how to package reusable logic — and Python's most important data structures: lists, dictionaries, and tuples. These are the tools you'll use in every real Python program.`,
              },
            },
          },
        },
      ],
    },
    {
      id: 'py_chapter_02',
      curriculumId: 'curr_python_001',
      title: 'Functions & Data Structures',
      summary:
        'Learn to write reusable functions and work with Python\'s most powerful built-in data structures: lists, dictionaries, and tuples.',
      learningOutcomes: [
        'Define and call functions with parameters and return values',
        'Understand scope and the difference between local and global variables',
        'Use lists and list comprehensions effectively',
        'Work with dictionaries for key-value data',
      ],
      status: 'in-progress',
      progress: 40,
      slides: [
        {
          id: 'py_ch02_01',
          chapter: 'py_chapter_02',
          purpose: 'Introduce functions: definition, parameters, and return values',
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'code_1' } },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `A **function** is a named, reusable block of code. You define it once and call it as many times as needed — with different inputs each time.

**def** — the keyword that defines a function.
**Parameters** — the inputs the function accepts (inside parentheses).
**return** — the value the function sends back to the caller.

Functions are the primary tool for avoiding repetition. Any time you write the same logic twice, you should put it in a function.

Good functions follow the **single responsibility principle**: each function does one thing and does it well. A function named calculate_total should calculate a total — not also print it, write to a file, and send an email.`,
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'python',
                code: `# Basic function definition
def greet(name):
    return f"Hello, {name}!"

# Calling the function
message = greet("Alex")
print(message)  # Hello, Alex!

# Function with multiple parameters
def add(a, b):
    return a + b

result = add(3, 5)  # 8

# Default parameter values
def power(base, exponent=2):
    return base ** exponent

print(power(3))    # 9  (exponent defaults to 2)
print(power(2, 8)) # 256`,
                caption: 'Defining and calling functions',
              },
            },
          },
        },
        {
          id: 'py_ch02_01b',
          chapter: 'py_chapter_02',
          purpose: 'Video walkthrough: defining and calling your first Python function',
          layout: {
            template: 'two-col',
            regions: { left: 'video_1', right: 'text_1' },
          },
          content: {
            video_1: {
              type: 'video',
              props: {
                title: 'Your First Python Function — Live Demo',
                duration: '3:10',
                description:
                  'A screen-recorded walkthrough of writing a real function from scratch: taking a problem, identifying inputs and outputs, writing the function body, and testing it in the Python REPL.',
              },
            },
            text_1: {
              type: 'text',
              props: {
                body: `**What this demo covers:**

Writing a function is a two-part process: **designing the interface** (what goes in, what comes out) and **implementing the body** (how to compute the result).

**The REPL as a sandbox:**

The Python Read-Eval-Print Loop lets you experiment with a function immediately after defining it. No save, no run button — just instant feedback.

**Common beginner pitfalls shown:**

- **Forgetting return** — the function runs but returns None
- **Shadowing a parameter** — assigning to the parameter name destroys the input
- **Side effects in a pure function** — using print() instead of return

**Keyword arguments:**

Calling \`power(exponent=3, base=2)\` makes the code self-documenting and avoids argument-order mistakes.`,
              },
            },
          },
        },
        {
          id: 'py_ch02_02',
          chapter: 'py_chapter_02',
          purpose: 'Explain variable scope: local vs global, with a visual LEGB diagram',
          layout: {
            template: 'two-col',
            regions: { left: 'diagram_1', right: 'text_1' },
          },
          content: {
            diagram_1: {
              type: 'diagram',
              props: {
                id: 'python-scope',
                caption: 'LEGB: Local → Enclosing → Global → Built-in lookup order',
              },
            },
            text_1: {
              type: 'text',
              props: {
                body: `**Scope** determines where a variable is visible. The LEGB diagram on the left shows the four layers Python searches in order.

**Local scope** — variables defined inside a function. They exist only while the function runs. Invisible outside.

**Enclosing scope** — relevant for nested functions. The inner function can read the outer function's variables.

**Global scope** — variables defined at the top level. Visible everywhere in the file.

**Built-in scope** — Python's own names: len, print, range, type…

**The key rule:** Python always searches from inside out. If a name is found locally, it never checks the global scope. This means a local variable with the same name as a global one will **shadow** the global.

Using **global** or **nonlocal** inside a function allows writing back to an outer scope — but this is usually a design smell; prefer returning values.`,
              },
            },
          },
        },
        {
          id: 'py_ch02_02b',
          chapter: 'py_chapter_02',
          purpose: 'Code examples and quiz for scope',
          layout: {
            template: 'two-col-right-split',
            regions: { left: 'code_1', 'right-top': 'audio_1', 'right-bottom': 'quiz_1' },
          },
          content: {
            code_1: {
              type: 'code',
              props: {
                language: 'python',
                code: `total = 0  # global variable

def add_to_total(amount):
    # Reading global is fine
    print(f"Current total: {total}")
    # Writing requires the global keyword
    global total
    total += amount

add_to_total(10)  # total is now 10
add_to_total(5)   # total is now 15

# Better pattern: use return values instead
def add(current, amount):
    return current + amount   # no global needed

total = add(total, 10)`,
                caption: 'Scope and the global keyword',
              },
            },
            audio_1: {
              type: 'audio',
              props: {
                title: 'Why global variables are dangerous',
                duration: '1:05',
                description:
                  'A brief explanation of why mutating global state makes code harder to test, debug, and reason about — and the functional alternative.',
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: "What happens when you try to print a function's local variable from outside that function?",
                choices: [
                  'It prints the value correctly',
                  'It prints None',
                  'It raises a NameError — the variable is not defined in the outer scope',
                  'It prints the global variable with the same name',
                ],
                correct: 2,
                explanation:
                  "Local variables only exist inside the function. Once the function returns, they are destroyed. Trying to access them from outside raises a NameError because Python can't find the name in any outer scope.",
              },
            },
          },
        },
        {
          id: 'py_ch02_03',
          chapter: 'py_chapter_02',
          purpose: 'Introduce lists and list comprehensions',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'heading_1', 'left-bottom': 'code_1', right: 'text_1' },
          },
          content: {
            heading_1: {
              type: 'heading',
              props: { title: 'Lists & Comprehensions', subtitle: 'Chapter 2 — Data Structures' },
            },
            text_1: {
              type: 'text',
              props: {
                body: `A **list** is an ordered, mutable collection of items. Items can be of any type — and mixed types are allowed (though unusual).

Key list operations:
- `+ '`append(x)`' + ` — add to the end
- `+ '`insert(i, x)`' + ` — insert at index i
- `+ '`remove(x)`' + ` — remove first occurrence
- `+ '`pop()`' + ` — remove and return last item
- `+ '`len(lst)`' + ` — number of items
- `+ '`lst[i]`' + ` — access by index (0-based)
- `+ '`lst[-1]`' + ` — last item
- `+ '`lst[1:4]`' + ` — slice (items 1, 2, 3)

**List comprehensions** are the Pythonic way to build lists from loops in a single expression:

\`[expression for item in iterable if condition]\`

They are faster than equivalent for loops and more readable once you're used to the pattern.`,
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'python',
                code: `# Basic list
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# Slicing
print(nums[0])    # 3
print(nums[-1])   # 6
print(nums[1:4])  # [1, 4, 1]

# List comprehension — squares of evens
squares = [x**2 for x in nums if x % 2 == 0]
# [16, 4, 36]

# Equivalent for loop (slower, more lines)
squares = []
for x in nums:
    if x % 2 == 0:
        squares.append(x**2)`,
                caption: 'Lists and comprehensions',
              },
            },
          },
        },
        {
          id: 'py_ch02_03b',
          chapter: 'py_chapter_02',
          purpose: 'Visual diagram showing list indexing with positive and negative indices',
          layout: {
            template: 'single-col',
            regions: { main: 'diagram_1' },
          },
          content: {
            diagram_1: {
              type: 'diagram',
              props: {
                id: 'python-list-indexing',
                caption: 'Every element has two indices: a positive (left→right) and a negative (right→left). Both refer to the same element.',
              },
            },
          },
        },
        {
          id: 'py_ch02_04',
          chapter: 'py_chapter_02',
          purpose: 'Introduce dictionaries as key-value stores',
          layout: { template: 'stacked-vertical', regions: { top: 'text_1', bottom: 'code_1' } },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `A **dictionary** maps keys to values. It is Python's most versatile data structure for associating names with data.

Keys must be **immutable** (strings, numbers, tuples are common). Values can be anything — including other dicts or lists, enabling nested structures.

Dictionaries are **unordered by insertion** in Python 3.7+, but in practice they preserve insertion order.

Key operations:
- `+ '`d[key]`' + ` — access a value (raises KeyError if missing)
- `+ '`d.get(key, default)`' + ` — safe access with a fallback
- `+ '`d[key] = value`' + ` — set or update
- `+ '`key in d`' + ` — check existence
- `+ '`d.keys()`, `d.values()`, `d.items()`' + ` — iterate`,
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'python',
                code: `# Creating a dictionary
user = {
    "name": "Alex",
    "age": 28,
    "languages": ["Python", "TypeScript"],
}

# Access
print(user["name"])         # Alex
print(user.get("email", "N/A"))  # N/A (safe fallback)

# Update and add
user["age"] = 29
user["email"] = "alex@example.com"

# Iterate
for key, value in user.items():
    print(f"{key}: {value}")

# Dict comprehension
lengths = {lang: len(lang) for lang in user["languages"]}
# {"Python": 6, "TypeScript": 10}`,
                caption: 'Dictionaries — the most versatile Python structure',
              },
            },
          },
        },
        {
          id: 'py_ch02_05',
          chapter: 'py_chapter_02',
          purpose: 'Chapter 2 summary and what real Python programs look like',
          layout: { template: 'single-col', regions: { main: 'text_1' } },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `## Chapter 2 Summary

You now have the core toolkit for writing real Python programs:

**Functions** — define once, reuse anywhere. Parameters, return values, default arguments.

**Scope** — local variables stay local. Use return values instead of global state.

**Lists** — ordered, mutable sequences. Slicing, append, and list comprehensions.

**Dictionaries** — key-value maps. Use .get() for safe access. Nest freely.

---

**What's next?**

With these foundations you can already build useful programs: scripts that process files, tools that transform data, simple games, automation utilities. The next chapter introduces modules and the standard library — unlocking thousands of pre-built tools you can import in one line.`,
              },
            },
          },
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSE 2: Mechanics Physics from Scratch
// ─────────────────────────────────────────────────────────────────────────────

export const mechanicsCurriculum: Curriculum = {
  id: 'curr_mechanics_001',
  title: 'Mechanics Physics from Scratch',
  subject: 'classical mechanics',
  description:
    'Build a rigorous understanding of classical mechanics — from kinematics and Newton\'s laws to energy, momentum, and rotational motion. Math-forward but intuition-first.',
  totalChapters: 2,
  estimatedMinutes: 60,
  createdAt: '2026-04-25T09:00:00Z',
  chapters: [
    {
      id: 'mech_chapter_01',
      curriculumId: 'curr_mechanics_001',
      title: "Kinematics — Describing Motion",
      summary:
        'Learn to describe motion precisely using displacement, velocity, and acceleration — without yet asking why objects move.',
      learningOutcomes: [
        'Distinguish between scalar and vector quantities',
        'Calculate average and instantaneous velocity and acceleration',
        'Apply kinematic equations to 1D motion under constant acceleration',
        'Interpret position-time and velocity-time graphs',
      ],
      status: 'in-progress',
      progress: 60,
      slides: [
        {
          id: 'mech_ch01_01',
          chapter: 'mech_chapter_01',
          purpose: 'Introduce kinematics and the distinction between scalars and vectors',
          layout: {
            template: 'two-col',
            regions: { left: 'text_1', right: 'diagram_1' },
          },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `**Kinematics** is the branch of mechanics that describes *how* objects move — without asking *why*.

The first distinction to get right: **scalar vs vector**.

**Scalar** — a quantity described by magnitude alone.
- Distance: 12 km
- Speed: 60 km/h
- Time: 5 seconds
- Mass: 70 kg

**Vector** — a quantity with both magnitude and direction.
- Displacement: 12 km north
- Velocity: 60 km/h east
- Acceleration: 9.8 m/s² downward

This distinction matters enormously. A car driving 60 km/h in a circle has constant **speed** (scalar) but continuously changing **velocity** (vector) — because direction is always changing.`,
              },
            },
            diagram_1: {
              type: 'diagram',
              props: {
                id: 'vector-vs-scalar',
                caption: 'Speed tells you how fast. Velocity tells you how fast AND where.',
              },
            },
          },
        },
        {
          id: 'mech_ch01_02',
          chapter: 'mech_chapter_01',
          purpose: 'Define displacement, velocity, and acceleration precisely',
          layout: {
            template: 'two-col-right-split',
            regions: { left: 'text_1', 'right-top': 'chart_1', 'right-bottom': 'quiz_1' },
          },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `Three quantities define motion in one dimension:

**Displacement** Δx — change in position (vector):
`+ '`Δx = x_final − x_initial`' + `

**Average velocity** v̄ — displacement over time:
`+ '`v̄ = Δx / Δt`' + `

**Instantaneous velocity** — the derivative of position:
`+ '`v = dx/dt`' + `

**Average acceleration** ā — change in velocity over time:
`+ '`ā = Δv / Δt`' + `

**Instantaneous acceleration**:
`+ '`a = dv/dt = d²x/dt²`' + `

Key insight: velocity is the slope of the position-time graph. Acceleration is the slope of the velocity-time graph. If the position-time graph is a straight line, velocity is constant and acceleration is zero.`,
              },
            },
            chart_1: {
              type: 'chart',
              props: {
                caption: 'Constant acceleration: position (purple) and velocity (green) vs time',
                spec: {
                  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                  width: 'container',
                  height: 180,
                  background: 'transparent',
                  data: {
                    values: [
                      ...Array.from({ length: 21 }, (_, i) => {
                        const t = i * 0.25
                        return { t, value: 0.5 * 2 * t * t, series: 'Position (m)' }
                      }),
                      ...Array.from({ length: 21 }, (_, i) => {
                        const t = i * 0.25
                        return { t, value: 2 * t, series: 'Velocity (m/s)' }
                      }),
                    ],
                  },
                  mark: { type: 'line', strokeWidth: 2 },
                  encoding: {
                    x: { field: 't', type: 'quantitative', title: 'Time (s)', axis: { labelColor: '#6b7280', titleColor: '#6b7280', gridColor: '#1e2130' } },
                    y: { field: 'value', type: 'quantitative', title: 'Value', axis: { labelColor: '#6b7280', titleColor: '#6b7280', gridColor: '#1e2130' } },
                    color: {
                      field: 'series',
                      type: 'nominal',
                      scale: { range: ['#6c63ff', '#34d399'] },
                      legend: { labelColor: '#9ca3af', titleColor: '#9ca3af' },
                    },
                  },
                },
              },
            },
            quiz_1: {
              type: 'htmlquiz',
              props: {
                questionPlain:
                  'A car travels 100 m east then 100 m west back to the start. Distance is 200 m. What is displacement?',
                questionHtml: `<div>
  <p style="margin:0 0 10px;color:#f0f1f5;font-weight:600;line-height:1.45">A car travels <strong style="color:#a5b4fc">100 m east</strong>, then <strong style="color:#6ee7b7">100 m west</strong> and returns to its start. Distance traveled is 200 m. What is the <strong>displacement</strong>?</p>
  <div style="padding:12px;border-radius:10px;background:#0a0c10;border:1px solid #1e2130">
    <svg viewBox="0 0 380 78" width="100%" style="max-height:96px;display:block" aria-hidden="true" focusable="false">
      <defs>
        <marker id="hqM01East" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#6c63ff"/></marker>
        <marker id="hqM01West" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto"><path d="M7 0 L0 3.5 L7 7 Z" fill="#34d399"/></marker>
      </defs>
      <line x1="28" y1="40" x2="352" y2="40" stroke="#3a3f52" stroke-width="2"/>
      <circle cx="28" cy="40" r="7" fill="#6c63ff"/>
      <text x="28" y="66" text-anchor="middle" fill="#9ca3af" font-family="system-ui,sans-serif" font-size="11">Start = finish</text>
      <line x1="28" y1="40" x2="200" y2="40" stroke="#6c63ff" stroke-width="2.5" marker-end="url(#hqM01East)"/>
      <text x="110" y="28" text-anchor="middle" fill="#a5b4fc" font-family="system-ui,sans-serif" font-size="11">100 m east</text>
      <circle cx="200" cy="40" r="6" fill="#fbbf24" stroke="#fbbf24" stroke-width="1"/>
      <line x1="200" y1="40" x2="28" y2="40" stroke="#34d399" stroke-width="2.5" marker-end="url(#hqM01West)"/>
      <text x="110" y="58" text-anchor="middle" fill="#6ee7b7" font-family="system-ui,sans-serif" font-size="11">100 m west (back)</text>
    </svg>
    <p style="margin:6px 0 0;font-size:11px;color:#6b7280;line-height:1.4;text-align:center">Net change in position from start arrow to final arrow tip.</p>
  </div>
</div>`,
                choiceHtmls: [
                  `<span style="font-family:ui-monospace,monospace;font-weight:600;color:#c8cad4">200 m</span>`,
                  `<span style="font-family:ui-monospace,monospace;font-weight:600;color:#c8cad4">100 m east</span>`,
                  `<span style="font-family:ui-monospace,monospace;font-weight:600;color:#c8cad4">0 m</span>`,
                  `<span style="font-family:ui-monospace,monospace;font-weight:600;color:#c8cad4">200 m east</span>`,
                ],
                correct: 2,
                explanation:
                  'Displacement is the change in position from start to end — a vector. Since the car returned to its starting point, the net displacement is 0 m. Distance (200 m) measures the total path length regardless of direction.',
              },
            },
          },
        },
        {
          id: 'mech_ch01_02b',
          chapter: 'mech_chapter_01',
          purpose: 'Visual: displacement vs distance on a number line',
          layout: {
            template: 'single-col',
            regions: { main: 'diagram_1' },
          },
          content: {
            diagram_1: {
              type: 'diagram',
              props: {
                id: 'displacement-vs-distance',
                caption: 'Displacement is net change in position (can be zero). Distance is total path length (always positive).',
              },
            },
          },
        },
        {
          id: 'mech_ch01_03',
          chapter: 'mech_chapter_01',
          purpose: 'Derive and apply the four kinematic equations for constant acceleration',
          layout: {
            template: 'two-col-left-split',
            regions: { 'left-top': 'heading_1', 'left-bottom': 'code_1', right: 'text_1' },
          },
          content: {
            heading_1: {
              type: 'heading',
              props: { title: 'The 4 Kinematic Equations', subtitle: 'Constant acceleration only' },
            },
            text_1: {
              type: 'text',
              props: {
                body: `When acceleration **a** is constant, four equations relate the five kinematic variables: **x₀** (initial position), **x** (final position), **v₀** (initial velocity), **v** (final velocity), **t** (time).

Each equation uses four of the five variables — choose the one that includes your knowns and your unknown.

**Eq. 1:** v = v₀ + at *(no x)*
**Eq. 2:** x = x₀ + v₀t + ½at² *(no v)*
**Eq. 3:** v² = v₀² + 2a(x − x₀) *(no t)*
**Eq. 4:** x = x₀ + ½(v₀ + v)t *(no a)*

**Worked example:** A car starts from rest (v₀ = 0) and accelerates at 3 m/s². How far has it travelled after 4 seconds?

Use Eq. 2: x = 0 + 0·4 + ½·3·4² = **24 m**

Free fall is a special case: a = −9.8 m/s² (downward, taking up as positive).`,
              },
            },
            code_1: {
              type: 'code',
              props: {
                language: 'python',
                code: `# Kinematic equations as Python functions

def final_velocity(v0, a, t):
    """v = v0 + at"""
    return v0 + a * t

def displacement(x0, v0, a, t):
    """x = x0 + v0*t + 0.5*a*t^2"""
    return x0 + v0 * t + 0.5 * a * t**2

def v_squared(v0, a, delta_x):
    """v^2 = v0^2 + 2*a*delta_x"""
    return (v0**2 + 2 * a * delta_x) ** 0.5

# Example: car from rest, a = 3 m/s², t = 4s
x = displacement(x0=0, v0=0, a=3, t=4)
print(f"Distance: {x} m")   # 24.0 m`,
                caption: 'Kinematic equations implemented in Python',
              },
            },
          },
        },
        {
          id: 'mech_ch01_03b',
          chapter: 'mech_chapter_01',
          purpose: 'Audio + visual chooser: which kinematic equation to pick',
          layout: {
            template: 'two-col',
            regions: { left: 'audio_1', right: 'diagram_1' },
          },
          content: {
            audio_1: {
              type: 'audio',
              props: {
                title: 'Equation Selector — When to Use Which',
                duration: '1:42',
                description:
                  'A guided narration walking through a 5-step process for choosing the right kinematic equation given known and unknown variables. Includes two worked examples.',
              },
            },
            diagram_1: {
              type: 'diagram',
              props: {
                id: 'kinematic-equation-chooser',
                caption: 'Each equation omits exactly one of the five variables. Match your missing variable to pick the right equation.',
              },
            },
          },
        },
        {
          id: 'mech_ch01_04',
          chapter: 'mech_chapter_01',
          purpose: 'Chapter 1 summary and bridge to Newton\'s laws',
          layout: { template: 'single-col', regions: { main: 'text_1' } },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `## Chapter 1 Summary

You can now describe any 1D motion under constant acceleration with precision:

**Scalars vs Vectors** — distance is scalar; displacement is a vector. Speed is scalar; velocity is a vector.

**Displacement, velocity, acceleration** — each defined as a ratio of changes. Velocity is the slope of x(t); acceleration is the slope of v(t).

**The four kinematic equations** — choose based on which variable is unknown. Only valid when acceleration is constant.

---

**Up next: Newton's Laws**

Kinematics tells us *how* objects move. Chapter 2 asks *why* — and the answer is Newton's three laws. You'll learn that acceleration is always caused by a net force, and that every force comes with an equal and opposite reaction.`,
              },
            },
          },
        },
      ],
    },
    {
      id: 'mech_chapter_02',
      curriculumId: 'curr_mechanics_001',
      title: "Newton's Laws & Forces",
      summary:
        "Understand why objects accelerate using Newton's three laws, free body diagrams, and the relationship between force, mass, and acceleration.",
      learningOutcomes: [
        "State and apply Newton's three laws of motion",
        'Draw accurate free body diagrams',
        'Solve net force problems in 1D and 2D',
        'Apply the concept of normal force, tension, and friction',
      ],
      status: 'locked',
      progress: 0,
      slides: [
        {
          id: 'mech_ch02_01',
          chapter: 'mech_chapter_02',
          purpose: "Introduce Newton's First Law — the law of inertia",
          layout: { template: 'two-col', regions: { left: 'text_1', right: 'html_1' } },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `**Newton's First Law (Law of Inertia):**

*An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by a net external force.*

This is profoundly non-obvious. Everyday experience suggests that moving things slow down — but that's because friction is always present. In the absence of friction, a hockey puck sliding on ice would slide forever.

**Inertia** is the tendency of an object to resist changes in its state of motion. Inertia is proportional to mass — a heavier object requires more force to accelerate or decelerate.

The First Law also defines what we mean by a **net force**: the vector sum of all forces acting on an object. If the net force is zero, there is no acceleration.`,
              },
            },
            html_1: {
              type: 'htmlcss',
              props: {
                html: `<div style="height:100%;min-height:240px;width:100%;position:relative;border-radius:12px;overflow:hidden;background:linear-gradient(180deg,#0c1118 0%,#141c28 42%,#152a38 100%);font-family:ui-sans-serif,system-ui,sans-serif;">
  <div style="position:absolute;inset:0;opacity:0.35;background:repeating-linear-gradient(90deg,transparent,transparent 48px,rgba(200,230,255,0.04) 48px,rgba(200,230,255,0.04) 50px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:38%;background:linear-gradient(180deg,rgba(140,200,255,0.06) 0%,rgba(100,180,230,0.2) 35%,rgba(70,150,210,0.35) 100%);border-top:2px solid rgba(200,235,255,0.45);box-shadow:inset 0 12px 24px rgba(255,255,255,0.12);"></div>
  <div style="position:absolute;bottom:38%;left:8%;right:8%;height:3px;background:rgba(200,235,255,0.15);border-radius:2px;"></div>
  <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-58%);text-align:center;width:100%;z-index:2;">
    <div style="display:inline-flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:14px;">
      <span style="padding:5px 10px;border-radius:999px;background:rgba(108,99,255,0.2);border:1px solid rgba(108,99,255,0.45);color:#a5b4fc;font-size:11px;font-weight:600;">ΣF = 0</span>
      <span style="padding:5px 10px;border-radius:999px;background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.4);color:#6ee7b7;font-size:11px;font-weight:600;">a = 0</span>
      <span style="padding:5px 10px;border-radius:999px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.45);color:#fcd34d;font-size:11px;font-weight:600;">v constant</span>
    </div>
    <div style="position:relative;display:flex;align-items:center;justify-content:center;margin-top:8px;">
      <div style="position:absolute;left:12%;right:12%;top:50%;height:4px;margin-top:-2px;background:linear-gradient(90deg,transparent 0%,rgba(108,99,255,0.25) 15%,rgba(108,99,255,0.5) 50%,rgba(108,99,255,0.25) 85%,transparent 100%);border-radius:2px;"></div>
      <div style="position:absolute;left:calc(50% + 72px);top:50%;transform:translateY(-50%);width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:14px solid #6c63ff;filter:drop-shadow(0 0 6px rgba(108,99,255,0.6));"></div>
      <div style="position:relative;width:52px;height:52px;border-radius:50%;background:radial-gradient(circle at 32% 28%,#6b7280,#374151 55%,#111827);border:2px solid #9ca3af;box-shadow:0 8px 20px rgba(0,0,0,0.55),inset 0 -4px 8px rgba(0,0,0,0.35);z-index:3;"></div>
    </div>
    <p style="margin:18px 12px 0;font-size:10px;color:#6b7280;line-height:1.45;max-width:280px;margin-left:auto;margin-right:auto;"><strong style="color:#9ca3af;">Weight</strong> and <strong style="color:#9ca3af;">normal</strong> cancel vertically. With negligible <strong style="color:#9ca3af;">friction</strong>, ΣF along the ice ≈ 0 → <strong style="color:#9ca3af;">a</strong> = 0 → <strong style="color:#9ca3af;">v</strong> unchanged.</p>
  </div>
  <div style="position:absolute;bottom:10px;left:0;right:0;text-align:center;font-size:9px;color:rgba(200,220,255,0.35);letter-spacing:0.06em;">ICE · NEAR-ZERO FRICTION</div>
</div>`,
                caption:
                  'Diagram: weight and normal cancel vertically; with almost no friction there is no net force along the ice, so acceleration is zero and velocity stays constant.',
              },
            },
          },
        },
        {
          id: 'mech_ch02_01b',
          chapter: 'mech_chapter_02',
          purpose: 'Video demo: puck on frictionless ice illustrating Newton First Law',
          layout: {
            template: 'two-col',
            regions: { left: 'video_1', right: 'text_1' },
          },
          content: {
            video_1: {
              type: 'video',
              props: {
                title: 'Frictionless Puck Demo — Inertia in Action',
                duration: '1:55',
                description:
                  'A slow-motion demonstration of a puck gliding across a nearly frictionless air table. Shows how the puck maintains constant velocity with zero net force, then accelerates immediately when a brief push is applied.',
                thumbnail: '/images/ice-rink.jpg',
              },
            },
            text_1: {
              type: 'text',
              props: {
                body: `**What to watch for:**

At 0:08 — the puck is released with no applied force. Notice it travels in a straight line at constant speed. This is Newton's First Law in its purest form.

At 0:41 — a brief horizontal impulse is applied. The puck changes velocity instantaneously, then continues at the new constant velocity.

At 1:12 — two pucks with different masses are pushed with the same force. The lighter one accelerates more — previewing Newton's Second Law.

**The key insight:**

In everyday life, objects slow down because friction is a force that opposes motion. Newton's genius was imagining the frictionless case — the ideal — and realising that uniform motion requires *no force at all*.

Aristotle believed constant force was needed to maintain motion. Newton showed it only takes force to *change* motion.`,
              },
            },
          },
        },
        {
          id: 'mech_ch02_02',
          chapter: 'mech_chapter_02',
          purpose: "Introduce Newton's Second Law: F = ma",
          layout: {
            template: 'two-col-right-split',
            regions: { left: 'text_1', 'right-top': 'chart_1', 'right-bottom': 'quiz_1' },
          },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `**Newton's Second Law:**

*The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.*

`+ '`F_net = m · a`' + `

This is the central equation of classical mechanics. It tells us:
- Larger force → larger acceleration (same mass)
- Larger mass → smaller acceleration (same force)
- Direction: acceleration is in the same direction as the net force

**Units:** Force is measured in **Newtons** (N).
1 N = 1 kg·m/s²

**Free body diagrams (FBDs)** are essential for applying the Second Law. Draw the object as a dot, then draw all forces as arrows (vectors) acting on it. Sum the vectors to find F_net, then calculate a = F_net / m.`,
              },
            },
            chart_1: {
              type: 'chart',
              props: {
                caption: 'Acceleration vs net force for different masses',
                spec: {
                  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                  width: 'container',
                  height: 180,
                  background: 'transparent',
                  data: {
                    values: [
                      ...Array.from({ length: 11 }, (_, i) => ({ F: i * 10, a: i * 10 / 1, mass: '1 kg' })),
                      ...Array.from({ length: 11 }, (_, i) => ({ F: i * 10, a: i * 10 / 5, mass: '5 kg' })),
                      ...Array.from({ length: 11 }, (_, i) => ({ F: i * 10, a: i * 10 / 10, mass: '10 kg' })),
                    ],
                  },
                  mark: { type: 'line', strokeWidth: 2 },
                  encoding: {
                    x: { field: 'F', type: 'quantitative', title: 'Net Force (N)', axis: { labelColor: '#6b7280', titleColor: '#6b7280', gridColor: '#1e2130' } },
                    y: { field: 'a', type: 'quantitative', title: 'Acceleration (m/s²)', axis: { labelColor: '#6b7280', titleColor: '#6b7280', gridColor: '#1e2130' } },
                    color: {
                      field: 'mass', type: 'nominal',
                      scale: { range: ['#6c63ff', '#34d399', '#fbbf24'] },
                      legend: { labelColor: '#9ca3af', titleColor: '#9ca3af' },
                    },
                  },
                },
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: 'A 4 kg box is pushed with a net force of 20 N. What is its acceleration?',
                choices: [
                  '80 m/s²',
                  '5 m/s²',
                  '0.2 m/s²',
                  '16 m/s²',
                ],
                correct: 1,
                explanation:
                  'From F = ma, we get a = F/m = 20 N / 4 kg = 5 m/s². Force in Newtons divided by mass in kilograms gives acceleration in m/s².',
              },
            },
          },
        },
        {
          id: 'mech_ch02_02b',
          chapter: 'mech_chapter_02',
          purpose: 'Free body diagram for Newton 2nd law — labelled force arrows',
          layout: {
            template: 'two-col',
            regions: { left: 'diagram_1', right: 'text_1' },
          },
          content: {
            diagram_1: {
              type: 'diagram',
              props: {
                id: 'free-body-diagram',
                caption: 'Free body diagram: every force acting on the 4 kg box. Net force = F − f determines acceleration.',
              },
            },
            text_1: {
              type: 'text',
              props: {
                body: `**How to draw a free body diagram:**

1. **Isolate the object** — represent it as a single point or box
2. **Draw every force** as an arrow pointing away from the object in the direction the force acts
3. **Label magnitude and direction** for each force
4. **Sum the vectors** along each axis to find F_net
5. **Apply F = ma** to find acceleration

**Forces in the diagram:**

- **W = mg** (weight) — always straight down, equals mass × g
- **N** (normal force) — perpendicular to the contact surface, prevents the box from sinking
- **F** (applied force) — the push you apply horizontally
- **f** (friction) — opposes motion, acts horizontally opposite to F

**For this box:** W = N (vertical equilibrium, no vertical acceleration).
Horizontally: F_net = F − f = ma.`,
              },
            },
          },
        },
        {
          id: 'mech_ch02_03',
          chapter: 'mech_chapter_02',
          purpose: "Introduce Newton's Third Law and action-reaction pairs",
          layout: { template: 'stacked-vertical', regions: { top: 'text_1', bottom: 'quiz_1' } },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `**Newton's Third Law:**

*For every action, there is an equal and opposite reaction.*

More precisely: if object A exerts a force on object B, then object B exerts a force of equal magnitude and opposite direction on object A.

**Critical insight:** action-reaction pairs act on *different objects*. They never cancel each other out for the same object.

Examples:
- You push on the floor → the floor pushes back on you (normal force). That reaction is what holds you up.
- A rocket expels gas downward → the gas pushes the rocket upward (thrust).
- You pull a rope → the rope pulls you back with equal force.

**Common confusion:** Why does a truck hit by a small car not accelerate as much as the car? Both experience the same force magnitude (3rd law), but the truck has far greater mass → much smaller acceleration (2nd law).`,
              },
            },
            quiz_1: {
              type: 'quiz',
              props: {
                question: "A horse pulls a cart with force F. By Newton's Third Law, the cart pulls the horse with force F in the opposite direction. Why does the system still accelerate forward?",
                choices: [
                  "The horse's force is slightly larger than the cart's force",
                  "The action-reaction forces act on different objects and don't cancel for the system",
                  "Newton's Third Law doesn't apply when objects are connected",
                  'The cart force acts on the horse but the horse cancels it with muscle force',
                ],
                correct: 1,
                explanation:
                  "Action-reaction pairs act on different objects — horse and cart. For the system (horse + cart) to accelerate, you look at external forces: the horse's hooves push backward on the ground; the ground pushes the horse forward. That forward friction on the horse is the external force that accelerates the whole system.",
              },
            },
          },
        },
        {
          id: 'mech_ch02_04',
          chapter: 'mech_chapter_02',
          purpose: 'Chapter 2 summary',
          layout: { template: 'single-col', regions: { main: 'text_1' } },
          content: {
            text_1: {
              type: 'text',
              props: {
                body: `## Chapter 2 Summary

You now understand *why* objects move the way they do:

**First Law (Inertia)** — objects continue in their current state of motion unless a net force acts on them. Inertia resists change.

**Second Law (F = ma)** — net force produces acceleration proportional to force and inversely proportional to mass. Free body diagrams are the tool.

**Third Law (Action-Reaction)** — forces always come in pairs of equal magnitude and opposite direction, acting on different objects.

---

**What's next?**

Chapter 3 introduces **energy and work** — a powerful alternative framework for solving mechanics problems that avoids dealing with forces and accelerations directly. Many problems that are hard with Newton's laws become straightforward using energy conservation.`,
              },
            },
          },
        },
      ],
    },
  ],
}

// ─── All curricula ────────────────────────────────────────────────────────────

export const allCurricula: Curriculum[] = [
  pythonCurriculum,
  mechanicsCurriculum,
  englishPhrasalVerbsCurriculum,
]

export { englishPhrasalVerbsCurriculum } from './englishPhrasalCurriculum'

// Default export kept for backwards compatibility
export const curriculum = pythonCurriculum

import type React from 'react'
import { MarkdownContent } from './MarkdownContent'

interface CodeProps {
  language: string
  code: string
  caption?: string
}

const LANGUAGE_LABELS: Record<string, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  bash: 'Bash',
  sql: 'SQL',
  json: 'JSON',
  markdown: 'Markdown',
  text: 'Plain text',
}

export function CodeBlock({ language, code, caption }: CodeProps) {
  if (language === 'markdown') {
    return (
      <div className="flex min-w-0 max-w-full flex-col gap-2">
        <div className="overflow-hidden rounded-xl border border-[#1e2130] min-w-0 max-w-full">
          <div className="flex items-center justify-between border-b border-[#1e2130] bg-[#0d0e13] px-4 py-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#1e2130]" />
              <span className="h-3 w-3 rounded-full bg-[#1e2130]" />
              <span className="h-3 w-3 rounded-full bg-[#1e2130]" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#3a3f52]">
              {LANGUAGE_LABELS[language] ?? language}
            </span>
          </div>
          <div className="bg-[#13151c] p-4 min-w-0 max-w-full">
            <MarkdownContent>{code}</MarkdownContent>
          </div>
        </div>
        {caption && <p className="text-xs italic text-[#6b7280]">{caption}</p>}
      </div>
    )
  }

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-2">
      <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-[#1e2130]">
        <div className="flex items-center justify-between border-b border-[#1e2130] bg-[#0d0e13] px-4 py-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#1e2130]" />
            <span className="h-3 w-3 rounded-full bg-[#1e2130]" />
            <span className="h-3 w-3 rounded-full bg-[#1e2130]" />
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#3a3f52]">
            {LANGUAGE_LABELS[language] ?? language}
          </span>
        </div>
        <pre className="max-w-full bg-[#13151c] p-4 text-sm leading-relaxed overflow-x-auto">
          <code className="font-mono text-[#c8cad4]">{colorize(code, language)}</code>
        </pre>
      </div>
      {caption && (
        <p className="text-xs italic text-[#6b7280]">{caption}</p>
      )}
    </div>
  )
}

// Very lightweight syntax highlighting via React spans
function colorize(code: string, lang: string): React.ReactNode {
  if (lang !== 'python' && lang !== 'javascript' && lang !== 'typescript') {
    return code
  }

  const lines = code.split('\n')
  return lines.map((line, lineIdx) => {
    const tokens = tokenizeLine(line)
    return (
      <span key={lineIdx}>
        {tokens.map((tok, i) => (
          <span key={i} style={{ color: tok.color }}>
            {tok.text}
          </span>
        ))}
        {lineIdx < lines.length - 1 ? '\n' : ''}
      </span>
    )
  })
}

interface Token {
  text: string
  color: string
}

function tokenizeLine(line: string): Token[] {
  // Comment
  if (line.trimStart().startsWith('#') || line.trimStart().startsWith('//')) {
    return [{ text: line, color: '#4b5563' }]
  }

  const tokens: Token[] = []
  let remaining = line

  const patterns: [RegExp, string][] = [
    [/^(import|from|def|class|return|if|else|elif|for|while|in|not|and|or|True|False|None|const|let|var|function|async|await|new|this)(?=\b)/, '#c084fc'],
    [/^(nn|torch|np|pd|sklearn|train_test_split|Sequential|Linear|ReLU|MSELoss)(?=\b)/, '#38bdf8'],
    [/^"[^"]*"|^'[^']*'|^`[^`]*`/, '#86efac'],
    [/^\d+\.?\d*/, '#fb923c'],
    [/^[A-Z][a-zA-Z0-9_]*(?=\()/, '#fbbf24'],
    [/^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/, '#60a5fa'],
    [/^[=+\-*/<>!&|%]+/, '#94a3b8'],
    [/^[^a-zA-Z0-9_"'`#/=+\-*/<>!&|%]+/, '#c8cad4'],
    [/^[a-zA-Z_][a-zA-Z0-9_]*/, '#c8cad4'],
  ]

  while (remaining.length > 0) {
    let matched = false
    for (const [regex, color] of patterns) {
      const m = remaining.match(regex)
      if (m) {
        tokens.push({ text: m[0], color })
        remaining = remaining.slice(m[0].length)
        matched = true
        break
      }
    }
    if (!matched) {
      tokens.push({ text: remaining[0], color: '#c8cad4' })
      remaining = remaining.slice(1)
    }
  }

  return tokens
}

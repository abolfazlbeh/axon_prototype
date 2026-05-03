import type React from 'react'

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
}

export function CodeBlock({ language, code, caption }: CodeProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-xl overflow-hidden border border-[#1e2130]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#0d0e13] border-b border-[#1e2130]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#1e2130]" />
            <span className="w-3 h-3 rounded-full bg-[#1e2130]" />
            <span className="w-3 h-3 rounded-full bg-[#1e2130]" />
          </div>
          <span className="text-xs text-[#3a3f52] font-mono uppercase tracking-wider">
            {LANGUAGE_LABELS[language] ?? language}
          </span>
        </div>
        <pre className="bg-[#13151c] p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="font-mono text-[#c8cad4]">{colorize(code, language)}</code>
        </pre>
      </div>
      {caption && (
        <p className="text-xs text-[#6b7280] italic">{caption}</p>
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

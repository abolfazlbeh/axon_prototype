import type React from 'react'

interface TextProps {
  body: string
}

function renderInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#f0f1f5] font-semibold">$1</strong>')
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-[#1e2130] rounded text-[#6c63ff] text-sm font-mono">$1</code>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

export function TextBlock({ body }: TextProps) {
  const lines = body.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-[#f0f1f5] mt-4 mb-2 first:mt-0">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(
        <p key={i} className="font-semibold text-[#f0f1f5] mt-3 mb-1" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }} />
      )
    } else if (line.startsWith('- ')) {
      const items: string[] = [line.slice(2)]
      while (i + 1 < lines.length && lines[i + 1].startsWith('- ')) {
        i++
        items.push(lines[i].slice(2))
      }
      elements.push(
        <ul key={i} className="space-y-1.5 my-2 pl-4">
          {items.map((item, j) => (
            <li key={j} className="flex gap-2 text-[#c8cad4] leading-relaxed">
              <span className="text-[#6c63ff] mt-1.5 shrink-0 text-xs">▸</span>
              <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }} />
            </li>
          ))}
        </ul>
      )
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="border-[#1e2130] my-4" />)
    } else if (line.trim() === '') {
      // skip blank lines (handled by spacing)
    } else {
      elements.push(
        <p key={i} className="text-[#c8cad4] leading-relaxed mb-3 last:mb-0" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }} />
      )
    }
    i++
  }

  return <div className="text-base">{elements}</div>
}

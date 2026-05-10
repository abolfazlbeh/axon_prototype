import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

/**
 * Renders GFM Markdown as readable slide prose with word-wrap (no raw monospace block).
 */
export function MarkdownContent({ children }: { children: string }) {
  return (
    <div
      className="markdown-slide min-w-0 max-w-full text-sm text-[#c8cad4] leading-relaxed
        [&_a]:text-[#a78bfa] [&_a]:underline [&_a]:decoration-[#6c63ff]/40 [&_a]:underline-offset-2
        [&_del]:text-[#6b7280]"
    >
      <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {children}
      </Markdown>
    </div>
  )
}

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-[#f0f1f5] mt-2 mb-3 first:mt-0 break-words">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-[#f0f1f5] mt-4 mb-2 first:mt-0 break-words">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-[#f0f1f5] mt-3 mb-2 first:mt-0 break-words">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 break-words [overflow-wrap:anywhere]">{children}</p>
  ),
  strong: ({ children }) => <strong className="font-semibold text-[#f0f1f5]">{children}</strong>,
  em: ({ children }) => <em className="italic text-[#c8cad4]">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-3 ml-4 list-disc space-y-1.5 text-[#c8cad4] marker:text-[#6c63ff] [&_ol]:my-2 [&_ul]:my-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 ml-5 list-decimal space-y-2 text-[#c8cad4] marker:text-[#6c63ff] [&_ol]:my-2 [&_ul]:my-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="break-words [overflow-wrap:anywhere] [&>p]:mb-1 [&>p:last-child]:mb-0">{children}</li>
  ),
  hr: () => <hr className="my-4 border-[#1e2130]" />,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-[#6c63ff]/40 pl-4 text-[#9ca3af] italic [overflow-wrap:anywhere]">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-4 w-full max-w-full overflow-x-auto rounded-lg border border-[#1e2130]">
      <table className="w-full min-w-0 border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#0d0e13] text-[#f0f1f5]">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-[#1e2130]">{children}</tr>,
  th: ({ children }) => (
    <th className="border-b border-[#1e2130] px-2.5 py-2 align-top text-xs font-semibold uppercase tracking-wide text-[#c8cad4] sm:px-3 break-words [overflow-wrap:anywhere]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[#1e2130] px-2.5 py-2 align-top text-[#c8cad4] sm:px-3 break-words [overflow-wrap:anywhere]">
      {children}
    </td>
  ),
  pre: ({ children }) => (
    <pre className="my-3 max-w-full rounded-lg border border-[#1e2130] bg-[#0d0e13] p-3 text-sm leading-relaxed whitespace-pre-wrap break-words">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = Boolean(className?.startsWith('language-'))
    if (!isBlock) {
      return (
        <code
          className="rounded bg-[#1e2130] px-1.5 py-0.5 font-mono text-[#6c63ff] text-[0.92em] break-words [overflow-wrap:anywhere]"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={`font-mono text-[#c8cad4] ${className ?? ''}`} {...props}>
        {children}
      </code>
    )
  },
}

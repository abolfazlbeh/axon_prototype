interface HtmlCssBlockProps {
  html: string
  caption?: string
}

export function HtmlCssBlock({ html, caption }: HtmlCssBlockProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex-1 rounded-xl overflow-hidden bg-[#13151c] border border-[#1e2130] min-h-[220px] flex items-stretch">
        <div
          className="w-full h-full [&_*]:box-border"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {caption && (
        <p className="text-xs text-[#6b7280] text-center italic">{caption}</p>
      )}
    </div>
  )
}

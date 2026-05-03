interface HeadingProps {
  title: string
  subtitle?: string
}

export function HeadingBlock({ title, subtitle }: HeadingProps) {
  return (
    <div className="space-y-1">
      {subtitle && (
        <p className="text-xs font-medium tracking-widest uppercase text-[#6c63ff]">{subtitle}</p>
      )}
      <h1 className="text-3xl font-bold text-[#f0f1f5] leading-tight tracking-tight">{title}</h1>
    </div>
  )
}

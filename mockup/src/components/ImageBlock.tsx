interface ImageProps {
  url: string
  alt: string
  caption?: string
}

export function ImageBlock({ url, alt, caption }: ImageProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex-1 rounded-xl overflow-hidden bg-[#13151c] border border-[#1e2130]">
        <img
          src={url}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="text-xs text-[#6b7280] text-center italic">{caption}</p>
      )}
    </div>
  )
}

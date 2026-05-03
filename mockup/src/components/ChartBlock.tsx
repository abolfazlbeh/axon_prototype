import { VegaEmbed } from 'react-vega'
import type { VisualizationSpec } from 'vega-embed'

interface ChartProps {
  spec: object
  caption?: string
}

export function ChartBlock({ spec, caption }: ChartProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-xl overflow-hidden bg-[#13151c] border border-[#1e2130] p-3">
        <VegaEmbed spec={spec as VisualizationSpec} />
      </div>
      {caption && (
        <p className="text-xs text-[#6b7280] text-center italic">{caption}</p>
      )}
    </div>
  )
}

import type { ReactNode } from 'react'
import type { LayoutTemplate } from '../data/curriculum'

interface LayoutProps {
  template: LayoutTemplate
  regions: Record<string, ReactNode>
}

export function SlideLayout({ template, regions }: LayoutProps) {
  switch (template) {
    case 'single-col':
      return (
        <div className="h-full flex flex-col gap-6">
          {regions.main}
        </div>
      )

    case 'two-col':
      return (
        <div className="h-full grid grid-cols-2 gap-6">
          <div className="overflow-auto">{regions.left}</div>
          <div className="overflow-auto">{regions.right}</div>
        </div>
      )

    case 'two-col-right-split':
      return (
        <div className="h-full grid grid-cols-2 gap-6">
          <div className="overflow-auto">{regions.left}</div>
          <div className="grid grid-rows-2 gap-4">
            <div className="overflow-auto">{regions['right-top']}</div>
            <div className="overflow-auto">{regions['right-bottom']}</div>
          </div>
        </div>
      )

    case 'two-col-left-split':
      return (
        <div className="h-full grid grid-cols-2 gap-6">
          <div className="grid grid-rows-2 gap-4">
            <div className="overflow-auto">{regions['left-top']}</div>
            <div className="overflow-auto">{regions['left-bottom']}</div>
          </div>
          <div className="overflow-auto">{regions.right}</div>
        </div>
      )

    case 'stacked-vertical':
      return (
        <div className="h-full flex flex-col gap-5">
          {regions.top && <div>{regions.top}</div>}
          {regions.middle && <div className="flex-1 overflow-auto">{regions.middle}</div>}
          {regions.bottom && <div>{regions.bottom}</div>}
        </div>
      )

    default:
      return <div className="h-full">{Object.values(regions)}</div>
  }
}

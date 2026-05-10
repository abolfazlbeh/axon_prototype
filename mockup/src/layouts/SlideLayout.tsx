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
        <div className="flex w-full min-w-0 flex-col gap-6">
          {regions.main}
        </div>
      )

    case 'two-col':
      return (
        <div className="grid w-full min-w-0 grid-cols-2 gap-6 items-start">
          <div className="min-w-0">{regions.left}</div>
          <div className="min-w-0">{regions.right}</div>
        </div>
      )

    case 'two-col-right-split':
      return (
        <div className="grid w-full min-w-0 grid-cols-2 gap-6 items-start">
          <div className="min-w-0">{regions.left}</div>
          <div className="flex min-w-0 flex-col gap-4">
            {regions['right-top']}
            {regions['right-bottom']}
          </div>
        </div>
      )

    case 'two-col-left-split':
      return (
        <div className="grid w-full min-w-0 grid-cols-2 gap-6 items-start">
          <div className="flex min-w-0 flex-col gap-4">
            {regions['left-top']}
            {regions['left-bottom']}
          </div>
          <div className="min-w-0">{regions.right}</div>
        </div>
      )

    case 'stacked-vertical':
      return (
        <div className="flex w-full min-w-0 flex-col gap-5">
          {regions.top && <div className="min-w-0">{regions.top}</div>}
          {regions.middle && <div className="min-w-0">{regions.middle}</div>}
          {regions.bottom && <div className="min-w-0">{regions.bottom}</div>}
        </div>
      )

    default:
      return <div className="w-full min-w-0">{Object.values(regions)}</div>
  }
}

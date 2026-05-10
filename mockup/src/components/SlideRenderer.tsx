import type { Slide, SlideContent } from '../data/curriculum'
import { SlideLayout } from '../layouts/SlideLayout'
import { HeadingBlock } from './HeadingBlock'
import { TextBlock } from './TextBlock'
import { ImageBlock } from './ImageBlock'
import { ChartBlock } from './ChartBlock'
import { CodeBlock } from './CodeBlock'
import { QuizBlock } from './QuizBlock'
import { DiagramBlock } from './DiagramBlock'
import { AudioBlock } from './AudioBlock'
import { VideoBlock } from './VideoBlock'
import { HtmlCssBlock } from './HtmlCssBlock'
import { HtmlQuizBlock } from './HtmlQuizBlock'

interface SlideRendererProps {
  slide: Slide
  onQuizAnswer?: (slideId: string, correct: boolean) => void
}

function renderContent(
  content: SlideContent,
  slideId: string,
  onQuizAnswer?: (slideId: string, correct: boolean) => void,
) {
  switch (content.type) {
    case 'heading':
      return <HeadingBlock {...content.props} />
    case 'text':
      return <TextBlock {...content.props} />
    case 'image':
      return <ImageBlock {...content.props} />
    case 'chart':
      return <ChartBlock {...content.props} />
    case 'code':
      return <CodeBlock {...content.props} />
    case 'quiz':
      return (
        <QuizBlock
          {...content.props}
          onAnswer={(correct) => onQuizAnswer?.(slideId, correct)}
        />
      )
    case 'diagram':
      return <DiagramBlock {...content.props} />
    case 'audio':
      return <AudioBlock {...content.props} />
    case 'video':
      return <VideoBlock {...content.props} />
    case 'htmlcss':
      return <HtmlCssBlock {...content.props} />
    case 'htmlquiz':
      return (
        <HtmlQuizBlock
          {...content.props}
          onAnswer={(correct) => onQuizAnswer?.(slideId, correct)}
        />
      )
    default:
      return null
  }
}

export function SlideRenderer({ slide, onQuizAnswer }: SlideRendererProps) {
  const regions: Record<string, React.ReactNode> = {}

  for (const [regionKey, contentId] of Object.entries(slide.layout.regions)) {
    const content = slide.content[contentId]
    if (content) {
      regions[regionKey] = renderContent(content, slide.id, onQuizAnswer)
    }
  }

  return <SlideLayout template={slide.layout.template} regions={regions} />
}

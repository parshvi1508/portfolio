import type { Metadata } from 'next'
import { CASE_STUDIES } from '@/lib/data'
import { CaseStudyLayout } from '@/components/work/CaseStudyLayout'

export const metadata: Metadata = {
  title: 'XAI Forensics',
  description: CASE_STUDIES['xai-forensics'].tagline,
}

export default function XAIForensicsPage() {
  const data = CASE_STUDIES['xai-forensics']
  return (
    <CaseStudyLayout
      data={{
        name: 'XAI Forensics',
        ...data,
        stack: data.stack,
      }}
    />
  )
}

import type { Metadata } from 'next'
import { CASE_STUDIES } from '@/lib/data'
import { CaseStudyLayout } from '@/components/work/CaseStudyLayout'

export const metadata: Metadata = {
  title: 'Trurism Backend',
  description: CASE_STUDIES['trurism'].tagline,
}

export default function TrurismsPage() {
  const data = CASE_STUDIES['trurism']
  return (
    <CaseStudyLayout
      data={{
        name: 'Trurism Backend',
        ...data,
        stack: data.stack,
      }}
    />
  )
}

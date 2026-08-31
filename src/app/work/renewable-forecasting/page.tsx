import type { Metadata } from 'next'
import { CASE_STUDIES } from '@/lib/data'
import { CaseStudyLayout } from '@/components/work/CaseStudyLayout'

export const metadata: Metadata = {
  title: 'Pan-India Renewable Forecasting',
  description: CASE_STUDIES['renewable-forecasting'].tagline,
}

export default function RenewableForecastingPage() {
  const data = CASE_STUDIES['renewable-forecasting']
  return (
    <CaseStudyLayout
      data={{
        name: 'Pan-India Renewable Forecasting',
        ...data,
        stack: data.stack,
      }}
    />
  )
}

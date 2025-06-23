'use client'

import { Suspense } from 'react'
import StatisticsPageContent from './statistics-content'

export default function StatisticsPage() {
  return (
    <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
      <StatisticsPageContent />
    </Suspense>
  )
}

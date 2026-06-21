import { SkeletonBlock } from '@/components/ui/SkeletonBlock'

export function SkeletonLoader() {
  return (
    <div className="space-y-6" aria-label="Loading results" aria-busy="true">
      {/* Token attributions skeleton */}
      <div className="p-5 rounded-xl border border-border bg-sunken space-y-3">
        <SkeletonBlock height="h-3" className="w-32" />
        <div className="flex flex-wrap gap-2 mt-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonBlock key={i} height="h-7" className="w-16 rounded-md" />
          ))}
        </div>
      </div>

      {/* Counterfactual skeleton */}
      <div className="p-5 rounded-xl border border-border bg-sunken space-y-3">
        <SkeletonBlock height="h-3" className="w-28" />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <SkeletonBlock height="h-16" className="rounded-lg" />
          <SkeletonBlock height="h-16" className="rounded-lg" />
        </div>
      </div>

      {/* Model divergence skeleton */}
      <div className="p-5 rounded-xl border border-border bg-sunken space-y-3">
        <SkeletonBlock height="h-3" className="w-36" />
        <SkeletonBlock height="h-4" className="w-full mt-3 rounded-full" />
        <SkeletonBlock height="h-4" className="w-3/4 rounded-full" />
      </div>
    </div>
  )
}

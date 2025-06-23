'use client'

import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="grid gap-4">

      {/* Skeleton Badge 1 */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md animate-pulse">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>

      {/* Skeleton Badge 2 */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md animate-pulse">
        <Skeleton className="h-5 w-1/3" />
      </div>

      {/* Skeleton Badge 3 */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md animate-pulse">
        <Skeleton className="h-5 w-1/3" />
      </div>

      {/* Skeleton Badge 4 */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md animate-pulse">
        <Skeleton className="h-5 w-1/2 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      {/* Skeleton Badge 5 */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md animate-pulse">
        <Skeleton className="h-5 w-1/4 mx-auto" />
      </div>

      {/* Skeleton Badge 6 (Track list) */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-md animate-pulse space-y-3">
        <Skeleton className="h-5 w-1/3 mb-2" />
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
      </div>

    </div>
  )
}

import type { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-[#c9a8f1]/30 ${className}`}
      {...props}
    />
  );
}

export function EventCardSkeleton() {
  return (
    <div
      aria-label="Loading event"
      role="status"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#c9a8f1]/25 bg-white"
    >
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Skeleton className="mb-3 h-6 w-3/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-5 h-4 w-5/6" />
        <div className="mt-auto space-y-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#c9a8f1]/25 pt-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

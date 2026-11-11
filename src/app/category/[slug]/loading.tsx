import React from 'react';

const loading = () => {
    return (
        <main className="min-h-screen animate-pulse bg-[#f0f5f0]">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">

        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-3 w-10 rounded bg-gray-200" />
          <div className="h-3 w-3 rounded bg-gray-200" />
          <div className="h-3 w-16 rounded bg-gray-200" />
        </div>

        {/* Category Header Skeleton */}
        <section className="flex items-center gap-4 rounded-xl border border-[#e3eae4] bg-white p-5 sm:p-6">
          <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" />

          <div className="flex-1 space-y-2">
            <div className="h-6 w-32 rounded bg-gray-200" />
            <div className="h-3 w-48 max-w-full rounded bg-gray-200" />
          </div>
        </section>

        {/* Toolbar Skeleton */}
        <section className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-[#e3eae4] bg-white p-4">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="h-9 w-28 rounded-lg bg-gray-200" />
        </section>

        {/* Product Count */}
        <div className="mt-4 h-3 w-40 rounded bg-gray-200" />

        {/* Product Cards Skeleton */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#e3eae4] bg-white p-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-lg bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-end justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                  <div className="h-6 w-24 rounded bg-gray-200" />
                </div>

                <div className="h-6 w-12 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
    );
};

export default loading;
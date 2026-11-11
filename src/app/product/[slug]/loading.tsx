
export default function ProductLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f0f5f0]">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-5 sm:px-5 lg:px-6">

        {/* Breadcrumb */}
        <div className="mb-6 flex gap-3">
          <div className="h-3 w-10 rounded bg-gray-200" />
          <div className="h-3 w-3 rounded bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>

        {/* Product Header */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#e2eae3] bg-white p-5">

          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-gray-200" />

            <div className="space-y-3">
              <div className="h-6 w-36 rounded bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-3 w-48 max-w-full rounded bg-gray-200" />
            </div>
          </div>

          <div className="hidden h-24 w-24 rounded-xl bg-gray-200 sm:block" />

        </div>

        {/* Price Summary */}
        <div className="rounded-xl border border-[#e2eae3] bg-white p-5">

          <div className="mb-4 h-4 w-32 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="space-y-3 rounded-xl border border-gray-100 p-4"
              >
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-6 w-24 rounded bg-gray-200" />
                <div className="h-3 w-28 rounded bg-gray-200" />
              </div>
            ))}
          </div>

        </div>

        {/* Market Table */}
        <div className="rounded-xl border border-[#e2eae3] bg-white p-5">

          <div className="mb-5 h-4 w-40 rounded bg-gray-200" />

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3"
              >
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}

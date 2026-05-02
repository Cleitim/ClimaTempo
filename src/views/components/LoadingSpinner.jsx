export default function LoadingSpinner() {
  return (
    <div className="w-full max-w-lg mx-auto space-y-4 animate-pulse">
      <div className="h-36 rounded-2xl bg-white/20" />
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-28 flex-1 rounded-xl bg-white/20" />
        ))}
      </div>
    </div>
  )
}

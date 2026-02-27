export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="relative w-20 h-20">
        <div className="w-full h-full border-4 border-cyan-400/10 border-t-cyan-400 rounded-full animate-spin" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-cyan-400 animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}

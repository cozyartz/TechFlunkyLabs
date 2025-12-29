// Temporary placeholder until Three.js SSR is fixed
export default function NotFound3D() {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <div className="w-32 h-32 rounded-2xl bg-black border-4 border-[#e0ff00] flex items-center justify-center animate-pulse glow">
        <span className="text-[#e0ff00] text-5xl font-bold">404</span>
      </div>
    </div>
  );
}

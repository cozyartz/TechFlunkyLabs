// Temporary placeholder until Three.js SSR is fixed
export default function Logo3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-2xl bg-black border-4 border-[#e0ff00] flex items-center justify-center animate-pulse glow">
        <span className="text-[#e0ff00] text-6xl font-bold gradient-text">TF</span>
      </div>
    </div>
  );
}

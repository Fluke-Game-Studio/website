export default function InteractiveGrid() {

  return (
    <div className="absolute inset-0 z-0">
      {/* Base Grid Layer */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-1 h-20 bg-gradient-to-b from-fluke-yellow/40 to-transparent" />
        <div className="absolute top-20 left-20 w-20 h-1 bg-gradient-to-r from-fluke-yellow/40 to-transparent" />
        
        <div className="absolute bottom-20 right-20 w-1 h-20 bg-gradient-to-t from-fluke-yellow/40 to-transparent" />
        <div className="absolute bottom-20 right-20 w-20 h-1 bg-gradient-to-l from-fluke-yellow/40 to-transparent" />
      </div>
    </div>
  );
}

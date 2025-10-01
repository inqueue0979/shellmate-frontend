import Particles from "@/components/Particles";

export default function Main() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      {/* Main Content */}
      <div className="relative w-full h-full">
        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-black text-black mb-2 tracking-tight">
              shellmate
            </h1>
            <p className="text-xl md:text-2xl text-black font-medium">
              느린학습자 동행메이트, <span className=" font-bold">셸메이트</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
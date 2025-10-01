import Particles from "@/components/Particles";

export default function Main() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white" style={{ margin: 0, padding: 0 }}>
      {/* Main Content */}
      <div className="relative w-full h-full z-0 bg-black">
        {/* Particles Background */}
        <div className="absolute inset-0 w-full h-full z-20">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={300}
            particleSpread={8}
            speed={0.05}
            particleBaseSize={100}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-30">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tight">
              shellmate
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium">
              느린학습자 동행메이트
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
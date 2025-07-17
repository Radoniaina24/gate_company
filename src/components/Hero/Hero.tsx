"use client";
const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center bg-center bg-cover pt-16 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dbpoyo4gw/image/upload/v1748266907/banni%C3%A8re_vivj4x.jpg')",
      }}
    >
      {/* Overlay avec dégradé amélioré */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60 z-0"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center"></div>
      </div>
    </section>
  );
};

export default HeroSection;

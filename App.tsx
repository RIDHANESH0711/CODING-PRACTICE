import { useState, useEffect } from "react";
import { PLACES, type PlaceData } from "./data";

// ── SVG Map path — computed from geographic lat/lon coordinates
// x = (lon - 76.1) * 90 + 15,  y = (13.75 - lat) * 93
const TN_PATH = `
  M 159,32
  L 188,37 206,51 233,56 289,37 329,56
  L 390,62
  L 388,88 383,105 390,135
  L 349,169 344,186 345,209
  L 351,241 352,273 350,307 352,323
  L 309,358 298,395
  L 213,441 180,460 177,488 131,516 126,527
  L 108,517 104,488 99,468
  L 95,441 81,404 67,376
  L 63,339 61,305
  L 54,275 51,249 57,226
  L 69,198 81,170 90,161 99,147
  L 117,133 144,115 158,96
  L 206,70 197,51 159,32 Z
`;

// Category colours
const CAT_COLORS: Record<string, string> = {
  "Metro City":       "#C8982A",
  "UNESCO Heritage":  "#C0392B",
  "Union Territory":  "#1A4A6B",
  "Temple Town":      "#7C3AED",
  "Hill Station":     "#1A5C1A",
  "Heritage City":    "#5C3A1A",
  "Pilgrimage":       "#8B3D00",
  "Coastal Wonder":   "#1A3A5C",
  "Industrial City":  "#2B4A1A",
  "Temple City":      "#6B2B00",
  "Palani Hills":     "#1A5C3D",
  "Pearl City":       "#1A4A5C",
  "Halwa City":       "#5C3A1A",
  "Sacred Hill":      "#8B3D00",
  "Fort City":        "#3D1A5C",
  "French Quarter":   "#1A3D5C",
  "Cosmic Dance":     "#5C2A00",
  "Steel City":       "#3D5C1A",
  "Rock Fort":        "#5C3A1A",
  "Delta Town":       "#5C2A00",
};

function getPlaceColor(place: PlaceData) {
  // use the place's own brand color
  return place.color;
}

// Particle component
function Particle({ left, dur, delay }: { left: string; dur: string; delay: string }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left,
        bottom: 0,
        backgroundColor: "#C8982A",
        animation: `particleFloat ${dur} ease-in-out ${delay} infinite`,
      }}
    />
  );
}

export default function App() {
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function openPlace(place: PlaceData) {
    setSelectedPlace(place);
    setActiveTab("overview");
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#1A0E00", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes particleFloat {
          0%   { transform: translateY(0) scale(0); opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        .scroll-bounce { animation: bounce 2s ease-in-out infinite; }
        .pin-hover:hover .pin-dot { r: 10; }
        ::-webkit-scrollbar { width: 0; }
        .panel-scroll::-webkit-scrollbar { width: 4px; }
        .panel-scroll::-webkit-scrollbar-track { background: #F5EDD8; }
        .panel-scroll::-webkit-scrollbar-thumb { background: #C8982A55; border-radius: 4px; }
        .tab-active { color: #C0392B; border-bottom: 2px solid #C0392B; }
        .tab-inactive { color: #6B5535; border-bottom: 2px solid transparent; }
        .highlight-card:hover { transform: translateY(-4px); border-color: #C8982A !important; }
        .pin-label-bg { pointer-events: none; }
      `}</style>

      {/* ── OVERLAY ── */}
      {panelOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={closePanel}
        />
      )}

      {/* ── SLIDE-IN PANEL ── */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width: "min(540px, 100vw)",
          background: "#FFFFFF",
          boxShadow: "-12px 0 60px rgba(0,0,0,0.3)",
          transform: panelOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          overflowY: "auto",
        }}
      >
        {selectedPlace && (
          <>
            {/* Panel Hero */}
            <div
              className="relative flex-shrink-0"
              style={{
                height: 240,
                background: `linear-gradient(135deg, ${selectedPlace.color} 0%, ${selectedPlace.color}88 100%)`,
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(26,14,0,0.75) 0%, transparent 55%)" }} />
              <button
                onClick={closePanel}
                className="absolute top-4 right-4 z-10 flex items-center justify-center"
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white", fontSize: 18, cursor: "pointer",
                }}
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6 right-16">
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#C8982A", marginBottom: 6 }}>
                  {selectedPlace.region}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1 }}>
                  {selectedPlace.emoji} {selectedPlace.name}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "flex", background: "#1A0E00" }}>
              {selectedPlace.stats.map((s, i) => (
                <div key={i} style={{ flex: 1, padding: "16px 12px", textAlign: "center", borderRight: i < selectedPlace.stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#C8982A", display: "block" }}>{s.value}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,248,237,0.5)", marginTop: 2, display: "block" }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Panel Body */}
            <div style={{ padding: "24px 28px 0", flex: 1 }} className="panel-scroll">
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#6B5535", marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #F5EDD8" }}>
                {selectedPlace.desc}
              </p>

              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: "2px solid #F5EDD8", overflowX: "auto", marginBottom: 24, scrollbarWidth: "none" }}>
                {[
                  { id: "overview", label: "Overview" },
                  { id: "travel",   label: "Getting There" },
                  { id: "food",     label: "Food & Taste" },
                  { id: "hotels",   label: "Stay" },
                  { id: "map",      label: "Location" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={activeTab === tab.id ? "tab-active" : "tab-inactive"}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13, fontWeight: 500,
                      padding: "10px 16px",
                      border: "none", background: "none",
                      cursor: "pointer", whiteSpace: "nowrap",
                      marginBottom: -2, transition: "all 0.2s",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab: Overview */}
              {activeTab === "overview" && (
                <div style={{ paddingBottom: 40 }}>
                  {selectedPlace.overview.map((o, i) => (
                    <div key={i} style={{ background: "#F5EDD8", borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#C8982A", marginBottom: 5 }}>{o.label}</div>
                      <div style={{ fontSize: 14, color: "#2C1A08", fontWeight: 500, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: o.value }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Travel */}
              {activeTab === "travel" && (
                <div style={{ paddingBottom: 40 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
                    {selectedPlace.travel.map((t, i) => (
                      <div key={i} style={{ background: "#F5EDD8", borderRadius: 12, padding: "16px 10px", textAlign: "center" }}>
                        <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{t.icon}</span>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: "#2C1A08", marginBottom: 4 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: "#6B5535", lineHeight: 1.4 }}>{t.detail}</div>
                      </div>
                    ))}
                  </div>
                  {selectedPlace.travelExtra.map((e, i) => (
                    <div key={i} style={{ background: "#F5EDD8", borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#C8982A", marginBottom: 5 }}>{e.label}</div>
                      <div style={{ fontSize: 14, color: "#2C1A08", fontWeight: 500 }}>{e.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Food */}
              {activeTab === "food" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingBottom: 40 }}>
                  {selectedPlace.food.map((f, i) => (
                    <div key={i} style={{ background: "#F5EDD8", borderRadius: 10, padding: 14, display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: 28, flexShrink: 0 }}>{f.emoji}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#2C1A08", marginBottom: 3 }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: "#6B5535", lineHeight: 1.35 }}>{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Hotels */}
              {activeTab === "hotels" && (
                <div style={{ paddingBottom: 40 }}>
                  {selectedPlace.hotels.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 16, background: "#F5EDD8", borderRadius: 12, marginBottom: 10 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: "#C8982A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{h.icon}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#2C1A08", marginBottom: 3 }}>{h.name}</div>
                        <div style={{ fontSize: 12, color: "#6B5535", lineHeight: 1.4, marginBottom: 3 }}>{h.detail}</div>
                        <div style={{ color: "#C8982A", fontSize: 11 }}>{h.stars}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Location */}
              {activeTab === "map" && (
                <div style={{ paddingBottom: 40 }}>
                  <div
                    style={{ background: "linear-gradient(135deg, #E8D5B0, #D4BC8A)", borderRadius: 12, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 14 }}
                  >
                    <span style={{ fontSize: 40, marginBottom: 8 }}>🗺️</span>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#2C1A08" }}>{selectedPlace.name}</div>
                    <div style={{ fontSize: 13, color: "#6B5535", marginTop: 4 }}>{selectedPlace.coords}</div>
                  </div>
                  <a
                    href={selectedPlace.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#C0392B", color: "white", textDecoration: "none", padding: "13px 20px", borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}
                  >
                    <span>📍</span> Open in Google Maps
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── HERO SECTION ── */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center"
        style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0D0600 0%, #1A0E00 40%, #2C1508 100%)" }}
      >
        {/* Kolam border top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #C0392B, #C8982A, #C0392B, #C8982A, #C0392B)" }} />

        {/* Radial glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200,152,42,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Particles */}
        {mounted && ["10%","22%","40%","58%","72%","88%"].map((left, i) => (
          <Particle key={i} left={left} dur={`${6 + i * 1.2}s`} delay={`${i * 0.8}s`} />
        ))}

        <div className="relative z-10 text-center px-5">
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, letterSpacing: 5, textTransform: "uppercase", color: "#C8982A", marginBottom: 24, opacity: 0.9 }}>
            Incredible India · Tamil Nadu
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(56px, 9vw, 112px)", fontWeight: 900, lineHeight: 0.92, color: "#FFF8ED", marginBottom: 8 }}>
            Tamil<br />
            <span style={{ color: "#C8982A", fontStyle: "italic" }}>Nadu</span>
          </h1>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 400, fontStyle: "italic", color: "#E8B84B", opacity: 0.82, marginBottom: 28, letterSpacing: 2 }}>
            Land of Temples & Heritage
          </div>
          <p style={{ fontSize: 16, color: "rgba(255,248,237,0.6)", maxWidth: 460, margin: "0 auto 52px", lineHeight: 1.75, fontWeight: 300 }}>
            Dravidian temples touching the sky, silk woven with gold threads, coastlines stretching endlessly — explore a civilisation 2,500 years deep across {PLACES.length} destinations.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 56 }}>
            {[
              { v: PLACES.length.toString(), l: "Destinations" },
              { v: "4", l: "UNESCO Sites" },
              { v: "880 km", l: "Coastline" },
              { v: "2,500+", l: "Years of History" },
            ].map(({ v, l }) => (
              <div key={l} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "#C8982A", display: "block" }}>{v}</span>
                <span style={{ fontSize: 13, color: "rgba(255,248,237,0.5)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>{l}</span>
              </div>
            ))}
          </div>

          <div
            className="scroll-bounce"
            onClick={() => document.getElementById("map-sec")?.scrollIntoView({ behavior: "smooth" })}
            style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#C8982A", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer" }}
          >
            <span>Explore the Map</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section id="map-sec" style={{ background: "#FFF8ED", padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#C8982A", marginBottom: 12 }}>Interactive Map</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#1A0E00", lineHeight: 1.1 }}>
            Tap a city to <em style={{ color: "#C0392B", fontStyle: "italic" }}>explore</em>
          </h2>
          <p style={{ marginTop: 12, fontSize: 15, color: "#6B5535", maxWidth: 500, margin: "12px auto 0" }}>
            Touch any highlighted destination on the map to discover attractions, food, travel routes, and places to stay.
          </p>
        </div>

        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #EDD9B5, #F5EDD8)",
              borderRadius: 24,
              padding: "40px 30px",
              boxShadow: "0 8px 40px rgba(26,14,0,0.18), inset 0 0 0 2px rgba(200,152,42,0.28)",
            }}
          >
            <div style={{ maxWidth: 520, margin: "0 auto", position: "relative" }}>
              <svg
                viewBox="0 0 440 560"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 4px 24px rgba(26,14,0,0.15))" }}
              >
                <defs>
                  <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D9C49A" />
                    <stop offset="100%" stopColor="#C4A878" />
                  </linearGradient>
                  <linearGradient id="seaGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A8C8E8" />
                    <stop offset="100%" stopColor="#7BACD4" />
                  </linearGradient>
                  <filter id="mapGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* Sea background */}
                <rect width="440" height="560" fill="url(#seaGrad)" rx="16" />

                {/* Wave lines */}
                {Array.from({ length: 10 }, (_, i) => (
                  <path
                    key={i}
                    d={`M 0 ${50 + i * 52} Q 110 ${44 + i * 52} 220 ${50 + i * 52} T 440 ${50 + i * 52}`}
                    fill="none" stroke="#5B96C2" strokeWidth="0.6" opacity="0.35"
                  />
                ))}

                {/* Sea labels */}
                <text x="428" y="190" fontSize="8" fill="#2A6496" opacity="0.7" transform="rotate(90,428,190)" textAnchor="middle" fontFamily="'Space Grotesk', monospace" letterSpacing="2">BAY OF BENGAL</text>
                <text x="22" y="360" fontSize="8" fill="#2A6496" opacity="0.7" transform="rotate(-90,22,360)" textAnchor="middle" fontFamily="'Space Grotesk', monospace" letterSpacing="2">ARABIAN SEA</text>
                <text x="160" y="548" fontSize="7.5" fill="#2A6496" opacity="0.7" textAnchor="middle" fontFamily="'Space Grotesk', monospace" letterSpacing="2">INDIAN OCEAN</text>

                {/* Tamil Nadu — realistic outline */}
                <path
                  d={TN_PATH}
                  fill="url(#landGrad)"
                  stroke="#8B6914"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* River lines (Cauvery & tributaries) */}
                <path d="M 115 140 Q 145 165 165 185 Q 185 205 190 230 Q 195 255 220 270 Q 248 285 260 300" stroke="#5B96C2" strokeWidth="1.4" fill="none" opacity="0.55" strokeDasharray="5,4" />
                <path d="M 90 270 Q 115 285 140 295 Q 165 305 185 300 Q 205 295 230 300" stroke="#5B96C2" strokeWidth="1" fill="none" opacity="0.45" strokeDasharray="4,3" />
                <path d="M 95 380 Q 130 390 155 400 Q 185 410 200 420" stroke="#5B96C2" strokeWidth="0.9" fill="none" opacity="0.4" strokeDasharray="4,3" />

                {/* Rameswaram island connector (dotted) */}
                {PLACES.find(p => p.id === "rameswaram") && (
                  <line x1="298" y1="395" x2="315" y2="418" stroke="#8B6914" strokeWidth="1.2" strokeDasharray="4,3" opacity="0.7" />
                )}

                {/* City pins */}
                {PLACES.map(place => {
                  const isHovered = hoveredId === place.id;
                  const isSelected = selectedPlace?.id === place.id && panelOpen;
                  const active = isHovered || isSelected;

                  // label offset: decide above or below based on position
                  const labelAbove = place.mapY > 490;
                  const labelOffset = labelAbove ? -20 : 18;
                  const nameLen = place.name.length;
                  const rectW = Math.max(nameLen * 6.4 + 14, 52);

                  return (
                    <g
                      key={place.id}
                      className="pin-hover"
                      style={{ cursor: "pointer" }}
                      onClick={() => openPlace(place)}
                      onMouseEnter={() => setHoveredId(place.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Selected ring */}
                      {isSelected && (
                        <circle cx={place.mapX} cy={place.mapY} r="14" fill={place.color} opacity="0.25" />
                      )}
                      {/* Pin dot */}
                      <circle
                        className="pin-dot"
                        cx={place.mapX} cy={place.mapY}
                        r={active ? 9.5 : 7}
                        fill={place.color}
                        stroke="#1A0E00" strokeWidth="1.8"
                        filter="url(#pinShadow)"
                        style={{ transition: "r 0.15s ease" }}
                      />
                      {/* Emoji icon */}
                      <text x={place.mapX} y={place.mapY} fontSize="8" textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: "none", userSelect: "none" }}>
                        {place.emoji}
                      </text>
                      {/* Label */}
                      {active ? (
                        <g className="pin-label-bg">
                          <rect
                            x={place.mapX - rectW / 2} y={place.mapY + labelOffset - 11}
                            width={rectW} height={17} rx={5}
                            fill={place.color}
                          />
                          <text x={place.mapX} y={place.mapY + labelOffset + 1} fontSize="9" fill="white" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" style={{ pointerEvents: "none" }}>
                            {place.name}
                          </text>
                        </g>
                      ) : (
                        <text x={place.mapX} y={place.mapY + 18} fontSize="7.5" fill="#2C1A08" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" style={{ pointerEvents: "none" }}>
                          {place.name}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Compass Rose */}
                <g transform="translate(38, 52)">
                  <circle cx="0" cy="0" r="18" fill="rgba(200,152,42,0.18)" stroke="rgba(200,152,42,0.5)" strokeWidth="1.2" />
                  <text x="0" y="-4" textAnchor="middle" fontSize="13" fill="#C8982A" fontFamily="'Playfair Display', serif" fontWeight="700">N</text>
                  <path d="M0,-13 L2.5,-5 L0,-8 L-2.5,-5 Z" fill="#C8982A" />
                  <line x1="0" y1="5" x2="0" y2="13" stroke="#8B6914" strokeWidth="1" />
                  <line x1="-13" y1="0" x2="13" y2="0" stroke="#8B6914" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24, justifyContent: "center" }}>
              {[
                { color: "#C8982A", label: "Capital & Metro" },
                { color: "#C0392B", label: "UNESCO Heritage" },
                { color: "#1A5C1A", label: "Hill Station" },
                { color: "#1A3A5C", label: "Pilgrimage / Coast" },
                { color: "#5C3A1A", label: "Temple & Heritage" },
                { color: "#6B2B00", label: "Temple City" },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#6B5535", fontFamily: "'Space Grotesk', sans-serif" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: color, border: "2px solid #1A0E00", flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED HIGHLIGHTS GRID ── */}
      <section style={{ background: "#1A0E00", padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#C8982A", marginBottom: 12 }}>Featured Destinations</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#FFF8ED", lineHeight: 1.1 }}>
            Icons of Tamil <em style={{ color: "#C0392B", fontStyle: "italic" }}>Heritage</em>
          </h2>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {PLACES.filter(p => ["chennai","madurai","thanjavur","kanyakumari","ooty","rameswaram","mahabalipuram","pondicherry","kodaikanal","trichy","kanchipuram","tiruvannamalai","dindigul","tirupur","erode"].includes(p.id)).map(place => (
            <div
              key={place.id}
              className="highlight-card"
              onClick={() => { openPlace(place); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,152,42,0.18)",
                borderRadius: 16, padding: 24, cursor: "pointer",
                transition: "all 0.3s",
                position: "relative", overflow: "hidden",
              }}
            >
              <span style={{ fontSize: 34, display: "block", marginBottom: 12 }}>{place.emoji}</span>
              <div style={{ display: "inline-block", fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C8982A", border: "1px solid #C8982A", borderRadius: 20, padding: "3px 10px", marginBottom: 10 }}>
                {place.region.split(" · ")[1] || place.region.split(" · ")[0]}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: "#FFF8ED", marginBottom: 8 }}>{place.name}</div>
              <p style={{ fontSize: 13, color: "rgba(255,248,237,0.5)", lineHeight: 1.6 }}>{place.desc.slice(0, 110)}…</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ALL DESTINATIONS QUICK LIST ── */}
      <section style={{ background: "#F5EDD8", padding: "64px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#C8982A", marginBottom: 12 }}>All {PLACES.length} Destinations</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700, color: "#1A0E00" }}>
              Explore Every Corner of Tamil Nadu
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {PLACES.map(place => (
              <button
                key={place.id}
                onClick={() => { openPlace(place); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                  background: "#FFF8ED", border: "1px solid rgba(200,152,42,0.25)",
                  textAlign: "left", transition: "all 0.2s", fontFamily: "inherit",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C8982A"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,152,42,0.25)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{place.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: "#1A0E00" }}>{place.name}</div>
                  <div style={{ fontSize: 11, color: "#6B5535" }}>{place.region.split(" · ")[0]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0D0600", padding: "40px 20px", textAlign: "center", borderTop: "1px solid rgba(200,152,42,0.15)" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#C8982A", marginBottom: 8 }}>Tamil Nadu Tourism</div>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,248,237,0.3)" }}>
          யாதும் ஊரே யாவரும் கேளிர் — <span style={{ color: "#C8982A" }}>Every land is my homeland, all people are my kin</span>
        </p>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,248,237,0.2)", marginTop: 12 }}>
          Transport timings are indicative. Verify with official sources before travel.
        </p>
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Score {
  name: string;
  score: number;
}

interface GameObject {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Bullet extends GameObject {
  speed: number;
}

interface Meteor extends GameObject {
  speed: number;
  spin: number;
  spinAngle: number;
  hp: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    running: boolean;
    ship: GameObject & { speed: number };
    bullets: Bullet[];
    meteors: Meteor[];
    particles: Particle[];
    score: number;
    lives: number;
    keys: Set<string>;
    lastShot: number;
    lastMeteor: number;
    raf: number;
    level: number;
  } | null>(null);

  const [phase, setPhase] = useState<"name" | "playing" | "gameover">("name");
  const [playerName, setPlayerName] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [liveScore, setLiveScore] = useState(0);
  const [liveLives, setLiveLives] = useState(3);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tma-scores");
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (phase === "gameover") {
      // Trigger glitch effect sequence
      let count = 0;
      const interval = setInterval(() => {
        setGlitchActive((v) => !v);
        count++;
        if (count > 8) clearInterval(interval);
      }, 120);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const saveScore = (name: string, score: number) => {
    const updated = [...leaderboard, { name, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem("tma-scores", JSON.stringify(updated));
  };

  const startGame = () => {
    if (!playerName.trim()) return;
    setPhase("playing");
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const W = canvas.width;
    const H = canvas.height;

    const ship: GameObject & { speed: number } = {
      x: W / 2 - 16,
      y: H - 90,
      w: 32,
      h: 40,
      speed: 5,
    };

    const state = {
      running: true,
      ship,
      bullets: [] as Bullet[],
      meteors: [] as Meteor[],
      particles: [] as Particle[],
      score: 0,
      lives: 3,
      keys: new Set<string>(),
      lastShot: 0,
      lastMeteor: 0,
      raf: 0,
      level: 1,
    };
    stateRef.current = state;

    const onKey = (e: KeyboardEvent) => {
      if (e.type === "keydown") state.keys.add(e.code);
      else state.keys.delete(e.code);
      if (e.code === "Space") e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    const spawnMeteor = () => {
      const size = 20 + Math.random() * 40;
      state.meteors.push({
        x: Math.random() * (W - size),
        y: -size,
        w: size,
        h: size,
        speed: 1.5 + Math.random() * 2 + state.level * 0.3,
        spin: (Math.random() - 0.5) * 0.08,
        spinAngle: 0,
        hp: size > 45 ? 2 : 1,
      });
    };

    const spawnParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        state.particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          size: 2 + Math.random() * 3,
        });
      }
    };

    const checkCollision = (a: GameObject, b: GameObject) =>
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

    const loop = (ts: number) => {
      if (!state.running) return;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#060606";
      ctx.fillRect(0, 0, W, H);

      // Grid overlay
      ctx.strokeStyle = "rgba(231,248,200,0.025)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 40) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 40) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      // Stars
      ctx.fillStyle = "rgba(231,248,200,0.4)";
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 137 + 17) % W);
        const sy = ((i * 91 + 43) % H);
        const size = i % 5 === 0 ? 1.5 : 0.8;
        ctx.fillRect(sx, sy, size, size);
      }

      // HUD frame top
      ctx.strokeStyle = "rgba(231,248,200,0.15)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, W - 20, H - 20);

      // Corner accents
      const co = 10; const cs = 16;
      ctx.strokeStyle = "#e7f8c8";
      ctx.lineWidth = 1.5;
      [[co, co], [W - co, co], [co, H - co], [W - co, H - co]].forEach(([cx, cy], idx) => {
        const dx = idx % 2 === 0 ? 1 : -1;
        const dy = idx < 2 ? 1 : -1;
        ctx.beginPath(); ctx.moveTo(cx, cy + dy * cs); ctx.lineTo(cx, cy); ctx.lineTo(cx + dx * cs, cy); ctx.stroke();
      });

      // Cockpit HUD — score display
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(14, 14, 120, 28);
      ctx.strokeStyle = "rgba(231,248,200,0.2)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(14, 14, 120, 28);
      ctx.fillStyle = "rgba(231,248,200,0.4)";
      ctx.font = "9px monospace";
      ctx.letterSpacing = "2px";
      ctx.fillText("SCORE", 22, 26);
      ctx.fillStyle = "#e7f8c8";
      ctx.font = "bold 11px monospace";
      ctx.fillText(String(state.score).padStart(6, "0"), 22, 37);

      // Lives display
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(W - 134, 14, 120, 28);
      ctx.strokeStyle = "rgba(231,248,200,0.2)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(W - 134, 14, 120, 28);
      ctx.fillStyle = "rgba(231,248,200,0.4)";
      ctx.font = "9px monospace";
      ctx.fillText("SHIELD", W - 126, 26);
      for (let li = 0; li < 3; li++) {
        ctx.fillStyle = li < state.lives ? "#e7f8c8" : "rgba(231,248,200,0.1)";
        ctx.fillRect(W - 126 + li * 22, 30, 14, 8);
      }

      // Level
      ctx.fillStyle = "rgba(231,248,200,0.2)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`LVL ${state.level}`, W / 2, 28);
      ctx.textAlign = "left";

      // Move & shoot
      if (state.keys.has("ArrowLeft") || state.keys.has("KeyA"))
        state.ship.x = Math.max(0, state.ship.x - state.ship.speed);
      if (state.keys.has("ArrowRight") || state.keys.has("KeyD"))
        state.ship.x = Math.min(W - state.ship.w, state.ship.x + state.ship.speed);
      if ((state.keys.has("Space") || state.keys.has("ArrowUp")) && ts - state.lastShot > 200) {
        state.bullets.push({
          x: state.ship.x + state.ship.w / 2 - 2,
          y: state.ship.y,
          w: 4,
          h: 12,
          speed: 10,
        });
        state.lastShot = ts;
      }

      // Spawn meteors
      const meteorInterval = Math.max(400, 1200 - state.level * 80);
      if (ts - state.lastMeteor > meteorInterval) {
        spawnMeteor();
        state.lastMeteor = ts;
        if (state.score > 0 && state.score % 500 === 0) state.level++;
      }

      // Bullets
      state.bullets = state.bullets.filter((b) => b.y + b.h > 0);
      for (const b of state.bullets) {
        b.y -= b.speed;
        ctx.fillStyle = "#e7f8c8";
        ctx.shadowColor = "#e7f8c8";
        ctx.shadowBlur = 10;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.shadowBlur = 0;
      }

      // Meteors
      state.meteors = state.meteors.filter((m) => m.y < H + m.h);
      for (const m of state.meteors) {
        m.y += m.speed;
        m.spinAngle += m.spin;
        ctx.save();
        ctx.translate(m.x + m.w / 2, m.y + m.h / 2);
        ctx.rotate(m.spinAngle);
        ctx.strokeStyle = m.hp > 1 ? "#ff6b6b" : "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1.5;
        if (m.hp > 1) { ctx.shadowColor = "#ff6b6b"; ctx.shadowBlur = 8; }
        ctx.beginPath();
        const sides = 7;
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2;
          const r = (m.w / 2) * (0.7 + 0.3 * Math.sin(i * 2.3));
          if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = m.hp > 1 ? "rgba(255,80,80,0.1)" : "rgba(255,255,255,0.04)";
        ctx.fill();
        ctx.restore();

        if (checkCollision(state.ship, m)) {
          spawnParticles(m.x + m.w / 2, m.y + m.h / 2, 12);
          state.meteors = state.meteors.filter((x) => x !== m);
          state.lives--;
          setLiveLives(state.lives);
          if (state.lives <= 0) {
            state.running = false;
            setFinalScore(state.score);
            saveScore(playerName, state.score);
            setPhase("gameover");
            return;
          }
        }
      }

      // Bullet-Meteor collisions
      for (const b of [...state.bullets]) {
        for (const m of [...state.meteors]) {
          if (checkCollision(b, m)) {
            spawnParticles(m.x + m.w / 2, m.y + m.h / 2, 8);
            state.bullets = state.bullets.filter((x) => x !== b);
            m.hp--;
            if (m.hp <= 0) {
              state.meteors = state.meteors.filter((x) => x !== m);
              const pts = m.w > 45 ? 30 : 10;
              state.score += pts;
              setLiveScore(state.score);
            }
            break;
          }
        }
      }

      // Particles
      state.particles = state.particles.filter((p) => p.life > 0);
      for (const p of state.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        ctx.fillStyle = `rgba(231,248,200,${p.life})`;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }

      // Draw ship
      const sx = state.ship.x;
      const sy = state.ship.y;
      const sw = state.ship.w;
      const sh = state.ship.h;
      ctx.strokeStyle = "#e7f8c8";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#e7f8c8";
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(sx + sw / 2, sy);
      ctx.lineTo(sx + sw, sy + sh);
      ctx.lineTo(sx + sw * 0.65, sy + sh * 0.75);
      ctx.lineTo(sx + sw * 0.35, sy + sh * 0.75);
      ctx.lineTo(sx, sy + sh);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "rgba(231,248,200,0.08)";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Engine trail
      const now = Date.now();
      if (now % 2 === 0) {
        ctx.fillStyle = `rgba(231,248,200,${0.3 + Math.random() * 0.3})`;
        ctx.fillRect(sx + sw * 0.4, sy + sh, 3, 4 + Math.random() * 8);
        ctx.fillRect(sx + sw * 0.57, sy + sh, 3, 4 + Math.random() * 8);
      }

      state.raf = requestAnimationFrame(loop);
    };

    state.raf = requestAnimationFrame(loop);

    return () => {
      state.running = false;
      cancelAnimationFrame(state.raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 40px", position: "relative" }}>

        {/* Scanlines background */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }} />

        {phase === "name" && (
          <div style={{ textAlign: "center", maxWidth: "460px", width: "100%", position: "relative", zIndex: 1 }}>
            {/* Corner accents */}
            <div style={{ position: "absolute", top: -20, left: -20, width: "30px", height: "30px", borderTop: "1px solid rgba(231,248,200,0.4)", borderLeft: "1px solid rgba(231,248,200,0.4)" }} />
            <div style={{ position: "absolute", top: -20, right: -20, width: "30px", height: "30px", borderTop: "1px solid rgba(231,248,200,0.4)", borderRight: "1px solid rgba(231,248,200,0.4)" }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: "30px", height: "30px", borderBottom: "1px solid rgba(231,248,200,0.4)", borderLeft: "1px solid rgba(231,248,200,0.4)" }} />
            <div style={{ position: "absolute", bottom: -20, right: -20, width: "30px", height: "30px", borderBottom: "1px solid rgba(231,248,200,0.4)", borderRight: "1px solid rgba(231,248,200,0.4)" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ height: "1px", width: "32px", background: "rgba(231,248,200,0.4)" }} />
              <span className="label" style={{ color: "rgba(231,248,200,0.6)", fontSize: "10px" }}>Space Game</span>
              <div style={{ height: "1px", width: "32px", background: "rgba(231,248,200,0.4)" }} />
            </div>

            <h1 className="display glitch" data-text="SPACE TMA"
              style={{ fontSize: "clamp(3rem,8vw,5rem)", marginBottom: "8px", letterSpacing: "-0.04em" }}>
              <span style={{ color: "#f2f2f2" }}>SPACE</span>
              <span style={{ color: "#e7f8c8" }}>TMA</span>
            </h1>

            <p style={{ color: "rgba(242,242,242,0.35)", fontSize: "12px", letterSpacing: "0.1em", marginBottom: "40px", lineHeight: 1.8 }}>
              Schieß Asteroiden ab. Überlebe so lange du kannst.<br />
              ← → oder A D + Leertaste zum Schießen.
            </p>

            {/* Neon border input */}
            <div style={{ position: "relative", marginBottom: "16px" }}>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startGame()}
                placeholder="CALLSIGN EINGEBEN..."
                style={{
                  width: "100%", background: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(231,248,200,0.25)",
                  color: "#f2f2f2", padding: "14px 20px",
                  fontSize: "13px", letterSpacing: "0.25em", outline: "none",
                  fontFamily: "monospace",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#e7f8c8";
                  (e.target as HTMLInputElement).style.boxShadow = "0 0 20px rgba(231,248,200,0.15), inset 0 0 20px rgba(0,0,0,0.5)";
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "rgba(231,248,200,0.25)";
                  (e.target as HTMLInputElement).style.boxShadow = "inset 0 0 20px rgba(0,0,0,0.5)";
                }}
                maxLength={16}
              />
            </div>

            <button
              onClick={startGame}
              disabled={!playerName.trim()}
              style={{
                width: "100%", padding: "14px 24px",
                background: playerName.trim() ? "#e7f8c8" : "transparent",
                border: "1px solid rgba(231,248,200,0.4)",
                color: playerName.trim() ? "#060606" : "rgba(231,248,200,0.3)",
                fontSize: "12px", letterSpacing: "0.35em", textTransform: "uppercase",
                fontWeight: 700, cursor: playerName.trim() ? "pointer" : "not-allowed",
                transition: "all 0.3s", fontFamily: "inherit",
                boxShadow: playerName.trim() ? "0 0 30px rgba(231,248,200,0.2)" : "none",
              }}
            >
              MISSION STARTEN →
            </button>

            {leaderboard.length > 0 && (
              <div style={{ marginTop: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.06)" }} />
                  <span style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(231,248,200,0.4)" }}>Highscores</span>
                  <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.06)" }} />
                </div>
                <div style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  {leaderboard.slice(0, 5).map((s, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "10px 16px",
                      borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      background: i === 0 ? "rgba(231,248,200,0.03)" : "transparent",
                    }}>
                      <span style={{ fontSize: "11px", color: i === 0 ? "#e7f8c8" : "rgba(242,242,242,0.4)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                        {String(i + 1).padStart(2, "0")}. {s.name}
                      </span>
                      <span style={{ fontSize: "13px", color: "#e7f8c8", fontWeight: 700, fontFamily: "monospace" }}>
                        {String(s.score).padStart(6, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "playing" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0", position: "relative", zIndex: 1 }}>
            {/* HUD header bar */}
            <div style={{
              width: "480px", display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 16px",
              background: "rgba(6,6,6,0.9)",
              border: "1px solid rgba(231,248,200,0.12)",
              borderBottom: "none",
              fontFamily: "monospace",
            }}>
              <div>
                <span style={{ fontSize: "9px", color: "rgba(231,248,200,0.4)", letterSpacing: "0.3em" }}>PILOT: </span>
                <span style={{ fontSize: "11px", color: "#e7f8c8", letterSpacing: "0.15em" }}>{playerName.toUpperCase()}</span>
              </div>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: "16px", height: "8px", background: i < liveLives ? "#e7f8c8" : "rgba(231,248,200,0.1)", transition: "background 0.3s" }} />
                ))}
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={480}
              height={600}
              style={{ display: "block", border: "1px solid rgba(231,248,200,0.12)" }}
            />

            <div style={{
              width: "480px", display: "flex", justifyContent: "space-between",
              padding: "10px 16px",
              background: "rgba(6,6,6,0.9)",
              border: "1px solid rgba(231,248,200,0.12)",
              borderTop: "none",
              fontFamily: "monospace",
            }}>
              <span style={{ fontSize: "9px", color: "rgba(242,242,242,0.2)", letterSpacing: "0.2em" }}>← → A D BEWEGEN</span>
              <span style={{ fontSize: "9px", color: "rgba(242,242,242,0.2)", letterSpacing: "0.2em" }}>SPACE SCHIESSSEN</span>
            </div>
          </div>
        )}

        {phase === "gameover" && (
          <div style={{ textAlign: "center", maxWidth: "460px", width: "100%", position: "relative", zIndex: 1 }}>
            {/* Dramatic game over */}
            <div style={{ marginBottom: "40px" }}>
              <h1
                className={glitchActive ? "glitch" : ""}
                data-text="GAME OVER"
                style={{
                  fontSize: "clamp(3rem,8vw,5rem)",
                  fontWeight: 900, letterSpacing: "-0.04em",
                  fontFamily: "Helvetica Neue, sans-serif",
                  textTransform: "uppercase",
                  color: glitchActive ? "#ff4444" : "#f2f2f2",
                  textShadow: glitchActive ? "0 0 30px rgba(255,68,68,0.8), 0 0 60px rgba(255,68,68,0.4)" : "none",
                  transition: "color 0.05s, text-shadow 0.05s",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                GAME OVER
              </h1>
              <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #ff4444, transparent)", margin: "16px auto", width: "200px" }} />
              <p style={{ color: "rgba(242,242,242,0.4)", fontSize: "13px", letterSpacing: "0.2em", fontFamily: "monospace" }}>
                {playerName.toUpperCase()} — SCORE:&nbsp;
                <span style={{ color: "#e7f8c8", fontWeight: 700, fontSize: "20px" }}>{String(finalScore).padStart(6, "0")}</span>
              </p>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.06)" }} />
                <span style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(231,248,200,0.4)" }}>Highscores</span>
                <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                {leaderboard.slice(0, 10).map((s, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 16px",
                    borderBottom: i < leaderboard.slice(0, 10).length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    background: s.name === playerName && s.score === finalScore ? "rgba(231,248,200,0.04)" : "transparent",
                  }}>
                    <span style={{ fontSize: "11px", color: i === 0 ? "#e7f8c8" : "rgba(242,242,242,0.4)", fontFamily: "monospace" }}>
                      {String(i + 1).padStart(2, "0")}. {s.name}
                    </span>
                    <span style={{ fontSize: "13px", color: "#e7f8c8", fontWeight: 700, fontFamily: "monospace" }}>
                      {String(s.score).padStart(6, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => {
                  setPhase("name");
                  setLiveScore(0);
                  setLiveLives(3);
                }}
                style={{
                  padding: "12px 24px", background: "#e7f8c8", border: "none",
                  color: "#060606", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase",
                  fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Retry →
              </button>
              <Link href="/" style={{
                padding: "12px 24px", background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(242,242,242,0.5)", fontSize: "11px", letterSpacing: "0.35em",
                textTransform: "uppercase", textDecoration: "none", display: "flex", alignItems: "center",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(231,248,200,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#e7f8c8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,242,242,0.5)";
                }}
              >
                Exit
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

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

  // Load leaderboard
  useEffect(() => {
    const saved = localStorage.getItem("tma-scores");
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

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
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      // Stars (static, drawn fresh each frame for simplicity)
      ctx.fillStyle = "rgba(231,248,200,0.3)";
      for (let i = 0; i < 60; i++) {
        const sx = ((i * 137 + 17) % W);
        const sy = ((i * 91 + 43) % H);
        ctx.fillRect(sx, sy, 1, 1);
      }

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
        ctx.shadowBlur = 8;
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
        ctx.fillStyle = m.hp > 1 ? "rgba(255,80,80,0.1)" : "rgba(255,255,255,0.04)";
        ctx.fill();
        ctx.restore();

        // Ship collision
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
      ctx.shadowBlur = 12;
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
      <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
        {phase === "name" && (
          <div className="text-center max-w-md w-full">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#e7f8c8]" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Game</span>
              <div className="w-8 h-px bg-[#e7f8c8]" />
            </div>
            <h1 className="font-display text-5xl text-white mb-4">
              Space<span className="text-[#e7f8c8]">TMA</span>
            </h1>
            <p className="text-white/40 text-sm mb-8">
              Schieß Asteroiden ab. Überlebe so lange du kannst.<br />
              Steuerung: ← → oder A D + Leertaste zum Schießen.
            </p>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startGame()}
              placeholder="Dein Name eingeben..."
              className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 text-sm tracking-widest mb-4 outline-none focus:border-[#e7f8c8]/50 placeholder:text-white/20"
              maxLength={16}
            />
            <button
              onClick={startGame}
              disabled={!playerName.trim()}
              className="btn-tma w-full justify-center disabled:opacity-30"
            >
              Spiel starten →
            </button>

            {/* Leaderboard */}
            {leaderboard.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[10px] tracking-widest uppercase text-[#e7f8c8]/50 mb-4">Highscores</h2>
                <div className="divide-y divide-white/5">
                  {leaderboard.slice(0, 5).map((s, i) => (
                    <div key={i} className="flex justify-between py-3 text-sm">
                      <span className="text-white/50">{String(i + 1).padStart(2, "0")}. {s.name}</span>
                      <span className="text-[#e7f8c8] font-bold">{s.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "playing" && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center justify-between w-full max-w-lg text-xs tracking-widest uppercase">
              <span className="text-white/40">Score: <span className="text-[#e7f8c8] font-bold">{liveScore}</span></span>
              <span className="text-white/40">
                Leben: <span className="text-[#e7f8c8]">{"♦ ".repeat(liveLives).trim()}</span>
              </span>
            </div>
            <canvas
              ref={canvasRef}
              width={480}
              height={600}
              className="border border-white/10"
              style={{ touchAction: "none" }}
            />
            <p className="text-white/20 text-[10px] tracking-widest">
              ← → oder A D bewegen · Leertaste schießen
            </p>
          </div>
        )}

        {phase === "gameover" && (
          <div className="text-center max-w-md w-full">
            <h1 className="font-display text-5xl text-white mb-2">
              Game <span className="text-[#e7f8c8]">Over</span>
            </h1>
            <p className="text-white/40 mb-2 text-sm">
              {playerName} — Score: <span className="text-[#e7f8c8] font-bold text-xl">{finalScore}</span>
            </p>

            <div className="my-8">
              <h2 className="text-[10px] tracking-widest uppercase text-[#e7f8c8]/50 mb-4">Highscores</h2>
              <div className="divide-y divide-white/5 border border-white/5">
                {leaderboard.slice(0, 10).map((s, i) => (
                  <div
                    key={i}
                    className={`flex justify-between px-4 py-3 text-sm ${
                      s.name === playerName && s.score === finalScore ? "bg-[#e7f8c8]/5" : ""
                    }`}
                  >
                    <span className={`${i === 0 ? "text-[#e7f8c8]" : "text-white/40"}`}>
                      {String(i + 1).padStart(2, "0")}. {s.name}
                    </span>
                    <span className="text-[#e7f8c8] font-bold">{s.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setPhase("name");
                  setLiveScore(0);
                  setLiveLives(3);
                }}
                className="btn-tma"
              >
                Nochmal spielen
              </button>
              <Link href="/" className="btn-tma">
                Zur Website
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

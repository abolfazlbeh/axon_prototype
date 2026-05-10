// Each diagram is a standalone SVG illustration keyed by a string ID.
// New diagrams can be added here without touching any other component.

import type { ReactElement } from 'react'
import { PythonRuntimeTypingDiagram } from './diagrams/PythonRuntimeTypingDiagram'

interface DiagramProps {
  id: string
  caption?: string
}

// ─── Individual diagram renderers ────────────────────────────────────────────

function PythonScopeDiagram() {
  return (
    <svg viewBox="0 0 420 260" className="w-full h-full" style={{ maxHeight: 240 }}>
      {/* Built-in scope — outermost */}
      <rect x="10" y="10" width="400" height="240" rx="10" fill="none" stroke="#3a3f52" strokeWidth="1.5" strokeDasharray="6 3" />
      <text x="22" y="30" fill="#3a3f52" fontSize="11" fontFamily="monospace">Built-in scope</text>
      <text x="22" y="46" fill="#3a3f52" fontSize="10" fontFamily="monospace">len, print, range, type …</text>

      {/* Global scope */}
      <rect x="30" y="60" width="360" height="170" rx="8" fill="rgba(108,99,255,0.07)" stroke="#6c63ff" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="44" y="80" fill="#6c63ff" fontSize="11" fontFamily="monospace" fontWeight="600">Global scope</text>
      <text x="44" y="96" fill="#6c63ff" fontSize="10" fontFamily="monospace">total = 0</text>
      <text x="44" y="112" fill="#6c63ff" fontSize="10" fontFamily="monospace">name = "Alex"</text>

      {/* Local scope (function) */}
      <rect x="55" y="128" width="310" height="90" rx="6" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeWidth="1.5" />
      <text x="70" y="148" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="600">Local scope  (inside a function)</text>
      <text x="70" y="166" fill="#34d399" fontSize="10" fontFamily="monospace">result = 42</text>
      <text x="70" y="182" fill="#34d399" fontSize="10" fontFamily="monospace">message = "hello"</text>

      {/* Arrow: local can read global */}
      <path d="M200 128 L200 112" stroke="#34d399" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arrow-green)" />

      {/* Arrow: global can NOT access local */}
      <path d="M260 112 Q300 120 300 128" stroke="#f87171" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arrow-red)" />
      <text x="305" y="122" fill="#f87171" fontSize="9" fontFamily="monospace">✗ can't reach in</text>

      <defs>
        <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#34d399" />
        </marker>
        <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#f87171" />
        </marker>
      </defs>

      {/* LEGB label */}
      <text x="340" y="245" fill="#3a3f52" fontSize="9" fontFamily="monospace" textAnchor="end">LEGB lookup order →</text>
    </svg>
  )
}

function PythonListIndexingDiagram() {
  const items = ['apple', 'banana', 'cherry', 'date', 'elderberry']
  const W = 76
  const H = 44
  const startX = 10
  const startY = 50

  return (
    <svg viewBox="0 0 420 200" className="w-full h-full" style={{ maxHeight: 200 }}>
      <text x="10" y="22" fill="#6b7280" fontSize="11" fontFamily="monospace">fruits = [ … ]</text>

      {items.map((item, i) => (
        <g key={i}>
          {/* Cell */}
          <rect
            x={startX + i * (W + 4)}
            y={startY}
            width={W}
            height={H}
            rx="6"
            fill="rgba(108,99,255,0.1)"
            stroke="#6c63ff"
            strokeWidth="1.2"
          />
          {/* Value */}
          <text
            x={startX + i * (W + 4) + W / 2}
            y={startY + H / 2 + 4}
            fill="#c8cad4"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
          >
            "{item.slice(0, 6)}"
          </text>
          {/* Positive index */}
          <text
            x={startX + i * (W + 4) + W / 2}
            y={startY - 8}
            fill="#6c63ff"
            fontSize="11"
            fontFamily="monospace"
            textAnchor="middle"
          >
            [{i}]
          </text>
          {/* Negative index */}
          <text
            x={startX + i * (W + 4) + W / 2}
            y={startY + H + 18}
            fill="#34d399"
            fontSize="11"
            fontFamily="monospace"
            textAnchor="middle"
          >
            [{i - items.length}]
          </text>
        </g>
      ))}

      {/* Labels */}
      <text x="10" y="178" fill="#6c63ff" fontSize="10" fontFamily="monospace">↑ positive indices (left → right)</text>
      <text x="10" y="193" fill="#34d399" fontSize="10" fontFamily="monospace">↑ negative indices (right → left)</text>
    </svg>
  )
}

function DisplacementVsDistanceDiagram() {
  return (
    <svg viewBox="0 0 420 200" className="w-full h-full" style={{ maxHeight: 200 }}>
      {/* Number line */}
      <line x1="30" y1="100" x2="390" y2="100" stroke="#3a3f52" strokeWidth="1.5" />
      {/* Tick marks */}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <line x1={30 + i * 50} y1="94" x2={30 + i * 50} y2="106" stroke="#3a3f52" strokeWidth="1" />
          <text x={30 + i * 50} y="120" fill="#3a3f52" fontSize="10" fontFamily="monospace" textAnchor="middle">{i * 10}</text>
        </g>
      ))}
      <text x="400" y="104" fill="#3a3f52" fontSize="11" fontFamily="sans-serif">x (m)</text>

      {/* Path arrow: A → B → A (distance = 60, displacement = 0) */}
      {/* A to B forward */}
      <path d="M80 80 Q180 55 280 80" fill="none" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arr-yellow)" />
      <text x="180" y="50" fill="#fbbf24" fontSize="11" fontFamily="sans-serif" textAnchor="middle">30 m east</text>

      {/* B back to A */}
      <path d="M280 120 Q180 145 80 120" fill="none" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arr-yellow2)" strokeDasharray="5 3" />
      <text x="180" y="168" fill="#fbbf24" fontSize="10" fontFamily="sans-serif" textAnchor="middle">30 m west (return)</text>

      {/* Displacement arrow — zero */}
      <line x1="80" y1="100" x2="80" y2="100" stroke="#f87171" strokeWidth="3" />
      <text x="80" y="88" fill="#f87171" fontSize="10" fontFamily="sans-serif" textAnchor="middle">A</text>
      <text x="280" y="88" fill="#6c63ff" fontSize="10" fontFamily="sans-serif" textAnchor="middle">B</text>

      {/* Legend */}
      <rect x="30" y="175" width="12" height="3" rx="1" fill="#fbbf24" />
      <text x="48" y="181" fill="#fbbf24" fontSize="10" fontFamily="sans-serif">Distance = 60 m (total path)</text>
      <rect x="220" y="175" width="12" height="3" rx="1" fill="#f87171" />
      <text x="238" y="181" fill="#f87171" fontSize="10" fontFamily="sans-serif">Displacement = 0 m (net change)</text>

      <defs>
        <marker id="arr-yellow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#fbbf24" />
        </marker>
        <marker id="arr-yellow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#fbbf24" />
        </marker>
      </defs>
    </svg>
  )
}

function VectorVsScalarDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="w-full h-full" style={{ maxHeight: 220 }}>
      {/* Left panel — Scalar */}
      <rect x="10" y="10" width="190" height="200" rx="10" fill="rgba(251,191,36,0.05)" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 2" />
      <text x="105" y="34" fill="#fbbf24" fontSize="12" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">Scalar</text>
      <text x="105" y="50" fill="#6b7280" fontSize="10" fontFamily="sans-serif" textAnchor="middle">magnitude only</text>

      {/* Speed circle */}
      <circle cx="105" cy="115" r="42" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="105" y="110" fill="#fbbf24" fontSize="22" fontFamily="monospace" fontWeight="700" textAnchor="middle">60</text>
      <text x="105" y="130" fill="#6b7280" fontSize="10" fontFamily="sans-serif" textAnchor="middle">km/h</text>
      <text x="105" y="188" fill="#6b7280" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Speed — no direction</text>

      {/* Right panel — Vector */}
      <rect x="220" y="10" width="190" height="200" rx="10" fill="rgba(108,99,255,0.05)" stroke="#6c63ff" strokeWidth="1" strokeDasharray="4 2" />
      <text x="315" y="34" fill="#6c63ff" fontSize="12" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">Vector</text>
      <text x="315" y="50" fill="#6b7280" fontSize="10" fontFamily="sans-serif" textAnchor="middle">magnitude + direction</text>

      {/* Velocity arrow */}
      <line x1="260" y1="130" x2="360" y2="90" stroke="#6c63ff" strokeWidth="2.5" markerEnd="url(#arr-blue)" />
      <text x="288" y="126" fill="#6c63ff" fontSize="10" fontFamily="monospace" transform="rotate(-22, 310, 110)">60 km/h</text>
      {/* Angle arc */}
      <path d="M270 130 A20 20 0 0 1 282 112" fill="none" stroke="#6c63ff" strokeWidth="1" strokeDasharray="2 2" />
      <text x="288" y="135" fill="#6b7280" fontSize="9" fontFamily="sans-serif">θ = 22°N</text>
      <text x="315" y="188" fill="#6b7280" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Velocity — direction matters</text>

      <defs>
        <marker id="arr-blue" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" fill="#6c63ff" />
        </marker>
      </defs>
    </svg>
  )
}

function FreeBodyDiagram() {
  const cx = 210
  const cy = 120
  const BOX = 52

  return (
    <svg viewBox="0 0 420 260" className="w-full h-full" style={{ maxHeight: 260 }}>
      {/* Ground */}
      <line x1="30" y1="200" x2="390" y2="200" stroke="#3a3f52" strokeWidth="1.5" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={30 + i * 30} y1="200" x2={20 + i * 30} y2="215" stroke="#3a3f52" strokeWidth="1" />
      ))}

      {/* Object box */}
      <rect x={cx - BOX / 2} y={cy - BOX / 2} width={BOX} height={BOX} rx="6" fill="rgba(108,99,255,0.15)" stroke="#6c63ff" strokeWidth="2" />
      <text x={cx} y={cy + 5} fill="#c8cad4" fontSize="11" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">4 kg</text>

      {/* Weight force — down */}
      <line x1={cx} y1={cy + BOX / 2} x2={cx} y2="190" stroke="#f87171" strokeWidth="2.5" markerEnd="url(#arr-red-fbd)" />
      <text x={cx + 8} y="175" fill="#f87171" fontSize="11" fontFamily="sans-serif">W = mg</text>
      <text x={cx + 8} y="188" fill="#f87171" fontSize="10" fontFamily="monospace">= 39.2 N ↓</text>

      {/* Normal force — up */}
      <line x1={cx} y1={cy - BOX / 2} x2={cx} y2="30" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arr-green-fbd)" />
      <text x={cx + 8} y="55" fill="#34d399" fontSize="11" fontFamily="sans-serif">N = Normal</text>
      <text x={cx + 8} y="68" fill="#34d399" fontSize="10" fontFamily="monospace">= 39.2 N ↑</text>

      {/* Applied force — right */}
      <line x1={cx + BOX / 2} y1={cy} x2="360" y2={cy} stroke="#6c63ff" strokeWidth="2.5" markerEnd="url(#arr-purple-fbd)" />
      <text x="310" y={cy - 8} fill="#6c63ff" fontSize="11" fontFamily="sans-serif">F = 20 N →</text>

      {/* Friction — left */}
      <line x1={cx - BOX / 2} y1={cy} x2="60" y2={cy} stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arr-yellow-fbd)" />
      <text x="38" y={cy - 8} fill="#fbbf24" fontSize="11" fontFamily="sans-serif">f ← friction</text>

      {/* Net force label */}
      <text x="210" y="240" fill="#c8cad4" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
        F_net = 20 N − f   →   a = F_net / 4
      </text>

      <defs>
        <marker id="arr-red-fbd" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" fill="#f87171" />
        </marker>
        <marker id="arr-green-fbd" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" fill="#34d399" />
        </marker>
        <marker id="arr-purple-fbd" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" fill="#6c63ff" />
        </marker>
        <marker id="arr-yellow-fbd" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" fill="#fbbf24" />
        </marker>
      </defs>
    </svg>
  )
}

function KinematicEquationChooserDiagram() {
  const equations = [
    { eq: 'v = v₀ + at', missing: 'x', color: '#6c63ff' },
    { eq: 'x = x₀ + v₀t + ½at²', missing: 'v', color: '#34d399' },
    { eq: 'v² = v₀² + 2aΔx', missing: 't', color: '#fbbf24' },
    { eq: 'x = x₀ + ½(v₀+v)t', missing: 'a', color: '#f87171' },
  ]

  return (
    <svg viewBox="0 0 420 240" className="w-full h-full" style={{ maxHeight: 240 }}>
      <text x="210" y="22" fill="#6b7280" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
        Pick the equation that does NOT contain your unknown:
      </text>

      {equations.map((eq, i) => (
        <g key={i} transform={`translate(0, ${40 + i * 48})`}>
          <rect x="20" y="0" width="380" height="36" rx="8"
            fill={`${eq.color}15`} stroke={eq.color} strokeWidth="1.2" />
          <text x="36" y="23" fill={eq.color} fontSize="13" fontFamily="monospace" fontWeight="600">
            {eq.eq}
          </text>
          <rect x="330" y="6" width="60" height="24" rx="6" fill={`${eq.color}25`} stroke={eq.color} strokeWidth="1" />
          <text x="360" y="23" fill={eq.color} fontSize="11" fontFamily="monospace" textAnchor="middle">
            no {eq.missing}
          </text>
        </g>
      ))}

      <text x="210" y="235" fill="#3a3f52" fontSize="9" fontFamily="monospace" textAnchor="middle">
        5 variables: x, v₀, v, a, t — each equation omits one
      </text>
    </svg>
  )
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const DIAGRAMS: Record<string, () => ReactElement> = {
  'python-scope': PythonScopeDiagram,
  'python-list-indexing': PythonListIndexingDiagram,
  'python-runtime-typing': PythonRuntimeTypingDiagram,
  'displacement-vs-distance': DisplacementVsDistanceDiagram,
  'vector-vs-scalar': VectorVsScalarDiagram,
  'free-body-diagram': FreeBodyDiagram,
  'kinematic-equation-chooser': KinematicEquationChooserDiagram,
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DiagramBlock({ id, caption }: DiagramProps) {
  const Diagram = DIAGRAMS[id]
  const managesOwnChrome = id === 'python-runtime-typing'

  return (
    <div className="flex min-h-0 w-full flex-col gap-2">
      <div
        className={
          managesOwnChrome
            ? 'flex w-full min-h-0 flex-col items-stretch overflow-visible rounded-xl border border-[#1e2130] bg-[#13151c] p-2 sm:p-3'
            : 'flex min-h-0 w-full max-h-[min(72vh,640px)] items-center justify-center overflow-y-auto rounded-xl border border-[#1e2130] bg-[#13151c] p-3'
        }
      >
        {Diagram ? <Diagram /> : (
          <div className="text-xs text-[#3a3f52] p-6">Diagram "{id}" not found</div>
        )}
      </div>
      {caption && <p className="text-xs text-[#6b7280] text-center italic">{caption}</p>}
    </div>
  )
}

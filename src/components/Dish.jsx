// A simple illustrated plate: rim, food mound and garnish dots, coloured per dish.
export default function Dish({ colors: [main, accent, garnish], seed = 0, className = "" }) {
  const dots = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 + seed;
    const r = 34 + ((i * 13 + seed * 7) % 14);
    return [100 + Math.cos(a) * r, 100 + Math.sin(a) * r];
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="104" r="86" fill="#000" opacity="0.08" />
      <circle cx="100" cy="100" r="86" fill="#fffdf8" />
      <circle cx="100" cy="100" r="68" fill="none" stroke="#eadbc0" strokeWidth="2" />
      <path d={`M${56 + seed * 3} 108 C 60 64, 140 56, 146 ${100 + seed * 2} C 150 138, 70 150, ${56 + seed * 3} 108 Z`} fill={main} />
      <ellipse cx="118" cy="92" rx="24" ry="16" fill={accent} transform={`rotate(${20 + seed * 15} 118 92)`} />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 3 : 4.5} fill={garnish} />)}
    </svg>
  );
}

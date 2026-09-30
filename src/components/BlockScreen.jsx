// A breeze-block (claustra) screen: square concrete blocks, each pierced by a round hole.
// Laid over a photograph, the blocks shrink away on load to open the view.
export default function BlockScreen({ cols = 4, rows = 5, open = true, className = "" }) {
  const size = 100;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * size;
      const y = r * size;
      const cx = x + size / 2;
      const cy = y + size / 2;
      const rad = 34;
      cells.push(
        <path
          key={`${r}-${c}`}
          className="screen-cell"
          style={{ "--i": r + c }}
          fillRule="evenodd"
          d={`M${x} ${y}h${size}v${size}h-${size}z M${cx - rad} ${cy}a${rad} ${rad} 0 1 0 ${rad * 2} 0a${rad} ${rad} 0 1 0 -${rad * 2} 0z`}
        />
      );
    }
  }
  return (
    <svg
      viewBox={`0 0 ${cols * size} ${rows * size}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-concrete ${open ? "screen-open" : ""} ${className}`}
    >
      {cells}
    </svg>
  );
}

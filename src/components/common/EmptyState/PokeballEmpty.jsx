export default function PokeballEmpty({ size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Pokébola vacía"
      style={{ opacity: 0.6 }}
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="#fff"
        stroke="#343a48"
        strokeWidth="6"
      />
      <path
        d="M4 50A46 46 0 0 1 96 50Z"
        fill="#ef4444"
        stroke="#343a48"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <circle
        cx="50"
        cy="50"
        r="11"
        fill="#fff"
        stroke="#343a48"
        strokeWidth="6"
      />
    </svg>
  );
}

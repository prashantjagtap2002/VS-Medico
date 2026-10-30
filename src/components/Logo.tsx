import Link from 'next/link';

/** Rounded medical cross split teal / orange, the VS Medico brand mark. */
export function LogoMark({ className = 'logo-mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M24 6h16a4 4 0 0 1 4 4v14h-20z" fill="#008080" />
      <path d="M44 24h10a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H44z" fill="#ff9900" />
      <path d="M44 40v14a4 4 0 0 1-4 4H24V40z" fill="#ff9900" />
      <path d="M24 40H10a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4h14z" fill="#008080" />
      <rect x="24" y="24" width="20" height="16" fill="#0b6e6e" />
      <path d="M34 27.5c-1.6-2.2-5.6-1.6-5.6 1.6 0 2.6 3.2 4.6 5.6 6.4 2.4-1.8 5.6-3.8 5.6-6.4 0-3.2-4-3.8-5.6-1.6z" fill="#fff" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="VS Medico LLP home">
      <LogoMark />
      <span>
        <span className="logo-name">
          <span className="teal">VS</span> <span className="orange">MEDICO</span>
        </span>
        <span className="logo-tag">
          <span>Pharma Wholesale &amp; Distribution</span>
          <span>LLP</span>
        </span>
      </span>
    </Link>
  );
}

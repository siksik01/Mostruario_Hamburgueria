export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Sua Hamburgueria">
      <svg aria-hidden="true" viewBox="0 0 48 48" className="size-10 shrink-0 text-primary">
        <path d="M8 21c1.8-7.4 7.6-11 16-11s14.2 3.6 16 11H8Z" fill="currentColor" />
        <path d="M7 25h34M10 29h28l-3 8H13l-3-8Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="round" />
        <path d="m17 7 2 3m12-3-2 3" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="font-display text-left text-[1.28rem] leading-[.8] uppercase">
        Sua
        <span className={compact ? "hidden" : "block"}>Hamburgueria</span>
      </span>
    </span>
  );
}
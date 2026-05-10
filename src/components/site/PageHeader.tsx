import type { ReactNode } from "react";

type Props = {
  /** Italic JP-serif eyebrow (red) */
  eyebrow?: string;
  /** Title — pass plain string or JSX for multi-line / colored words */
  title: ReactNode;
  /** Optional intro paragraph below the title */
  intro?: ReactNode;
  /** Right-side slot (e.g. filters, count) */
  aside?: ReactNode;
  /** Optional decorative noise overlay */
  noise?: boolean;
  className?: string;
};

/**
 * Consistent page header used across catalogo / crea / storia / contatti / prodotto.
 * Standardizes:
 *  - container: max-w-7xl + px-5 md:px-8
 *  - vertical rhythm: pt-32 md:pt-40 pb-12 (clears the fixed 64px header)
 *  - typography: eyebrow (font-jp, text-kiri-red), H1 (font-display, 6xl→8xl)
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  aside,
  noise = false,
  className = "",
}: Props) {
  return (
    <section
      className={`mx-auto max-w-7xl px-5 md:px-8 pt-32 md:pt-40 pb-12 ${
        noise ? "noise" : ""
      } ${className}`}
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className={aside ? "md:col-span-8" : "md:col-span-12"}>
          {eyebrow && (
            <p className="font-jp text-sm text-kiri-red mb-3">{eyebrow}</p>
          )}
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-wide">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed text-pretty">
              {intro}
            </p>
          )}
        </div>
        {aside && <div className="md:col-span-4">{aside}</div>}
      </div>
    </section>
  );
}

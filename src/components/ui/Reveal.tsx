"use client";

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { useInViewOnce } from "@/lib/hooks";

type RevealProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: ElementType;
  /** Jeda animasi dalam milidetik (untuk efek berurutan). */
  delay?: number;
};

/**
 * Memunculkan konten dengan fade + geser ringan saat masuk viewport.
 * Animasi diatur CSS di globals.css dan otomatis nonaktif untuk
 * prefers-reduced-motion atau saat JavaScript tidak berjalan.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, style, ...rest }: RevealProps) {
  const [ref, inView] = useInViewOnce<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible={inView ? "true" : "false"}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

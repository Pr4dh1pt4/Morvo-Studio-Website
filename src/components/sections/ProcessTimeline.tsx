"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ProcessStep } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/cn";

type Point = { x: number; y: number };
type Geometry = { width: number; height: number; d: string; nodeAt: number[] };

/**
 * Membuat jalur "benang filamen" yang melengkung melewati pusat tiap titik
 * langkah. Arah otomatis: horizontal (desktop) atau vertikal (mobile).
 */
function buildPath(points: Point[], width: number, height: number): Geometry {
  const [first, second] = points;
  const horizontal = second ? Math.abs(second.x - first.x) > Math.abs(second.y - first.y) : true;
  const amp = horizontal ? 34 : 14;
  const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

  const start: Point = horizontal ? { x: 0, y: first.y } : { x: first.x, y: 0 };
  const last = points[points.length - 1];
  const end: Point = horizontal ? { x: width, y: last.y } : { x: last.x, y: height };

  let d = `M ${start.x} ${start.y} L ${first.x} ${first.y}`;
  // Panjang kumulatif (pendekatan) untuk mengetahui kapan garis mencapai tiap titik.
  const lengths = [dist(start, first)];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const s = i % 2 ? -1 : 1;
    if (horizontal) {
      const dx = b.x - a.x;
      d += ` C ${a.x + dx / 3} ${a.y + s * amp} ${a.x + (2 * dx) / 3} ${b.y - s * amp} ${b.x} ${b.y}`;
    } else {
      const dy = b.y - a.y;
      d += ` C ${a.x + s * amp} ${a.y + dy / 3} ${b.x - s * amp} ${a.y + (2 * dy) / 3} ${b.x} ${b.y}`;
    }
    lengths.push(lengths[i - 1] + dist(a, b) * 1.08);
  }
  d += ` L ${end.x} ${end.y}`;
  const total = lengths[lengths.length - 1] + dist(last, end);

  return { width, height, d, nodeAt: lengths.map((l) => l / total) };
}

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [activeCount, setActiveCount] = useState(0);

  // Ukur posisi titik langkah dan bangun jalur; ulangi saat ukuran berubah.
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const box = list.getBoundingClientRect();
    const nodes = Array.from(list.querySelectorAll<HTMLElement>("[data-node]"));
    if (nodes.length === 0) return;
    const points = nodes.map((node) => {
      const r = node.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
    });
    setGeometry(buildPath(points, box.width, box.height));
  }, []);

  useLayoutEffect(() => {
    measure();
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure]);

  // Gambar garis mengikuti scroll, seperti filamen keluar dari nozzle.
  useEffect(() => {
    const list = listRef.current;
    const path = pathRef.current;
    if (!list || !path || !geometry) return;
    const total = path.getTotalLength();

    const apply = (progress: number) => {
      path.style.strokeDashoffset = String(1 - progress);
      const head = headRef.current;
      if (head) {
        const p = path.getPointAtLength(progress * total);
        head.setAttribute("transform", `translate(${p.x} ${p.y})`);
        head.style.opacity = progress > 0.01 && progress < 0.995 ? "1" : "0";
      }
      setActiveCount(geometry.nodeAt.filter((at) => progress >= at - 0.002).length);
    };

    if (reducedMotion) {
      apply(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const horizontal = geometry.width > geometry.height;
      // Horizontal: garis selesai saat timeline berada di tengah layar.
      // Vertikal: ujung garis mengikuti titik 65% tinggi layar.
      const progress = horizontal
        ? (vh * 0.95 - rect.top) / (vh * 0.95 - vh * 0.35)
        : (vh * 0.65 - rect.top) / rect.height;
      apply(Math.min(1, Math.max(0, progress)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [geometry, reducedMotion]);

  return (
    <ol ref={listRef} className="relative grid gap-12 lg:grid-cols-4 lg:gap-0">
      {geometry && (
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={geometry.width}
          height={geometry.height}
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        >
          {/* Jejak tipis di bawah filamen */}
          <path
            d={geometry.d}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth={1.25}
            strokeDasharray="2 6"
            strokeLinecap="round"
          />
          {/* Filamen PET yang tergambar maju */}
          <path
            ref={pathRef}
            d={geometry.d}
            fill="none"
            stroke="var(--pet)"
            strokeOpacity={0.9}
            strokeWidth={4}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1}
          />
          {/* Ujung nozzle */}
          <g ref={headRef} style={{ opacity: 0, transition: "opacity .2s" }}>
            <circle r={7} fill="var(--pet)" fillOpacity={0.35} />
            <circle r={3.5} fill="var(--pet)" stroke="var(--forest)" strokeWidth={1.5} />
          </g>
        </svg>
      )}

      {steps.map((step, i) => {
        const active = i < activeCount;
        return (
          <li
            key={step.step}
            className="relative grid grid-cols-[3rem_1fr] gap-x-5 lg:block lg:px-5 lg:text-center"
          >
            <div
              data-node=""
              className={cn(
                "relative z-10 flex size-12 items-center justify-center rounded-full border-2 transition-colors duration-500 lg:mx-auto",
                active
                  ? "border-primary bg-primary text-on-primary"
                  : "border-line-strong bg-surface text-accent-ink",
              )}
            >
              <Icon name={step.icon} className="size-6" />
            </div>
            <div className="lg:mt-14">
              <p className="text-sm font-semibold text-muted">Langkah {step.step}</p>
              <h3 className="mt-1 text-xl md:text-2xl">{step.title}</h3>
              <p className="mt-2 text-muted">{step.description}</p>
              {step.tag && (
                <p className="mt-3 inline-flex rounded-full border border-wood/40 bg-wood/10 px-3 py-1 text-xs font-semibold text-wood-ink">
                  {step.tag}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

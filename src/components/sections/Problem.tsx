import Link from "next/link";
import type { ProblemPoint } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Problem({ points }: { points: ProblemPoint[] }) {
  const [waste, generic] = points;

  return (
    <section
      id="masalah"
      aria-labelledby="masalah-title"
      className="border-y border-line bg-surface py-20 md:py-28"
    >
      <Container>
        <SectionHeading
          id="masalah-title"
          eyebrow="Kenapa Morvo ada"
          title="Dua masalah yang kami lihat setiap hari"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {waste && (
            <Reveal as="article" aria-labelledby={`masalah-${waste.id}`}>
              <p className="text-sm font-semibold text-accent-ink">{waste.eyebrow}</p>
              <h3 id={`masalah-${waste.id}`} className="mt-2 text-2xl md:text-3xl">
                {waste.title}
              </h3>
              <p className="mt-4 text-muted">{waste.body}</p>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {waste.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(11rem,auto)_1fr] sm:items-baseline"
                  >
                    <dt className="sr-only">{fact.label}</dt>
                    <dd className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                      {fact.value}
                    </dd>
                    <dd>
                      <span className="block text-fg">{fact.label}</span>
                      {fact.note && (
                        <span className="mt-1 block text-sm text-muted">{fact.note}</span>
                      )}
                      <a
                        href={fact.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-muted underline decoration-line-strong underline-offset-2 hover:text-accent-ink"
                      >
                        Sumber: {fact.source.label}
                        {fact.source.date && `, ${fact.source.date}`}
                        <span className="sr-only"> (membuka tab baru)</span>
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          {generic && (
            <Reveal delay={120} className="flex flex-col gap-6">
              <Card className="p-7 md:p-8">
                <article aria-labelledby={`masalah-${generic.id}`}>
                  <p className="text-sm font-semibold text-wood-ink">{generic.eyebrow}</p>
                  <h3 id={`masalah-${generic.id}`} className="mt-2 text-2xl md:text-3xl">
                    {generic.title}
                  </h3>
                  <p className="mt-4 text-muted">{generic.body}</p>
                </article>
              </Card>

              <div className="relative overflow-hidden rounded-card bg-deep p-7 text-on-deep md:p-8">
                <div
                  aria-hidden="true"
                  className="layer-lines pointer-events-none absolute inset-0 text-on-deep opacity-[0.05]"
                />
                <p className="relative font-serif text-xl leading-snug font-semibold md:text-2xl">
                  Morvo menjawab keduanya: botol bekas menjadi bahan baku, dan setiap
                  penghargaan membawa cerita dari pemberinya.
                </p>
                <Link
                  href="/#proses"
                  className="relative mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-pet hover:underline"
                >
                  Lihat prosesnya
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

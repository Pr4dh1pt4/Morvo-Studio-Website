import type { AudienceSegment, SiteConfig } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/cn";

type AudienceProps = {
  segments: AudienceSegment[];
  site: SiteConfig;
};

// Aksen per kartu: individu memakai biru PET, institusi memakai kayu.
const accents = [
  { band: "text-pet opacity-90", label: "text-accent-ink", variant: "primary" as const },
  { band: "text-wood opacity-60", label: "text-wood-ink", variant: "secondary" as const },
];

export function Audience({ segments, site }: AudienceProps) {
  return (
    <section id="untuk-siapa" aria-labelledby="untuk-siapa-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="untuk-siapa-title"
          eyebrow="Untuk siapa"
          title="Untuk yang ingin menghargai dengan cara yang berbeda"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {segments.map((segment, i) => {
            const accent = accents[i % accents.length];
            return (
              <Reveal
                as="article"
                key={segment.id}
                delay={i * 120}
                aria-labelledby={`segmen-${segment.id}`}
                className="relative flex flex-col overflow-hidden rounded-card border border-line bg-surface"
              >
                <div aria-hidden="true" className={cn("layer-lines h-3", accent.band)} />
                <div className="flex flex-1 flex-col p-7 md:p-10">
                  <h3 id={`segmen-${segment.id}`} className="text-3xl md:text-4xl">
                    {segment.title}
                  </h3>
                  <p className="mt-3 text-lg text-muted">{segment.lead}</p>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Siapa">
                    {segment.who.map((who) => (
                      <li
                        key={who}
                        className="rounded-full border border-line-strong px-3 py-1 text-sm font-semibold"
                      >
                        {who}
                      </li>
                    ))}
                  </ul>

                  <h4 className={cn("mt-8 text-sm font-semibold tracking-wide uppercase", accent.label)}>
                    Biasanya untuk
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {segment.useCases.map((use) => (
                      <li key={use} className="grid grid-cols-[1.25rem_1fr] gap-2">
                        <Icon name="arrow-right" className="mt-1 size-4 text-leaf" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-9">
                    <ButtonLink
                      href={whatsappLink(site.contact, segment.cta.whatsappMessage)}
                      variant={accent.variant}
                      size="lg"
                      icon={<Icon name="whatsapp" className="size-5" />}
                      iconPosition="start"
                    >
                      {segment.cta.label}
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

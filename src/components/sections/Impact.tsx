import type { Stat } from "@/content/types";
import { DataFlag } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Impact({ stats }: { stats: Stat[] }) {
  const hasEstimate = stats.some((s) => s.isEstimate);

  return (
    <section
      id="dampak"
      aria-labelledby="dampak-title"
      className="relative overflow-hidden border-y border-line bg-surface py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="layer-lines pointer-events-none absolute inset-x-0 bottom-0 h-40 text-pet opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]"
      />
      <Container className="relative">
        <SectionHeading
          id="dampak-title"
          eyebrow="Dampak"
          title="Setiap pesanan mengurangi botol yang terbuang"
        />
        <dl className="mt-14 grid gap-y-10 md:grid-cols-3 md:divide-x md:divide-line">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col md:px-8 md:first:pl-0 md:last:pr-0">
              <dt className="order-2 mt-3 flex flex-wrap items-center gap-2 text-lg font-semibold text-fg">
                {stat.label}
                {stat.isEstimate && <DataFlag />}
              </dt>
              <dd className="order-1 font-serif text-6xl leading-none font-semibold text-heading md:text-7xl">
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </dd>
              {stat.note && <dd className="order-3 mt-2 text-sm text-muted">{stat.note}</dd>}
            </div>
          ))}
        </dl>
        {hasEstimate && (
          <p className="mt-12 max-w-2xl text-sm text-muted">
            Angka bertanda estimasi adalah perkiraan tahap awal produksi dan akan diperbarui
            dengan data pencatatan bersama mitra bank sampah.
          </p>
        )}
      </Container>
    </section>
  );
}

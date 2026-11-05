import type { ProcessStep } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "./ProcessTimeline";

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section id="proses" aria-labelledby="proses-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="proses-title"
          eyebrow="Proses"
          title="Dari botol bekas sampai di tangan penerima"
          lead="Empat langkah yang mengubah botol minuman menjadi benda yang disimpan bertahun-tahun. Semuanya berawal dari kemitraan dengan bank sampah."
        />
        <div className="mt-14 lg:mt-20">
          <ProcessTimeline steps={steps} />
        </div>
      </Container>
    </section>
  );
}

import { Audience } from "@/components/sections/Audience";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Partners } from "@/components/sections/Partners";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { QrLetter } from "@/components/sections/QrLetter";
import {
  getAudienceSegments,
  getHeroStat,
  getImpactStats,
  getPartners,
  getProblemPoints,
  getProcessSteps,
  getProducts,
  getQrLetterById,
  getQrLetterSteps,
  getSite,
} from "@/content";
import { pageMetadata } from "@/lib/seo";

const { name, tagline, description } = getSite();

export const metadata = pageMetadata({
  title: `${name} | ${tagline}`,
  absoluteTitle: true,
  description,
  path: "/",
});

export default async function HomePage() {
  const site = getSite();
  const [
    heroStat,
    problemPoints,
    processSteps,
    products,
    qrSteps,
    qrSample,
    segments,
    stats,
    partners,
  ] = await Promise.all([
    getHeroStat(),
    getProblemPoints(),
    getProcessSteps(),
    getProducts(),
    getQrLetterSteps(),
    getQrLetterById("contoh"),
    getAudienceSegments(),
    getImpactStats(),
    getPartners(),
  ]);

  return (
    <>
      <Hero site={site} stat={heroStat} />
      <Problem points={problemPoints} />
      <Process steps={processSteps} />
      <Products products={products} site={site} />
      {qrSample && <QrLetter steps={qrSteps} sample={qrSample} />}
      <Audience segments={segments} site={site} />
      <Impact stats={stats} />
      <Partners partners={partners} site={site} />
      <Contact site={site} />
    </>
  );
}

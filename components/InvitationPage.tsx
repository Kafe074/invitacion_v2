import CountdownBadge from "./CountdownBadge";
import EntryGate from "./entry/EntryGate";
import GallerySection from "./GallerySection";
import GiftsSection from "./GiftsSection";
import GuestBlock from "./GuestBlock";
import { GuestProvider, type Guest } from "./GuestProvider";
import HeroSplit from "./HeroSplit";
import DotsCTA from "./DotsCTA";
import PadrinosSection from "./PadrinosSection";
import PartyCards from "./PartyCards";
import RsvpSection from "./RsvpSection";
import SiteFooter from "./SiteFooter";
import VenuesSection from "./VenuesSection";
import WaveDivider from "./WaveDivider";
import { weddingData } from "@/data/weddingData";

export default function InvitationPage({ guest }: { guest: Guest | null }) {
  const { couple, photos, song } = weddingData;
  const coupleNames = `${couple.brideFirstName} y ${couple.groomFirstName}`;

  return (
    <EntryGate
      coupleNames={coupleNames}
      backgroundPhoto={photos.hero}
      songSrc={song.src}
    >
      <GuestProvider guest={guest}>
        <main className="overflow-hidden bg-sky">
          <HeroSplit />
          <WaveDivider color="var(--color-sky-deep)" height={70} />
          <div className="-mt-24">
            <CountdownBadge targetISO={weddingData.weddingDateISO} />
          </div>

          <GuestBlock />

          <PadrinosSection />

          <VenuesSection />
          <WaveDivider color="var(--color-sky-deep)" height={70} flip />

          <RsvpSection />

          <GallerySection />
          <WaveDivider color="var(--color-sky-deep)" height={70} />

          <div id="fiesta">
            <PartyCards />
          </div>

          <GiftsSection />

          <DotsCTA />

          <SiteFooter />
        </main>
      </GuestProvider>
    </EntryGate>
  );
}

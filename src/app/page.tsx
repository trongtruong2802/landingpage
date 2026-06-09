import { BankSection } from "@/components/wedding/BankSection";
import { CountdownSection } from "@/components/wedding/CountdownSection";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { EventSection } from "@/components/wedding/EventSection";
import { FooterSection } from "@/components/wedding/FooterSection";
import { FloatingPetals } from "@/components/wedding/FloatingPetals";
import { GallerySection } from "@/components/wedding/GallerySection";
import { HeroSection } from "@/components/wedding/HeroSection";
import { LoveStorySection } from "@/components/wedding/LoveStorySection";
import { MapSection } from "@/components/wedding/MapSection";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { SectionDivider } from "@/components/wedding/SectionDivider";
import { WishesSection } from "@/components/wedding/WishesSection";
import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";

const navigationItems = [
  { href: "#countdown", label: "Countdown" },
  { href: "#couple", label: "Cap doi" },
  { href: "#love-story", label: "Cau chuyen" },
  { href: "#gallery", label: "Album" },
  { href: "#event-section", label: "Su kien" },
  { href: "#map-section", label: "Ban do" },
  { href: "#rsvp-section", label: "RSVP" },
  { href: "#wishes-section", label: "Loi chuc" },
  { href: "#bank-section", label: "Mung cuoi" }
];

const INVITATION_TEXT =
  "\u0054\u0072\u00e2\u006e\u0020\u0074\u0072\u1ecd\u006e\u0067\u0020\u006b\u00ed\u006e\u0068\u0020\u006d\u1eddi";
const COUNTDOWN_TITLE =
  "\u0110\u1ebf\u006d\u0020\u006e\u0067\u01b0\u1ee3\u0063\u0020\u0111\u1ebf\u006e\u0020\u006e\u0067\u00e0\u0079\u0020\u0068\u1ea1\u006e\u0068\u0020\u0070\u0068\u00fa\u0063";
const COUNTDOWN_SUBTITLE =
  "\u0048\u00e0\u006e\u0068\u0020\u0074\u0072\u00ec\u006e\u0068\u0020\u0064\u1eab\u006e\u0020\u0111\u1ebf\u006e\u0020\u006e\u0067\u00e0\u0079\u0020\u0111\u1eb7\u0063\u0020\u0062\u0069\u1ec7\u0074\u0020\u0111\u01b0\u1ee3\u0063\u0020\u0111\u0065\u006d\u0020\u0111\u1ebf\u006d\u0020\u0071\u0075\u0061\u0020\u0074\u1eeb\u006e\u0067\u0020\u006b\u0068\u006f\u1ea3\u006e\u0068\u0020\u006b\u0068\u1eaf\u0063\u002c\u0020\u006d\u1ed9\u0074\u0020\u0063\u00e1\u0063\u0068\u0020\u006e\u0068\u1eb9\u0020\u006e\u0068\u00e0\u006e\u0067\u0020\u006e\u0068\u01b0\u006e\u0067\u0020\u0073\u0061\u006e\u0067\u0020\u0074\u0072\u1ecd\u006e\u0067\u002e";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,_rgba(199,165,109,0.22),_transparent_54%)]" />
      <div className="pointer-events-none absolute left-[-4rem] top-[34rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(188,138,148,0.14),_transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-3rem] top-[86rem] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(199,165,109,0.16),_transparent_66%)] blur-3xl" />
      <FloatingPetals />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[rgba(255,249,244,0.72)] backdrop-blur-2xl">
          <Container className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.45em] text-[color:var(--accent-rose-deep)]">
                Wedding Day
              </p>
              <p className="mt-1 font-script text-[2rem] leading-none text-[color:var(--foreground)] sm:text-[2.35rem]">
                {weddingData.bride.nickname}{" "}
                <span className="mx-1 text-[color:var(--primary)]">&</span>{" "}
                {weddingData.groom.nickname}
              </p>
            </div>

            <nav
              aria-label="Dieu huong landing page"
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:justify-end"
            >
              {navigationItems.map((item) => (
                <a
                  className="min-h-11 whitespace-nowrap rounded-full border border-[color:var(--border)] bg-white/60 px-3 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--muted)] shadow-[0_10px_24px_rgba(125,87,79,0.08)] transition hover:border-[color:var(--accent-rose)] hover:bg-white/80 hover:text-[color:var(--foreground)] sm:px-4 sm:text-xs sm:tracking-[0.22em]"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </Container>
        </header>

        <HeroSection
          backgroundImage={weddingData.coverImage}
          brideName={weddingData.bride.fullName}
          groomName={weddingData.groom.fullName}
          invitationText={INVITATION_TEXT}
          weddingDate={weddingData.weddingDate.display}
        />

        <CountdownSection
          className="-mt-6 relative z-10 sm:-mt-10"
          targetDate={weddingData.weddingDate.iso}
          targetDateLabel={weddingData.weddingDate.display}
          title={COUNTDOWN_TITLE}
          subtitle={COUNTDOWN_SUBTITLE}
        />

        <SectionDivider />

        <CoupleSection
          bride={{
            description: weddingData.bride.description,
            image: weddingData.bride.image,
            name: weddingData.bride.fullName,
            role: weddingData.bride.role
          }}
          groom={{
            description: weddingData.groom.description,
            image: weddingData.groom.image,
            name: weddingData.groom.fullName,
            role: weddingData.groom.role
          }}
        />

        <LoveStorySection />
        <SectionDivider />
        <GallerySection />
        <SectionDivider />
        <EventSection />
        <MapSection />
        <RSVPSection />
        <WishesSection />
        <SectionDivider />
        <BankSection />
        <FooterSection />
      </div>
    </main>
  );
}

import { AudioPlayer } from "@/components/wedding/AudioPlayer";
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
  { href: "#couple", label: "Cặp đôi" },
  { href: "#love-story", label: "Câu chuyện" },
  { href: "#gallery", label: "Album" },
  { href: "#event-section", label: "Sự kiện" },
  { href: "#map-section", label: "Bản đồ" },
  { href: "#rsvp-section", label: "RSVP" },
  { href: "#wishes-section", label: "Lời chúc" },
  { href: "#bank-section", label: "Mừng cưới" }
];

const INVITATION_TEXT = "Trân trọng kính mời";
const COUNTDOWN_TITLE = "Đếm ngược đến ngày hạnh phúc";
const COUNTDOWN_SUBTITLE = "Hành trình dẫn đến ngày đặc biệt được đong đếm qua từng khoảnh khắc, một cách nhẹ nhàng và trọn vẹn.";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,_rgba(199,165,109,0.22),_transparent_54%)]" />
      <div className="pointer-events-none absolute left-[-4rem] top-[34rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(188,138,148,0.14),_transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-3rem] top-[86rem] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(199,165,109,0.16),_transparent_66%)] blur-3xl" />
      <FloatingPetals />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[rgba(255,249,244,0.72)] backdrop-blur-2xl">
          <Container className="flex flex-col items-center gap-3 py-3 sm:py-4">
            <div className="text-center">
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
              aria-label="Điều hướng thiệp cưới"
              className="-mx-1 flex flex-wrap justify-center gap-2 px-1 pb-1"
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
        <AudioPlayer />
      </div>
    </main>
  );
}

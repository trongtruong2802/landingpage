import { Container } from "@/components/ui/container";
import { SafeImage } from "@/components/ui/SafeImage";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

export type LoveStorySectionProps = {
  className?: string;
  eyebrow?: string;
  subtitle?: string;
  title?: string;
};

const DEFAULT_EYEBROW = "Love Story";
const DEFAULT_TITLE = "Timeline cua nhung cot moc dan loi den ngay thanh hon";
const DEFAULT_SUBTITLE =
  "Moi khoanh khac trong hanh trinh yeu thuong deu co the duoc ke lai bang ngay thang, hinh anh va mot vai dong ngan gon. Tren mobile, timeline uu tien de doc va de cham.";
const STORY_FALLBACK_IMAGE = "/images/story/story-placeholder.svg";

export function LoveStorySection({
  className,
  eyebrow = DEFAULT_EYEBROW,
  subtitle = DEFAULT_SUBTITLE,
  title = DEFAULT_TITLE
}: LoveStorySectionProps) {
  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="love-story">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--accent-rose-deep)]">
            {eyebrow}
          </p>
          <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
            {title}
          </h2>
          <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-[linear-gradient(180deg,rgba(188,138,148,0),rgba(199,165,109,0.56),rgba(188,138,148,0.24),rgba(188,138,148,0))] sm:left-6 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-10 sm:space-y-12 lg:space-y-16">
            {weddingData.loveStory.map((item, index) => (
              <TimelineItem index={index} item={item} key={`${item.date}-${item.title}`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

type TimelineItemProps = {
  index: number;
  item: (typeof weddingData.loveStory)[number];
};

function TimelineItem({ index, item }: TimelineItemProps) {
  const isRightAligned = index % 2 === 1;
  const diaryLabel = `Nhat ky ${String(index + 1).padStart(2, "0")}`;

  return (
    <article className="relative pl-12 sm:pl-16 lg:pl-0">
      <div className="absolute left-5 top-12 -translate-x-1/2 sm:left-6 lg:left-1/2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-[linear-gradient(145deg,rgba(255,252,247,0.96),rgba(248,231,223,0.96))] shadow-[0_16px_36px_rgba(125,87,79,0.14)] backdrop-blur-md">
          <HeartIcon className="h-4 w-4 text-[color:var(--accent-rose-deep)]" />
        </div>
      </div>

      <div
        className={cn(
          "wedding-fade-in lg:w-[calc(50%_-_2.5rem)]",
          index === 0 ? "wedding-fade-in-delay-1" : "",
          index === 1 ? "wedding-fade-in-delay-2" : "",
          index >= 2 ? "wedding-fade-in-delay-3" : "",
          isRightAligned ? "lg:ml-auto" : "lg:mr-auto"
        )}
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(252,243,237,0.96))] p-3 shadow-[0_30px_84px_rgba(125,87,79,0.12)] sm:rounded-[2.25rem] sm:p-4">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-white/80" />
          <div className="pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(188,138,148,0.12),transparent_72%)] blur-2xl" />
          <div className="pointer-events-none absolute bottom-6 right-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(199,165,109,0.12),transparent_72%)] blur-2xl" />

          <div className="relative rounded-[1.55rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,249,244,0.96))] px-5 py-5 sm:rounded-[1.8rem] sm:px-7 sm:py-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex w-max items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/72 px-3 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--accent-rose-deep)] shadow-[0_10px_24px_rgba(125,87,79,0.08)]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent-rose-soft)] text-[color:var(--accent-rose-deep)]">
                  <FlowerIcon className="h-3.5 w-3.5" />
                </span>
                {diaryLabel}
              </div>

              <div className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.3em] text-[color:var(--primary-strong)] sm:text-right">
                <span className="h-px w-8 bg-[color:var(--primary)]/45" />
                {item.date}
              </div>
            </div>

            {item.image ? (
              <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[1.4rem] shadow-[0_22px_50px_rgba(125,87,79,0.16)] sm:rounded-[1.7rem]">
                <SafeImage
                  alt={item.image.alt}
                  className="object-cover object-center"
                  fallbackSrc={STORY_FALLBACK_IMAGE}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  src={item.image.src}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,28,26,0.06)_0%,rgba(45,28,26,0)_46%,rgba(45,28,26,0.18)_100%)]" />
              </div>
            ) : (
              <div className="mt-6 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                <span className="h-px flex-1 bg-[color:var(--border)]" />
                Ghi chu cua hanh trinh
                <span className="h-px flex-1 bg-[color:var(--border)]" />
              </div>
            )}

            <div className="mt-6 sm:mt-7">
              <h3 className="font-display text-[1.8rem] leading-tight text-[color:var(--foreground)] sm:text-[2.5rem]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--muted)] sm:text-base">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

type IconProps = {
  className?: string;
};

function HeartIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.999 21.145a.75.75 0 0 1-.53-.22l-7.2-7.2a4.92 4.92 0 0 1 6.96-6.96L12 7.537l.771-.772a4.92 4.92 0 1 1 6.96 6.96l-7.2 7.2a.75.75 0 0 1-.532.22Z" />
    </svg>
  );
}

function FlowerIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 5.2c1.2-2.3 4.6-2.2 5.6.2 1 2.5-1 4.6-3.2 5.1 2.3.1 4.4 2.2 3.9 4.8-.6 2.7-3.8 3.7-5.7 1.9.7 2.2-.5 4.9-3 5.3-2.8.5-4.8-1.9-4.4-4.4-1.7 1.8-4.9 1.2-5.6-1.4-.8-2.8 1.4-5 4-5.4-2.2-.4-4-2.5-3.2-5 .8-2.5 4.2-2.8 5.6-.6.5-2.4 3.5-3.3 5-.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" fill="currentColor" r="1.8" />
    </svg>
  );
}

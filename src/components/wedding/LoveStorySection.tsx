import Image from "next/image";

import { Container } from "@/components/ui/container";
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
          <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
            {eyebrow}
          </p>
          <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
            {title}
          </h2>
          <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="relative mt-10 lg:mt-14">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-[linear-gradient(180deg,rgba(178,139,67,0),rgba(178,139,67,0.6),rgba(178,139,67,0))] sm:left-4 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-8 lg:space-y-10">
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

  return (
    <article className="relative pl-9 sm:pl-12 lg:pl-0">
      <div className="absolute left-3 top-8 h-3 w-3 -translate-x-1/2 rounded-full border border-[color:var(--border)] bg-[color:var(--primary)] shadow-[0_0_0_6px_rgba(255,252,247,0.95)] sm:left-4 sm:top-10 sm:h-3.5 sm:w-3.5 lg:left-1/2" />

      <div
        className={cn(
          "wedding-fade-in overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,_rgba(255,255,255,0.9),_rgba(248,241,229,0.92))] shadow-[0_24px_80px_rgba(86,66,32,0.08)] lg:w-[calc(50%_-_2rem)]",
          index === 0 ? "wedding-fade-in-delay-1" : "",
          index === 1 ? "wedding-fade-in-delay-2" : "",
          index >= 2 ? "wedding-fade-in-delay-3" : "",
          isRightAligned ? "lg:ml-auto" : "lg:mr-auto"
        )}
      >
        {item.image ? (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              alt={item.image.alt}
              className="object-cover object-center"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={item.image.src}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,18,11,0.1)_0%,rgba(26,18,11,0)_48%,rgba(26,18,11,0.28)_100%)]" />
          </div>
        ) : null}

        <div className="p-5 sm:p-8">
          <p className="text-[0.68rem] uppercase tracking-[0.38em] text-[color:var(--primary)]">
            {item.date}
          </p>
          <h3 className="mt-4 font-display text-[1.75rem] text-[color:var(--foreground)] sm:text-4xl">
            {item.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

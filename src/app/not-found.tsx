import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-xl rounded-[2rem] border border-[color:var(--border)] bg-white/80 p-10 text-center shadow-[0_24px_60px_rgba(104,71,55,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--primary)]">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl text-[color:var(--foreground)]">
          Trang nay khong ton tai
        </h1>
        <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
          Neu day la site tinh da deploy, hay kiem tra lai duong dan hoac cau hinh host.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-[color:var(--primary-foreground)]"
          href="/"
        >
          Quay lai trang chu
        </Link>
      </div>
    </main>
  );
}

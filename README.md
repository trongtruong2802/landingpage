# Wedding Landing Page

Landing page thiep cuoi tinh duoc xay dung bang `Next.js App Router + TypeScript + Tailwind CSS`.

## Tong quan

- Khong database
- Khong backend
- Khong API
- Toan bo noi dung duoc hard-code trong file data tinh
- Build ra site static bang `output: "export"`
- San sang deploy len Vercel

## Cau truc chinh

```text
src/
  app/
    globals.css
    icon.svg
    layout.tsx
    not-found.tsx
    page.tsx
  components/
    ui/
    wedding/
  constants/
    wedding-data.ts
  lib/
    cn.ts
public/
  images/
    album/
    couple/
    cover/
    qr/
    story/
```

## Chay local

```bash
npm install
npm run dev
```

Mo [http://localhost:3000](http://localhost:3000) de xem giao dien.

## Kiem tra chat luong

```bash
npm run lint
npm run typecheck
npm run build
```

Lenh `npm run build` se tao output static trong thu muc `out/`.

## Chinh sua noi dung

- `src/constants/wedding-data.ts`: ten co dau chu re, ngay cuoi, album, timeline, su kien, ban do, QR ngan hang, loi chuc mau
- `src/app/layout.tsx`: metadata SEO, title, description, OpenGraph
- `src/app/page.tsx`: thu tu va bo cuc tong the cua landing page
- `src/components/wedding/*`: tung section cua trang

## Hinh anh

Dat anh that vao cac thu muc ben duoi `public/images/` va giu dung ten file dang duoc khai bao trong `src/constants/wedding-data.ts`.

Vi du:

- `public/images/cover/wedding-cover.svg`
- `public/images/couple/bride.svg`
- `public/images/couple/groom.svg`
- `public/images/story/story-placeholder.svg`
- `public/images/album/album-placeholder.svg`
- `public/images/qr/bank-qr.svg`

## Deploy Vercel

1. Push source code len GitHub, GitLab hoac Bitbucket.
2. Import project vao Vercel.
3. Framework preset: `Next.js`.
4. Khong can cau hinh database, backend hay API.
5. Chay deploy, Vercel se build tu lenh `npm run build`.

Neu dung domain rieng, ban co the tro domain trong Vercel sau khi deploy xong.

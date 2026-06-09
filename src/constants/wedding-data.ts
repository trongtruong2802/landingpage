export type WeddingPerson = {
  description: string;
  fullName: string;
  image: WeddingImage;
  nickname?: string;
  role: string;
};

export type WeddingDate = {
  iso: string;
  display: string;
  lunar?: string;
};

export type WeddingImage = {
  alt: string;
  src: string;
};

export type LoveStoryEntry = {
  date: string;
  description: string;
  image?: WeddingImage;
  title: string;
};

export type AlbumPhoto = {
  alt: string;
  caption?: string;
  src: string;
};

export type WeddingEvent = {
  address: string;
  date: string;
  description?: string;
  mapUrl?: string;
  time: string;
  title: string;
  type: "ceremony" | "reception" | "after-party";
  venue: string;
};

export type BankQrInfo = {
  accountName: string;
  accountNumber: string;
  bankName: string;
  qrImage: WeddingImage;
};

export type SampleWish = {
  author: string;
  message: string;
};

export type WeddingData = {
  album: AlbumPhoto[];
  bankQr: BankQrInfo;
  bride: WeddingPerson;
  coverImage: WeddingImage;
  events: WeddingEvent[];
  groom: WeddingPerson;
  loveStory: LoveStoryEntry[];
  mapsDirectionsUrl: string;
  mapsEmbedUrl: string;
  sampleWishes: SampleWish[];
  weddingDate: WeddingDate;
};

export const weddingData: WeddingData = {
  groom: {
    fullName: "\u0043\u00e1\u0020\u004d\u1ead\u0070",
    nickname: "\u004d\u1ead\u0070",
    role: "Chu re",
    description:
      "\u0043\u00e1\u0020\u004d\u1ead\u0070\u0020\u006c\u00e0\u0020\u006e\u0067\u01b0\u1eddi\u0020\u0074\u0069\u006e\u0068\u0020\u0074\u1ebf\u002c\u0020\u0111\u0069\u1ec1\u006d\u0020\u0111\u1ea1\u006d\u0020\u0076\u00e0\u0020\u006c\u0075\u00f4\u006e\u0020\u0064\u00e0\u006e\u0068\u0020\u0073\u1ef1\u0020\u0074\u0072\u00e2\u006e\u0020\u0074\u0072\u1ecd\u006e\u0067\u0020\u0063\u0068\u006f\u0020\u006e\u0068\u1eef\u006e\u0067\u0020\u0111\u0069\u1ec1\u0075\u0020\u0067\u0069\u1ea3\u006e\u0020\u0064\u1ecb\u0020\u006e\u0068\u1ea5\u0074\u0020\u0074\u0072\u006f\u006e\u0067\u0020\u0074\u00ec\u006e\u0068\u0020\u0079\u00ea\u0075\u0020\u0076\u00e0\u0020\u0067\u0069\u0061\u0020\u0111\u00ec\u006e\u0068\u002e",
    image: {
      src: "/images/couple/groom.svg",
      alt: "Chan dung chu re"
    }
  },
  bride: {
    fullName: "\u0043\u00e1\u0020\u0110\u0075\u1ed1\u0069",
    nickname: "\u0110\u0075\u1ed1\u0069",
    role: "Co dau",
    description:
      "\u0043\u00e1\u0020\u0110\u0075\u1ed1\u0069\u0020\u006d\u0061\u006e\u0067\u0020\u0111\u1ebf\u006e\u0020\u0063\u1ea3\u006d\u0020\u0067\u0069\u00e1\u0063\u0020\u006e\u0068\u1eb9\u0020\u006e\u0068\u00e0\u006e\u0067\u002c\u0020\u1ea5\u006d\u0020\u00e1\u0070\u0020\u0076\u00e0\u0020\u0074\u0068\u0061\u006e\u0068\u0020\u006c\u1ecb\u0063\u0068\u002c\u0020\u006e\u0068\u01b0\u0020\u0063\u00e1\u0063\u0068\u0020\u0063\u00f4\u0020\u1ea5\u0079\u0020\u006c\u0075\u00f4\u006e\u0020\u0063\u0068\u0103\u006d\u0020\u0063\u0068\u00fa\u0074\u0020\u0063\u0068\u006f\u0020\u006d\u1ed7\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e\u0068\u0020\u006b\u0068\u1eaf\u0063\u0020\u0111\u00e1\u006e\u0067\u0020\u006e\u0068\u1edb\u0020\u0074\u0072\u006f\u006e\u0067\u0020\u0063\u0075\u1ed9\u0063\u0020\u0073\u1ed1\u006e\u0067\u002e",
    image: {
      src: "/images/couple/bride.svg",
      alt: "Chan dung co dau"
    }
  },
  weddingDate: {
    iso: "2026-12-21T11:00:00+07:00",
    display:
      "\u0054\u0068\u1ee9\u0020\u0048\u0061\u0069\u002c\u0020\u0032\u0031\u0020\u0074\u0068\u00e1\u006e\u0067\u0020\u0031\u0032\u0020\u006e\u0103\u006d\u0020\u0032\u0030\u0032\u0036",
    lunar: "11 thang 11 nam Binh Ngo"
  },
  coverImage: {
    src: "/images/cover/wedding-cover.svg",
    alt:
      "\u1ea2\u006e\u0068\u0020\u0062\u00ec\u0061\u0020\u006c\u0061\u006e\u0064\u0069\u006e\u0067\u0020\u0070\u0061\u0067\u0065\u0020\u0111\u00e1\u006d\u0020\u0063\u01b0\u1edb\u0069\u0020\u0063\u1ee7\u0061\u0020\u0043\u00e1\u0020\u0110\u0075\u1ed1\u0069\u0020\u0076\u00e0\u0020\u0043\u00e1\u0020\u004d\u1ead\u0070"
  },
  loveStory: [
    {
      date: "03.2021",
      title: "Lan dau gap go",
      description:
        "Chung minh gap nhau trong mot buoi ca phe nho sau gio lam. Tu cau chao hoi rat binh thuong, ca hai bat dau noi chuyen nhieu hon mong doi.",
      image: {
        src: "/images/story/story-placeholder.svg",
        alt: "Lan dau gap nhau trong mot khong gian am cung"
      }
    },
    {
      date: "11.2022",
      title: "Dong hanh cung nhau",
      description:
        "Sau nhieu hanh trinh nho, nhung chuyen di ngan va nhung ngay ban ron, chung minh hoc cach lang nghe, chia se va luon chon nhau.",
      image: {
        src: "/images/story/story-placeholder.svg",
        alt: "Cap doi dong hanh trong nhung chuyen di va ky niem"
      }
    },
    {
      date: "12.2025",
      title: "Loi cau hon",
      description:
        "Trong mot buoi toi am ap ben gia dinh va ban be than thiet, loi hua cho chang duong moi da duoc noi ra mot cach gian di nhung chan thanh."
    }
  ],
  album: [
    {
      src: "/images/album/album-placeholder.svg",
      alt: "Cap doi di dao trong khu vuon xanh",
      caption: "Buoi chieu nhe nhang truoc ngay cuoi"
    },
    {
      src: "/images/album/album-placeholder.svg",
      alt: "Co dau va chu re mim cuoi cung nhau",
      caption: "Khoanh khac tu nhien va am ap"
    },
    {
      src: "/images/album/album-placeholder.svg",
      alt: "Cap doi nam tay trong concept pre-wedding",
      caption: "Mot chut lang man giua thanh pho"
    },
    {
      src: "/images/album/album-placeholder.svg",
      alt: "Chan dung co dau chu re voi background toi gian",
      caption: "Bo anh co the thay bang asset that trong public/images"
    }
  ],
  events: [
    {
      type: "ceremony",
      title: "Le gia tien",
      date: "20.12.2026",
      time: "09:00",
      venue: "Tu gia nha gai",
      address: "12 Nguyen Van Huong, Thu Duc, TP. Ho Chi Minh",
      description: "Don khach, cu hanh le gia tien va nghi thuc ra mat hai ho.",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=12+Nguyen+Van+Huong%2C+Thu+Duc%2C+TP.+Ho+Chi+Minh"
    },
    {
      type: "reception",
      title: "Tiec cuoi nha gai",
      date: "21.12.2026",
      time: "11:00",
      venue: "Gem Riverside",
      address: "25 Mai Chi Tho, Thu Duc, TP. Ho Chi Minh",
      description: "Tiec than mat cung gia dinh, nguoi than va ban be ben nha gai.",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=25+Mai+Chi+Tho%2C+Thu+Duc%2C+TP.+Ho+Chi+Minh"
    },
    {
      type: "after-party",
      title: "Tiec cuoi nha trai",
      date: "21.12.2026",
      time: "18:00",
      venue: "Maison de Charme",
      address: "88 Song Hanh, Thu Duc, TP. Ho Chi Minh",
      description: "Tiec toi am cung va nghi thuc chung vui ben gia dinh nha trai.",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=88+Song+Hanh%2C+Thu+Duc%2C+TP.+Ho+Chi+Minh"
    }
  ],
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=88+Song+Hanh%2C+Thu+Duc%2C+TP.+Ho+Chi+Minh",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=88+Song+Hanh%2C+Thu+Duc%2C+TP.+Ho+Chi+Minh&z=15&output=embed",
  bankQr: {
    bankName: "Techcombank",
    accountName: "Daren",
    accountNumber: "83883888888",
    qrImage: {
      src: "/images/qr/bank-qr.svg",
      alt: "Ma QR ngan hang mung cuoi"
    }
  },
  sampleWishes: [
    {
      author: "Ngoc Ha",
      message: "Chuc hai ban tram nam hanh phuc, mai mai yeu thuong va dong hanh cung nhau."
    },
    {
      author: "Minh Thu",
      message: "Chuc dam cuoi tron ven niem vui, chuc to am moi luon ngap tran tieng cuoi."
    },
    {
      author: "Gia Bao",
      message: "Chuc co dau chu re mot hanh trinh hon nhan binh an, am ap va that nhieu ky niem dep."
    },
    {
      author: "Thanh Nhan",
      message: "Chuc hai ban luon nhin ve cung mot huong, cung xay dung mot mai nha day yeu thuong."
    }
  ]
};

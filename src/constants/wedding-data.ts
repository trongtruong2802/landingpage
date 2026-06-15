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
  groomBank: BankQrInfo;
  brideBank: BankQrInfo;
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
    fullName: "Cá Mập",
    nickname: "Mập",
    role: "Chú rể",
    description:
      "Cá Mập là người tinh tế, điềm đạm và luôn dành sự trân trọng cho những điều giản dị nhất trong tình yêu và gia đình.",
    image: {
      src: "/images/couple/groom.svg",
      alt: "Chân dung chú rể"
    }
  },
  bride: {
    fullName: "Cá Đuối",
    nickname: "Đuối",
    role: "Cô dâu",
    description:
      "Cá Đuối mang đến cảm giác nhẹ nhàng, ấm áp và thanh lịch, như cách cô ấy luôn chăm chút cho mỗi khoảnh khắc đáng nhớ trong cuộc sống.",
    image: {
      src: "/images/couple/bride.svg",
      alt: "Chân dung cô dâu"
    }
  },
  weddingDate: {
    iso: "2026-12-21T11:00:00+07:00",
    display: "Thứ Hai, ngày 21 tháng 12 năm 2026",
    lunar: "11 tháng 11 năm Bính Ngọ"
  },
  coverImage: {
    src: "/images/cover/wedding-cover.svg",
    alt: "Ảnh bìa thiệp cưới của Cá Đuối và Cá Mập"
  },
  loveStory: [
    {
      date: "03.2021",
      title: "Lần đầu gặp gỡ",
      description:
        "Chúng mình gặp nhau trong một buổi cà phê nhỏ sau giờ làm. Từ câu chào hỏi rất bình thường, cả hai bắt đầu nói chuyện nhiều hơn mong đợi.",
      image: {
        src: "/images/story/story-placeholder.svg",
        alt: "Lần đầu gặp nhau trong một không gian ấm cúng"
      }
    },
    {
      date: "11.2022",
      title: "Đồng hành cùng nhau",
      description:
        "Sau nhiều hành trình nhỏ, những chuyến đi ngắn và những ngày bận rộn, chúng mình học cách lắng nghe, chia sẻ và luôn chọn nhau.",
      image: {
        src: "/images/story/story-placeholder.svg",
        alt: "Cặp đôi đồng hành trong những chuyến đi và kỷ niệm"
      }
    },
    {
      date: "12.2025",
      title: "Lời cầu hôn",
      description:
        "Trong một buổi tối ấm áp bên gia đình và bạn bè thân thiết, lời hứa cho chặng đường mới đã được nói ra một cách giản dị nhưng chân thành.",
      image: {
        src: "/images/story/story-placeholder.svg",
        alt: "Lời hứa chân thành cho chặng đường tương lai"
      }
    }
  ],
  album: [
    {
      src: "/images/album/album-placeholder.svg",
      alt: "Cặp đôi đi dạo trong khu vườn xanh",
      caption: "Buổi chiều nhẹ nhàng trước ngày cưới"
    },
    {
      src: "/images/album/album-placeholder.svg",
      alt: "Cô dâu và chú rể mỉm cười cùng nhau",
      caption: "Khoảnh khắc tự nhiên và ấm áp"
    },
    {
      src: "/images/album/album-placeholder.svg",
      alt: "Cặp đôi nắm tay trong concept pre-wedding",
      caption: "Một chút lãng mạn giữa thành phố"
    },
    {
      src: "/images/album/album-placeholder.svg",
      alt: "Chân dung cô dâu chú rể với background tối giản",
      caption: "Bộ ảnh cưới kỉ niệm đầy cảm xúc"
    }
  ],
  events: [
    {
      type: "ceremony",
      title: "Lễ gia tiên",
      date: "20.12.2026",
      time: "09:00",
      venue: "Tư gia nhà gái",
      address: "12 Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",
      description: "Đón khách, cử hành lễ gia tiên và nghi thức ra mắt hai họ.",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=12+Nguyen+Van+Huong%2C+Thu+Duc%2C+TP.+Ho+Chi+Minh"
    },
    {
      type: "reception",
      title: "Tiệc cưới nhà gái",
      date: "21.12.2026",
      time: "11:00",
      venue: "Trung tâm Hội nghị GEM Riverside",
      address: "25 Mai Chí Thọ, An Khánh, TP. Thủ Đức, TP. Hồ Chí Minh",
      description: "Tiệc thân mật cùng gia đình, người thân và bạn bè bên nhà gái.",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=25+Mai+Chi+Tho%2C+Thu+Duc%2C+TP.+Ho+Chi+Minh"
    },
    {
      type: "after-party",
      title: "Tiệc cưới nhà trai",
      date: "21.12.2026",
      time: "18:00",
      venue: "Trung tâm Tiệc cưới Maison de Charme",
      address: "88 Song Hành, An Phú, TP. Thủ Đức, TP. Hồ Chí Minh",
      description: "Tiệc tối ấm cúng và nghi thức chung vui bên gia đình nhà trai.",
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
    accountName: "Cá Mập (Chú rể)",
    accountNumber: "83883888888",
    qrImage: {
      src: "/images/qr/bank-qr.svg",
      alt: "Mã QR ngân hàng mừng cưới"
    }
  },
  groomBank: {
    bankName: "Techcombank",
    accountName: "CÁ MẬP (CHÚ RỂ)",
    accountNumber: "83883888888",
    qrImage: {
      src: "/images/qr/bank-qr.svg",
      alt: "Mã QR ngân hàng mừng cưới chú rể"
    }
  },
  brideBank: {
    bankName: "Vietcombank",
    accountName: "CÁ ĐUỐI (CÔ DÂU)",
    accountNumber: "99999999999",
    qrImage: {
      src: "/images/qr/bank-qr.svg",
      alt: "Mã QR ngân hàng mừng cưới cô dâu"
    }
  },
  sampleWishes: [
    {
      author: "Ngọc Hà",
      message: "Chúc hai bạn trăm năm hạnh phúc, mãi mãi yêu thương và đồng hành cùng nhau."
    },
    {
      author: "Minh Thư",
      message: "Chúc đám cưới trọn vẹn niềm vui, chúc tổ ấm mới luôn ngập tràn tiếng cười."
    },
    {
      author: "Gia Bảo",
      message: "Chúc cô dâu chú rể một hành trình hôn nhân bình an, ấm áp và thật nhiều kỷ niệm đẹp."
    },
    {
      author: "Thanh Nhàn",
      message: "Chúc hai bạn luôn nhìn về cùng một hướng, cùng xây dựng một mái nhà đầy yêu thương."
    }
  ]
};

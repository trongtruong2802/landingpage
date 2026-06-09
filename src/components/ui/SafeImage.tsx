"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "src"> & {
  fallbackSrc: ImageProps["src"];
  src: ImageProps["src"];
};

export function SafeImage({ alt, fallbackSrc, onError, src, ...props }: SafeImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState(src);

  return (
    <Image
      {...props}
      alt={alt}
      key={typeof resolvedSrc === "string" ? resolvedSrc : "safe-image"}
      onError={(event) => {
        setResolvedSrc(fallbackSrc);
        onError?.(event);
      }}
      src={resolvedSrc}
    />
  );
}

import Image from "next/image";
import type { SiteImage } from "@/lib/images";

type FeatureImageProps = {
  image: SiteImage;
};

export function FeatureImage({ image }: FeatureImageProps) {
  return (
    <div className="feature-image-frame">
      <div className="feature-image-accent" />
      <div className="split-feature-image">
        <Image
          src={image.src}
          alt={image.alt}
          width={560}
          height={420}
          className="feature-image"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        <div className="feature-image-overlay" />
      </div>
    </div>
  );
}

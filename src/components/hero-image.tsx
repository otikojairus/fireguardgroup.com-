import Image from "next/image";
import type { SiteImage } from "@/lib/images";

type HeroImageProps = {
  image: SiteImage;
  badge?: string;
};

export function HeroImage({ image, badge = "Certified on-site service" }: HeroImageProps) {
  return (
    <div className="hero-image-frame" aria-hidden={false}>
      <div className="hero-image-accent" />
      <div className="hero-image-wrap">
        <Image
          src={image.src}
          alt={image.alt}
          width={640}
          height={480}
          className="hero-image"
          priority={image.priority ?? false}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="hero-image-overlay" />
        {badge ? <span className="hero-image-badge">{badge}</span> : null}
      </div>
    </div>
  );
}

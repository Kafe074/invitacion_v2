"use client";

export default function HeroVideo({
  src,
  poster,
  ariaLabel,
}: {
  src: string;
  poster: string;
  ariaLabel: string;
}) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      controls={false}
      controlsList="nodownload noplaybackrate nofullscreen"
      onContextMenu={(e) => e.preventDefault()}
      className="absolute inset-0 h-full w-full object-cover"
      aria-label={ariaLabel}
    />
  );
}

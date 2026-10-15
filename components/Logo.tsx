import Image from "next/image";

// Official Nevira logo (public/brand/nevira-logo.png, 384×104 transparent PNG).
export function Logo({ className = "", height = 30 }: { className?: string; height?: number }) {
  return (
    <Image
      src="/brand/nevira-logo.png"
      alt="Nevira"
      width={384}
      height={104}
      priority
      className={`w-auto ${className}`}
      style={{ height }}
    />
  );
}

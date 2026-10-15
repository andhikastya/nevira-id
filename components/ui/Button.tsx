import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "lg" | "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold rounded-[12px] select-none " +
  "transition-[background-color,transform,box-shadow] duration-[120ms] ease-kilau active:scale-[0.98] " +
  "focus-visible:shadow-[0_0_0_3px_rgba(65,38,117,0.2),0_0_0_1px_#8d6fd5]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-1 hover:bg-accent-hover",
  secondary: "bg-background text-text-1 border border-border-visible shadow-1 hover:bg-surface-1",
  tertiary: "bg-transparent text-text-1 hover:bg-surface-1",
};

const sizes: Record<Size, string> = {
  lg: "h-[52px] px-5 text-[16px]",
  md: "h-12 px-4 text-[16px]",
  sm: "h-10 px-3 text-[14px]",
};

type Common = { variant?: Variant; size?: Size; icon?: string; trailingIcon?: string; children: ReactNode; className?: string };

export function buttonClass(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

function Inner({ icon, trailingIcon, children }: Pick<Common, "icon" | "trailingIcon" | "children">) {
  return (
    <>
      {icon && <i className={`${icon} text-[20px] leading-none`} aria-hidden />}
      <span>{children}</span>
      {trailingIcon && <i className={`${trailingIcon} text-[20px] leading-none`} aria-hidden />}
    </>
  );
}

export function ButtonLink({
  variant,
  size,
  icon,
  trailingIcon,
  children,
  className,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = rest.href?.startsWith("http");
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      data-variant={variant ?? "primary"}
      className={buttonClass(variant, size, className)}
    >
      <Inner icon={icon} trailingIcon={trailingIcon}>
        {children}
      </Inner>
    </a>
  );
}

export function Button({
  variant,
  size,
  icon,
  trailingIcon,
  children,
  className,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...rest} className={buttonClass(variant, size, className)}>
      <Inner icon={icon} trailingIcon={trailingIcon}>
        {children}
      </Inner>
    </button>
  );
}

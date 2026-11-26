type Props = {
  height?: number;
  color?: string;
  size?: number;
  perspective?: number;
  animated?: boolean;
  className?: string;
};

/** Perspective grid "floor" that recedes toward the horizon. Leave `color` unset to follow the theme. */
export function GridFloor({
  height = 420,
  color,
  size = 64,
  perspective = 600,
  animated = true,
  className = "",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -left-[20%] -right-[20%] -bottom-[60px] ${className}`}
      style={{ height, perspective }}
    >
      <div
        className={`grid-floor absolute inset-0 ${animated ? "animate-floor" : ""}`}
        style={{ ...(color ? { ["--grid-color" as string]: color } : {}), ["--grid-size" as string]: `${size}px` }}
      />
    </div>
  );
}

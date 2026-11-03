import { type LucideIcon } from "lucide-react";
import type { FC } from "react";

export const PizzaIllustration: FC<{ icons: LucideIcon[] }> = ({ icons }) => {
  const iconCount = icons.length;

  return (
    <div className="relative h-full w-full rounded-full border-10 border-double border-black">
      {icons.map((Icon, index) => {
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / iconCount;
        const radius = iconCount === 1 ? 0 : 25;
        const iconSize =
          iconCount === 1
            ? 30
            : Math.min(30, Math.max(8, 68 * Math.sin(Math.PI / iconCount) - 4));

        return (
          <Icon
            key={index}
            className="absolute text-black"
            style={{
              width: `${iconSize}%`,
              height: `${iconSize}%`,
              left: `${50 + radius * Math.cos(angle)}%`,
              top: `${50 + radius * Math.sin(angle)}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
};

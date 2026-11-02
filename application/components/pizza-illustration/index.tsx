import { Beef, Broccoli, Fish } from "lucide-react";

const icons = [Beef, Broccoli, Fish];
const iconCount = icons.length;

export const PizzaIllustration = () => (
  <div className="h-100 w-100">
    <div className="relative h-full w-full rounded-full border-20 border-double border-black bg-amber-50 font-mono font-bold text-gray-700">
      {icons.map((Icon, index) => {
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / iconCount;
        const radius = iconCount === 1 ? 0 : 34;
        const iconSize =
          iconCount === 1
            ? 25
            : Math.min(25, Math.max(8, 68 * Math.sin(Math.PI / iconCount) - 4));

        return (
          <Icon
            key={index}
            className="absolute text-green-500"
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
  </div>
);

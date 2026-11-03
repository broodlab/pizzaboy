import { PizzaIllustration } from "~/components/pizza-illustration";
import { Beef, Broccoli, Fish } from "lucide-react";
import { cn } from "~/utils/create-class-name";

const oneIcon = [Beef];
const twoIcons = [Beef, Broccoli];
const threeIcons = [Beef, Broccoli, Fish];
const fourIcons = [Beef, Broccoli, Fish, Beef];
const fiveIcons = [Beef, Broccoli, Fish, Beef, Broccoli];
const sixIcons = [Beef, Broccoli, Fish, Beef, Broccoli, Fish];

export default function Playground() {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-row gap-4"}>
        <div className={cn(`h-15 w-15`)}>
          <PizzaIllustration icons={oneIcon} />
        </div>
        <div className={cn(`h-15 w-15`)}>
          <PizzaIllustration icons={twoIcons} />
        </div>
        <div className={cn(`h-15 w-15`)}>
          <PizzaIllustration icons={threeIcons} />
        </div>
        <div className={cn(`h-15 w-15`)}>
          <PizzaIllustration icons={fourIcons} />
        </div>
        <div className={cn(`h-15 w-15`)}>
          <PizzaIllustration icons={fiveIcons} />
        </div>
        <div className={cn(`h-15 w-15`)}>
          <PizzaIllustration icons={sixIcons} />
        </div>
      </div>
      <div className={"flex flex-row gap-4"}>
        <div className={cn(`h-20 w-20`)}>
          <PizzaIllustration icons={oneIcon} />
        </div>
        <div className={cn(`h-20 w-20`)}>
          <PizzaIllustration icons={twoIcons} />
        </div>
        <div className={cn(`h-20 w-20`)}>
          <PizzaIllustration icons={threeIcons} />
        </div>
        <div className={cn(`h-20 w-20`)}>
          <PizzaIllustration icons={fourIcons} />
        </div>
        <div className={cn(`h-20 w-20`)}>
          <PizzaIllustration icons={fiveIcons} />
        </div>
        <div className={cn(`h-20 w-20`)}>
          <PizzaIllustration icons={sixIcons} />
        </div>
      </div>
      <div className={"flex flex-row gap-4"}>
        <div className={cn(`h-30 w-30`)}>
          <PizzaIllustration icons={oneIcon} />
        </div>
        <div className={cn(`h-30 w-30`)}>
          <PizzaIllustration icons={twoIcons} />
        </div>
        <div className={cn(`h-30 w-30`)}>
          <PizzaIllustration icons={threeIcons} />
        </div>
        <div className={cn(`h-30 w-30`)}>
          <PizzaIllustration icons={fourIcons} />
        </div>
        <div className={cn(`h-30 w-30`)}>
          <PizzaIllustration icons={fiveIcons} />
        </div>
        <div className={cn(`h-30 w-30`)}>
          <PizzaIllustration icons={sixIcons} />
        </div>
      </div>
      <div className={"flex flex-row gap-4"}>
        <div className={cn(`h-40 w-40`)}>
          <PizzaIllustration icons={oneIcon} />
        </div>
        <div className={cn(`h-40 w-40`)}>
          <PizzaIllustration icons={twoIcons} />
        </div>
        <div className={cn(`h-40 w-40`)}>
          <PizzaIllustration icons={threeIcons} />
        </div>
        <div className={cn(`h-40 w-40`)}>
          <PizzaIllustration icons={fourIcons} />
        </div>
        <div className={cn(`h-40 w-40`)}>
          <PizzaIllustration icons={fiveIcons} />
        </div>
        <div className={cn(`h-40 w-40`)}>
          <PizzaIllustration icons={sixIcons} />
        </div>
      </div>
      <div className={"flex flex-col gap-4"}>
        <div className={cn(`h-200 w-200`)}>
          <PizzaIllustration icons={oneIcon} />
        </div>
        <div className={cn(`h-200 w-200`)}>
          <PizzaIllustration icons={twoIcons} />
        </div>
        <div className={cn(`h-200 w-200`)}>
          <PizzaIllustration icons={threeIcons} />
        </div>
        <div className={cn(`h-200 w-200`)}>
          <PizzaIllustration icons={fourIcons} />
        </div>
        <div className={cn(`h-200 w-200`)}>
          <PizzaIllustration icons={fiveIcons} />
        </div>
        <div className={cn(`h-200 w-200`)}>
          <PizzaIllustration icons={sixIcons} />
        </div>
      </div>
    </div>
  );
}

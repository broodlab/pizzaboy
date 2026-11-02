import { PizzaIllustration } from "~/components/pizza-illustration";

export default function Playground() {
  return (
    <>
      <div className="h-15 w-15">
        <PizzaIllustration />
      </div>
      <div className="h-25 w-25">
        <PizzaIllustration />
      </div>
      <div className="h-50 w-50">
        <PizzaIllustration />
      </div>
      <div className="h-100 w-100">
        <PizzaIllustration />
      </div>
      <div className="h-200 w-200">
        <PizzaIllustration />
      </div>
    </>
  );
}

import type { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:w-lg xl:w-xl 2xl:w-2xl">
        {children}
      </div>
    </div>
  );
};

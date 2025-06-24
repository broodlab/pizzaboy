import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const createClassName = (...classValues: ClassValue[]) => {
  return twMerge(clsx(classValues));
};

export const cn = createClassName;

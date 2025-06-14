import type { FC } from "react";

export const ErrorList: FC<{
  errors?: string[] | null;
  id?: string;
}> = ({ errors, id }) => {
  if (!errors?.length) return;

  return (
    <ul id={id}>
      {errors.map((error, index) => (
        <li className="text-red-500" key={index}>
          {error}
        </li>
      ))}
    </ul>
  );
};

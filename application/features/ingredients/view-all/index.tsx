import type { Route } from "./+types/";
import prisma from "~/utils/prisma";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import {
  ListFilter as FilterIcon,
  Plus as CreateIcon,
  SquarePen as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import type { FC } from "react";
import { Button } from "~/components/button";

export const loader = () => {
  return prisma.ingredient.findMany({
    include: {
      recipeItems: true,
    },
  });
};

export default function Ingredients({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Ingredients</h1>
        <p className="text-muted-foreground">
          Search and manage your ingredients.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 md:w-md md:gap-2 lg:w-lg">
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button asChild variant="outline">
            <Link to="filter">
              <FilterIcon /> Filter
            </Link>
          </Button>
          <Button asChild>
            <Link to="create">
              <CreateIcon /> Create
            </Link>
          </Button>
        </div>
        <Table className="border-t-1 border-b-1 md:border-t-0 md:border-b-0">
          <TableHeader className="hidden md:table-header-group">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Recipes</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loaderData.map(({ category, id, name, recipeItems }) => (
              <TableRow key={id}>
                <TableCell className="block max-w-50 truncate text-lg font-semibold max-[768px]:max-w-140 max-[750px]:max-w-130 max-[700px]:max-w-120 max-[650px]:max-w-110 max-[600px]:max-w-100 max-[550px]:max-w-90 max-[500px]:max-w-80 max-[450px]:max-w-70 max-[400px]:max-w-60 max-[350px]:max-w-50 max-[300px]:max-w-40 md:table-cell md:max-w-50 md:text-base md:font-normal">
                  <Link to={`${id}/edit`}>{name}</Link>
                </TableCell>
                <TableCell
                  className="block pt-0 pb-0 before:content-[attr(data-label)] md:table-cell md:pt-2 md:pb-2 md:before:content-none"
                  data-label="Category: "
                >
                  {category}
                </TableCell>
                <TableCell
                  className="block before:content-[attr(data-label)] md:table-cell md:before:content-none"
                  data-label="Recipes: "
                >
                  {recipeItems.length}
                </TableCell>
                <TableCell>
                  <ActionLinks deletable={recipeItems.length === 0} id={id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const ActionLinks: FC<{ deletable: boolean; id: string }> = ({
  deletable,
  id,
}) => (
  <div className="flex items-center justify-end gap-1.5">
    <Link to={`${id}/edit`}>
      <EditIcon className="-mb-0.5 size-6 text-gray-600 md:size-5" />
    </Link>
    {deletable ? (
      <Link to={`${id}/delete`}>
        <DeleteIcon className="size-6 text-red-400 md:size-5" />
      </Link>
    ) : (
      <DeleteIcon
        aria-disabled="true"
        className="size-6 text-red-200 md:size-5"
        tabIndex={-1}
      />
    )}
  </div>
);

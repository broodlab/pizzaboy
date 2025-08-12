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
import { SquarePen as EditIcon, Trash2 as DeleteIcon } from "lucide-react";

export const loader = () => {
  return prisma.ingredient.findMany({
    include: {
      recipeItems: true,
    },
  });
};

export default function Ingredients({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Ingredients</h1>
        <p className="text-muted-foreground">
          Search and manage your ingredients.
        </p>
      </div>
      <Table className="md:w-md lg:w-lg">
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
              <TableCell className="block max-w-50 truncate text-lg font-semibold sm:table-cell sm:text-base sm:font-normal">
                <Link to={`${id}/edit`} relative="route">
                  {name}
                </Link>
              </TableCell>
              <TableCell
                className="block pt-0 pb-0 before:content-[attr(data-label)] sm:table-cell sm:pt-8 sm:pb-8 sm:before:content-none"
                data-label="Category: "
              >
                {category}
              </TableCell>
              <TableCell
                className="block before:content-[attr(data-label)] sm:table-cell sm:before:content-none"
                data-label="Recipes: "
              >
                {recipeItems.length}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1.5">
                  <Link to={`${id}/edit`} relative="route">
                    <EditIcon className="-mb-0.5 size-6 text-gray-600 sm:size-5" />
                  </Link>
                  {recipeItems.length === 0 ? (
                    <Link to={`${id}/delete`} relative="route">
                      <DeleteIcon className="size-6 text-red-400 sm:size-5" />
                    </Link>
                  ) : (
                    <DeleteIcon className="size-5 text-red-200" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

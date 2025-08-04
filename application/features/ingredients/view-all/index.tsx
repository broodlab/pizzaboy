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
  return prisma.ingredient.findMany();
};

export default function Ingredients({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="text-lg font-semibold">Ingredients</h1>
      <p className="text-muted-foreground text-sm text-balance">
        Search and manage your ingredients.
      </p>
      <Table className="w-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loaderData.map(({ category, id, name }) => (
            <TableRow key={id}>
              <TableCell className="max-w-xs truncate">{name}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1.5">
                  <Link to={`${id}/edit`} relative="route">
                    <EditIcon className="-mb-0.5 size-5" />
                  </Link>
                  <Link to={`${id}/delete`} relative="route">
                    <DeleteIcon className="size-5 text-red-400" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

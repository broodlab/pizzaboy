import type { Route } from "./+types";
import prisma from "~/utils/prisma";
import { Form, Link, Outlet, redirect, useLocation } from "react-router";
import {
  FunnelPlus as FilterIcon,
  FunnelX as ClearFilterIcon,
  InfoIcon,
  Plus as CreateIcon,
  SquarePen as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import type { FC } from "react";
import { Button } from "~/components/button";
import { AlertDialog } from "~/components/alert-dialog/alert-dialog";
import { AlertDialogTrigger } from "~/components/alert-dialog/alert-dialog-trigger";
import { useScripting } from "~/hooks/use-scripting";
import { AlertDialogContent } from "~/components/alert-dialog/alert-dialog-content";
import { AlertDialogTitle } from "~/components/alert-dialog/alert-dialog-title";
import { AlertDialogHeader } from "~/components/alert-dialog/alert-dialog-header";
import { AlertDialogDescription } from "~/components/alert-dialog/alert-dialog-description";
import { AlertDialogFooter } from "~/components/alert-dialog/alert-dialog-footer";
import { AlertDialogCancel } from "~/components/alert-dialog/alert-dialog-cancel";
import { AlertDialogAction } from "~/components/alert-dialog/alert-dialog-action";
import type { FoodCategory } from "~/prisma/client";
import { foodCategories } from "~/types/food-categories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import {
  enhanceWithDeletionSuccessSearchParams,
  Notifications,
  useNotificationlessSearchParams,
} from "~/utils/notifications";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  const ingredient = await prisma.ingredient.findFirst({
    where: { id },
  });

  await prisma.ingredient.delete({
    where: { id },
  });

  const searchParams = enhanceWithDeletionSuccessSearchParams(ingredient!.name);
  return redirect(`/ingredients?${searchParams.toString()}`);
};

export const loader = ({ request }: Route.ActionArgs) => {
  const searchParams = new URLSearchParams(new URL(request.url).search);

  let category: undefined | FoodCategory;
  if (searchParams.has("category")) {
    category = searchParams.get("category") as FoodCategory;
    if (!foodCategories.includes(category)) {
      return [];
    }
  }

  let name: undefined | string;
  if (searchParams.has("name")) {
    name = searchParams.get("name") as string;
  }

  return prisma.ingredient.findMany({
    where: {
      category,
      name: {
        contains: name,
      },
    },
    include: {
      recipeItems: true,
    },
  });
};

export default function Ingredients({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const visibleFilterForm = location.pathname.includes("/filter");
  const [searchParams] = useNotificationlessSearchParams();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Ingredients</h1>
        <p className="text-muted-foreground">
          Search and manage your ingredients.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 md:w-md md:gap-2 lg:w-xl">
        <Notifications
          editionPath="/ingredients/:id/edit"
          entity="ingredient"
        />
      </div>
      <div className="flex w-full flex-col gap-4 md:w-md md:gap-2 lg:w-xl">
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button asChild variant="outline">
            <Link to={{ pathname: "filter", search: searchParams.toString() }}>
              <FilterIcon className="invisible sm:visible" /> Filter
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/ingredients">
              <ClearFilterIcon className="invisible sm:visible" /> Clear
            </Link>
          </Button>
          <Button asChild variant={visibleFilterForm ? "outline" : "default"}>
            <Link to={{ pathname: "create", search: searchParams.toString() }}>
              <CreateIcon className="invisible sm:visible" /> Create
            </Link>
          </Button>
        </div>
        <div className="flex w-full flex-col gap-4 md:w-md md:gap-2 lg:w-xl">
          <Outlet />
        </div>
        <Table className="border-t-1 md:border-t-0">
          <TableHeader className="hidden md:table-header-group">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Recipes</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          {loaderData.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="items-top flex flex-row gap-2">
                    <InfoIcon className="size-5 text-blue-500" />
                    <span>No ingredients or no matching filter(s).</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {loaderData.length > 0 && (
            <TableBody>
              {loaderData.map(({ category, id, name, recipeItems }) => (
                <TableRow key={id}>
                  <TableCell className="block max-w-50 truncate text-lg font-semibold max-[768px]:max-w-140 max-[750px]:max-w-130 max-[700px]:max-w-120 max-[650px]:max-w-110 max-[600px]:max-w-100 max-[550px]:max-w-90 max-[500px]:max-w-80 max-[450px]:max-w-70 max-[400px]:max-w-60 max-[350px]:max-w-50 max-[300px]:max-w-40 md:table-cell md:max-w-50 md:text-base md:font-normal">
                    <Link
                      to={{
                        pathname: `${id}/edit`,
                        search: searchParams.toString(),
                      }}
                    >
                      {name}
                    </Link>
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
                    <ActionLinks
                      deletable={recipeItems.length === 0}
                      id={id}
                      name={name}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}

const ActionLinks: FC<{ deletable: boolean; id: string; name: string }> = ({
  deletable,
  id,
  name,
}) => {
  const isScripting = useScripting();
  const [searchParams] = useNotificationlessSearchParams();

  let DeleteAction = () => (
    <DeleteIcon
      aria-disabled="true"
      className="size-6 text-red-200 md:size-5"
      tabIndex={-1}
    />
  );

  if (deletable && isScripting) {
    DeleteAction = () => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <DeleteIcon
            className="size-6 cursor-pointer text-red-400 md:size-5"
            role="button"
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form method="post">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Ingredient</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete ingredient{" "}
                <span className="font-bold">{name}</span>? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction name="id" type="submit" value={id}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else if (deletable && !isScripting) {
    DeleteAction = () => (
      <Link to={`${id}/delete`}>
        <DeleteIcon className="size-6 text-red-400 md:size-5" />
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link to={{ pathname: `${id}/edit`, search: searchParams.toString() }}>
        <EditIcon className="-mb-0.5 size-6 text-gray-600 md:size-5" />
      </Link>
      <DeleteAction />
    </div>
  );
};

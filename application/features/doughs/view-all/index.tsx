import prisma from "~/utils/prisma.server";
import type { Route } from "./+types";
import { Form, Link, Outlet, redirect, useLocation } from "react-router";
import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";
import {
  enhanceWithDeletionSuccessSearchParams,
  Notifications,
  useNotificationlessSearchParams,
} from "~/utils/notifications";
import { Actions } from "~/components/actions";
import { Button } from "~/components/button";
import {
  FunnelPlus as FilterIcon,
  FunnelX as ClearFilterIcon,
  InfoIcon,
  Plus as CreateIcon,
  SquarePen as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import { Card, CardContent } from "~/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import type { FC } from "react";
import { useScripting } from "~/hooks/use-scripting";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/alert-dialog";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  const dough = await prisma.dough.findFirst({
    select: { name: true },
    where: { id },
  });

  await prisma.dough.delete({
    where: { id },
  });

  const searchParams = enhanceWithDeletionSuccessSearchParams(dough!.name);
  return redirect(`/doughs?${searchParams.toString()}`);
};

export const loader = ({ request }: Route.ActionArgs) => {
  const searchParams = new URLSearchParams(new URL(request.url).search);

  let name: undefined | string;
  if (searchParams.has("name")) {
    name = searchParams.get("name") as string;
  }

  return prisma.dough.findMany({
    select: { id: true, name: true, pizzas: { select: { id: true } } },
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export default function Doughs({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const visibleFilterForm = location.pathname.includes("/filter");
  const [searchParams] = useNotificationlessSearchParams();

  return (
    <Page>
      <PageHeader>
        <PageTitle>Doughs</PageTitle>
        <PageIntro>Search and manage your doughs.</PageIntro>
      </PageHeader>
      <div>
        <Notifications editionPath="/doughs/:id/edit" entity="dough" />
      </div>
      <div className="flex flex-col gap-4">
        <Actions alignment="right">
          <Button
            render={
              <Link
                to={{ pathname: "filter", search: searchParams.toString() }}
              >
                <FilterIcon /> Filter
              </Link>
            }
            variant="outline"
          />
          <Button
            render={
              <Link to="/doughs">
                <ClearFilterIcon /> Clear
              </Link>
            }
            variant="outline"
          />
          <Button
            render={
              <Link
                to={{ pathname: "create", search: searchParams.toString() }}
              >
                <CreateIcon /> Create
              </Link>
            }
            variant={visibleFilterForm ? "outline" : "default"}
          />
        </Actions>
        <div>
          <Outlet />
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Pizzas</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              {loaderData.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className="items-top flex flex-row gap-2">
                        <InfoIcon className="size-5 text-blue-500" />
                        <span>No doughs or no matching filter(s).</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              {loaderData.length > 0 && (
                <TableBody>
                  {loaderData.map(({ id, name, pizzas }) => (
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
                        className="block before:content-[attr(data-label)] md:table-cell md:before:content-none"
                        data-label="Pizzas: "
                      >
                        {pizzas.length}
                      </TableCell>
                      <TableCell>
                        <ActionLinks
                          deletable={pizzas.length === 0}
                          id={id}
                          name={name}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    </Page>
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
        <AlertDialogTrigger
          render={
            <DeleteIcon
              className="size-6 cursor-pointer text-red-400 md:size-5"
              role="button"
            />
          }
        ></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Dough</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete dough{" "}
              <span className="font-bold">{name}</span>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form method="post">
            <AlertDialogFooter>
              <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
              <AlertDialogAction name="id" size="sm" type="submit" value={id}>
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

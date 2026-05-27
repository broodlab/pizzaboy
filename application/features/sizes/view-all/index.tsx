import prisma from "~/utils/prisma.server";
import type { Route } from "./+types";
import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";

export const loader = () => {
  return prisma.size.findMany({
    select: { id: true, name: true, orderItems: { select: { id: true } } },
  });
};

export default function Sizes({ loaderData }: Route.ComponentProps) {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Sizes</PageTitle>
        <PageIntro>Manage the sizes of your pizzas.</PageIntro>
      </PageHeader>
      <ul>
        {loaderData.map((size) => (
          <li key={size.id}>{size.name}</li>
        ))}
      </ul>
    </Page>
  );
}

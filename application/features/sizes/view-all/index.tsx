import prisma from "~/utils/prisma.server";
import type { Route } from "./+types";
import { Page, PageHeader, PageIntro, PageTitle } from "~/components/page";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { sizesSchema } from "~/features/sizes/view-all/schemas";
import { SizeForm } from "~/features/sizes/view-all/size-form";
import { persistSizes } from "~/features/sizes/view-all/persist-sizes";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    async: true,
    schema: sizesSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  if (submission.status === "success") {
    const sizes = submission.value.sizes;

    if (sizes.length === 0) {
      throw new Error("At least one size is required.");
    }

    await persistSizes(sizes);

    return submission.reply();
  }
};

export const loader = async () => {
  const sizes = await prisma.size.findMany({
    select: { description: true, id: true, name: true },
  });
  return { sizes };
};

export default function Sizes({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const formConfig = useForm({
    defaultValue: loaderData,
    lastResult: actionData,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: sizesSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <Page>
      <PageHeader>
        <PageTitle>Sizes</PageTitle>
        <PageIntro>Manage the sizes of your pizzas.</PageIntro>
      </PageHeader>
      <SizeForm formConfig={formConfig} />
    </Page>
  );
}

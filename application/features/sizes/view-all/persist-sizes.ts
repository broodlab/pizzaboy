import prisma from "~/utils/prisma.server";
import { sizeSchema, sizesSchema } from "~/features/sizes/common/schemas";
import { z } from "zod/v4";

export const persistSizes = async (
  sizes: Array<z.infer<typeof sizeSchema>>,
) => {
  const sizeIdsInDatabase = (
    await prisma.size.findMany({
      select: { id: true },
    })
  ).map(({ id }) => id);
  const sizeIdsInSubmission = sizes
    .map((size) => size.id)
    .filter(Boolean) as string[];
  const sizeIdsToDelete = sizeIdsInDatabase.filter(
    (id) => !sizeIdsInSubmission.includes(id),
  );

  return prisma.$transaction(async (transaction) => {
    await transaction.size.deleteMany({
      where: { id: { in: sizeIdsToDelete } },
    });

    for (const size of sizes) {
      if (size.id) {
        await transaction.size.update({
          data: {
            description: size.description,
            name: size.name,
          },
          where: { id: size.id },
        });
      } else {
        await transaction.size.create({
          data: {
            description: size.description,
            name: size.name,
            user: {
              connect: {
                name: "pizzaboy",
              },
            },
          },
        });
      }
    }
  });
};

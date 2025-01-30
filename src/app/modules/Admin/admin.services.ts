import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
const prisma = new PrismaClient();
const getAllFromDb = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};
export const AdminServices = {
  getAllFromDb,
};
// [
//     {
//       name: {
//         contains: params.searchTerm,
//         mode: "insensitive",
//       },
//     },
//     {
//       email: {
//         contains: params.searchTerm,
//         mode: "insensitive",
//       },
//     },
//   ],

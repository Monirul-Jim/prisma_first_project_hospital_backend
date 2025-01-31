import { Admin, Prisma } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";

const getAllFromDb = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
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
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDb = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const updateIntoDb = async (id: string, data: Partial<Admin>) => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
export const AdminServices = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
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

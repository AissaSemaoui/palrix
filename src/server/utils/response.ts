type PaginationOptions =
  | {
      page: number;
      pageSize: number;
      totalCount: number;
    }
  | undefined;

export type ApiResponseReturn<T> = {
  success: boolean;
  data: T;
  pagination: {
    page: number | null;
    pageSize: number | null;
    totalCount: number | null;
    totalPages: number | null;
    hasNextPage: boolean | null;
    hasPreviousPage: boolean | null;
  };
};

export function ApiResponse<T>(data: T, paginationOptions?: PaginationOptions): ApiResponseReturn<T> {
  const { page, pageSize, totalCount } = paginationOptions || {};
  const totalPages = page && pageSize && totalCount ? Math.ceil(totalCount / pageSize) : undefined;

  return {
    success: true,
    data: data,
    pagination: {
      page: page ?? null,
      pageSize: pageSize ?? null,
      totalCount: totalCount ?? null,
      totalPages: totalPages ?? null,
      hasNextPage: page && totalPages ? page < totalPages : null,
      hasPreviousPage: page ? page > 1 : null,
    },
  };
}

type PaginationOptions =
  | {
      page: number;
      pageSize: number;
      totalCount: number;
    }
  | undefined;

export type ApiResponseReturn<T, hasPagination extends boolean = false> = {
  success: boolean;
  data: T;
  pagination: hasPagination extends true
    ? {
        page: number | null;
        pageSize: number | null;
        totalCount: number | null;
        totalPages: number | null;
        hasNextPage: boolean | null;
        hasPreviousPage: boolean | null;
      }
    : null;
};

export function ApiResponse<T>(data: T, paginationOptions?: PaginationOptions): ApiResponseReturn<T, boolean> {
  const response: ApiResponseReturn<T, boolean> = {
    success: true,
    data: data,
    pagination: null,
  };

  if (paginationOptions) {
    const { page, pageSize, totalCount } = paginationOptions || {};
    const totalPages = page && pageSize && totalCount ? Math.ceil(totalCount / pageSize) : undefined;

    response.pagination = {
      page: page ?? null,
      pageSize: pageSize ?? null,
      totalCount: totalCount ?? null,
      totalPages: totalPages ?? null,
      hasNextPage: page && totalPages ? page < totalPages : null,
      hasPreviousPage: page ? page > 1 : null,
    };
  }

  return response;
}

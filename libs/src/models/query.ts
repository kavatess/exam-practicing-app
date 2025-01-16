export interface Pagination {
    page?: number;
    limit?: number;
    pageSize?: number;
    count?: number;
}

export interface QueryResult<T> {
    data: T[];
    pagination: Pagination;
}

export interface GetTicketsParams {
    page: number;
    limit: number;
    term?: string;
    status?: string;
}
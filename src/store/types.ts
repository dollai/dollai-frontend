
// tslint:disable-next-line:no-empty-interface
export interface IRootState {}

export type CallbackFunction<T> = (...args: any[]) => T;

export interface PageNumberPaginationResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type HTTPResponse<T> = {
  status: number;
  data: { message: string } | T;
};

export interface BaseResponse<T> {
  ok: boolean;
  statusCode: number;
  results?: T; // if !ok then there will be no results
  message: string; // message can be either error's description or message for toast/snackbar
}

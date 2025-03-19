export interface BaseResponse<T> {
  ok: boolean;
  statusCode: number;
  results?: T;
  message: string; // message can be either error's description or message for toast/snackbar
}

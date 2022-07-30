export interface ResponseError {
  name: string;
  status: number;
  message: string;
  errorCode: string;
  time?: number;
}

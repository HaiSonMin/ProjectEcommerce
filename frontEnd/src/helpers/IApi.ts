export default interface IApi {
  metadata: any | undefined;
  message: string | undefined;
  reasonStatusCode: string | undefined;
  statusCode: number | string | undefined;
}
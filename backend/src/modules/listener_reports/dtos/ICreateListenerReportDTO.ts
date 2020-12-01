export default interface ICreateListenerReportDTO {
  name: string;
  message: string;
  stack_where: string;
  stack_line: string;
  request_body: string | undefined;
  request_method: string;
  request_url: string;
  request_url_protocol: string;
  request_url_path: string;
  request_headers: string;
  request_query: string;
  request_params: string;
  error_query: string | undefined;
}

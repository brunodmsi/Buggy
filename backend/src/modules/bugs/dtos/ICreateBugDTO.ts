export default interface ICreateBugDTO {
  title: string;
  description: string;
  type: string;
  priority: string;
  group: number;
  status: number;
  date_limit?: Date;
  project_id: string;
  listener_report_id?: string;
}

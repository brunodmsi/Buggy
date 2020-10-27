export default interface ICreateBugDTO {
  title: string;
  description: string;
  type: string;
  group: number;
  status: number;
  date_limit?: Date;
  project_id: string;
}

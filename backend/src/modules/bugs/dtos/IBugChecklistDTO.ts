export default interface IBugChecklistDTO {
  title: string;
  bug_id: string;
  items?: Array<{ text: string; done: boolean }>;
}

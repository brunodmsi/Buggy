export default interface IBugChecklistDTO {
  title: string;
  bug_id: string;
  items?: { text: string; done: boolean };
}

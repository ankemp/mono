export interface Banner {
  id: string;
  index: number;
  desc: string;
  buttonText: string;
  action: (event: Event) => void;
  color: string;
}

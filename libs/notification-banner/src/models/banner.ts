export interface Banner {
  desc: string;
  buttonText: string;
  action: (event: Event) => void;
  color: string;
}

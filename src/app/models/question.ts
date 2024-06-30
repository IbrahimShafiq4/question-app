export interface IQuestion {
  id: number;
  questionText: string;
  options: IOption[]
}

export interface IOption {
  text: string;
}

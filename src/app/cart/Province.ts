export class Province {
  public code: string;
  public name: string;

  constructor (name?: string, code?: string) {
    this.name = name;
    this.code = code;
  }
}

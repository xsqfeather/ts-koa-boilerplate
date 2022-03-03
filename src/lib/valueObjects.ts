export class ErrorMsg {
  private resource: string;

  private reason: string;

  private operator: string;

  constructor(resource: string, operator: string, reason: string) {
    this.resource = resource;
    this.reason = reason;
    this.operator = operator;
  }

  getCode(): string {
    return `${this.resource}:${this.operator}:fail`;
  }

  getReason(): string {
    return this.reason;
  }
}

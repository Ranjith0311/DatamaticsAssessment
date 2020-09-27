export class DialogData {
  private name: string;
  public get Name(): string {
    return this.name;
  }
  public set Name(value: string) {
    this.name = value;
  }
  private subIndustry: string;
  public get SubIndustry(): string {
    return this.subIndustry;
  }
  public set SubIndustry(value: string) {
    this.subIndustry = value;
  }
  private jobLevel: string;
  public get JobLevel(): string {
    return this.jobLevel;
  }
  public set JobLevel(value: string) {
    this.jobLevel = value;
  }
  private jobFunction: string;
  public get JobFunction(): string {
    return this.jobFunction;
  }
  public set JobFunction(value: string) {
    this.jobFunction = value;
  }
  private country: string;
  public get Country(): string {
    return this.country;
  }
  public set Country(value: string) {
    this.country = value;
  }
  private company: string;
  public get Company(): string {
    return this.company;
  }
  public set Company(value: string) {
    this.company = value;
  }
}

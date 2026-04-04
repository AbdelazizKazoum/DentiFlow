/* eslint-disable prettier/prettier */

export class Clinic {
  constructor(
    public readonly id: string,
    public name: string,
    public owner_id: string,
    public discount_threshold_percent: number,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  updateDetails(name: string, discount_threshold_percent: number): void {
    this.name = name;
    this.discount_threshold_percent = discount_threshold_percent;
    this.updatedAt = new Date();
  }

  changeOwner(newOwnerId: string): void {
    this.owner_id = newOwnerId;
    this.updatedAt = new Date();
  }
}

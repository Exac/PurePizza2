import { Province } from "./Province";
import { Country } from "./Country";

export class DeliveryModel{

  constructor (
    public address: string,
    public city: string,
    public province: string,
    public country: string,
    public name: string,
    public phone: string,
    public percentageElapsedTime: number,
    public startTime: number,
    public endTime: number,
    public address2?: string,
    public postal?: string,
    public instructions?: string
  ) {

  }
}

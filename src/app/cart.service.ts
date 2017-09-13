import { Injectable } from '@angular/core';
import { Dish } from "./dish";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs";


@Injectable()
export class CartService {

  public cart: Dish[];
  public price$;
  private price;
  private isDelivery: boolean;
  private deliveryPrice: number;
  private address1: string;
  private address2: string;
  private city: string;
  private postal: string;
  private province: string;
  private name: string;
  private phone: string;

  constructor () {
    this.cart = [];
    this.isDelivery = true;
    this.deliveryPrice = 4;

    this.price = new BehaviorSubject<number>(0);
    this.price$ = this.price.asObservable();

    this.changePrice(0);
  }

  // OBSERVABLES
  public changePrice (number: number) {
    this.price
      .next(parseFloat(""+Math
        .round(number * 100) / 100)
        .toFixed(2));
  }

  // CRUD
  public create (dishes: Dish[]): void {
    this.cart = dishes;
    this.updatePrice();
  }

  public read (): Dish[] {
    return this.cart;
  }

  public update (dish: Dish): void {
    this.cart.push(dish);
    this.updatePrice();
  }

  public delete (dish: Dish): void {
    this.cart = this.cart.filter(function (d: Dish) {
      return d.id !== dish.id;
    });
    this.updatePrice();
  }

  // MODEL
  public setDeliveryPrice (price: number): void {
    price = price <= 0 ? 0 : price;
    this.deliveryPrice = price;
  }

  public setDelivery (delivery: boolean): void {
    this.isDelivery = delivery;
  }

  private updatePrice (): number {
    let price: number = 0;

    for (let i = 0; i < this.cart.length; i++) {
      price += this.cart[i].price;
    }

    if (this.isDelivery) {
      price += this.deliveryPrice;
    }
    this.changePrice(price);
    return price;
  }

}

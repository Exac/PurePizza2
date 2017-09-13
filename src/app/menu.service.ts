import { Injectable } from '@angular/core';
import { Dish } from "./dish";

@Injectable()
export class MenuService {

  private dishes: Dish[];

  constructor () {
    this.dishes = [
      new Dish(1, "Cheese Pizza", 8.99, 1980, "cheese-pizza.jpg"),
      new Dish(2, "Hawaiian Pizza", 8.99, 2241, "hawaiian-pizza.jpg"),
      new Dish(3, "Pepperoni Pizza", 8.99,2269, "pepperoni-pizza.jpg"),
      new Dish(4, "Crab Pizza", 18.99, 2200, "crab-pizza.jpg"),
      new Dish(5, "Marinara Pizza", 8.99, 1720, "marinara-pizza.jpg"),
      new Dish(6, "Napoletana Pizza", 8.99, 1895, "napoletana-pizza.jpg"),
      new Dish(7, "Romana Pizza", 8.99, 2164, "romana-pizza.jpg"),
      new Dish(8, "Meat Pizza", 10.99, 2573, "meat-pizza.jpg"),
      new Dish(9, "BBQ Chicken Pizza",2408, 8.99, "bbq-chicken-pizza.jpg"),
      new Dish(10, "Vegetarian Pizza", 7.99,1698, "vegetarian-pizza.jpg"),
      new Dish(11, "Coke", 0.99, 960, "coke.jpg"),
      new Dish(12, "Pepsi", 0.99, 900, "pepsi.jpg"),
      new Dish(13, "Canada Dry", 0.99, 789, "canada-dry.jpg"),
      new Dish(14, "Water", 0.99, 0, "water.jpg"),
      new Dish(15, "Cheese Sticks", 3.99, 880, "cheese-sticks.jpg"),
      new Dish(16, "BBQ Dip", 0.50, 45, "bbq-dip.jpg"),
      new Dish(17, "House Dip", 0.50, 50, "house-dip.jpg")
    ];
  }

  getMenu (): Dish[] {
    return this.dishes;
  }

  getDish (id: number): Dish {
    return this.dishes
      .filter(dish => (dish.id === id))
      .shift();
  }

  create (name: string, price: number, calories:number, imageURL: string): void {
    this.dishes.push(new Dish(
      this.dishes.length + 1,
      name,
      price,
      calories,
      imageURL
      ));
  }

  delete (id: number): void {
    let item: Dish = this.dishes
      .filter(dish => (dish.id === id))
      .shift();
    let index = this.dishes.indexOf(item);
    this.dishes.splice(index, 1);
  }

  private getLastIndex (id_num: number): number {
    const max: Dish = this.dishes.reduce((prev, current) => (prev.id > current.id) ? prev : current);
    return max.id + 1;
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuService } from "../menu.service";
import { CartService } from "../cart.service";
import { Dish } from "../dish";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [

  ]
})
export class MenuComponent implements OnInit {
  public menu: Dish[];

  constructor (private menuService: MenuService,
               private cartService: CartService) {
    this.menu = this.menuService.getMenu();
  }

  ngOnInit () {
  }

  private addToCart(itemId: number):void {
    this.cartService.update(this.menuService.getDish(itemId));
  }


}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdProgressBarModule,
  MdInputModule, MdSelectModule, MdProgressSpinnerModule, MdChipsModule,
  MdTabsModule, MdExpansionModule
} from '@angular/material';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { MenuService } from "./menu.service";
import { CartService } from "./cart.service";
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrderComponent,
    NotFoundComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RoutingModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdProgressBarModule,
    MdInputModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdChipsModule,
    MdTabsModule,
    MdExpansionModule
  ],
  providers: [
    MenuService,
    CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

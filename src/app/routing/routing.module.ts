import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "../home/home.component";
import { MenuComponent } from "../menu/menu.component";
import { OrderComponent } from "../order/order.component";
import { NotFoundComponent } from "../not-found/not-found.component";


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'order', component: OrderComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }

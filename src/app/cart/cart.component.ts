import { Component, OnInit } from '@angular/core';
import { CartService } from "../cart.service";
import { Subscription } from 'rxjs/Subscription';
import "rxjs";
import { Province } from "./Province";
import { Country } from "./Country";
import { DeliveryModel } from "./DeliveryModel";
import { Dish } from "../dish";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: []
})

export class CartComponent implements OnInit {

  public price: number;
  public subscription: Subscription;
  public subscription2: Subscription;
  public provinces: Province[];
  public countries: Country[];
  public model: DeliveryModel;
  public countdown: string;
  public cardDisplay: any;

  constructor (private cartService: CartService) {
    this.price = 0.00;
    this.model = new DeliveryModel('', '', '', '', '', '', 0, 0, 0);
    this.cardDisplay = { tab: 0, order: true, delivery: false, time: false };
  }

  ngOnInit () {
    this.subscription = this.cartService.price$.subscribe(price => this.price = price);

    this.countries = [
      new Country("Australia", "AUS"),
      new Country("Canada", "CAN"),
      new Country("United States", "USA")
    ];

    this.provinces = [
      new Province("Alberta", "AB"),
      new Province("British Columbia", "BC"),
      new Province("Manitoba", "MB"),
      new Province("New Brunswick", "NB"),
      new Province("Newfoundland and Labrador", "NL"),
      new Province("Nova Scotia", "NS"),
      new Province("Ontario", "ON"),
      new Province("Prince Edward Island", "PE"),
      new Province("Quebec", "QC"),
      new Province("Saskatchewan", "SK"),
      new Province("Northwest Territories", "NT"),
      new Province("Nunavut", "NU"),
      new Province("Yukon", "YT"),
      new Province("Alabama", "AL"),
      new Province("Alaska", "AK"),
      new Province("Arizona", "AZ"),
      new Province("Arkansas", "AR"),
      new Province("California", "CA"),
      new Province("Colorado", "CO"),
      new Province("Connecticut", "CT"),
      new Province("Delaware", "DE"),
      new Province("District Of Columbia", "DC"),
      new Province("Florida", "FL"),
      new Province("Georgia", "GA"),
      new Province("Hawaii", "HI"),
      new Province("Idaho", "ID"),
      new Province("Illinois", "IL"),
      new Province("Indiana", "IN"),
      new Province("Iowa", "IA"),
      new Province("Kansas", "KS"),
      new Province("Kentucky", "KY"),
      new Province("Louisiana", "LA"),
      new Province("Maine", "ME"),
      new Province("Maryland", "MD"),
      new Province("Massachusetts", "MA"),
      new Province("Michigan", "MI"),
      new Province("Minnesota", "MN"),
      new Province("Mississippi", "MS"),
      new Province("Missouri", "MO"),
      new Province("Montana", "MT"),
      new Province("Nebraska", "NE"),
      new Province("Nevada", "NV"),
      new Province("New Hampshire", "NH"),
      new Province("New Jersey", "NJ"),
      new Province("New Mexico", "NM"),
      new Province("New York", "NY"),
      new Province("North Carolina", "NC"),
      new Province("North Dakota", "ND"),
      new Province("Ohio", "OH"),
      new Province("Oklahoma", "OK"),
      new Province("Oregon", "OR"),
      new Province("Pennsylvania", "PA"),
      new Province("Rhode Island", "RI"),
      new Province("South Carolina", "SC"),
      new Province("South Dakota", "SD"),
      new Province("Tennessee", "TN"),
      new Province("Texas", "TX"),
      new Province("Utah", "UT"),
      new Province("Vermont", "VT"),
      new Province("Virginia", "VA"),
      new Province("Washington", "WA"),
      new Province("West Virginia", "WV"),
      new Province("Wisconsin", "WI"),
      new Province("Wyoming", "WY")
    ];

    console.log(this.countries, this.provinces);
  }

  onSubmit () {

  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  get diagnostic () {
    return this.syntaxHighlight(JSON.stringify(this.model));
  }

  get dishes (): Dish[] {
    return this.cartService.read();
  }

  private showCard (card: string) {
    if (card == 'order') {
      this.cardDisplay.order = true;
      this.cardDisplay.tab = 0;
    }
    if (card == 'delivery') {
      this.cardDisplay.delivery = true;
      this.cardDisplay.tab = 1;
    }
    if (card == 'time') {
      this.cardDisplay.time = true;
      this.cardDisplay.tab = 2;
    }
    console.log(card, card == 'delivery', card === 'delivery', this.cardDisplay);
  }

  public newDelivery () {
    this.model.percentageElapsedTime = 0;
    this.model.startTime = Date.now();
    this.model.endTime = Date.now() + 30 * 60 * 1000;
    this.updateCountdown();

    this.model = new DeliveryModel(
      this.model.address,
      this.model.city,
      this.model.province,
      this.model.country,
      this.model.name,
      this.model.phone,
      this.model.percentageElapsedTime,
      this.model.startTime,
      this.model.endTime,
      this.model.address2,
      this.model.postal,
      this.model.instructions);
  }

  private updateCountdown () {
    // If this were a real pizza joint, we would
    // have to get the current wait-time. Because
    // this is imaginary, we always deliver our
    // pizzas in 30 minutes.

    const start = this.model.startTime;
    const dur_min = 30;
    const dur_sec = 60;
    const dur_ms = 1000;
    const duration = dur_min * dur_sec * dur_ms;
    const end = start + duration;
    const current = Date.now();
    const elapsed = current - start;
    const remaining = duration - elapsed;
    const min = Math.floor(remaining / dur_ms / dur_sec);
    const sec = Math.floor((remaining - min * dur_ms * dur_sec) / dur_ms);
    this.model.percentageElapsedTime = ((current - start) / duration) * 100;

    if (Date.now() <= this.model.endTime) {
      setTimeout(() => {
        this.formatCountdown(min, sec);
        this.updateCountdown();
      }, 1000);
    }
  }

  private formatCountdown (min: number, sec: number) {
    this.countdown = '<span class="num min"> ' + min + '</span>' +
      '<span class="desc min">minutes</span>, ' +
      '<span class="num sec">' + sec + '</span> ' +
      '<span class="desc sec">seconds</span> ';
  }

  private syntaxHighlight (json: string) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}

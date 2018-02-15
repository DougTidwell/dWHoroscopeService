import { Component } from '@angular/core';
import { Horoscope } from './horoscope';
import { HoroscopeService } from './horoscope.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _horoscopeService: HoroscopeService) {};

  horoscope: Horoscope;

  getHoroscope(sign: string) {
    this._horoscopeService.getHoroscope(sign)
      .subscribe(data => this.horoscope = { ...data});
  }
}

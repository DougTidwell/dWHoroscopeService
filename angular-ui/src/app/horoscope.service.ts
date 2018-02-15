import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horoscope } from './horoscope';

@Injectable()
export class HoroscopeService {
  constructor(private http:HttpClient) { }

  getHoroscope(sign: string) {
    console.log(`Getting horoscope for ${sign}`);
    // When you deploy the service to your cluster, replace these values.
    const ip = '184.172.233.145';
    const port = '31574';
    return this.http.get<Horoscope>(`http://${ip}:${port}/horoscope/${sign}`);
  }
}

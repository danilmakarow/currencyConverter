import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {CurrenciesData, ExchangeApiData} from "./interfaces/api.interface";

@Injectable({
  providedIn: 'root'
})

export class ExchangeApiService {
  public currencies$ = new BehaviorSubject<CurrenciesData | null>(null);

  constructor(private http: HttpClient) {
    this.updateCurrencyData();
  }

  public updateCurrencyData(): void {
    this.http.get<ExchangeApiData>('https://api.currencyapi.com/v3/latest?apikey=HPCPbX0iTtrYmFOCxOXsxja0d999LZA7pZySABM5').subscribe(
      (data) => {
        this.currencies$.next(data.data);
      }
    )
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SelectedCurrency} from "../../shared/interfaces/currency.interface";

@Injectable({
  providedIn: 'root'
})
export class CurrencyTransferService {
  public currencies$ = new BehaviorSubject<SelectedCurrency | null>(null)
}

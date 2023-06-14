import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ExchangeApiService} from "../../../shared/exchange-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrenciesData, Currency} from "../../../shared/interfaces/api.interface";
import {filter, map, Observable, skip, startWith, tap} from "rxjs";
import {SelectedCurrency} from "../../../shared/interfaces/currency.interface";
import {CurrencyTransferService} from "../currency-transfer.service";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyComponent {
  public currenciesArr!: Currency[];
  public currencies!: CurrenciesData;

  public filteredOptionsLeft!: Observable<Currency[]>;
  public filteredOptionsRight!: Observable<Currency[]>;

  private selectedCurrencies: SelectedCurrency = {
    left: null,
    right: null
  }

  public currForm = new FormGroup({
    'leftCurr': new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]{3}'),
    ]),
    'rightCurr': new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]{3}'),
    ]),
  });

  constructor(
    public exchangeApi: ExchangeApiService,
    private currencyTransfer: CurrencyTransferService,
    ) {}

  ngOnInit() {
    // Enter currencies from API
    this.exchangeApi.currencies$
      .pipe(
        skip(1)
      )
      .subscribe(
      curr => {
        this.currenciesArr = Object.values(curr as CurrenciesData);
        this.currencies = curr as CurrenciesData;
        this.initializeCurr();
      }
    )
  }

  public onSwitchCurrencies(): void {
    const form = this.currForm.controls;
    const temp = form.leftCurr.value;
    form.leftCurr.setValue(form.rightCurr.value);
    form.rightCurr.setValue(temp)
  }

  private initializeCurr(): void {
    // Filter currencies
    this.filteredOptionsLeft = this.currForm.controls.leftCurr.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value as string)),
    );

    this.filteredOptionsRight = this.currForm.controls.rightCurr.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value as string)),
    );

    // Check and Send entered currencies
    this.currForm.controls.leftCurr.statusChanges
      .pipe(
        filter(status => status === 'VALID'),
        map(() => this.currencies[this.currForm.controls.leftCurr.value || 0]),
        filter(Boolean),
      )
      .subscribe(cur => {
        this.selectedCurrencies.left = cur;
        this.sendCurrencies();
      })

    this.currForm.controls.rightCurr.statusChanges
      .pipe(
        filter(status => status === 'VALID'),
        map(() => this.currencies[this.currForm.controls.rightCurr.value || 0]),
        filter(Boolean),
      )
      .subscribe(cur => {
        this.selectedCurrencies.right = cur;
        this.sendCurrencies();
      })
  }

  private _filter(value: string): Currency[] {
    const filterValue = value.toLowerCase();
    return this.currenciesArr.filter(option => option.code.toLowerCase().includes(filterValue)) || [];
  }

  private sendCurrencies(): void {
    if(this.selectedCurrencies.left && this.selectedCurrencies.right)
      this.currencyTransfer.currencies$.next(this.selectedCurrencies);
  }
}

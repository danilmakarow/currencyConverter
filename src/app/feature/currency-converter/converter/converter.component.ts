import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SelectedCurrency} from "../../../shared/interfaces/currency.interface";
import {CurrencyTransferService} from "../currency-transfer.service";
import {BehaviorSubject, filter, Observable, tap} from "rxjs";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConverterComponent implements OnInit{
  disabled$ = new BehaviorSubject<boolean>(true)
  currencies$ = new BehaviorSubject<SelectedCurrency | null>(null)

  leftField: number | string = '';
  rightField: number | string = '';

  constructor(
    public currencyTransfer: CurrencyTransferService,
    private currencyPipe: CurrencyPipe,
    ) {
  }

  ngOnInit() {
    this.currencyTransfer.currencies$
      .pipe(
        filter(Boolean),
        tap(() => this.disabled$.getValue() ? this.disabled$.next(false) : null),
        tap(cur => {
          if(this.currencies$.getValue()?.left?.code === cur.left?.code)
            this.onLeftInput();
          else
            this.onRightInput();
        })
      )
      .subscribe(
      cur => {
        this.currencies$.next(cur);
      }
    )
  }

  public getCurr(code: string | undefined): string {
    const formattedValue = this.currencyPipe.transform(1, code);
    const symbol = formattedValue?.slice(0, formattedValue?.indexOf('1'));

    if(!symbol) return '';
    return symbol;
  }

  public onLeftInput(): void {
    const cur = this.currencies$.getValue()
    if(!cur?.left || !cur?.right) return;
    this.rightField = ((cur?.right.value / cur?.left.value) * (this.leftField as number)).toFixed(2)
  }

  public onRightInput(): void {
    const cur = this.currencies$.getValue()
    if(!cur?.left || !cur?.right) return;
    this.leftField = ((cur?.left.value / cur?.right.value) * (this.rightField as number)).toFixed(2)
  }
}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ExchangeApiService} from "../exchange-api.service";
import {BehaviorSubject, filter, skip} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public currencies$ = new BehaviorSubject<{[key: string]: number} | null>(null);

  constructor(private exchangeApi: ExchangeApiService) {
    exchangeApi.currencies$
      .pipe(
        filter(Boolean)
      )
      .subscribe(data => {
        this.calculateCurr(data['UAH'].value, data['EUR'].value, data['USD'].value)
      }
    )
  }

  private calculateCurr(uah: number, eur: number, usd:number): void {
    const curr = {
      eur: uah/eur,
      usd: uah
    };
    this.currencies$.next(curr);
  }
}

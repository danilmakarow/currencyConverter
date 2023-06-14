import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { CurrencyConverterComponent } from './feature/currency-converter/currency-converter.component';
import { CurrencyComponent } from './feature/currency-converter/currency/currency.component';
import {ConverterComponent} from "./feature/currency-converter/converter/converter.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {ExchangeApiService} from "./shared/exchange-api.service";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CurrencyTransferService} from "./feature/currency-converter/currency-transfer.service";
import {CurrencyPipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyConverterComponent,
    CurrencyComponent,
    ConverterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [
    ExchangeApiService,
    CurrencyTransferService,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

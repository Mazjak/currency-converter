import { Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrenciesComponent } from './currencies/currencies.component';

export const routes: Routes = [
  { path: '', component: CurrencyConverterComponent },
  { path: 'currencies', component: CurrenciesComponent },
  { path: '**', component: CurrencyConverterComponent }
];

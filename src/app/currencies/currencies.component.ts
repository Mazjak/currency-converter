import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency } from '../currency.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CurrenciesComponent {
  currencies = Currency.getCurrencies();
}

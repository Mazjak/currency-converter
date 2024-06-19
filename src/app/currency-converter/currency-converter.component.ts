import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Currency } from '../currency.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatTooltipModule]
})
export class CurrencyConverterComponent {
  currencies = Currency.getCurrencies();
  conversionForm: FormGroup;
  exchangeRate = 0;
  warningMessage = '';
  selectedCurrency = '';

  constructor(private fb: FormBuilder) {
    this.conversionForm = this.fb.group({
      selectedCurrency: [null],
      amountPLN: [0],
      amountForeign: [0]
    });

    this.conversionForm.get('selectedCurrency')?.valueChanges.subscribe(currency => {
      this.selectedCurrency = currency;
      this.exchangeRate = this.currencies.find(c => c.name === currency)?.rate || 0;
      this.convert();
    });

    this.conversionForm.get('amountPLN')?.valueChanges.subscribe(() => this.convert());
    this.conversionForm.get('amountForeign')?.valueChanges.subscribe(() => this.convertForeignToPLN());
  }

  convert() {
    const amountPLN = this.conversionForm.get('amountPLN')?.value;
    const amountForeign = parseFloat((amountPLN / this.exchangeRate).toFixed(2));
    if (amountPLN > 10000) {
      this.warningMessage = 'Amount exceeds 10,000 PLN!';
    } else {
      this.warningMessage = '';
    }
    this.conversionForm.get('amountForeign')?.setValue(amountForeign, { emitEvent: false });
  }

  convertForeignToPLN() {
    const amountForeign = this.conversionForm.get('amountForeign')?.value;
    const amountPLN = parseFloat((amountForeign * this.exchangeRate).toFixed(2));
    if (amountPLN > 10000) {
      this.warningMessage = 'Amount exceeds 10,000 PLN!';
    } else {
      this.warningMessage = '';
    }
    this.conversionForm.get('amountPLN')?.setValue(amountPLN, { emitEvent: false });
  }
}

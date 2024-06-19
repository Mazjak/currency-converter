import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, CurrencyConverterComponent]
})
export class AppComponent {}

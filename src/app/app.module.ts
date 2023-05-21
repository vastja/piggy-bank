import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseService, RemoteExpenseService } from './services/expense.service';
import { ExpensesComponent } from './expenses.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ {provide: ExpenseService, useClass: RemoteExpenseService}],
  bootstrap: [AppComponent]
})
export class AppModule { }

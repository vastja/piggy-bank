import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseService, RemoteExpenseService } from './services/expense.service';
import { ExpensesComponent } from './expense/expenses.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddExpenseComponent } from './expense/add-expense.componet';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    AddExpenseComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: ExpenseService, useClass: RemoteExpenseService},
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

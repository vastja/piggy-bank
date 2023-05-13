import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";

export interface Expense {
    tag : string,
    amount : number
}

@Injectable()
export class ExpenseService {

    private _expenses : Expense[] = [
        {
            tag: 'Food',
            amount: 120
        },
        {
            tag: 'Travel',
            amount: 60
        }

    ]

    private _httpClient : HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    public getExpenses() : Observable<Expense[]> {
        // return this._expenses;
        return this._httpClient.get<Expense[]>('http://localhost:65368/expenses').pipe(
            catchError(
                (err, caught) => {console.log(err); return new Observable<Expense[]>();}
            )
        );
    }
}
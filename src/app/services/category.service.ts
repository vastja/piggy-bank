import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Expense } from "./expense.service";
import { inMemoryExpensesData } from "./expenses-data";

export interface Category {
    tag : string,
    amount : number,
    percentage : number
}

export abstract class CategoryService {

    abstract getCategories() : Observable<Category[]>;
}

@Injectable()
export class RemoteCategoryService extends CategoryService {

    private _httpClient : HttpClient;

    constructor(httpClient: HttpClient) {
        super();
        this._httpClient = httpClient;
    }

    public getCategories() : Observable<Category[]> {
        return this._httpClient.get<Category[]>(`http://localhost:65368/categories`);
    }
}

@Injectable()
export class InMemoryCategoryService extends CategoryService {

    public data : Expense[];

    constructor() {
        super();
        this.data = inMemoryExpensesData;
    }

    public getCategories() : Observable<Category[]> {
        const grouped = InMemoryCategoryService.groupByTag(this.data);
        const categories = InMemoryCategoryService.computeCategorisFromGroups(grouped);
        return of(categories);
    }

    public static groupByTag(expenses: Expense[]) : {[key : string] : number}  {
        const categories : {[key : string] : number} = {};
        expenses.map((expense) => {
            if (expense.tag in categories) {
                categories[expense.tag] += expense.amount;
            }
            else {
                categories[expense.tag] = expense.amount;
            }
        });
        return categories;
    }

    public static computeCategorisFromGroups(groups : {[key : string] : number}) : Category[] {
        const result : Category[] = []
        const total : number = this.getTotal(groups);
        Object.keys(groups).map(key => {
            result.push({
                tag: key, 
                amount: groups[key], 
                percentage: (groups[key] / total) * 100});
        })
        return result;
    }

    public static getTotal(items : {[key : string] : number}) : number {
        return Object.values(items).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}
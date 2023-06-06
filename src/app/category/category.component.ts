import { Component, Input } from '@angular/core';
import { Category, CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  
  private _categoryService : CategoryService;

  public category : Category;
  
  public showDetails = false;

  private _tag  = "";

  @Input() public set tag(value : string)  {
    this._tag = value;
    this.getCategory();
  }

  constructor(categoryService : CategoryService) {
    this._categoryService = categoryService;
    this.category = {'tag': this.tag, 'amount' : 0, 'percentage': 0};
  }

  public getCategory() : void {
    this._categoryService.getCategories()
    .subscribe(categories => {
      // Todo - remove client side filtering
      this.category = categories.filter(c => c.tag == this._tag)[0] ?? {'tag': this.tag, 'amount' : 0, 'percentage': 0};
    });
  }

  public onClick() {
    this.showDetails = !this.showDetails;
  }
}

import { TestBed } from "@angular/core/testing";
import { SummaryComponent } from "./summary.component";
import { CategoryService, InMemoryCategoryService } from "../services/category.service";
import { CategoryComponent } from "../category/category.component";
import { ExpenseService, InMemoryExpenseService } from "../services/expense.service";

describe('Summary component', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [],
      declarations: [SummaryComponent, CategoryComponent],
      providers: [
      {provide: ExpenseService, useClass: InMemoryExpenseService},
        {provide: CategoryService, useClass: InMemoryCategoryService}
      ]
    }));
  
    it('Should create the summary', () => {
      const fixture = TestBed.createComponent(SummaryComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it('Should create the summary items', () => {
        const fixture = TestBed.createComponent(SummaryComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.getElementsByTagName('button').length).toBe(2);
    });
  });
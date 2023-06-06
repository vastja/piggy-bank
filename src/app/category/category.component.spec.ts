import { TestBed } from "@angular/core/testing";
import { CategoryComponent } from "./category.component";
import { CategoryService, InMemoryCategoryService } from "../services/category.service";

describe('Category Component', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [],
      declarations: [CategoryComponent],
      providers: [
        {provide: CategoryService, useClass: InMemoryCategoryService}
      ]
    }));
  
    it('Should create the category', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it('Should create the category items', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      fixture.componentInstance.tag = "td-travel"
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.getElementsByClassName('tag')[0].innerHTML).toBe("td-travel");
      expect(compiled.getElementsByClassName('amount')[0].innerHTML).toBe('100');
      expect(compiled.getElementsByClassName('percentage')[0].innerHTML).toBe('25');
    });

  });
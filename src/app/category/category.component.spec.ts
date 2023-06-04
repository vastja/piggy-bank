import { TestBed } from "@angular/core/testing";
import { CategoryComponent } from "./category.component";

describe('Category Component', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [],
      declarations: [CategoryComponent]
    }));
  
    it('Should create the category', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  });
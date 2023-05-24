import { TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';

describe('Menu Component', () => {
    
    beforeEach(() => TestBed.configureTestingModule({
      declarations: [MenuComponent],
    }));
    
    it(`should have as title 'Piggy Bank'`, () => {
        const fixture = TestBed.createComponent(MenuComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Piggy Bank');
    });
  
    it('should render title', () => {
        const fixture = TestBed.createComponent(MenuComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.getElementsByTagName('h1')[0].textContent).toContain('Piggy Bank');
      });
});
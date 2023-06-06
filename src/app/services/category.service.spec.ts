import { Category, InMemoryCategoryService } from "./category.service";
import { inMemoryExpensesData } from "./expenses-data";

describe("InMemoryCategoryService", () => {

    const grouped = {
        'td-food' : 300,
        'td-travel': 100
    }

    it('Should group by tag', () => {
        const grouped = InMemoryCategoryService.groupByTag(inMemoryExpensesData);

        expect(grouped["td-food"]).toBe(300);
        expect(grouped["td-travel"]).toBe(100);
    });

    it('Should compute total', () => {
        

        const total = InMemoryCategoryService.getTotal(grouped);

        expect(total).toBe(400);
    });

    it('Should create categories', () => {
        const categories = InMemoryCategoryService.computeCategorisFromGroups(grouped);

        const food : Category = { tag: "td-food", amount: 300, percentage: 75 };

        expect(categories).toContain(food);
    });
});
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Test Recipe',
            'A test desc',
            'https://c.pxhere.com/photos/52/90/sea_food_octopus_greek_food_dish_meal_greek_food_photography_cuisine-1175058.jpg!d',
            [
                new Ingredient('tomato', 2),
                new Ingredient('bread', 1)
            ]),
        new Recipe('Test Recipe 2',
            'A test desc 2',
            'https://c.pxhere.com/photos/c2/b0/eat_cheese_kohlrabi_tomatoes_au_gratin_meal_olives_cook-1323649.jpg!d', [
                new Ingredient('apple', 1)
            ]),
    ];

    constructor(private slService: ShoppingListService) {
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}

import {Recipe} from "./recipe.model";
import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Menemen',
      'As I love',
      'https://iasbh.tmgrup.com.tr/56200e/812/467/0/74/826/549?u=https://isbh.tmgrup.com.tr/sbh/2019/01/11/1547193376274.jpg',
      [new Ingredient('domates', 5),
                 new Ingredient('soğan',2)
      ]),
    new Recipe('Hambuger',
      'Canınızı çektirecek hambuger',
      'https://cdn.yemek.com/mncrop/940/625/uploads/2015/01/hamburger-yeni.jpg',
      [
                 new Ingredient('et',2),
                 new Ingredient('turşu',2)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}

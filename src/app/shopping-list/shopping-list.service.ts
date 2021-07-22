import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private intredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.intredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.intredients.push(ingredient);
    this.ingredientsChanged.next(this.intredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    /*for(let ingredient of ingredients){
      this.addIngredient(ingredient);
    }*/
    this.intredients.push(...ingredients);
    this.ingredientsChanged.next(this.intredients.slice());
  }
}

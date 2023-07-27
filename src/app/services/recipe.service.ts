import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged=new Subject<Recipe[]>();
  constructor(private slService:ShoppingListService) { }
  private recipes: Recipe[] = [
    new Recipe(
        'Cheeseburger',
        'The one-time the Espita space',
        'https://www.washingtonian.com/wp-content/uploads/2022/11/Burger_Vermilion-by-LeadingDC-cropped-2-2048x2048.jpg',
        [
          new Ingredient('Buns',2),
          new Ingredient('meat',1),
          new Ingredient('cheese',2)
        ]
        ),
    new Recipe(
        'Another Test Recipe',
        'This is simply a test',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzh6t93JGx2YOF43fi4hZlCFovovOxTU9qMQ&usqp=CAU',
        [
          new Ingredient('salt',2),
          new Ingredient('chicken',1),
          new Ingredient('cheese',2)
        ]
        )
  ];
  getRecipe(){
    return this.recipes.slice();
  }
  recipeSelected = new EventEmitter<Recipe>();
  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
  getRecipeById(index:number){
    return this.recipes[index];
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }
  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index]=recipe;
    this.recipeChanged.next(this.recipes.slice())
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}

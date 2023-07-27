import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy {
  recipes: Recipe[];
  recipeSubscription:Subscription;

  constructor(private recipeService:RecipeService,
      private router:Router,
      private route:ActivatedRoute) { }

      ngOnInit() {
    this.recipeSubscription=this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;

      }
      )
      this.recipes=this.recipeService.getRecipe();
    }
    onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

}

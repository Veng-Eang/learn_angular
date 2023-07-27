import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editItemIndex:number;
  editItem:Ingredient;


  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.slService.startEditing.subscribe(
      (index:number)=>{
        this.editItemIndex=index;
        this.editMode=true;
        this.editItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editItem.name,
          amount:this.editItem.amount
        })
      }
    );
  }

  onSubmit(form:NgForm) {
    const value=form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.slForm.reset();
  }
  onClearItem(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDeleteItem(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.slForm.reset();
    this.editMode=false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

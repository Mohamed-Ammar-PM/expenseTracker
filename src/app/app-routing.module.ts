import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyComponent } from './family/family.component';
import { ExpenseComponent } from './expense/expense.component';

const routes: Routes = [
  {path:'', component: FamilyComponent},
  {path:'expense', component: ExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

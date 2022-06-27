import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { AjouterunlivreComponent } from './composants/ajouterunlivre/ajouterunlivre.component';


import { LivresComponent } from './composants/livres/livres.component';


const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'livres', component: LivresComponent },
  { path: 'ajouterunlivre', component: AjouterunlivreComponent },
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

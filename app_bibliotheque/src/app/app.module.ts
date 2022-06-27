import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LivresComponent } from './composants/livres/livres.component';
import { AccueilComponent } from './composants/accueil/accueil.component';

import { FormsModule } from '@angular/forms';
import { AjouterunlivreComponent } from './composants/ajouterunlivre/ajouterunlivre.component';


@NgModule({
  declarations: [
    AppComponent,
AjouterunlivreComponent,
    LivresComponent,
    AccueilComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { LivreService } from 'src/app/services/livre.service';

@Component({
  selector: 'app-ajouterunlivre',
  templateUrl: './ajouterunlivre.component.html',
  styleUrls: ['./ajouterunlivre.component.css']
})
export class AjouterunlivreComponent implements OnInit {

  livre: any={

id:"",
titre:"",
auteur:"",
genre:"",
imageUrl:"",
prix:""

  }

  constructor(private livreService: LivreService) { }

  ngOnInit(): void {
  }

saveLivre (livre : any){                      // méthode qui sert à ajouter un nouveau livre 
  console.log(livre.value);
  let data = livre.value
  this.livreService.saveLivre(data).subscribe(data=>{
    console.log("les données sont enregistrées");
    console.log(data);
    alert("ce livre a été ajouté")
    
  })
}



}



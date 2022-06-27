import { Component, OnInit } from '@angular/core';
// import { log } from 'console';
import { LivreService } from 'src/app/services/livre.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css'],
})
export class LivresComponent implements OnInit {
  livres: any;
  titre: any;
  livret: any;

  livre: any = {
    titre: '',
    auteur: '',
    genre: '',
    imageUrl: '',
    prix: '',
  };

  genre = ['roman', 'fantastique', 'policier', 'philosophique', 'Retour'];

//   keyWord: any ={
// titre: 'titre.keyWord',
// auteur: 'auteur.keyWord',
// genre: 'genre.keyWord'

//   }
  // ['titre.keyWord', 'auteur.keyWord', 'genre.keyword'];
  // byKeyWord: any

  constructor(private livreService: LivreService) {}



  ngOnInit(): void {
    this.products();

    
  }


  products() {
    this.livreService.getproducts().subscribe((data) => {
      // méthode products qui récupère mes livresComponent
      this.livres = data;
      console.log(data);
    });
  }

  deletelivre(id: any) {
    console.log(id);

    this.livreService.delete(id).subscribe(() => {
      console.log('product with id:' + id + '+deleted');
      this.products();
    });
  }

  recupLivre(l: any) {
    this.livre.id = l._id;
    this.livre.titre = l.titre;
    this.livre.auteur = l.auteur;
    this.livre.genre = l.genre;
    this.livre.imageUrl = l.imageUrl;
    this.livre.prix = l.prix;
    console.log(this.livre);
  }

  saverecupLivre() {
    this.livreService.edit(this.livre).subscribe((data) => {
      this.products();
    });
  }

  // ********************** méthode de recherche par genre *******************

  onGenre(g: any) {
    if (g === 'Retour') {
      this.products();
    } else {
      this.livreService.getbyGenre(g).subscribe((donnees) => {
        this.livres = donnees;
      });
    }

    console.log('c est ; ', g);
  }

  // *********************** méthode de recherche par prix***********************
  onPrice(formi: any) {
    this.livreService.getbyPrice(formi.min, formi.max).subscribe((donne) => {
      this.livres = donne;
    });
  }

  
// *********************** méthode de recherche par mot-clef***********************

onKeyWord(fo:any) {
  this.livreService.getbyKeyWord(fo.motClef).subscribe((donnees2) => {
    this.livres = donnees2;
    
    console.log(donnees2);
    
  });
}












}

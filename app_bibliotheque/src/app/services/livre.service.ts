import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LivreService {

  constructor(private http : HttpClient) { }


  getproducts(){
    return this.http.get("http://localhost:8000/livres");
  }


saveLivre(livre : any){
  return this.http.post("http://localhost:8000/livres", livre);
}

delete(id:any){
  return this.http.delete("http://localhost:8000/livres/"+id);
}

edit(livre:any){
  return this.http.patch("http://localhost:8000/livres/"+livre.id, livre);
}

// ******************** méthode qui apelle la requête par genre*******************
getbyGenre(g: any){
  return this.http.get("http://localhost:8000/livresByGenre?genre="+g);
}



// ******************** méthode qui apelle la requête par prix*******************
getbyPrice(min:any, max:any){
  return this.http.get(`http://localhost:8000/livresByPrice?min=${min}&max=${max}`);
}

// ******************** méthode qui apelle la requête par mot-clef******************

getbyKeyWord(motClef:any){
return this.http.get("http://localhost:8000/livresbyKeyWord?motCles="+motClef);

}





}


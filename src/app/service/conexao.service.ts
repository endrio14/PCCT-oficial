import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

  serve = "ionicpcct.000webhostapp.com/";

  constructor(public http: HttpClient) { }

  setPostData(body, file){

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type' : 'aplication/json; charset=utf-8',
            
        })
    };

    console.log(JSON.stringify(body));
    
    return this.http.post(this.serve+file,JSON.stringify(body),httpOptions).pipe();
  }

  getPostData(){
      return this.http.get("http://curtaparaty.com.br/aula/lista_lixo.php");
  }
  
}

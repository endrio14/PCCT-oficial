import { Component, OnInit } from '@angular/core';
import { ConexaoService } from '../service/conexao.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  nome:any = "";
  descricao:any = "";
  telefone: any = "";
  img: any = "";
  imgFoto:any;

  public lista_lixo = new Array<any>();
 

  constructor(
    private router: Router,
    public lixo: ConexaoService,
    private camera: Camera,
 
  ) {}


  
  TelaCadastro(){
    this.router.navigate(['/cadastro']);
  }

  ngOnInit(){
    //this.carregarLixo();
  }

  carregarLixo(){

    this.lixo.getPostData().subscribe(data =>{
        const responseLixo = (data as any);

        this.lista_lixo = responseLixo.result;
        console.log(this.lista_lixo);
    }, error =>{
      console.log("Erro ao carregar dados");
    } )

  }
dicas(){
  this.router.navigate(['/dicas']);
}

mapa(){
  this.router.navigate(['/mapa']);
}


  foto(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.imgFoto = base64Image;
     
    }, (err) => {
     // Handle error
    });

  }

}

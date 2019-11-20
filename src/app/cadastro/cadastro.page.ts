import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConexaoService } from '../service/conexao.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  descricao:any = "";
  endereco: any = "";
  img: any = "";
  imgFoto:any;


  constructor(
    public toastController: ToastController,
    public postPvdr: ConexaoService,
    private camera: Camera
    ) { }

  ngOnInit() {
  }

  
  
  
  enviar(){
    if( this.descricao != "" && this.endereco != ""){

      let body = {
        nome_imagem: '',
        endereco: this.endereco,
        descricao: this.descricao,
        opc: 'add_register'
      }

      this.postPvdr.setPostData(body,'cadastro.php').subscribe(async data =>{
        var alertpesan = (data as any);
        if(alertpesan != null){
              this.presentToast('Cadastrado com sucesso!');
        }else{
          this.presentToast('Erro no PHP');
        }
      });



    }else{
      
        this.presentToast("Campo Vazio!");
        
    }

   
    this.descricao = "";
    this.endereco = "";


  }

  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  foto(type: string){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
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

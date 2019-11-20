import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  Polyline,
  ILatLng,
  LatLng
} from '@ionic-native/google-maps';
import { ToastController, AlertController } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: GoogleMap;
  marker: Marker;
  polyline: Polyline;
  SantoA: Polyline
  latitude: any;
  longitude: any;
  endereco: any;

  constructor(
    private geolocation: Geolocation,
    public toast: ToastController,
    public diagnostic: Diagnostic,
    public alertController: AlertController,
    public openNativeSettings: OpenNativeSettings,
    private nativeGeocoder: NativeGeocoder
  ) { }

  ngOnInit() {
    this.checkLocation();
  }

  local() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude
      this.longitude = resp.coords.longitude

      this.loadMap();

      this.Geo();

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }


  //esse
  async checkLocation() {

    this.diagnostic.getLocationMode().then((state) => {
      if (state == this.diagnostic.locationMode.LOCATION_OFF) {
        //this.LocationToast('Location off');
        //this.presentAlert();

        this.presentAlert();
      } else {
        //this.LocationToast('Location on');
        //this.carregarEvento();

        this.local();

      }

    }).catch(e => {

    });
  }



  //esse
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Localização',
      message: 'Para continuar, ative a localização do dispositivo que usa o serviço de localização do Google.',
      buttons: [
        {
          text: 'Não, Obrigado',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.open();
          }
        }
      ]
    });

    await alert.present();
  }

  //esse
  open() {

    this.openNativeSettings.open('location').then(val => {
      this.local();
    }).catch(err => {

    });
  }





  loadMap() {

    let points: Array<ILatLng> = [
      { lat: -3.131947, lng: -58.446179 },
      { lat: -3.134946, lng: -58.446262 },
      { lat: -3.134973, lng: -58.439451 },
      { lat: -3.131937, lng: -58.439496 },
    ]

    let pointsS: Array<ILatLng> = [
      { lat: -3.131947, lng: -58.446179 },
      { lat: -3.134946, lng: -58.446262 },
      { lat: -3.134973, lng: -58.439451 },
      { lat: -3.131937, lng: -58.439496 },
    ]



    this.map = GoogleMaps.create('map_canvas', {

      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 15

      }
    })

    this.marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'red',
      position: {
        lat: this.latitude,
        lng: this.longitude
      },

    });

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.presentToast("Clicou!")
    });

    this.marker.trigger(GoogleMapsEvent.MARKER_CLICK);

    this.polyline = this.map.addPolylineSync({
      points: points,
      color: '#AA00FF',
      with: 7,
      geodesic: true,
      clickable: true  // clickable = false in default
    });


    this.SantoA = this.map.addPolylineSync({
      points: pointsS,
      color: 'red',
      with: 7,
      geodesic: true,
      clickable: true  // clickable = false in default
    });


    this.polyline.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
      let position: LatLng = <LatLng>params[0];

      let marker: Marker = this.map.addMarkerSync({
        position: position,
        title: position.toUrlValue(),
        disableAutoPan: true
      });
      marker.showInfoWindow();
    });



  }

  Geo() {

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };

    this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        let Result = result[0];
        //console.log(JSON.stringify(result[0])}
        this.endereco = Result.thoroughfare + ", " + Result.subLocality + ", " + Result.subAdministrativeArea + ", " + Result.administrativeArea + " - " + Result.countryCode + " " + Result.postalCode;
      }).catch((error: any) =>
        console.log(error)
      );

  }



  async presentToast(text: any) {
    const toast = await this.toast.create({
      message: text,
      duration: 2000
    });
    toast.present();
    
  }

}

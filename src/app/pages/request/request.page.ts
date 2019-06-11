import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { Platform, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RequestsService } from '../../services/request/requests.service';



declare var google: any;

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  latlng: any;
  map: any;
  marker: any;
  name: any;
  phoneNumber: any;
  currentLocation: string;

  lat: any;
  lng: any;

  infoWindow = new google.maps.InfoWindow
  
  newRequest = {
    currentLocation: '',
    destination: '',
    parkName: '',
  }
  journeyType: any;
  destination: any;
  autocompleteItems;
  autocomplete;
  geo: any;
  service = new google.maps.places.AutocompleteService();
  origin:any;
  thereIsTypeOfDrop: boolean = false;
  distanceCurrentAddress: any;
  parkNameAndDistance = [];
  myLocationForRequest: String;
  constructor(public geolocation: Geolocation, public plt: Platform, public requestservice: RequestsService
              , public loaderCtrl: LoadingController, public alertCtrl: AlertController, private zone: NgZone,
                public nav: NavController) {
                
                this.autocompleteItems = [];
                this.autocomplete = {
                  query: ''
                }

                
   }

  ngOnInit() {
    this.requestservice.getAllRequests();
    this.initMap();
  }

  onChange(selectedValue){
    console.log(selectedValue);
    this.thereIsTypeOfDrop = true;
  }

  initMap(){
    var geocoder = new google.maps.Geocoder();
    this.plt.ready().then(()=>{
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: true,
        fullscreenControl: true
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
      console.log(this.map);

      this.geolocation.getCurrentPosition().then((pos)=>{
        let latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.origin = {lat: pos.coords.latitude, lng: pos.coords.longitude}
        this.geoCodeLatLng(geocoder, this.map, this.infoWindow, this.marker);
         this.marker = new google.maps.Marker({
          position:latlng, 
          map: this.map,
          draggable: false,
          animation: google.maps.Animation.DROP
        }); 
        this.map.setCenter(latlng);
        this.map.setZoom(15);
      })
    })

  }

  async showAlert(msg){
    let alert = await this.alertCtrl.create({
      header: "Alert",
      message: msg,
      buttons: ['OK']
    })
    alert.present();
  }

  async updateSearch(){
    const loader = await this.loaderCtrl.create({
      message: 'searching',
      spinner: 'dots'
    })
    if(this.autocomplete.query == ''){
      this.autocompleteItems = [];
      return;
    }
    let me  = this;
    this.service.getPlacePredictions({
      input: this.autocomplete.query,
      componentRestrictions: {
        country: 'ng'
      }
    }, (predictions, status)=>{
      me.autocompleteItems = [];
      console.log(status);
      me.zone.run(()=>{
        if(predictions != null){
          predictions.forEach((prediction)=>{
            me.autocompleteItems.push(prediction.description);
          })
        }else{
          console.log("No prediction found!");
        }
      });
    });
  }

  //reverse geocoding
  geoCodeLatLng(geocoder, map, infowindow, marker){
    var latlng = {lat: this.lat, lng: this.lng}
    console.log(latlng);
    geocoder.geocode({"location": latlng}, (result, status)=>{
      if(status == google.maps.GeocoderStatus.OK){
        if(result[0]){
          this.newRequest.currentLocation = (result[0].formatted_address);
          this.myLocationForRequest = (result[0].formatted_address);
          console.log("myLocationForRequest>>>", this.myLocationForRequest);
          infowindow.setContent(result[0].formatted_address);
          infowindow.open(map, marker);
        }else{
          alert("No result found");
        }
      }else{
        alert("Geocoder failed due to "+ status);
      }
    })
  }

  geocodePosition(address: any){
    return new Promise((resolve, reject)=>{
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': this.origin}, (results, status)=>{
        if(status == google.maps.GeocoderStatus.OK){
          if(results[0]){
            let originAddress = results[0].formatted_address
            this.distanceCurrentAddress = originAddress;
            resolve(originAddress);
          }else{
            console.log("Results not found");
          }
        }else{
          console.log("Geocoder failed due to " + status);
        }
      })
    })
  }

  async chooseItem(item: any){
    this.destination = item;
    console.log(this.destination);
    this.autocompleteItems = [];

    let originAddress = await this.geocodePosition(this.destination);
    console.log("Origin Address " + originAddress)
    const loader = await this.loaderCtrl.create({
      message: 'Please wait',
      spinner: 'dots'
    })

    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(this.map);
    loader.present();
    directionsService.route({
      origin: originAddress,
      destination : this.destination,
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status)=>{
      if(status == google.maps.DirectionsStatus.OK){
        loader.dismiss();
        directionsDisplay.setDirections(res);
      }else{
        console.warn(status);
      }
    })
  }

  distance(){
      var service = new google.maps.DistanceMatrixService();
      var park;
      let parkNameAndDistance = [];
      let value = 0;
      let parks =[
        "Jos Terminus, Ahmadu Bello Way, Jos, Nigeria",
        "University Of Jos Permanent Site, Jos, Nigeria",
        "Naraguta Hostel Block A, Naraguta Road,Jos,Nigeria",
        "Angwan Rukuba, Jos, Nigeria",
        "UNIJOS HOSTELS, Zaria Road, Jos,Nigeria"
      ];
      for(let k = 0; k<parks.length; k++){
        service.getDistanceMatrix({
          origins: [this.destination],
          destinations: [parks[k]],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status)=>{
          if(status == 'OK'){
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            for(var i = 0; i<origin.length; i++){
              var results = response.rows[i].elements;
              for(var j=0; j<results.length; j++){
                var element = results[j];
                var distance = element.distance.text;
                var distanceValue = element.distance.value;
                park  = {location: this.myLocationForRequest, destination:this.destination, closestPark: parks[k],  distance: distance, distanceValue: distanceValue}
                parkNameAndDistance.push(park);
              }
            }
          }
        })
      }
      this.parkNameAndDistance = parkNameAndDistance;
  }

  async sendRequest(){
    const loader= await this.loaderCtrl.create({
      message: 'sending request',
      spinner: 'dots'
    })
    loader.present();
    this.distance();
    setTimeout(()=>{
      let nearestPark;
      nearestPark = this.parkNameAndDistance.reduce((prev, curr)=> prev.distanceValue < curr.distanceValue ? prev : curr);
      console.log(nearestPark);
      this.requestservice.sendRequest(nearestPark).then((res:any)=>{
        loader.dismiss();
        if(res.success){
          this.showAlert("Request Sent!");
        }
      })
    }, 1000);
    
  }  

  notifications(){
    this.nav.navigateForward('/menu/notifications');
  }

}

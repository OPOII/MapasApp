import { Component, inject } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  private mapService=inject(MapService)
  private placesService=inject(PlacesService)
  goToMyLocation(){
    if(!this.placesService.isUserLocationReady)throw Error('No hay ubicación de usuario');
    if(!this.mapService.isMapReady)throw Error('No se ha inicializado el mapa');
    this.mapService.flyTo(this.placesService.userLocation!)
  }
}

import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import { Map,Popup,Marker } from 'mapbox-gl';
import { MapService } from '../../services/map.service';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit{

  @ViewChild('mapDiv')
  mapDivElement!:ElementRef
  private placesService=inject(PlacesService);
  private mapService=inject(MapService)

  ngAfterViewInit(): void {
    if(!this.placesService.userLocation)throw Error('No hay placesServices.userLocation')
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v11', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
      });
      const popup=new Popup()
      .setHTML(`<h6>Aquí estoy</h6>
      <span>Estoy en el lugar del mundo</span>`
      );
      new Marker({color:'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map)

    this.mapService.setMap(map)

  }
}

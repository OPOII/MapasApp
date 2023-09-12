import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId:string='';

  private placesService=inject(PlacesService);
  private mapService=inject(MapService)
  get isLoadingPlaces():boolean{
    return this.placesService.isLoadingPlaces;
  }

  get places():Feature[]{
    return this.placesService.places
  }

  flyTo(place:Feature){
    this.selectedId=place.id;
    const [lng,lat]=place.center;
    this.mapService.flyTo([lng,lat])
  }

  getDirections(place:Feature){
    if(!this.placesService.userLocation)throw Error('No hay userLocation')
    const start=this.placesService.userLocation;
    const end=place.center as [number,number];
    this.mapService.getRouteBetweenPoints(start,end)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesApi=inject(PlacesApiClient)
  private mapService=inject(MapService)
  public userLocation?:[number,number];
  public isLoadingPlaces:boolean=false;
  public places:Feature[]=[];



  get isUserLocationReady():boolean{
    return !!this.userLocation
  }

  constructor() {
    this.getUserLocation()
  }


  getUserLocation():Promise<[number,number]>{
    return new Promise((resolve,rejeect)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.userLocation=[coords.longitude,coords.latitude]
          resolve(this.userLocation);
        },
        (err)=>{
          alert('No se pudo obtener la geolocalización')
        }
      )
    })
  }
  getPlacesByQuery(query:string=''){
    if(query.length===0){
      this.places=[];
      this.isLoadingPlaces=false;
      return;
    }
    if(!this.userLocation)throw Error ('No hay userLocation')
    this.isLoadingPlaces=true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`,{
      params:{
        proximity: this.userLocation?.join(',')
      }
    })
    .subscribe(resp=>{
      this.isLoadingPlaces=false;
      this.places=resp.features;
      this.mapService.createMarkersFromPlaces(this.places,this.userLocation!)
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private http=inject(HttpClient)

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

    this.isLoadingPlaces=true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoib3BvaWkiLCJhIjoiY2xsZmh6cWVvMHFzMjNocXZlOXgzc3R6cyJ9.ZjWbcM9LITUxQxVHToYdVQ`)
    .subscribe(resp=>{
      this.isLoadingPlaces=false;
      this.places=resp.features;
    })
  }
}

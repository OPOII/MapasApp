import { Injectable, inject } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map:Map|undefined;
  private markers:Marker[]=[];

  private directionsApi=inject(DirectionsApiClient);

  constructor() { }
  get isMapReady(){
    return !!this.map;
  }

  setMap(map:Map){
    this.map=map;
  }
  flyTo(cords:LngLatLike){
    if(!this.isMapReady)throw Error('El mapa no esta inicializado');

    this.map?.flyTo({
      zoom:14,
      center:cords
    })
  }
  createMarkersFromPlaces(places:Feature[], userLocation:[number,number]){
    if(!this.map)throw Error('Mapa no inicializado')
    this.markers.forEach(marker=>marker.remove());
  const newMarkers=[];
  for(const place of places){
    const [lng,lat]=place.center;
    const popup=new Popup()
    .setHTML(`
    <h6>${place.text}</h6>
    <span>${place.place_name}</span>
    `);
    const newMarker=new Marker()
    .setLngLat([lng,lat])
    .setPopup(popup)
    .addTo(this.map)

    newMarkers.push(newMarker)
  }
  this.markers=newMarkers;
  if(places.length===0)return;

    //limites mapas
    const bounds=new LngLatBounds()
    newMarkers.forEach(marker=>bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation)
    this.map.fitBounds(bounds,{
      padding:200
    })
  }

  getRouteBetweenPoints(start:[number,number],end:[number,number]){
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
    .subscribe(resp=>{
      this.drawPolyLine(resp.routes[0])
      console.log(resp)
    })
  }

  private drawPolyLine(route:Route){
    console.log({km:route.distance/1000 , duration:route.duration/60} );

    if(!this.map)throw Error ('El mapa no esta inicializado')

    const coords=route.geometry.coordinates;

    const bounds= new LngLatBounds();
    coords.forEach(([lng,lat])=>{
      bounds.extend([lng,lat])
    })

    this.map?.fitBounds(bounds,{
      padding:200
    })
    const sourceData:AnySourceData={
      type:'geojson',
      data:{
        type:'FeatureCollection',
        features:[
          {
            type:'Feature',
            properties:{},
            geometry:{
              type:'LineString',
              coordinates:coords
            }
          }
        ]
      }
    }

    if(this.map.getLayer('RouteString')){
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString',sourceData);
    this.map.addLayer({
      id:'RouteString',
      type:'line',
      source:'RouteString',
      layout:{
        'line-cap':'round',
        'line-join':'round'
      },
      paint:{
        'line-color':'red',
        'line-width':2
      }
    })
  }
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1Ijoib3BvaWkiLCJhIjoiY2xsZmk1bWxzMHA0ODNscGp4dTc1YXMxYyJ9.4W2-nZ7oilWcDMjYg3CyCw';

if(!navigator.geolocation){
  alert('No hay geolocalización')
  throw new Error('No hay geolocalización');
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

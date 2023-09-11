import { Component, OnInit, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {

  private placesServices=inject(PlacesService)
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private deboundsTimer?:NodeJS.Timeout
  private placesService=inject(PlacesService)
  onQueryChanged(query:string=''){
    if(this.deboundsTimer)clearTimeout(this.deboundsTimer);

    this.deboundsTimer=setTimeout(() => {
      this.placesService.getPlacesByQuery(query)
    }, 500);
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private deboundsTimer?:NodeJS.Timeout

  onQueryChanged(query:string=''){
    if(this.deboundsTimer)clearTimeout(this.deboundsTimer);

    this.deboundsTimer=setTimeout(() => {

    }, 500);
  }

}

import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor (private gifsService: GifsService) {
    this.searchGifsFirstLoad()
  }

  get gifsNames(): string[] {
    return this.gifsService.tagsHistory
  }

  reSearchGifs(value: string):void {
    this.gifsService.searchTag(value)
  }

  private searchGifsFirstLoad(): void {
    if(this.gifsService.tagsHistory.length === 0) return;
    this.gifsService.searchTag(this.gifsService.tagsHistory[0]);
  }

}

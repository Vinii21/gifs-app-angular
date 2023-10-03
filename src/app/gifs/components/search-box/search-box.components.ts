import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `<h5>Buscar:</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar Gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `
})

export class SearchBoxComponent {

  @ViewChild("txtTagInput")
  public tagInput!: ElementRef<HTMLInputElement>

 /*  searchTag(newTag: string):void {
    console.log(newTag)
  } */
  searchTag():void {
    const newTag = this.tagInput.nativeElement.value
    console.log({newTag})
  }
}

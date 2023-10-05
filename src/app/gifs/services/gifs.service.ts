import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = "wkfUxdiDfMjNwPpyKrv1COVkxIatdhnp";

@Injectable({providedIn: 'root'})
export class GifsService {

  constructor(private http: HttpClient ) {
    this.loadLocalStorage();
  }

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = GIPHY_API_KEY;
  private serviceURL: string = "https://api.giphy.com/v1/gifs/"

  private safeLocalStorage(): void {
    localStorage.setItem("history", JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void {
    if(!localStorage.getItem("history")) return;

    this._tagsHistory = JSON.parse(localStorage.getItem("history")! );

  }


  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string) {
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice( 0, 10);
    this.safeLocalStorage();
  }

  /* async */ searchTag(newTag: string):void/* :Promise<void> */ {
    if(newTag.length === 0) return;
    this.organizeHistory(newTag);
    /* con promesa, no necesita el async await, pero debe tipar el método con :Promise<void> */
    /* fetch("https://api.giphy.com/v1/gifs/search?api_key=wkfUxdiDfMjNwPpyKrv1COVkxIatdhnp&q=mario bros&limit=10")
      .then(resp => resp.json())
      .then(data => console.log(data)) */

      /* con async await, es decir debe colocar el async al principio del método y el await cuando se este procesando la request */
      /* const resp = await fetch("https://api.giphy.com/v1/gifs/search?api_key=wkfUxdiDfMjNwPpyKrv1COVkxIatdhnp&q=mario bros&limit=10");
      const data = await resp.json();
      console.log(data) */

      /* Con HttpModule de Angular */
      const params = new HttpParams()
        .set("api_key", this.apiKey)
        .set("limit", "8")
        .set("q", newTag)
    this.http.get<SearchResponse>(`${this.serviceURL}search`, {params})
      .subscribe(resp => {
        this.gifList = resp.data;
        console.log(this.gifList)
      })
  }

}

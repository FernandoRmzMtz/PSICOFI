import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  public activos: any = [];

  constructor(private _http: HttpClient) { }

 

}

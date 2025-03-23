import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assingmentName: string, action: string){
    console.log("Assignment" + assingmentName + " " + action);
  }
}

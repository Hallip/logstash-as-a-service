import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPlguinsService {

  constructor(private http: HttpClient) { }


  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
    //    Authorization: this.authService.getToken()
  });

  getPlugins(type:string,search?:string) {

    if (search) {
      var query = `\"query\": {\"bool\": {\"must\": [{\"multi_match\": {\"query\": \"${search}\",\"fields\": [\"name^2\",\"description\"]}},{\"term\": {\"type\": {\"value\": \"${type}\"}}}]}}`
    } else {
      var query = `\"query\": {\"bool\": {\"must\": [{\"term\": {\"type\": {\"value\": \"${type}\"}}}]}}`
    }

    const url_api = `/las-pluguins/_search?source_content_type=application/json&source={${query}}`;
    console.log(url_api)
    return this.http.get(url_api);
  }
}

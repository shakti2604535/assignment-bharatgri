import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CropService {
  private apiUrl =
    'https://api-cache-test.leanagri.com/pop/pop_list/en/64/pop_list.json'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetch crops from the API.
   * @returns Observable<any> Crops data.
   */
  getCrops(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get(`${this.url}/users?per_page=6&delay=2`)
      .pipe(map((resp: any) => resp.data));
  }

  getUserById(id: string) {
    return this.http
      .get(`${this.url}/users/${id}`)
      .pipe(map((resp: any) => resp.data));
  }
}

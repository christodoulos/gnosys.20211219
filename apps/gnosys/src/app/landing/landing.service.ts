import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignupForm } from '@gnosys/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  constructor(private http: HttpClient, private router: Router) {}

  signup(data: SignupForm) {
    this.http.post('/api/user', data).subscribe((data) => {
      console.log(data);
      this.router.navigate(['signin']);
    });
  }
}

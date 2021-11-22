import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpFormData } from '@gnosys/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  constructor(private http: HttpClient, private router: Router) {}

  signup(data: SignUpFormData) {
    this.http.post('/api/user', data).subscribe((newUser) => {
      console.log(newUser);
      this.router.navigate(['signin']);
    });
  }
}

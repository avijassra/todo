import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user = { id: 0, name: '', email: '' };
  userDetails: any;

  constructor(private apiService: ApiService) {}

  createUser() {
    this.apiService.createUser(this.user).subscribe((response) => {
      console.log('User created:', response);
    });
  }

  getUser() {
    this.apiService.getUser(this.user.id).subscribe((response) => {
      this.userDetails = response;
    });
  }
}

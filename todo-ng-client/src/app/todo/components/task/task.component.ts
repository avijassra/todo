import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  task = { id: 0, user_id: 0, title: '', description: '' };
  tasks: any[] = [];

  constructor(private apiService: ApiService) {}

  createTask() {
    this.apiService.createTask(this.task).subscribe((response) => {
      console.log('Task created:', response);
    });
  }

  getTasks() {
    this.apiService.getTasks(this.task.user_id).subscribe((response) => {
      this.tasks = response;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todo',
    imports: [FormsModule, NgFor],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTask: string = '';

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.loadTodos();
  }

  // Load all todos
  async loadTodos() {
    this.todos = await this.supabaseService.getTodos();
  }

  // Add a new todo
  async addTodo() {
    if (this.newTask.trim() === '') return;
    await this.supabaseService.addTodo(this.newTask);
    this.newTask = '';
    await this.loadTodos();
  }

  // Toggle completion status
  async toggleCompletion(todo: any) {
    await this.supabaseService.toggleTodoCompletion(todo.id, todo.is_complete);
    await this.loadTodos();
  }

  // Delete a todo
  async deleteTodo(id: number) {
    await this.supabaseService.deleteTodo(id);
    await this.loadTodos();
  }
}
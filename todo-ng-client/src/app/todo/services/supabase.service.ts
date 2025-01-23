import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://yabzwkioxnmuomppllbt.supabase.co'; // Replace with your Supabase API URL
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYnp3a2lveG5tdW9tcHBsbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1OTQ4MzksImV4cCI6MjA1MzE3MDgzOX0.8_epPk8vuN1jigCs5R6gz2_O40EbPHrQyY-qfN_eSU0'; // Replace with your Supabase Anon Key
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  constructor() {}

  // Fetch all todos
  async getTodos() {
    const { data, error } = await this.supabase.from('todos').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  // Add a new todo
  async addTodo(task: string) {
    const { data, error } = await this.supabase.from('todos').insert([{ task, is_complete: false }]);
    if (error) throw error;
    return data;
  }

  // Toggle todo completion
  async toggleTodoCompletion(id: number, isComplete: boolean) {
    const { data, error } = await this.supabase.from('todos').update({ is_complete: !isComplete }).eq('id', id);
    if (error) throw error;
    return data;
  }

  // Delete a todo
  async deleteTodo(id: number) {
    const { data, error } = await this.supabase.from('todos').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  // BehaviorSubject inicializado con datos quemados
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  constructor() {
    // Cargar tareas iniciales si es necesario
    this.initializeTasks();
  }

  private initializeTasks (){
    const  initialTasks: Task[] = [
    {
      id: 1,
      title: 'Tarea 1',
      date: '2022-01-02',
      completed: false,
      persons: [
        {id:1, fullName: 'John Doe', age: 25, abilities: ['Coding'] },
        {id:2, fullName: 'Jane Schmith', age: 30, abilities: ['Drawing'] }
      ]
    },
    {
      id: 2,
      title: 'Tarea 2',
      date: '2022-01-02',
      completed: false,
      persons: [
        { id:2, fullName: 'Jane Smith', age: 30, abilities: ['Design'] }
      ]
    },
    {
      id: 2,
      title: 'Tarea 3',
      date: '2022-01-02',
      completed: true,
      persons: [
        { id:2, fullName: 'Sebastian Smith', age: 20, abilities: ['Write','Coding'] }
      ]
    }
    ,
    {
      id: 2,
      title: 'Tarea 4',
      date: '2022-01-02',
      completed: true,
      persons: [
        { id:2, fullName: 'Andres Doe', age: 18, abilities: ['Design','Angular'] }
      ]
    }
  ];
    this.tasks.next(initialTasks); // Inicializa las tareas
  }

  getTasks() {
    return this.tasks.getValue();
  }

  // Añadir nueva tarea
  addTask(task: Task) {
    const currentTasks = this.tasks.getValue();
    this.tasks.next([...currentTasks, task]);
  }

  // Actualizar tarea
  updateTask(updatedTask: Task) {
    const currentTasks = this.tasks.getValue().map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasks.next(currentTasks);
  }

  // Eliminar tarea
  removeTask(taskId: number) {
    const updatedTasks = this.tasks.getValue().filter(task => task.id !== taskId);
    this.tasks.next(updatedTasks);
  }

  
}

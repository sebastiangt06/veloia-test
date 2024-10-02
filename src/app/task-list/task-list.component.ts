import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../model';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent{

  tasks : Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';


  constructor(private taskService: TaskService){

  } 

  applyFilter() {
    if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed); // Filtrar tareas completadas
    } else if (this.filter === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed); // Filtrar tareas pendientes
    } else {
      this.filteredTasks = this.tasks; // 'all' (todas las tareas)
    }
  }

  ngOnInit(): void{
    
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks; // Inicialmente, todas las tareas son visibles

    this.taskService.tasks$.subscribe(updatedTasks => {
      this.tasks = updatedTasks;
      this.applyFilter();
    });
    
  }

   // Métodos para cambiar el estado del filtro
   setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
    this.applyFilter(); // Aplica el filtro al cambiarlo
  }
  
  markAsCompleted(task: Task) {
    const updatedTask = { ...task, completed: true }; // Crea una copia de la tarea y cambia completed a true
    this.taskService.updateTask(updatedTask); // Actualiza la tarea en el servicio
  }
}

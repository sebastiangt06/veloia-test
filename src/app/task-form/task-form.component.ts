import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, Form  } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  taskForm!: FormGroup;
  selected: any;
  deleted : any;

  newAbilityControl = this.fb.control('');

  trackByIndex(index: number): number {
    return index;
  }

  createPersonGroup(): FormGroup{
    return this.fb.group({
      personName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      abilities: this.fb.array([])
    })

  }
  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router){
    this.taskForm = this.fb.group({
      task:['', Validators.required],
      dateLimit: ['', Validators.required],
      persons: this.fb.array([this.createPersonGroup()])
      
    })
  }

  get persons(): FormArray{
    return this.taskForm.get('persons') as FormArray;
  }

  abilities(personIndex: number): FormArray{
    return this.persons.at(personIndex).get('abilities') as FormArray;
  }

  addPerson():void{
    this.persons.push(this.createPersonGroup());
  }

  removePerson(index: number):void{
    this.persons.removeAt(index);
  }

  addAbility(personIndex:number, ability:string):void{
    if (ability && ability.trim() !== '') {


      const abilitiesArray = this.abilities(personIndex);
      abilitiesArray.push(this.fb.control(ability, Validators.required));
      console.log('Habilidades actuales:', abilitiesArray.value);
      
    }
    
  }

  removeAbility(personIndex:number, index:number):void{
    this.abilities(personIndex).removeAt(index);
  }

  

  onOptionSelected(value: any) {
    this.selected = value;
  }
 
  onSubmit(): void {
    if (this.taskForm.valid) {

    const taskDate = this.taskForm.value.dateLimit; // Obtén la fecha del formulario
    const formattedDate = new Date(taskDate).toISOString().split('T')[0]; // Formatea solo la parte de la fecha (YYYY-MM-DD)

      // Crear una nueva tarea con los datos del formulario
      const newTask = {
        id: Date.now(), // Generar un ID único
        title: this.taskForm.value.task,
        date: formattedDate,
        completed: false,
        persons: this.taskForm.value.persons.map((person:any) => ({
          id: Date.now(),
          fullName: person.personName,
          age: person.age,
          abilities: [...person.abilities]
        })),
      };

      // Llamar al servicio para agregar la tarea
      this.taskService.addTask(newTask);
      console.log('Nueva tarea: ',newTask)
      // Resetear el formulario después de guardar la tarea
      
      this.taskForm.reset();
     // this.router.navigate(['/tasklist']); 


    }
  }

}

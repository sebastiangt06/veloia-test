import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-velaio';

  constructor( private router: Router){
    
  }

  formNavigate(){
    this.router.navigate(['/']); 
  }

  listNavigate(){
    this.router.navigate(['/tasklist']);
  }
  
}

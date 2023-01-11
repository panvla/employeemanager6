import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    public employees: Employee[];
    public editEmployee: Employee;
    public deleteEmployee: Employee;

    constructor(private employeeService: EmployeeService){}


    ngOnInit(): void {
      this.getEmployees();
    } 

    public getEmployees(): void {
      this.employeeService.getEmployees().subscribe(
        (response: Employee[])=>{
          this.employees = response;
          console.log(this.employees);
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      );
    }

    public onAddEmployee(addForm: NgForm): void {
      document.getElementById('add-employee-form').click();
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response: Employee)=>{
          console.log(response);
          this.getEmployees();
          addForm.reset();
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      );
    }

    public onOpenModal(employee: Employee, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add'){
        button.setAttribute('data-target', '#addEmployeeModal');
      }
      container.appendChild(button);
      button.click();
    }
}

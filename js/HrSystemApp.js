'use strict';

function Employee(name , email , department , salary)
{
  this.name = name ;
  this.email = email ;
  this.department = department;
  this.salary = salary ;
  Employee.employees.push(this);
}

Employee.employees = [];


Employee.prototype.saveToStorage = function()
{
  localStorage.setItem('employees' , JSON.stringify(Employee.employees));
};

function renderEmployees()
{
  const container = document.getElementById('container');
  container.innerHTML = '';
  const tableEl = document.createElement('table');
  container.appendChild(tableEl);
  let sum = 0 ;
  for(let i = -1 ; i < Employee.employees.length ; i++)
  {
    const trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    const tdEl1 = document.createElement('td');
    trEl.appendChild(tdEl1);
    const tdEl2 = document.createElement('td');
    trEl.appendChild(tdEl2);
    const tdEl3 = document.createElement('td');
    trEl.appendChild(tdEl3);
    const tdEl4 = document.createElement('td');
    trEl.appendChild(tdEl4);

    if( i == -1  )
    {
      tdEl1.textContent = 'Name';
      tdEl2.textContent = 'Email';
      tdEl3.textContent = 'Department';
      tdEl4.textContent = 'Salary';
    }
    else
    {
      tdEl1.textContent = Employee.employees[i].name;
      tdEl2.textContent = Employee.employees[i].email;
      tdEl3.textContent = Employee.employees[i].department;
      tdEl4.textContent = Employee.employees[i].salary;
      sum += Employee.employees[i].salary;
    }
  }
  const total = document.createElement('span');
  container.appendChild(total);
  total.textContent = `Total = ${sum}`;
}

document.getElementById('systemForm').addEventListener('submit' , addEmployee );

function addEmployee(event)
{
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const department = document.getElementById('department').value;
  const salary = randomNum(100,500);
  const employee = new Employee(name , email , department , salary);
  employee.saveToStorage();
  renderEmployees();
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('department').value = 'Call-Center' ;
}


function randomNum(min , max )
{
  return Math.floor(Math.random()*(max - min) + min );
}


function reloadEmployees()
{
  const employeesList = JSON.parse(localStorage.getItem('employees'));
  for(let i in employeesList)
  {
    new Employee(employeesList[i].name , employeesList[i].email , employeesList[i].department , employeesList[i].salary);
  }
  renderEmployees();
}

reloadEmployees();


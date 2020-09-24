import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface DataDemo {
  fullName: string;
  jobTitle: string;
  level: string;
  function: string;
  company: string;
  specialty: string;
  country: string;
  employees: number;
  revenue: number;
  industry: string;
  subIndustry: string;
}


  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  data: any;
  setEmp: any;
  empMin: any = 0;
  empMax: any = 20;
  empMinNew: any;
  empMaxNew: any;

   dataDemo: DataDemo[] = [
    {
      fullName: 'string',
      jobTitle: 'string',
      level: 'string',
      function: 'string',
      company: 'string',
      specialty: 'string',
      country: 'string',
      employees: 123,
      revenue: 40,
      industry: 'string',
      subIndustry: 'string'
    },{
      fullName: 'string',
      jobTitle: 'string',
      level: 'string',
      function: 'string',
      company: 'string',
      specialty: 'string',
      country: 'string',
      employees: 123,
      revenue: 40,
      industry: 'string',
      subIndustry: 'string'
    },{
      fullName: 'string',
      jobTitle: 'string',
      level: 'string',
      function: 'string',
      company: 'string',
      specialty: 'string',
      country: 'string',
      employees: 123,
      revenue: 40,
      industry: 'string',
      subIndustry: 'string'
    }];

  displayedColumns: string[] = [ 'fullName', 'jobTitle', 'level', 'function', 'company', 'specialty', 'country', 'employees', 'revenue', 'industry', 'subIndustry' ];
  dataSource: MatTableDataSource<DataDemo>;

  constructor() { 
    this.empMaxNew = this.empMax;
    this.empMinNew = this.empMin;
    this.dataSource = new MatTableDataSource(this.dataDemo);
  }

  setEmployeesRange(setEmp) {
    this.empMaxNew = setEmp.upper;
    this.empMinNew = setEmp.lower;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HomeDataService } from './home-data.service';
import {Subscription} from 'rxjs';
import { DataDemo } from '../model/DataDemo.model';
import { ExcludeDialogComponent } from '../exclude-dialog/exclude-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../model/DialogData.model';
import { IncludeDialogComponent } from '../include-dialog/include-dialog.component';
import { AddExtraDialogComponent } from '../add-extra-dialog/add-extra-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data: any;
  setEmp: any;
  setRev: any;
  empMin: any = 0;
  empMax: any = 20;
  revMin: any = 0;
  revMax: any = 300;
  empMinNew: any;
  empMaxNew: any;
  revMinNew: any;
  revMaxNew: any;
  chip: string;
  EmpRangechip: string;
  countryDelete: any;

  chipSet = new Set();

  public jobTitle = [{ show: 'Manager and above', val: 'Manager', isChecked: false },
  { show: 'Director and above ', val: 'Director', isChecked: false }];

  public Geo = [{ val: 'United States', isChecked: false },
  { val: 'Canada', isChecked: false },
  { val: 'Australia', isChecked: false },
  { val: 'Europe', isChecked: false }];

  public Industry = [{ show: 'IT and Services', val: 'Information Technology and Services', isChecked: false },
  { show: 'Software', val: 'Computer Software', isChecked: false },
  { show: 'Telecommunications', val: 'Telecommunications', isChecked: false }];

  public Function = [{ val: 'Marketing', isChecked: false },
  { val: 'Finance', isChecked: false },
  { val: 'Sales ', isChecked: false }];


  displayedColumns: string[] = ['firstName', 'lastName', 'contactCountry', 'jobLevel1', 'jobFunction1', 'company', 'industryType1', 'subIndustryType1', 'jobTitle1', 'employeeSizeToValue', 'employeeSizeFromValue', ];
  dataSource: MatTableDataSource<DataDemo>;

  empChanged: boolean;
  empChip: string;
  revChip: string;
  revChanged: boolean;
  industryCountChanged: boolean;
  IndChecked: number;
  subData: Subscription;
  dataDemoResponseList: DataDemo[];
  progressBar: boolean;
  countrySet = new Set();
  functionSet = new Set();
  titleSet = new Set();
  industrySet = new Set();
  excludeData: DialogData;
  ExcludedList: DialogData;
  includeData: DialogData;
  findData: DialogData;

  constructor(private homeDataService: HomeDataService, public dialog: MatDialog) {
    this.empMaxNew = this.empMax;
    this.empMinNew = this.empMin;
    this.revMaxNew = this.revMax;
    this.revMinNew = this.revMin;
    this.dataSource = new MatTableDataSource();
  }
  

  async setEmployeesRange(setEmp) {
    this.empMaxNew = setEmp.upper;
    this.empMinNew = setEmp.lower;
    this.empChanged = true;
    this.empChip = 'Employees ' + this.empMinNew + 'k - ' + this.empMaxNew + 'k';
  }
  setRevenueRange(setRev) {
    this.revMaxNew = setRev.upper;
    this.revMinNew = setRev.lower;
    this.revChanged = true;
    this.revChip = 'Revenue ' + this.revMinNew + 'M - ' + this.revMaxNew + 'M';
  }

  jobTitleSelected(jobTitle) {
    for (const item of jobTitle) {
      if (item.isChecked) {
        this.chipSet.add(item.val);
        this.titleSet.add(item.val);
      } else {
        this.chipSet.delete(item.val);
        this.titleSet.delete(item.val);
      }

    }
  }
  countrySelected(Geo) {
    for (const item of Geo) {
      if (item.isChecked) {
        this.chipSet.add(item.val);
        this.countrySet.add(item.val);
      } else {
        this.chipSet.delete(item.val);
        this.countrySet.delete(item.val);
      }
    }
  }
  functionSelected(Function) {
    for (const item of Function) {
      if (item.isChecked) {
        this.chipSet.add(item.val);
        this.functionSet.add(item.val);
      } else {
        this.chipSet.delete(item.val);
        this.functionSet.delete(item.val);
      }
    }

  }
  industrySelected(Industry) {
    for (const item of Industry) {
      if (item.isChecked) {
        this.chipSet.add(item.val);
        this.industrySet.add(item.val);
      } else {
        this.chipSet.delete(item.val);
        this.industrySet.delete(item.val);
      }
    }

  }


  getApplySize() {
    let count = 0;
    if (this.empChanged) { count++; }
    if (this.revChanged) { count++; }
    return count + this.chipSet.size;
  }
  cancelAll() {
    this.chipSet.clear();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilterSearchBar($event){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async applyDataFilters() {

    const dataRequest = this.getDataObject();

    this.progressBar = true;
    this.subData = this.homeDataService.getAllData(dataRequest).subscribe(async res => {
      this.dataDemoResponseList = res;
      this.dataSource.data = this.dataDemoResponseList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.progressBar = false;
    },
      error => {
        console.log(error); this.progressBar = false;
      });
  }
  getDataObject(): DataDemo {

    const dataObject = new DataDemo();
    if (this.titleSet.size !== 0) {
      dataObject.JobLevel1 = Array.from(this.titleSet).toString();
    }
    if (this.functionSet.size !== 0) {
      dataObject.JobFunction1 = Array.from(this.functionSet).toString();
    }
    if (this.industrySet.size !== 0) {
      dataObject.IndustryType1 = Array.from(this.industrySet).toString();
    }
    if (this.countrySet.size !== 0) {
      dataObject.ContactCountry = Array.from(this.countrySet).toString();
    }
    if (this.empChanged == true) {
      dataObject.Company = (this.empMinNew * 1000) + ',' + (this.empMaxNew * 1000);
    }
    if (this.revChanged == true) {
      dataObject.SubIndustryType1 = (this.revMinNew * 1000000) + ',' + (this.revMaxNew * 1000000);
    }
    console.log(dataObject);
    return dataObject;
  }

  getFindDataObject(req: DialogData): DataDemo {

    const dataObject = new DataDemo();
    if (this.titleSet.size !== 0) {
      dataObject.JobLevel1 = Array.from(this.titleSet).toString();
    }
    if (this.functionSet.size !== 0) {
      dataObject.JobFunction1 = Array.from(this.functionSet).toString();
    }
    if (this.industrySet.size !== 0) {
      dataObject.IndustryType1 = Array.from(this.industrySet).toString();
    }
    if (this.countrySet.size !== 0) {
      dataObject.ContactCountry = Array.from(this.countrySet).toString();
    }
    if (this.empChanged == true) {
      dataObject.Company = (this.empMinNew * 1000) + ',' + (this.empMaxNew * 1000);
    }
    if (this.revChanged == true) {
      dataObject.SubIndustryType1 = (this.revMinNew * 1000000) + ',' + (this.revMaxNew * 1000000);
    }
    dataObject.FirstName = req.Name;
    dataObject.Speciality = req.Company;
    console.log(dataObject);
    return dataObject;
  }


  async openExcludeDialog() {
    const dialogHandeler = this.dialog.open(ExcludeDialogComponent);

    dialogHandeler.afterClosed().subscribe(async result => {

      this.excludeData = result;
      if (this.excludeData) {
        this.progressBar = true;
        this.subData = this.homeDataService.getAllExcludeData(this.excludeData).subscribe(async (res) => {
          this.dataDemoResponseList = res;
          this.dataSource.data = this.dataDemoResponseList;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.progressBar = false;
        },
          error => {
            console.log(error); this.progressBar = false;
          });
      }
    });

  }


  async SpecificDialog() {
    console.log('openIncludeDialog');
    const dialogHandeler = this.dialog.open(IncludeDialogComponent);

    dialogHandeler.afterClosed().subscribe(async result => {

      this.findData = result;
      this.countrySet.clear();
      this.industrySet.clear();
      this.functionSet.clear();
      this.titleSet.clear();
      this.chipSet.clear();
      this.countrySet.add(this.findData.Country);
      this.industrySet.add(this.findData.SubIndustry);
      this.functionSet.add(this.findData.JobFunction);
      this.titleSet.add(this.findData.JobLevel);
      this.chipSet.add(this.findData.Country);
      this.chipSet.add(this.findData.SubIndustry);
      this.chipSet.add(this.findData.JobFunction);
      this.chipSet.add(this.findData.JobLevel);
      const dataRequest = this.getFindDataObject(this.findData);

      if (this.findData) {
        this.progressBar = true;
        this.subData = this.homeDataService.getAllData(dataRequest).subscribe(async (res) => {
        this.dataDemoResponseList = res;
        this.dataSource.data = this.dataDemoResponseList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.progressBar = false;
      },
        error => {
          console.log(error); this.progressBar = false;
        });
      }

    });

  }

  async addExtraDialog() {

    const dialogHandeler = this.dialog.open(AddExtraDialogComponent);

    dialogHandeler.afterClosed().subscribe(async result => {

      this.findData = result;
      // this.countrySet.clear();
      // this.industrySet.clear();
      // this.functionSet.clear();
      // this.titleSet.clear();
      // this.chipSet.clear();
      this.countrySet.add(this.findData.Country);
      this.industrySet.add(this.findData.SubIndustry);
      this.functionSet.add(this.findData.JobFunction);
      this.titleSet.add(this.findData.JobLevel);
      this.chipSet.add(this.findData.Country);
      this.chipSet.add(this.findData.SubIndustry);
      this.chipSet.add(this.findData.JobFunction);
      this.chipSet.add(this.findData.JobLevel);
      const dataRequest = this.getFindDataObject(this.findData);

      if (this.findData) {
        this.progressBar = true;
        this.subData = this.homeDataService.getAllData(dataRequest).subscribe(async (res) => {
        this.dataDemoResponseList = res;
        this.dataSource.data = this.dataDemoResponseList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.progressBar = false;
      },
        error => {
          console.log(error); this.progressBar = false;
        });
      }

    });

  }

  clearAllFilters(){
    this.chipSet.clear();
    this.countrySet.clear();
    this.industrySet.clear();
    this.functionSet.clear();
    this.titleSet.clear();
    this.empChanged = false;
    this.revChanged = false;
    if (this.subData) { this.subData.unsubscribe() };
    this.progressBar = false;
  }




  //   if (this.excludeData.Company) {
  //     this.dataDemoResponseList.splice(this.dataDemoResponseList.
  //       findIndex(e => e.Company === this.excludeData.Company));
  //   }
  //   if (this.excludeData.Name) {
  //     console.log(this.excludeData.Name);
  //     this.dataDemoResponseList.splice(this.dataDemoResponseList.
  //       findIndex(e => e.FirstName === this.excludeData.Name));
  //   }
  //   if (this.excludeData.SubIndustry) {
  //     this.dataDemoResponseList.filter(company => company.SubIndustryType1 === this.excludeData.SubIndustry);
  //   }
  //   if (this.excludeData.JobFunction) {
  //    this.dataDemoResponseList.filter(company => company.JobFunction1 === this.excludeData.JobFunction);
  //   }
  //   if (this.excludeData.JobLevel) {
  //      this.dataDemoResponseList.filter(company => company.JobLevel1 === this.excludeData.JobLevel);
  //   }
  //   if (this.excludeData.Country) {
  //      console.log(this.excludeData.Country);
  //      this.ExcludedList = this.dataDemoResponseList.filter(company => company.ContactCountry === this.excludeData.Country);
  //      console.log(this.ExcludedList);
  //      this.dataSource = new MatTableDataSource(this.ExcludedList);
  //      //this.dataSource.data = this.dataDemoResponseList;
  //      this.dataSource.paginator = this.paginator;
  //      this.dataSource.sort = this.sort;
  //   }

  // });
}

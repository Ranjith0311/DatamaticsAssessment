import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExcludeDialogComponent } from '../exclude-dialog/exclude-dialog.component';
import { DialogData } from '../model/DialogData.model';

@Component({
  selector: 'app-include-dialog',
  templateUrl: './include-dialog.component.html',
  styleUrls: ['./include-dialog.component.scss'],
})
export class IncludeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IncludeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

excludeDialogData = new DialogData();

ngOnInit() {}

onNoClick(): void {
this.dialogRef.close();
}

async submitExcludeForm(excludeForm: NgForm) {
this.excludeDialogData.Company = excludeForm.value.company;
this.excludeDialogData.Name = excludeForm.value.name;
this.excludeDialogData.SubIndustry = excludeForm.value.industry;
this.excludeDialogData.Country = excludeForm.value.country;
this.excludeDialogData.JobFunction = excludeForm.value.jobFunction;
this.excludeDialogData.JobLevel = excludeForm.value.jobLevel;
}
}

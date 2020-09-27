import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { DialogData } from '../model/DialogData.model';

@Component({
  selector: 'app-add-extra-dialog',
  templateUrl: './add-extra-dialog.component.html',
  styleUrls: ['./add-extra-dialog.component.scss'],
})
export class AddExtraDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddExtraDialogComponent>,
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

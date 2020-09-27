import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ExcludeDialogComponent } from '../exclude-dialog/exclude-dialog.component';
import { IncludeDialogComponent } from '../include-dialog/include-dialog.component';
import { AddExtraDialogComponent } from '../add-extra-dialog/add-extra-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, MatTableModule, MatPaginatorModule,
    MatFormFieldModule,MatInputModule ,MatSortModule,MatExpansionModule,MatMenuModule,MatTableExporterModule 
  ],entryComponents: [ExcludeDialogComponent,IncludeDialogComponent,AddExtraDialogComponent],
  declarations: [HomePage]
})
export class HomePageModule {}




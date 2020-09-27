import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatDialogModule} from '@angular/material/dialog';
import { ExcludeDialogComponent } from './exclude-dialog/exclude-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { IncludeDialogComponent } from './include-dialog/include-dialog.component';
import { AddExtraDialogComponent } from './add-extra-dialog/add-extra-dialog.component';


@NgModule({
  declarations: [AppComponent,ExcludeDialogComponent,IncludeDialogComponent,AddExtraDialogComponent],
  entryComponents: [ExcludeDialogComponent,IncludeDialogComponent,AddExtraDialogComponent],
  imports: [BrowserModule,HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,MatDialogModule,
    BrowserAnimationsModule, MatTableModule, MatSortModule,
    MatMenuModule, MatTableExporterModule, MatSelectModule,FormsModule
  ],
  exports: [BrowserModule,HttpClientModule,
    AppRoutingModule,MatDialogModule,
    BrowserAnimationsModule, MatTableModule, MatSortModule,
    MatMenuModule, MatTableExporterModule, MatSelectModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

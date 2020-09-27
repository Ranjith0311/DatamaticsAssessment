import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { DataDemo } from '../model/DataDemo.model';
import { DialogData } from '../model/DialogData.model';


@Injectable({
  providedIn: 'root'
})
export class HomeDataService {
  [x: string]: any;
  private dataDemoList: DataDemo[];
  private dataSubject = new Subject<any>();

  constructor(private http: HttpClient) { }


  getAllData(dataRequest:DataDemo): Observable<DataDemo[]> {
    const requestUrl = 'http://localhost:9999/getRequestedData';
    console.log(dataRequest);
    this.http.post<DataDemo[]>(requestUrl,dataRequest, { observe: 'response' }).subscribe(res => {
      this.dataDemoList = res.body;
      this.dataSubject.next(this.dataDemoList);
      console.log(this.dataDemoList);
    }, error => {
      console.log(error);
    });
    return this.dataSubject.asObservable();
  }

  getAllExcludeData(dataRequest:DialogData): Observable<DataDemo[]> {
    const requestUrl = 'http://localhost:9999/getRequestedData/exclude';
    console.log(dataRequest)
    this.http.post<DataDemo[]>(requestUrl, dataRequest, { observe: 'response' }).subscribe(res => {
      this.dataDemoList = res.body;
      this.dataSubject.next(this.dataDemoList);
      console.log(this.dataDemoList);
    }, error => {
      console.log(error);
    });
    return this.dataSubject.asObservable();
  }

  getAllIncludeData(dataRequest:DialogData): Observable<DataDemo[]> {
    const requestUrl = 'http://localhost:9999/getRequestedData/include';
    console.log(dataRequest);
    this.http.post<DataDemo[]>(requestUrl, dataRequest, { observe: 'response' }).subscribe(res => {
      this.dataDemoList = res.body;
      this.dataSubject.next(this.dataDemoList);
      console.log(this.dataDemoList);
    }, error => {
      console.log(error);
    });
    return this.dataSubject.asObservable();
  }
}

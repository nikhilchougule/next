import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../_services/report.service';
import { IScips } from '../_models/scips.interface';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ScipService } from '../_services/scip.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  arrayBuffer: any;
  selecetdFile: any;
    displayedColumns: string[];
    data: IScips[];
    scipForm: FormGroup;
    dataSource: MatTableDataSource<IScips>;
    isLoadingResults = true;
    update: boolean = false;
    showSSEP:boolean = false
    dataLength: number = 0;
    fileToUpload: File = null;

  constructor(private excelService:ReportService,private scip:ScipService,public dialog: MatDialog,private route: ActivatedRoute) { }
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  ngOnInit(): void {
    // this.route.data.subscribe(res =>{
      // console.log(res)
      this.scip.getScipData().subscribe((res: IScips[]) => {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataLength = this.data.length
          this.isLoadingResults = false;
    })

}
  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
 }
 handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}
onFileUpload(event){
  console.log(event)
  this.selecetdFile = event.target.files[0];
  console.log(this.selecetdFile);
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
  // this.excelService.OnUploadFile(this.selecetdFile).subscribe()
  const reader = new FileReader();
  reader.onload = () => {
  // this.imagePreview = reader.result;
  this.arrayBuffer = reader.result;    
  var data = new Uint8Array(this.arrayBuffer);    
  var arr = new Array();    
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
  var bstr = arr.join("");    
  var workbook = XLSX.read(bstr, {type:"binary"});    
  var first_sheet_name = workbook.SheetNames[0];    
  var worksheet = workbook.Sheets[first_sheet_name];   
  //json array  
    var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
        // this.filelist = [];    
        console.log(arraylist)    
        const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(arraylist);
    const workbook2: XLSX.WorkBook = { Sheets: { 'data': worksheet1 }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook2, { bookType: 'xlsx', type: 'array' });
    const data1: Blob = new Blob([excelBuffer], {type: EXCEL_TYPE});
    const fileName = 'data';
    // FileSaver.saveAs(data1, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  };
  reader.readAsArrayBuffer(this.selecetdFile);
}
 viewScipsFields(){
  this.showSSEP = !this.showSSEP;
}
getDisplayedColumns(){
  // 'ComplexityCategoryId'
  if(this.showSSEP){
      return this.displayedColumns =  [ 'ControlOrRequirementId', 'ControlApplicability', 'CorrectiveAction', 'CorrectiveActionAnswerOptions', 'CommanControlExample',
      'Decision', 'DecisionAnswerOptions', 'ImplementControl', 'Focus', 'Observation',
      'Purpose', 'UseAlternate', 'AppliesTo', 'Analysis', 'AlternateControlExample', 'ActiveFlag', 'AV1',
      'AV1_Degree', 'AV1_Justification', 'AV1_Value', 'AV2', 'AV2_Degree', 'AV2_Justification', 'AV2_Value',
      'AV3', 'AV3_Degree', 'AV3_Justification', 'AV3_Value', 'AV4', 'AV4_Degree', 'AV4_Justification', 'AV4_Value',
      'AV5', 'AV5_Degree', 'AV5_Justification', 'AV5_Value'];
      
  }else{
      return this.displayedColumns =  ['ControlOrRequirementId', 'ControlApplicability', 'CorrectiveAction', 'CorrectiveActionAnswerOptions']
      
  }
}
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { CdaService } from '../_services/cda.service';
import { Directive, ElementRef,TemplateRef } from '@angular/core';

@Directive({
  selector: '[focusable]'
})
export class FocusableDirective {

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }

}

@Component({
  selector: 'app-cda-template',
  templateUrl: './cda-template.component.html',
  styleUrls: ['./cda-template.component.scss']
})
export class CdaTemplateComponent implements OnInit {

  constructor(private core: CdaService){}
  dataSource = this.core.list$;
  controls: FormArray;
  index:number = 0;
  ngOnInit(): void {
    
    const toGroups = this.core.list$.value.map(entity => {
      return new FormGroup({
        Name:  new FormControl(entity.Name, Validators.required),
        critical_System: new FormControl(entity.critical_System, Validators.required), 
        Revision_status: new FormControl(entity.Revision_status, Validators.required),
        Date_Installed: new FormControl(entity.Date_Installed, Validators.required),
        Cyber_Security:new FormControl(entity.Cyber_Security, Validators.required),
        Revision_Number:new FormControl(entity.Revision_Number, Validators.required),
        Justification:new FormControl(entity.Justification , Validators.required),
        Another_attribute1:new FormControl(entity.Another_attribute1, Validators.required),
        Another_attribute2:new FormControl(entity.Another_attribute2, Validators.required),
        large_text:new FormControl(entity.large_text, Validators.required)
      },{updateOn: "blur"});
    });

    this.controls = new FormArray(toGroups);

  }
  

  updateField(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.core.update(index,field,control.value);
    }

   }

  getControl(index, fieldName) {
    const a  = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }
  getControlValue(index,fieldName){
    return this.controls.at(index).get(fieldName).value
  }
  nextRecord(index){
    this.index = index+1;
    const toGroups =  new FormGroup({
        Name:  new FormControl(this.controls.at(this.index).get('Name').value, Validators.required),
        critical_System: new FormControl(this.controls.at(this.index).get('critical_System').value, Validators.required), 
        Revision_status: new FormControl(this.controls.at(this.index).get('Revision_status').value, Validators.required),
        Date_Installed: new FormControl(this.controls.at(this.index).get('Date_Installed').value, Validators.required),
        Cyber_Security:new FormControl(this.controls.at(this.index).get('Cyber_Security').value, Validators.required),
        Revision_Number:new FormControl(this.controls.at(this.index).get('Revision_Number').value, Validators.required),
        Justification:new FormControl(this.controls.at(this.index).get('Justification').value, Validators.required),
        Another_attribute1:new FormControl(this.controls.at(this.index).get('Another_attribute1').value, Validators.required),
        Another_attribute2:new FormControl(this.controls.at(this.index).get('Another_attribute2').value, Validators.required),
        large_text:new FormControl(this.controls.at(this.index).get('large_text').value)
      },{updateOn: "blur"});
    
    
  }

}

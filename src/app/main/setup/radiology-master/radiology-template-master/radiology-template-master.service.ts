import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RadiologyTemplateMasterService {

  myform: UntypedFormGroup;
  myformSearch: UntypedFormGroup;
  
  constructor(private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder) {
    this.myform=this.createRadiologytemplateForm();
    this.myformSearch=this.createSearchForm();
  }
 
  

  createRadiologytemplateForm(): UntypedFormGroup {
    return this._formBuilder.group({
      TemplateId:[''],
      TemplateName:[''],
      TemplateDesc:[''],
      IsDeleted:['true']
        });
  }
  createSearchForm(): UntypedFormGroup {
    return this._formBuilder.group({
        TemplateNameSearch: [""],
        IsDeletedSearch: ["2"],
    });
}
  // filterForm(): FormGroup {
  //   return this._formBuilder.group({
  //   RegNoSearch:[0],
  //   FirstNameSearch:[''],
  //   LastNameSearch:[''],
  //   PatientTypeSearch:['1'],
  //   StatusSearch: ['0'],
  //   CategoryId:[''],
  //    start: [new Date().toISOString()],
  //    end: [new Date().toISOString()],
  //   });
  // }


  initializeFormGroup() {
    this.createRadiologytemplateForm();
    this.createSearchForm();
  }

 
  public getRadiologytemplateMasterList() {
    return this._httpClient.post("Generic/GetByProc?procName=ps_Rtrv_Radiology_TemplateMaster_by_Name", {TemplateName:"%"})
  }
  public deactivateTheStatus(m_data) {
    return this._httpClient.post("Generic/ExecByQueryStatement?query=" + m_data,{});
}
  public getRadiologytemplateMasterList1(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_Radiology_TemplateMaster_by_Name", employee)
  }
  public gettemplateCombo(Id)
  {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RadTemplateMasterForCombo",{Id:1});
  }
  public getdoctorCombo()
  {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_PathologistDoctorMasterForCombo",{});
  }
  public insertRadiologyTemplateMaster(employee) { 
    return this._httpClient.post("RadiologyMaster/RadiologyTemplateMasterSave", employee);
  }
  
  public updateRadiologyTemplateMaster(employee) {
    return this._httpClient.post("RadiologyMaster/RadiologyTemplateMasterUpdate", employee);
  }

  populateForm(employee) {
    this.myform.patchValue(employee);
  }

  populatePrintForm(employee) {
    this.myform.patchValue(employee);
  }

  Print(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=ps_rpt_radiologyTemplate", employee)
  }
}

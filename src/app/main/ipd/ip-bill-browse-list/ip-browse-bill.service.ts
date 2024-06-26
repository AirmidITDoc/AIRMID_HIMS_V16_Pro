import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class IPBrowseBillService {
  myFilterform: UntypedFormGroup;
  constructor(public _httpClient:HttpClient,
    private _formBuilder: UntypedFormBuilder) { 
      this.myFilterform=this.filterForm_IpdBrowse();}


filterForm_IpdBrowse(): UntypedFormGroup {
  return this._formBuilder.group({
    PBillNo: [''],
    RegNo: [''],
    FirstName: [''],
    LastName: [''],
    IsInterimOrFinal:['2'],
    CompanyId:[''],
    start: [(new Date()).toISOString()],
    end: [(new Date()).toISOString()],
  });
}

public getIpBillBrowseList(employee) {
  return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseIPDBill", employee)
}  
public getTemplate(query) {
  return this._httpClient.post("Generic/GetBySelectQuery?query="+query, {})
}  

public getIPBILLBrowsePrint(BillNo) {
  return this._httpClient.post("Generic/GetByProc?procName=rptIPDFinalBill", BillNo)
}  
public getIPBILLBrowsedatewisePrint(BillNo) {
  return this._httpClient.post("Generic/GetByProc?procName=rptIPDFinalBillWithDateWise", BillNo)
}
   
    // company Master Combobox List
    public getCompanyMasterCombo() {
      return this._httpClient.post("Generic/GetByProc?procName=RetrieveCompanyMasterForCombo", {})
    }

     
    public getIPIntriemBILLBrowsePrint(emp)
    {
      return this._httpClient.post("Generic/GetByProc?procName=rptIPDInterimBill",emp)
    }

    public InsertIPBillingPayment(emp){
      return this._httpClient.post("InPatient/Credit_Payment", emp);
    }

   public InsertIPCreditBillingPayment(emp){
    return this._httpClient.post("InPatient/IPBillingCreditInsert", emp);
   }
   public getIpFinalBillReceipt(BillNo){
    return this._httpClient.get("InPatient/view-IP-BillReceipt?BillNo=" + BillNo);
  }
  
 public getIpInterimBillReceipt (BillNo){
  return this._httpClient.get("InPatient/view-IP-InterimBillReceipt?BillNo=" + BillNo)
 }

 getIPBILLdatewisePrint(BillNo){
  return this._httpClient.get("InPatient/view-IP-BillDatewiseReceipt?BillNo=" + BillNo)
 }

 getIpFinalBillwardwiseReceipt(BillNo){
  return this._httpClient.get("InPatient/view-IP-BillWardwiseReceipt?BillNo=" + BillNo)
 }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentmodechangesforpharmacyService {

  userFormGroup:UntypedFormGroup;
  paymentform:UntypedFormGroup;
  constructor(
    public _httpClient:HttpClient,
    public _formBuilder:UntypedFormBuilder
    ) 
    { 
      
      this.userFormGroup=this.createUseForm()
      this.paymentform=this.createpaymentForm();
    }

    createUseForm(){
      return this._formBuilder.group({
        startdate: [(new Date()).toISOString()],
        enddate: [(new Date()).toISOString()],
        RegNo:'',
        FirstName:'',
        LastName:'',
        SalesNo:'',
        Radio:['1'],
        StoreId:''

      })
    }

   

    createpaymentForm(){
      return this._formBuilder.group({
        startdate: [(new Date()).toISOString()],
        enddate: [(new Date()).toISOString()],
        PaymentId:'',
        CashPayAmt:'',
        IsCashpay:'',
        CardPayAmt:'',
        CardNo:'',
        CardBankName :'',
        IsCardpay:'',
        ChequePayAmt:'',
        ChequeNo:'',
        ChequeBankName:'',
        IsChequepay:'',
        NEFTPayAmount:'',
        NEFTNo:'',
        NEFTBankName:'',
        IsNEFTpay:'',
        PayTMAmount:'',
        PayTMTranNo:'',
        IsPayTMpay:'',
        PaidAmount:'',
        BalAmount:''
        
      })
    }



    public getIpPharAdvanceList(Param){
      return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseIPAdvPayPharReceipt",Param)
    }
    public getSalesNoList(Param){
      return this._httpClient.post("Generic/GetByProc?procName=Rtrv_BrowsePharmacyPayReceipt",Param)
    }

    public getBankMasterCombo() {
      return this._httpClient.post("Generic/GetByProc?procName=RetrieveBankMasterForCombo", {})
    }
    
    public PaymentmodeUpdate(employee) {//Administration/UpdateLoginUser
      return this._httpClient.post("Pharmacy/UpdatePharmPaymentMode", employee);
    }
}

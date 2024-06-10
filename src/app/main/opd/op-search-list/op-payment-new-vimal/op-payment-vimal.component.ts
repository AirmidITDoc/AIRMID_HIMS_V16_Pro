import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OPSearhlistService } from '../op-searhlist.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { IpPaymentInsert } from '../op-advance-payment/op-advance-payment.component';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SnackBarService } from 'app/main/shared/services/snack-bar.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-op-payment-vimal',
  templateUrl: './op-payment-vimal.component.html',
  styleUrls: ['./op-payment-vimal.component.scss']
})
export class OpPaymentVimalComponent implements OnInit {

  currentDate = new Date();
  patientDetailsFormGrp: UntypedFormGroup;
  selectedPaymnet1: string = '';
  paymentArr1: any[] = this.opService.getPaymentArr();
  BindPaymentTypes() {
    let full = this.opService.getPaymentArr();
    let final = [];
    full.forEach((item) => {
      if (!this.Payments.data.find(x => x.PaymentType == item.value)) {
        final.push(item);
      }
    });
    this.paymentArr1 = final;
  }
  onChangePaymentType() {
    if (this.selectedPaymnet1 == 'cash') {
      this.patientDetailsFormGrp.get('referenceNo1').clearValidators();
      this.patientDetailsFormGrp.get('referenceNo1').updateValueAndValidity();
      this.patientDetailsFormGrp.get('regDate1').clearValidators();
      this.patientDetailsFormGrp.get('regDate1').updateValueAndValidity();
      this.patientDetailsFormGrp.get('bankName1').clearValidators();
      this.patientDetailsFormGrp.get('bankName1').updateValueAndValidity();
    }
    else {
      this.patientDetailsFormGrp.get('referenceNo1').setValidators([Validators.required]);
      this.patientDetailsFormGrp.get('regDate1').setValidators([Validators.required]);
      if (this.selectedPaymnet1 == 'upi') {
        this.patientDetailsFormGrp.get('bankName1').setValidators([Validators.required]);
      }
      else {
        this.patientDetailsFormGrp.get('bankName1').clearValidators();
        this.patientDetailsFormGrp.get('bankName1').updateValueAndValidity();
      }
    }
  }
  Payments = new MatTableDataSource<PaymentList>();
  selectedSaleDisplayedCol = [
    'PaymentType',
    'Amount',
    'BankName',
    'RefNo',
    'RegDate',
    'buttons'
  ];
  netPayAmt: any = 0;
  nowDate: Date;
  amount1: number;
  screenFromString = 'payment-form';
  paidAmt: number;
  balanceAmt: number = 0;
  advanceData: any = {};
  PatientName: any;
  filteredOptionsBank1: Observable<string[]>;
  optionsBank1: any[] = [];
  BankNameList1: any = [];
  isSaveDisabled: boolean = false;
  submitted: boolean = false;
  get f(): { [key: string]: AbstractControl } {
    return this.patientDetailsFormGrp.controls;
  }
  IsAllowAdd() {
    return this.netPayAmt > ((this.paidAmt || 0) + Number(this.amount1));
  }
  GetBalanceAmt() {
    this.balanceAmt = Number(this.netPayAmt || 0) - (Number(this.paidAmt || 0) + Number(this.amount1 || 0));
  }
  onAddPayment() {
    this.submitted = true;

    if (this.patientDetailsFormGrp.invalid) {
      return;
    }
    let tmp = this.Payments.data;
    tmp.push({
      Id: this.getNewId(),
      PaymentType: this.selectedPaymnet1, Amount: this.amount1,
      RefNo: this.patientDetailsFormGrp.get("referenceNo1")?.value ?? "",
      BankId: this.patientDetailsFormGrp.get("bankName1").value?.BankId ?? 0,
      BankName: this.patientDetailsFormGrp.get("bankName1").value?.BankName ?? "",
      RegDate: this.patientDetailsFormGrp.get("regDate1")?.value ?? ""
    });
    this.Payments.data = tmp;
    this.paidAmt = this.Payments.data.reduce(function (a, b) { return a + Number(b['Amount']); }, 0);
    this.balanceAmt = this.netPayAmt - this.paidAmt;
    // this.patientDetailsFormGrp.reset();
    // this.patientDetailsFormGrp.get('paidAmountController').setValue(this.paidAmt);
    // this.patientDetailsFormGrp.get('balanceAmountController').setValue(this.balanceAmt);
    this.patientDetailsFormGrp.get("referenceNo1").setValue('');
    this.patientDetailsFormGrp.get("bankName1").setValue(null);
    this.patientDetailsFormGrp.get("regDate1").setValue(null);
    this.patientDetailsFormGrp.get("amount1").setValue('');
    this.patientDetailsFormGrp.get("paymentType1").setValue(null);
    this.BindPaymentTypes();
  }
  getNewId() {
    return Math.max(...this.Payments.data.map(o => o.Id), 0) + 1;
  }
  deletePayment(payment) {
    Swal.fire({
      title: "Are you sure to remove this payment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let tmp = this.Payments.data;
        tmp.splice(this.Payments.data.findIndex(x => x.Id == payment.Id), 1);
        this.Payments.data = tmp;
        this.paidAmt = this.Payments.data.reduce(function (a, b) { return a + Number(b['Amount']); }, 0);
        this.balanceAmt = this.netPayAmt - this.paidAmt;
        this.BindPaymentTypes();
      }
    });
  }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<OpPaymentVimalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private opService: OPSearhlistService,
    private _loggedService: AuthenticationService,
    public datePipe: DatePipe,
    // private snackBarService: SnackBarService
  ) {
    this.nowDate = new Date();

    if (data) {
      this.advanceData = this.data.vPatientHeaderObj;
    }
    if (this.data.FromName == "Advance") {

      this.netPayAmt = parseInt(this.advanceData.NetPayAmount);
      this.amount1 = parseInt(this.advanceData.NetPayAmount);
      this.Paymentobj['TransactionType'] = 1;
    }
    if (this.data.FromName == "OP-Bill" || this.data.FromName == "IP-Bill") {

      this.netPayAmt = parseInt(this.advanceData.NetPayAmount) || this.advanceData.NetPayableAmt;
      this.amount1 = parseInt(this.advanceData.NetPayAmount) || this.advanceData.NetPayableAmt;
      this.PatientName = this.advanceData.PatientName;
      this.Paymentobj['TransactionType'] = 0;
    }

    if (this.data.FromName == "OP_SETTLEMENT") {
      this.netPayAmt = this.advanceData.NetPayAmount; // parseInt(this.advanceData.NetPayAmount);
      this.amount1 = this.advanceData.NetPayAmount; // parseInt(this.advanceData.NetPayAmount);
      this.paidAmt = this.advanceData.NetPayAmount; // parseInt(this.advanceData.NetPayAmount);
      this.PatientName = this.advanceData.PatientName;
      this.selectedPaymnet1 = 'cash';
      this.Paymentobj['TransactionType'] = 2;
    }

    if (this.data.FromName == "SETTLEMENT") {
      this.netPayAmt = parseInt(this.advanceData.NetPayableAmt) || this.advanceData.NetPayAmount;
      this.amount1 = parseInt(this.advanceData.NetPayableAmt) || this.advanceData.NetPayAmount;
      this.PatientName = this.advanceData.PatientName;
      this.Paymentobj['TransactionType'] = 0;
    }
    if (this.data.FromName == "SalesSETTLEMENT") {
      this.netPayAmt = parseInt(this.advanceData.NetAmount);
      this.PatientName = this.advanceData.PatientName;
      this.Paymentobj['TransactionType'] = 2;
    } else if (this.data.FromName == "Phar-SalesPay") {
      this.netPayAmt = this.advanceData.NetPayAmount; // parseInt(this.advanceData.NetPayAmount);
      this.amount1 = this.advanceData.NetPayAmount; // parseInt(this.advanceData.NetPayAmount);
      this.PatientName = this.advanceData.PatientName;
      this.selectedPaymnet1 = 'cash';
      this.Paymentobj['TransactionType'] = 2;
    }
    else if (this.data.FromName == "Advance-Refund") {
      this.netPayAmt = this.advanceData.NetPayAmount; // parseInt(this.advanceData.NetPayAmount);
      this.amount1 = this.advanceData.NetPayAmount; // parseInt(this.advanceData.NetPayAmount);
      this.PatientName = this.advanceData.PatientName;
      this.selectedPaymnet1 = 'cash';
      this.Paymentobj['TransactionType'] = 2;
    }
  }

  ngOnInit(): void {
    this.patientDetailsFormGrp = this.createForm();
    debugger
    if (this.data.FromName == "SalesSETTLEMENT") {
      this.data = this.data.vPatientHeaderObj;
      this.advanceData = this.data.vPatientHeaderObj;

      this.selectedPaymnet1 = this.paymentArr1[0].value;
      this.amount1 = this.netPayAmt = parseInt(this.advanceData.NetPayAmount) || this.advanceData.NetPayableAmt;
      this.PatientName = "SAS",//this.advanceData.PatientName;
        this.amount1 = parseInt(this.advanceData.NetAmount);
      this.Paymentobj['TransactionType'] = 4;
    }
    this.getBankNameList1();
  }
  dateTimeObj: Date;
  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }

  createForm() {
    return this.formBuilder.group({
      paymentType1: ['', Validators.required],
      amount1: [this.netPayAmt, Validators.min(0.1)],
      referenceNo1: [''],
      bankName1: [''],
      regDate1: [(new Date()).toISOString()],
      paidAmountController: [this.paidAmt],
      balanceAmountController: [this.balanceAmt]
    });
  }

  private _filterBank1(value: any): string[] {
    if (value) {
      const filterValue = value && value.BankName ? value.BankName.toLowerCase() : value.toLowerCase();
      return this.optionsBank1.filter(option => option.BankName.toLowerCase().includes(filterValue));
    }

  }

  getBankNameList1() {
    this.opService.getBankMasterCombo().subscribe(data => {
      this.BankNameList1 = data;
      this.optionsBank1 = this.BankNameList1.slice();
      this.filteredOptionsBank1 = this.patientDetailsFormGrp.get('bankName1').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterBank1(value) : this.BankNameList1.slice()),
      );

    });
  }

  getOptionTextBank1(option) {
    return option && option.BankName ? option.BankName : '';
  }
  onClose() {
    this.dialogRef.close();
  }

  Paymentobj = {};
  onSubmit() {
    this.onAddPayment();
    this.Paymentobj['BillNo'] = this.data.billNo;
    this.Paymentobj['ReceiptNo'] = '';
    this.Paymentobj['PaymentDate'] = this.datePipe.transform(this.currentDate, 'MM/dd/yyyy') || this.datePipe.transform(this.currentDate, 'MM/dd/yyyy')
    this.Paymentobj['PaymentTime'] = this.datePipe.transform(this.currentDate, 'MM/dd/yyyy') || this.datePipe.transform(this.currentDate, 'MM/dd/yyyy')
    this.Paymentobj['AdvanceUsedAmount'] = 0;
    this.Paymentobj['AdvanceId'] = 0;
    this.Paymentobj['RefundId'] = 0;
    this.Paymentobj['TransactionType'] = 0;
    this.Paymentobj['Remark'] = "" //this.patientDetailsFormGrp.get('commentsController').value;
    this.Paymentobj['AddBy'] = this._loggedService.currentUserValue.user.id,
      this.Paymentobj['IsCancelled'] = 0;
    this.Paymentobj['IsCancelledBy'] = 0;
    this.Paymentobj['IsCancelledDate'] = "01/01/1900" //this.dateTimeObj.date;
    this.Paymentobj['CashCounterId'] = 0;
    this.Paymentobj['IsSelfORCompany'] = 0;
    this.Paymentobj['CompanyId'] = 0;
    this.Paymentobj['PaidAmt'] = this.patientDetailsFormGrp.get('paidAmountController').value+Number(this.amount1);
    this.Paymentobj['BalanceAmt'] = this.patientDetailsFormGrp.get('balanceAmountController').value;
    this.Paymentobj["CashPayAmount"] = this.Payments.data.find(x => x.PaymentType == "cash")?.Amount ?? 0;
    this.Paymentobj["ChequePayAmount"] = this.Payments.data.find(x => x.PaymentType == "cheque")?.Amount ?? 0;
    this.Paymentobj["ChequeNo"] = this.Payments.data.find(x => x.PaymentType == "cheque")?.RefNo ?? 0;
    this.Paymentobj["PayTMAmount"] = this.Payments.data.find(x => x.PaymentType == "upi")?.Amount ?? 0;
    this.Paymentobj["NEFTPayAmount"] = this.Payments.data.find(x => x.PaymentType == "net banking")?.Amount ?? 0;
    this.Paymentobj["CardPayAmount"] = this.Payments.data.find(x => x.PaymentType == "card")?.Amount ?? 0;
    console.log(JSON.stringify(this.Paymentobj));
  }

  onClose1() {

    let IsSubmit = {
      "IsSubmitFlag": false,
      "BalAmt": this.netPayAmt
    }
    this.dialogRef.close(IsSubmit);
  }


}
export class PharPaymentInsert {
  PaymentId: number;
  BillNo: number;
  ReceiptNo: any;
  PaymentDate: Date;
  PaymentTime: any;
  CashPayAmount: number;
  ChequePayAmount: number;
  ChequeNo: any;
  BankName: any;
  ChequeDate: Date;
  CardPayAmount: number;
  CardNo: any;
  CardBankName: any;
  CardDate: Date;
  AdvanceUsedAmount: number;
  AdvanceId: any;
  RefundId: any;
  TransactionType: any;
  Remark: any;
  AddBy: any;
  IsCancelled: boolean;
  IsCancelledBy: any;
  IsCancelledDate: Date;
  OPD_IPD_Type: any;
  // CashCounterId: number;
  // IsSelfORCompany: number;
  // CompanyId: any;
  NEFTPayAmount: number;
  NEFTNo: any;
  NEFTBankMaster: any;
  NEFTDate: any;
  PayTMAmount: number;
  PayTMTranNo: any;
  PayTMDate: Date;
  PaidAmt: number;
  BalanceAmt: number;

  constructor(PharPaymentInsert) {
    this.PaymentId = PharPaymentInsert.PaymentId || 0;
    this.BillNo = PharPaymentInsert.BillNo || 0;
    this.ReceiptNo = PharPaymentInsert.ReceiptNo || '';
    this.PaymentDate = PharPaymentInsert.PaymentDate || '01/01/1900';
    this.PaymentTime = PharPaymentInsert.PaymentTime || '';
    this.CashPayAmount = PharPaymentInsert.CashPayAmount || 0;
    this.ChequePayAmount = PharPaymentInsert.ChequePayAmount || 0;
    this.ChequeNo = PharPaymentInsert.ChequeNo || '';

    this.BankName = PharPaymentInsert.BankName || '';
    this.ChequeDate = PharPaymentInsert.ChequeDate || '01/01/1900';
    this.CardPayAmount = PharPaymentInsert.CardPayAmount || 0;
    this.CardNo = PharPaymentInsert.CardNo || '';
    this.CardBankName = PharPaymentInsert.CardBankName || '';

    this.CardDate = PharPaymentInsert.CardDate || '01/01/1900';
    this.AdvanceUsedAmount = PharPaymentInsert.AdvanceUsedAmount || 0;
    this.AdvanceId = PharPaymentInsert.AdvanceId || 0;
    this.RefundId = PharPaymentInsert.RefundId || 0;
    this.TransactionType = PharPaymentInsert.TransactionType || 0;
    this.Remark = PharPaymentInsert.Remark || '';

    this.AddBy = PharPaymentInsert.AddBy || 0;
    this.IsCancelled = PharPaymentInsert.IsCancelled || 0;
    this.IsCancelledBy = PharPaymentInsert.IsCancelledBy || 0;
    this.IsCancelledDate = PharPaymentInsert.IsCancelledDate || '01/01/1900';

    this.OPD_IPD_Type = PharPaymentInsert.OPD_IPD_Type || 0;
    // this.IsSelfORCompany = PharPaymentInsert.IsSelfORCompany || 0;
    // this.CompanyId = PharPaymentInsert.CompanyId || 0;

    this.NEFTPayAmount = PharPaymentInsert.NEFTPayAmount || 0;
    this.NEFTNo = PharPaymentInsert.NEFTNo || '';
    this.NEFTBankMaster = PharPaymentInsert.NEFTBankMaster || '';
    this.NEFTDate = PharPaymentInsert.NEFTDate || '01/01/1900';

    this.PayTMAmount = PharPaymentInsert.PayTMAmount || 0;
    this.PayTMTranNo = PharPaymentInsert.PayTMTranNo || '';
    this.PayTMDate = PharPaymentInsert.PayTMDate || '01/01/1900';

    this.PaidAmt = PharPaymentInsert.PaidAmt || 0;
    this.BalanceAmt = PharPaymentInsert.BalanceAmt || 0;
  }

}
export class PaymentList {
  PaymentType: string;
  Amount: number;
  RefNo: string;
  BankName: string;
  RegDate: Date;
  Id: number;
  BankId: number;
}
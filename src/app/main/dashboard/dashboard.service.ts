import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  UseFrom: UntypedFormGroup;
  DayWiseFrom:UntypedFormGroup;
  MonthWiseFrom:UntypedFormGroup;
  constructor(public _httpClient: HttpClient,
    private _formBuilder: UntypedFormBuilder
  ) { this.UseFrom = this.createUseFrom();
    this.DayWiseFrom = this.createDaywisefrom();
    this.MonthWiseFrom = this.createMonthwiseFrom();
  }

  createUseFrom() {
    return this._formBuilder.group({
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      StoreId: ''
    });
  }
  createDaywisefrom(){
    return this._formBuilder.group({
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      FromStoreId: ''
    });
  }
  createMonthwiseFrom(){
    return this._formBuilder.group({
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
      FromStoreId: ''
    });
  }

  public getDailyDashboardSummary() {
    return this._httpClient.post("Generic/GetByProc?procName=rptDailyDashboardSummary", {})
  }

  public getOPDashChart(params) {
    return this._httpClient.post("Generic/GetByProc?procName=rptOP_DepartmentChart_Range", params)
  }

  public getIPDashChart(params) {
    return this._httpClient.post("Generic/GetByProc?procName=rptIP_DepartmentChart_Range", params)
  }

  public getWard(params) {
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_WardWiseBedOccupancy_1", params)
  }

  public getWardDetails(params) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BedOccupancyList_1", params)
  }

  public getPathCategoryPieChart(params)
  {
    return this._httpClient.post("Generic/GetByProc?procName=Dash_PathCategPieChart_Range", params)
  }

  public getPieChartPharCurrentStockData(params)
  {
    return this._httpClient.post("Generic/GetByProc?procName=m_pharCurStockValueSummaryDashboard", params)
  }

  public getPharCollSummStoreWiseDashboard(Param)
  {
    return this._httpClient.post("Generic/GetByProc?procName=m_rptPharCollSumStoreWiseDashboard",Param)
  }

  // Pharmacy Dashboard Summary
  public getPharDashboardSalesSummary(params) {
    return this._httpClient.post("Generic/GetByProc?procName=m_PharCollectionSummaryDashboard", params)
  }

 
   //logged Store
   public getLoggedStoreList(Param){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_StoreNameForLogedUser_Conditional",Param);
  }


  ////////////////////////////////////////

  public getPharDashboardPeichart(spname, params) {
    return this._httpClient.post("Dashboard/get-pie-chart-date?procName=" + spname, params)
  }

  public getPharDashboardBarchart(spname, params) {
    return this._httpClient.post("Dashboard/get-bar-chart-date?procName=" + spname, params)
  }

  // public getPharDashboardPeichart(params) {
  //   return this._httpClient.post("Generic/GetByProc?procName=m_PharCollectionSummaryDashboard", params)
  // }
  public getThreeMonSumData(api, params) {
    return this._httpClient.post("Generic/GetByProc?procName=" + api, params)
  }
  public getPharmStoreList() {
    return this._httpClient.post("Generic/GetByProc?procName=rtrv_PharStoreName", {})
  }

  public getPharStockColSumData(api, params) {
    return this._httpClient.post("Generic/GetByProc?procName=" + api, params)
  }

  public getPharmacyCollectionStoreandDateWise(params)
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_PharCollectionSummaryDashboard",params)
  }

  public getPathtestSummaryDateWise(x)
  {
     return this._httpClient.post("Generic/GetByProc?procName=dash_PathTestWiseCnt",x)
  }
  public getPathCategorySummaryDateWise(x)
  {
     return this._httpClient.post("Generic/GetByProc?procName=dash_PathCateWiseCnt",x)
  }

  //Pharmacy Dashboard
  public getPharDayWiseDashboard(x)
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_PharCollectionSummaryDayWiseDashboard",x)
  }
  public getPharMonthWiseDashboard(x)
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_PharCollectionSummaryMonthWiseDashboard",x)
  }

  public getPharPaymentSummary(x)
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_dash_PharPaymentSummary",x)
  }
  public getPharUserInfoStoreWise(x)
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_dash_PharUserInfoStoreWise",x)
  }
  public getPharUserCountStoreWise()
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_dash_PharUserCountStoreWise",{})
  }
  public getPieChartpharCustomerCount(m_data)
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_dash_pharCustomerCount",m_data)
  }
  public getCustomerCount(x)
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_dash_pharCustomerCount",x)
  }

  public getCollectionSum(x)
  {
     return this._httpClient.post("Generic/GetByProc?procName=m_dash_PharCollectionSummary",x)
  }
  
}


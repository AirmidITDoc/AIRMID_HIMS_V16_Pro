import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class StoreMasterService {
    myformSearch: UntypedFormGroup;
    myform: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myformSearch = this.createSearchForm();
        this.myform = this.createStoremasterForm();
    }

    createStoremasterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            StoreId: [""],
            StoreShortName: [""],
            StoreName: [""],
            IndentPrefix: [""],
            IndentNo: [""],
            PurchasePrefix: [""],  
            PurchaseNo: [""],
            GrnPrefix: [""],  
            GrnNo: [""],
            GrnreturnNoPrefix: [""],
            GrnreturnNo: [""],
            IssueToDeptPrefix: [""],
            IssueToDeptNo: [""],
            ReturnFromDeptNoPrefix: [""],
            ReturnFromDeptNo: [""],
            IsDeleted: ["1"],
            UpdatedBy: [""],
            AddedByName: [""],
        });
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            StoreNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createStoremasterForm();
    }

    public getStoreMasterList(m_data) {
        //return this._httpClient.post("Generic/GetByProc?procName=ps_Rtrv_Inventory_StoreMaster_by_Name", {StoreName:"%"})
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_StoreMaster_by_Name",
            m_data
        );
    }

    public deactivateTheStatus(m_data) {
        return this._httpClient.post(
            "Generic/ExecByQueryStatement?query=" + m_data,{}
        );
    }

    public insertStoreMaster(param) {
        return this._httpClient.post("Inventory/StoreSave", param);
    }

    public updateStoreMaster(param) {
        return this._httpClient.post("Inventory/StoreUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}

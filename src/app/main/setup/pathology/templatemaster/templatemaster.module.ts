import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TemplatemasterComponent } from "./templatemaster.component";
import { RouterModule, Routes } from "@angular/router";
import { PathologyTemplateFormComponent } from "./pathology-template-form/pathology-template-form.component";
import { PrintLayoutComponent } from "./print-layout/print-layout.component";
import { TemplatemasterService } from "./templatemaster.service";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TemplateReportComponent } from "./template-report/template-report.component";
//import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, TableService, ToolbarService } from "@syncfusion/ej2-angular-richtexteditor";
import { HttpClientModule } from "@angular/common/http";
import { AngularEditorComponent, AngularEditorModule } from '@kolkov/angular-editor';
// import { NgxEditorModule } from 'ngx-editor';
// import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NgxSummernoteModule } from 'ngx-summernote';


const routes: Routes = [
    {
        path: "**",
        component: TemplatemasterComponent,
    },
];

@NgModule({
    declarations: [
        TemplatemasterComponent,
        PathologyTemplateFormComponent,
        PrintLayoutComponent,
        TemplateReportComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        AngularEditorModule,
        NgxSummernoteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        CommonModule,
        MatExpansionModule,
        MatCardModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatProgressSpinnerModule,
        // AngularEditorModule,
        FuseSharedModule,
        // DialogModule,
        MatProgressSpinnerModule,
        //   RichTextEditorAllModule
        // RichTextEditorModule,
        HttpClientModule,
        //  CodeEditorModule.forRoot()
    ],
    providers: [TemplatemasterService]
})
export class TemplatemasterModule {}

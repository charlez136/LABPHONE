import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthModule } from "./auth/auth.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  JwtInterceptor,
  ErrorInterceptor,
  fakeBackendProvider,
} from "@service/inteceptors";

import { ShipmentComponent } from "./pages/shipment/shipment.component";
import { PayComponent } from "./pages/pay/pay.component";
import { RefundComponent } from "./pages/refund/refund.component";
import { HomeComponent } from "./pages/home/home.component";
import { DxButtonModule, DxContextMenuModule, DxDataGridModule, DxTextBoxModule } from "devextreme-angular";
import { CommonModule } from "@angular/common";
import { ModalModule } from "./shared/modal";
import { ModalService } from "./shared/modal/services";
import { EditItemComponent } from "./modals/edit-item/edit-item.component";

@NgModule({
  declarations: [
    AppComponent,
    ShipmentComponent,
    PayComponent,
    RefundComponent,
    HomeComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    DxContextMenuModule,
    DxDataGridModule,
    CommonModule,
    ModalModule,
    DxTextBoxModule,
    DxButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    ModalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

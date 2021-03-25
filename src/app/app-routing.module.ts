import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./pages/about/about.component";
import { PayComponent } from "./pages/pay/pay.component";
import { RefundComponent } from "./pages/refund/refund.component";
import { ShipmentComponent } from "./pages/shipment/shipment.component";
import { ComtsactsComponent } from "./pages/contacts/contacts.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contacts", component: ComtsactsComponent },
  { path: "pay", component: PayComponent },
  { path: "shipment", component: ShipmentComponent },
  { path: "refund", component: RefundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

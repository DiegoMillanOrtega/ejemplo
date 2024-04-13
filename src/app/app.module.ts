import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './dashboard/pages/setting/setting.component';
import { LoginComponent } from './dashboard/pages/login/login.component';
import { InventoryComponent } from './dashboard/pages/inventory/inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ContainerItemsComponent } from './dashboard/pages/container-items/container-items.component';
import { AddProductComponent } from './dashboard/pages/inventory/add-product/add-product.component';
import { DetailsProductsComponent } from './dashboard/pages/inventory/details-products/details-products.component';
import { CategoryComponent } from './dashboard/pages/inventory/category/category.component';
import { AddCategoryComponent } from './dashboard/pages/inventory/category/add-category/add-category.component';
import { IconsSvgComponent } from './icons-svg/icons-svg.component';
import { PedidosComponent } from './dashboard/pages/inventory/pedidos/pedidos.component';
import { ListPedidosComponent } from './dashboard/pages/inventory/pedidos/list-pedidos/list-pedidos.component';
import { ClientComponent } from './dashboard/pages/client/client.component';
import { AddClientComponent } from './dashboard/pages/client/add-client/add-client.component';
import { DetailsClientComponent } from './dashboard/pages/client/details-client/details-client.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingComponent,
    LoginComponent,
    InventoryComponent,
    ContainerItemsComponent,
    AddProductComponent,
    DetailsProductsComponent,
    CategoryComponent,
    AddCategoryComponent,
    IconsSvgComponent,
    PedidosComponent,
    ListPedidosComponent,
    ClientComponent,
    AddClientComponent,
    DetailsClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

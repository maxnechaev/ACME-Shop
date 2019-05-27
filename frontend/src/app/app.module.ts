import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ProductService } from './product.service';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { CartComponent } from './components/cart/cart.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import './components/send-email/send-email-template.html';
import { UpdateWarehouseComponent } from './components//update-warehouse/update-warehouse.component';


const routes: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'list', component: ListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'send-email', component: SendEmailComponent},
  {path: 'update-warehouse', component: UpdateWarehouseComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    ModalWindowComponent,
    CartComponent,
    SendEmailComponent,
    UpdateWarehouseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
  entryComponents: [ModalWindowComponent]
})
export class AppModule { }

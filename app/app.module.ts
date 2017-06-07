import { NgModule }      from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import ApplicationComponent from './components/application/application';
import HomeComponent from "./components/home/home";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import ProductDetailComponent from "./components/productdetail/productdetail";
import {ProductService} from "./services/product-service";
import {myComponents} from "./componentList";

@NgModule({
    imports:      [ BrowserModule , FormsModule, ReactiveFormsModule, 
    RouterModule.forRoot([
        {path: '', component: HomeComponent},
        {path: 'products/:prodId', component: ProductDetailComponent}
    ])],
    declarations: [...myComponents],
    providers:    [ProductService,
                   {provide: LocationStrategy, useClass: HashLocationStrategy}],
     bootstrap:    [ ApplicationComponent ]
})
export class AppModule { }

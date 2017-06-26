import { NgModule }      from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import ApplicationComponent from './components/application/application';
import MenuActionComponent from './components/menuAction/menuAction';
import ActionInvocation from './components/actionInvocation/actionInvocation';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {myComponents} from "./componentList";
import {Draggable} from 'node_modules/ng2draggable/draggable.directive';


@NgModule({
    imports:      [ BrowserModule , FormsModule, ReactiveFormsModule ],
    declarations: [...myComponents],
    providers:    [
                   {provide: LocationStrategy, useClass: HashLocationStrategy}],
     bootstrap:    [ ApplicationComponent ]
})
export class AppModule { }

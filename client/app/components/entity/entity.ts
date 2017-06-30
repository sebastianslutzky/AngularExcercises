
import {NgModule,Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


@Component({
  selector: 'entity', // <1>
  template: `<div [ng2-draggable]="true"> <h1><b>Entity!!!</b></h1></div>`,
  encapsulation:ViewEncapsulation.None
})
export default class EntityComponent{ 
}

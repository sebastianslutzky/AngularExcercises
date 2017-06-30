
import {NgModule,Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


@Component({
  selector: 'menu-action', // <1>
  template: `<li><a (click)="invokeMethod()">{{Title}}</a></li>`,
  styles: ["a:hover { cursor: pointer; }"],
  encapsulation:ViewEncapsulation.None
})
export default class MenuActionComponent{ 
    @Input() 
    Title: string;

    @Output()
    invokeAction: EventEmitter<IActionInvocationRequest> = new EventEmitter();


    invokeMethod(){
        alert("invoking " + this.Title + "!!")
        let actionInvocation: IActionInvocationRequest = {
            actionName: this.Title 
        }

        this.invokeAction.emit(actionInvocation)
    }
}

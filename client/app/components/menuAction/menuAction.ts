
import {NgModule,Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


@Component({
  selector: 'menu-action', // <1>
  template: `<li> <a class="dropdown-toggle" data-toggle="dropdown" href="#">{{this.getFriendlyName(menu)}}</a></li>`,
  styles: ["a:hover { cursor: pointer; }"],
  encapsulation:ViewEncapsulation.None
})
export default class MenuActionComponent{ 
    @Input() 
    ServiceName: string;
    @Input() 
    ActionName: string;

    @Output()
    invokeAction: EventEmitter<IActionInvocationRequest> = new EventEmitter();

    invokeMethod(){
        let actionInvocation: IActionInvocationRequest = {
            actionName: this.ActionName 
        }

        this.invokeAction.emit(actionInvocation)
    }
}

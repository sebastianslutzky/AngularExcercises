import {Component, ViewEncapsulation,ViewChild,ElementRef,ComponentRef, ViewContainerRef,ReflectiveInjector,ComponentFactoryResolver} from '@angular/core';
import EntityComponent from "app/components/entity/entity" 

export class FxService{
  getRootServices(){
    //return [["saludo",["hello","holasss","ciao!"]],["mundo",[]],["cancion",["lalal","laraiiiilaraaaaa?"]]];
    return [
      new RootService("ServiceOne",["ActionOneOne","ActionOneTwo"]),
      new RootService("ServiceTwo",["ActionTwoOne","ActionTwoTwo"]),
      new RootService("ServiceThree",["ActionThreeOne"])
    ]
  }
}

class RootService{
  constructor(
    public name: string,
    public actions: string[],
  ){}
}

@Component({
  providers: [FxService],
  selector: 'auction-application', // <1>
  templateUrl: 'app/components/application/application.html', // <3>
  styleUrls: ['app/components/application/application.css'], // <4>
  encapsulation:ViewEncapsulation.None
})
export default class ApplicationComponent{ 
  alphas: any;

@ViewChild('placeHolder', {read: ViewContainerRef}) private _placeHolder: ElementRef;
  constructor(public svc: FxService,private _cmpFctryRslvr: ComponentFactoryResolver){
      this.alphas = svc.getRootServices();
  }

  invokeActionHandler(event: IActionInvocationRequest){
    alert("recieved event!" + event.actionName)
    //create EntityComponent and render here
    let cmp = this.createComponent(this._placeHolder, EntityComponent);
    this._placeHolder.insert(cmp.hostView);
  }

  public createComponent (vCref: ViewContainerRef, type: any): ComponentRef {

    let factory = this._cmpFctryRslvr.resolveComponentFactory(type);

    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);

    // create component without adding it directly to the DOM
    let comp = factory.create(injector);

    return comp;
  }
}


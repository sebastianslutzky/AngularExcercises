import {Component, ViewEncapsulation,ViewChild,ElementRef,ComponentRef, ViewContainerRef,ReflectiveInjector,ComponentFactoryResolver} from '@angular/core';
import EntityComponent from "app/components/entity/entity" 

export class FxService{
  getRootServices(){
    return [
      new RootService("ServiceOne",["ActionOneOne","ActionOneTwo"]),
      new RootService("ServiceTwo",["ActionTwoOne","ActionTwoTwo"]),
      new RootService("ServiceThree",["ActionThreeOne"])
    ]
  }

  invokeRootAction(actionName: string){
      if(actionName === "ActionOneTwo")
        return;
      return new EntityModel(actionName + 'Entity',"A " + actionName)
  }
}

export class EntityModel{
  static instanceCount =0;
  constructor(public name: string, public title: string){
    this.title += '#' + EntityModel.instanceCount;
    EntityModel.instanceCount++;
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
    //create EntityComponent and render here
    let resultEntity = this.svc.invokeRootAction(event.actionName);
    if(resultEntity){
      let cmp = this.createComponent(this._placeHolder, EntityComponent,resultEntity);
      this._placeHolder.insert(cmp.hostView);
    }
  }

  public createComponent (vCref: ViewContainerRef, type: any, inputData: any): ComponentRef {
     let inputProviders = Object.keys(inputData).map((inputName) => {
       return {
         provide: inputName, useValue: inputData[inputName]};});
      
   let  resolvedInputs = ReflectiveInjector.resolve(inputProviders);
   let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, 
        vCref.parentInjector);

    let factory = this._cmpFctryRslvr.resolveComponentFactory(type);

    // create component without adding it directly to the DOM
    let comp = factory.create(injector);

    return comp;
  }
}


import {Component, ViewEncapsulation,ViewChild,ViewChildren,ElementRef,ComponentRef, 
  ViewContainerRef,ReflectiveInjector,ComponentFactoryResolver} from '@angular/core';
import EntityComponent from "../../components/entity/entity" ;
import FxService from  "../../services/fxService";
import {Http,HttpModule,Headers,RequestOptions,RequestMethod,RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map" ;
import { HttpClient } from '../../services/httpService';

@Component({
  selector: 'auction-application', // <1>
  templateUrl: 'app/components/application/application.html', // <3>
  styleUrls: ['app/components/application/application.css'], // <4>
  encapsulation:ViewEncapsulation.None
})
export default class ApplicationComponent{ 
  dataSource: Observable<any>; 
  menus: any;

  topMenuCategories: Array<string>;

  menuItems(menu: string){
    var ret =  this.menus[menu];
    return ret;
  }
  //TO BE USED FOR ACTION RESULTS
   @ViewChild('placeHolder', {read: ViewContainerRef}) private _placeHolder: ElementRef;


handleOnTopMenuObsolete(i: number){
  this.topMenuCategories.splice(i, 1);
}


  constructor(public svc: FxService,
              private _cmpFctryRslvr: ComponentFactoryResolver,
              private http: Http,public http2: HttpClient){
      var invocation = new XMLHttpRequest();

      var url = 'http://localhost:8080/restful/services/';

      this.dataSource = this.http2.get(url).map(res=>res.json());
  }

  ngOnInit(){
    this.dataSource.subscribe(data =>{
        this.menus = data.value;
        var allMenus: Array<any> = data.value;
        this.menus = allMenus.reduce(function(r,a){
          r[a.title]= r[a.title]||[];
          r[a.title].push(a);
          return r;
        },[]);

        this.topMenuCategories = Object.keys(this.menus);
    });
  }

  menuCategories(){
    let catNames = this.menus.map(m => m.title);
    return Array.from(new Set(catNames));
  }


  invokeActionHandler(event: IActionInvocationRequest){
    //create EntityComponent and render here
    let resultEntity = this.svc.invokeRootAction(event.actionName);
    if(resultEntity){
      let cmp = this.createComponent(this._placeHolder, EntityComponent,resultEntity);
      this._placeHolder.insert(cmp.hostView);
    }
  }

  getFriendlyName(resource: any){
    //get resource
    //get described by
    //return friendly name

    let resourceId = resource.href;
    console.log("about to get " + resourceId);
    let fullResource = this.http2.get(resourceId).map(res=>res.json()).subscribe(data=> {return data});
 //   let fullResource = this.get(resourceId);
  //  console.log(fullResource);
   // console.log(fullResource.value);

  }

  //TODO: Move to ComponentFactory service
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


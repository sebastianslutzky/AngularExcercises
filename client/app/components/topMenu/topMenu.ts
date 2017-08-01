
import {NgModule,Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpClient } from '../../services/httpService';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map" ;


@Component({
  selector: 'top-menu', // <1>
  template: `<li><a class="dropdown-toggle" data-toggle="dropdown" href="#">{{friendlyName}}</a></li>`,
  encapsulation:ViewEncapsulation.None
})
export default class TopMenuComponent{ 

    dataSource: Observable<any>;
    _dryResource: any;
    fullResource: any;
    describedBy: any;
    friendlyName: string;

    @Input()
    set dryResource(value: any){
        console.log("setting dry resource");
        this._dryResource = value;
        this.dataSource = this.client.get(this._dryResource.href).map(res=>res.json());
    }

    constructor(private client: HttpClient){
    }

    ngOnInit(){

        this.dataSource.subscribe(data=>
            {
            console.log("receiving things...") ;
            this.fullResource = data.links;
            let links: Array<any> = data.links;
            this.describedBy = data.links.filter(function(item: any){return item.rel == "describedby"});
            this.client.get(this.describedBy[0].href).map(res=>res.json())
            .subscribe(describedBy => {
                    console.log(this.describedBy);
                    this.friendlyName = describedBy.extensions.friendlyName;
                });
            });
    }

    //todo:
    // 1: get resource on init or when dryResource is assigned
    
    // 2: move getResource to a service and get it injected
    // 3: get describedBy
}

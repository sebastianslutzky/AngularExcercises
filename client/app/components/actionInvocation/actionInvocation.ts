
import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'action-invocation', // <1>
  template: 'hola mundo'
})
 export default class ActionInvocationComponent implements OnInit{ 
    ngOnInit(): void {
        console.error("buaaaa")
    }
    constructor(route: ActivatedRoute) {
        let id = route.snapshot.params['id'];
        console.log("@ action invocation ctor: " + id)
    }
}

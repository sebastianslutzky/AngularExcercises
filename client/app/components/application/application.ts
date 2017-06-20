import {Component, ViewEncapsulation} from '@angular/core';

export class FxService{
  getRootServices(){
    return [["saludo",["hello","holasss","ciao!"]],["mundo",[]],["cancion",["lalal","laraiiiilaraaaaa?"]]];
  }
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

  constructor(public svc: FxService){
      //alphas = [["saludo",["hello","hola"]],["mundo",[]],["cancion",["lalal","laraiiiilaraaaaa?"]]];
      this.alphas = svc.getRootServices();
  }
}


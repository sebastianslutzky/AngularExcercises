import {Component, ViewEncapsulation} from '@angular/core';

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

  constructor(public svc: FxService){
      this.alphas = svc.getRootServices();
  }
}


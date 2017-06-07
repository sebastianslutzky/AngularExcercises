import {EventEmitter, Component,  Input, OnInit, Output} from '@angular/core'; // <1>
import { NgModule } from '@angular/core';

@Component({
  templateUrl: 'app/components/stars/stars.html',
  styles: [` .starrating { color: #d17581; }`],
  selector: 'auction-stars'
})
export default class StarsComponent {
  private _rating: number = 0;
  private stars: boolean[];
  private maxStars: number = 5;
  
  @Input() readonly: boolean= true;
  @Input() get rating(): number{
    return this._rating;
  }

  set rating(value: number){
    this._rating = value | 0;
    this.stars = Array(this.maxStars).fill(true,0,this.rating);
  }

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  fillStarsWithColour(index: number){
    if(!this.readonly){
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}

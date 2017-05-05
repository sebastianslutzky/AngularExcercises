import {Component, ViewEncapsulation} from '@angular/core';
import {Product, ProductService} from '../../services/product-service';

@Component({
  selector: 'auction-application', // <1>
  templateUrl: 'app/components/application/application.html', // <3>
  styleUrls: ['app/components/application/application.css'], // <4>
  encapsulation:ViewEncapsulation.None
})
export default class ApplicationComponent{
    products: Array<Product> = [];
    constructor(private productService: ProductService){
        this.products = this.productService.getProducts();
    }
}
import {Component} from "@angular/core" ;
import {ActivatedRoute} from "@angular/router" ;
import {Product, Review, ProductService} from "../../services/product-service" ;

 @Component({
    selector: "auction-product-page",
    templateUrl: 'app/components/productdetail/productdetail.html'
 } )
 export default class ProductDetailComponent{
     product: Product;
     reviews: Review[];
     constructor(route: ActivatedRoute, productService: ProductService){
       let prodId: number = parseInt(route.snapshot.params['prodId']);
       this.product = productService.getProductById(prodId);
       this.reviews = productService.getReviewsForProduct(prodId);
     }
 }
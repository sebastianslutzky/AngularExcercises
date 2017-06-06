import ApplicationComponent from './components/application/application';
import CarouselComponent from "./components/carousel/carousel";
import FooterComponent from "./components/footer/footer";
import NavbarComponent from "./components/navbar/navbar";
import ProductItemComponent from "./components/product-item/product-item";
import SearchComponent from "./components/search/search";
import StarsComponent from "./components/stars/stars";
import HomeComponent from "./components/home/home";
import ProductDetailComponent from "./components/productdetail/productdetail";
import {FilterPipe} from './pipes/filterpipe';
import {ReactiveFormsModule} from '@angular/forms';

export const myComponents=[
                    FilterPipe,
                    ApplicationComponent,
                    HomeComponent,
                    CarouselComponent,
                    FooterComponent,
                    NavbarComponent,
                    ProductItemComponent,
                    ProductDetailComponent,
                    SearchComponent,
                    StarsComponent]

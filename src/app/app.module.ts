import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgOtpInputModule } from  'ng-otp-input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RingsComponent } from './pages/rings/rings.component';
import { EarringsComponent } from './pages/earrings/earrings.component';
import { NecklaceComponent } from './pages/necklace/necklace.component';
import { BanglesBraceletsComponent } from './pages/bangles-bracelets/bangles-bracelets.component';
import { SilverComponent } from './pages/silver/silver.component';
import { BullionComponent } from './pages/bullion/bullion.component';
import { FilterComponent } from './shared/filter/filter.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrendingComponent } from './pages/trending/trending.component';
import { WeddingComponent } from './pages/wedding/wedding.component';
import { OffersComponent } from './pages/offers/offers.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { MyAccountComponent } from './user/my-account/my-account.component';
import { AddressComponent } from './user/address/address.component';
import { AddBankComponent } from './user/add-bank/add-bank.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ContactComponent } from './contact/contact.component';
import { EditbankComponent } from './user/editbank/editbank.component';
import { OrdertrackingComponent } from './pages/ordertracking/ordertracking.component';
import { GiftCardsComponent } from './pages/gift-cards/gift-cards.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { AuthenticationService } from './shared/services/auth/authentication.service';
import { EditAddressComponent } from './user/edit-address/edit-address.component';
import { ChainsComponent } from './pages/chains/chains.component';
import { WeddingCategoriesComponent } from './pages/wedding-categories/wedding-categories.component';
import { SearchProdutcsComponent } from './pages/search-produtcs/search-produtcs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    RingsComponent,
    EarringsComponent,
    NecklaceComponent,
    BanglesBraceletsComponent,
    SilverComponent,
    BullionComponent,
    FilterComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    WishlistComponent,
    PageNotFoundComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    MyOrdersComponent,
    TrendingComponent,
    WeddingComponent,
    OffersComponent,
    GiftsComponent,
    MyAccountComponent,
    AddressComponent,
    AddBankComponent,
    EditProfileComponent,
    ContactComponent,
    EditbankComponent,
    OrdertrackingComponent,
    GiftCardsComponent,
    EditAddressComponent,
    ChainsComponent,
    WeddingCategoriesComponent,
    SearchProdutcsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    NgxSpinnerModule,
    NgbDropdownModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard,AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'INR'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

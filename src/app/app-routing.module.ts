import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactComponent } from './contact/contact.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BanglesBraceletsComponent } from './pages/bangles-bracelets/bangles-bracelets.component';
import { BullionComponent } from './pages/bullion/bullion.component';
import { CartComponent } from './pages/cart/cart.component';
import { ChainsComponent } from './pages/chains/chains.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { EarringsComponent } from './pages/earrings/earrings.component';
import { GiftCardsComponent } from './pages/gift-cards/gift-cards.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { NecklaceComponent } from './pages/necklace/necklace.component';
import { OffersComponent } from './pages/offers/offers.component';
import { OrdertrackingComponent } from './pages/ordertracking/ordertracking.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RingsComponent } from './pages/rings/rings.component';
import { SearchProdutcsComponent } from './pages/search-produtcs/search-produtcs.component';
import { SilverComponent } from './pages/silver/silver.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { WeddingCategoriesComponent } from './pages/wedding-categories/wedding-categories.component';
import { WeddingComponent } from './pages/wedding/wedding.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { AddBankComponent } from './user/add-bank/add-bank.component';
import { AddressComponent } from './user/address/address.component';
import { EditAddressComponent } from './user/edit-address/edit-address.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { EditbankComponent } from './user/editbank/editbank.component';
import { MyAccountComponent } from './user/my-account/my-account.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LandingPageComponent
  },
  {
    path:'Home',
    component:LandingPageComponent
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'wishlist',
    component:WishlistComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component:RegisterComponent
  },
  { path: 'ordertracking/:id', component: OrdertrackingComponent},
  { path: 'viewprofile',
    component: MyAccountComponent,
    canActivate:[AuthGuard]
  },
  { path: 'address/add', 
    component: AddressComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'bank/add', component: AddBankComponent,
    canActivate:[AuthGuard]
  },
  { path: 'editprofile/:id',
    component: EditProfileComponent,
    canActivate:[AuthGuard]
  },
  { path: 'editbank/:id',
    component: EditbankComponent,
    canActivate:[AuthGuard]},
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'editaddress/:id',
    component:EditAddressComponent
  },
  {
    path:'Ecommerce',
    children:[
      {
        path:'checkout',
        component:CheckoutComponent
      },
      {
        path:'rings/:id',
        component:RingsComponent
      },
      {
        path:'chains/:id',
        component:ChainsComponent
      },
      {
        path:'necklace/:id',
        component:NecklaceComponent
      },
      {
        path:'earrings/:id',
        component:EarringsComponent
      },
      {
        path:'bangelesBracelets/:id',
        component:BanglesBraceletsComponent
      },
      {
        path:'silver',
        component:SilverComponent
      },
      {
        path:'bullion/:id',
        component:BullionComponent
      },
      {
        path:'details/:id',
        component:ProductDetailsComponent
      },
      {
        path:'myorders',
        component:MyOrdersComponent
      },
      {
        path:'trending',
        component:TrendingComponent
      },
      {
        path:'wedding',
        component:WeddingComponent
      },
      {
        path:"offers",
        component:OffersComponent
      },
      {
        path:"gifts",
        component:GiftsComponent
      },
      { path: 'type/Giftcards', 
        component: GiftCardsComponent
      },
      {
        path:"wedding/categories/:id",
        component:WeddingCategoriesComponent
      },
      {
        path:"searchProducts/:id",
        component:SearchProdutcsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

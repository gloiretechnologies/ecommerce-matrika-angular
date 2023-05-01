import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { GoldService } from 'src/app/shared/services/gold.service';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  count:any;
filter: any;
option: any;
fruit: any;
response:any;
  cartp: any;
  respons: any;
  arr: any;
  favo: any;
  lenghts: any;
  currentGoldPricePerGram: any;
  amount: any;
  live: any;
  pcount: any;
  myString: any;
  myString2: any;
  len: any;
  silver24k: any;
  gold24k: any;
  ma: any;
  p: any;
  size: any;
  live_price24: any;
  silver_liveprice: any;
  coupons: any;
 page: number = 1;
    errors: object = {};
  couponamount: any;
  couponsgiftcardid: any;
  giftid: any;
  gold22k: any;
  errorshow: any;
  arrLenght: any;
  noProducts: any;
  noProductsResponse:any
  hideCheckout:boolean =false
  productName: any;
  giftPrdoduct: any;
  giftProStored: any;
  myString3: any;
  stoneid: any;
    
  constructor(    private paymentService: PaymentService,private goldService: GoldService,private api:ApiService,private route:Router,
    private authService: AuthenticationService,private spinner: NgxSpinnerService) { 
    
  }

  ngOnInit(): void {
      this.spinner.hide();
      this.getInfo1();
 this.goldService.getCurrentGoldPrice()

      .subscribe((r: any) => {
        this.currentGoldPricePerGram = r.sell_price_per_gram;
      });
     
    
  }
    getInfo1() {
       this.giftid =localStorage.getItem('card_id');
       console.log("checkitem",this.giftid)
   if(this.giftid!=null){
    this.api.get(`ecom/checkout?card_id=${this.giftid}`)
      .subscribe((r: any) => {
        this.respons= r;
        console.log('response cehckOutOne',this.respons.length)
        this.ma=r.payable_amount;
        const myClonedArray  = Object.assign([], this.respons);
       this.len=myClonedArray.lenght;
       this.arr=myClonedArray;
       console.log("arr...rtrt",this.arr)
         this.gold24k=this.arr[0].liveprice24;
        this.silver24k=this.arr[0].silverprice;
        this.gold22k=this.arr[0].liveprice22;
      console.log(`len`,this.len)
      var res = this.arr.map((s: { pid: any; })=>s.pid);
      var res1 = this.arr.map((s: { size: any; })=>s.size);

this.myString = res.toString();
this.myString2 = res1.toString();
  console.log(`pids`, this.myString,this.myString2);
      
      });
   }
  else{
     this.api.get(`ecom/checkout`)
      .subscribe((r: any) => {
        this.respons= r;
        console.log('response CheckOut',this.respons)
        this.ma=r.payable_amount;
        this.noProducts = r
        this.noProductsResponse = "No products"
        this.productName = r.pname
        this.giftPrdoduct = "Gift Card"
        
        this.giftProStored = this.productName === this.giftPrdoduct ;
        if(this.noProducts === this.noProductsResponse){
          console.log("no products excute");
          this.hideCheckout=true
        }

        console.log("sddsffadsfsdf", r);
       
        
        const myClonedArray  = Object.assign([], this.respons);
       this.len=myClonedArray.lenght;


       this.arr=myClonedArray;
       console.log("arr",this.arr)
       this.arr.va

       this. arrLenght = this.arr.lenght
         this.gold24k=this.arr[0].liveprice24;
        this.silver24k=this.arr[0].silverprice;
        this.gold22k=this.arr[0].liveprice22;
      console.log(`len`,this.len)
      var res = this.arr.map((s: { pid: any; })=>s.pid);
      var res1 = this.arr.map((s: { size: any; })=>s.size);
      // var res2 = this.arr.map((s: { stoneid: any; })=>s.stoneid);

this.myString = res.toString();
this.myString2 = res1.toString();
// this.myString3 = res2.toString();
  console.log(`pids`, this.myString,this.myString2);
      
      },(err: HttpErrorResponse) => {
               this.spinner.hide();
          this.errorshow=err.error
               console.log(err.error)

        });    
  }
  }
 
onSubmit() {
    this.giftid =localStorage.getItem('card_id');

   if(this.giftid===null){
 this.api.get(`ecom/checkout`)
      .subscribe((r: any) => {
        console.log("idcheckresponse....",r)
        this.amount=r.payable_amount;
        //  const myClonedArray  = Object.assign([], this.response);
      //  this.arr=myClonedArray;
       const myClonedArray  = Object.assign([],r);
      
       this.arr=myClonedArray;
       console.log("arr...rtrt",this.arr)
         this.gold24k=this.arr[0].liveprice24;
        this.silver24k=this.arr[0].silverprice;
        this.gold22k=this.arr[0].liveprice22;
      console.log(`len`,this.len)
      var res = this.arr.map((s: { pid: any; })=>s.pid);
      var res1 = this.arr.map((s: { size: any; })=>s.size);
      var res2 = this.arr.map((s: { stoneid: any;})=>s.stoneid);

this.myString = res.toString();
this.myString2 = res1.toString();
this.stoneid = res2.toString();
  console.log(`pids`, this.myString,this.myString2,`stoneid`,this.stoneid);

  // //////
        this.live=this.gold22k;
        console.log("live",this.live)
        this.pcount=r.productscount;     
         this.p=this.myString;
         this.size=this.myString2;
       
          this.live_price24=this.gold24k;
         this.silver_liveprice=this.silver24k;
         let enteredWalletAmount=0;
         let GiftCardId=0;
        console.log('payamount',this.amount,this.live,this.pcount)
        this.paymentService.ecomPostingRazorpay(this.amount, this.live,this.pcount,this.p,enteredWalletAmount,this.size,this.live_price24,this.silver_liveprice,GiftCardId,this.stoneid);

      });
   }
   else{
    this.api.get(`ecom/checkout?card_id=${this.giftid}`)
      .subscribe((r: any) => {
        console.log("idcheckelse",r)
        this.amount=r.payable_amount;
        //  const myClonedArray  = Object.assign([], this.response);
      //  this.arr=myClonedArray;
       const myClonedArray  = Object.assign([],r);
       this.len=myClonedArray.lenght;
       this.arr=myClonedArray;
       console.log("arr...rtrt",this.arr)
         this.gold24k=this.arr[0].liveprice24;
        this.silver24k=this.arr[0].silverprice;
        this.gold22k=this.arr[0].liveprice22;
      console.log(`len`,this.len)
      var res = this.arr.map((s: { pid: any; })=>s.pid);
      var res1 = this.arr.map((s: { size: any; })=>s.size);
      var res2 = this.arr.map((s: { stoneid: any;})=>s.stoneid);

this.myString = res.toString();
this.myString2 = res1.toString();
this.stoneid = res2.toString();
  console.log(`pids`, this.myString,this.myString2,`stoneid`,this.stoneid);

  // //////
        this.live=this.gold22k;
        console.log("live",this.live)
        this.pcount=r.productscount;   
     
         this.p=this.myString;
         this.size=this.myString2;
          this.live_price24=this.gold24k;
         this.silver_liveprice=this.silver24k;
         let enteredWalletAmount=0;
         let GiftCardId=this.arr[0].GiftCardId
        console.log('payamount',this.amount,this.live,this.pcount)
 this.paymentService.ecomPostingRazorpay(this.amount, this.live,this.pcount,this.p,enteredWalletAmount,this.size,this.live_price24,this.silver_liveprice,GiftCardId,this.stoneid);

      });

      
   }
  
  }
}

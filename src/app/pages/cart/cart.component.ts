import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { GoldService } from 'src/app/shared/services/gold.service';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  chosenName: string = '';
  count: any;
  filter: any;
  option: any;
  fruit: any;
  response: any;
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
  giftcardid: any;
  finalamount: any;
  giftamount: any;
  errorshow: any;
  errorshow1: any;
  favos: any;
  lens: any;
  lencheck: any;
  data: string;
  response_cart: any;
  cartLength: any;
  message: any;
  resLengthCart: any;
  zero: any;
  favResoponse: any;
  productName: any;
  giftPrdoduct: any;
  giftProStored: any;
  userNameFormGroupEnquiry!: FormGroup;
  giftcardSecond: any;
  filteredsubProducts: any;

  constructor(private paymentService: PaymentService, private goldService: GoldService, private api: ApiService, private route: Router,
    private authService: AuthenticationService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) {
    this.data = 'gagagag';


  }

  ngOnInit(): void {
    this.userNameFormGroupEnquiry = this.formBuilder.group({
      chosenName: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    });
    this.checkwish();
    this.getInfo();
    this.getResultsGiftcardSecond()
    this.goldService.getCurrentGoldPrice()


      .subscribe((r: any) => {
        this.currentGoldPricePerGram = r.sell_price_per_gram;
      });
    this.getInfo1();
    this.getResults();


  }
  get getFc() {
    return this.userNameFormGroupEnquiry.controls;
  }
  onSubmit() {
    this.chosenName = this.getFc['chosenName'].value
    console.log(this.chosenName);
    this.api.get(`ecom/giftcard`)
      .subscribe((r: any) => {
        this.giftcardSecond = r;
        this.filteredsubProducts = [...r.filter((product: { gift_card: string; }) => product.gift_card == this.chosenName)]
        console.log('secondTime', this.filteredsubProducts);

        let card = this.filteredsubProducts[0].gift_card
        let data = { card }
        this.api.post(`ecom/applygiftcard`, data)
          .subscribe((r: any) => {
            localStorage.setItem('card_id', this.filteredsubProducts[0].id);
            localStorage.setItem('gift_card', this.filteredsubProducts[0].gift_card);
            localStorage.setItem('gift_amount', this.filteredsubProducts[0].amount);
            console.log('len', r);
          });


      });
  }
  getResults() {
    this.api.get(`ecom/giftcard`)
      .subscribe((r: any) => {
        this.favos = r;
        this.lens = this.favos.length
        console.log('len', this.lens);
      });
  }

  getResultsGiftcardSecond() {

  }
  checkwish() {
    this.errorshow = [];
    this.spinner.show();
    this.api.get(`ecom/cart`)
      .subscribe((r: any) => {
        this.spinner.hide();
        // 
        this.favo = r;
        this.lenghts = this.favo
        this.cartLength = this.lenghts.length;
        this.favResoponse = "No products in cart";

        if (this.favo == this.favResoponse) {
          this.zero = 0
          this.api.cartData(this.zero)
        }
        else {
          this.api.cartData(this.favo.length)
        }
        this.productName = r.pname
        this.giftPrdoduct = "Gift Card"

        this.giftProStored = this.productName === this.giftPrdoduct;




        localStorage.setItem('cartcount', JSON.stringify(this.cartLength));
        console.log("localstoded", JSON.stringify(this.cartLength));


        console.log('lencart...2', this.cartLength);
        console.log("message favo", this.lenghts);

        if (this.favo == "No products in cart") {
          this.zero = 0
          console.log("no p", this.zero);

        }
        // this.api.wishlistData(this.cartLength)


      }, (err: HttpErrorResponse) => {
        this.errorshow = err.error
        console.log(`errorshow`, this.errorshow)
        this.spinner.hide();

      }
      );
  }

  del(id: any) {

    this.api.delete(`ecom/cart/${id}`,)
      .subscribe((res: any) => {
        this.response = res;
        console.log('done')
        window.location.reload();

      });

  }
  getInfo() {
    this.errorshow = '';

    this.api.get(`ecom/checkout`)
      .subscribe((r: any) => {

        console.log("cartprice22", r);

        this.amount = r.payable_amount;
        this.respons = r;
        this.resLengthCart = r.length
        console.log('response cart', this.resLengthCart)
        const myClonedArray = Object.assign([], this.response);
        this.arr = myClonedArray;
        console.log(this.arr)

      }, (err: HttpErrorResponse) => {
        this.errorshow = err.error
        console.log(`errorshow`, this.errorshow)
        this.spinner.hide();

      }
      );

  }

  getInfo1() {
    this.api.get(`ecom/checkout`)
      .subscribe((r: any) => {

        this.response = r;
        console.log('response..', this.response)
        this.ma = r.payable_amount;

        const myClonedArray = Object.assign([], this.response);
        this.lencheck = myClonedArray.lenght;

        this.arr = myClonedArray;
        this.gold24k = this.arr[0].liveprice24;
        this.silver24k = this.arr[0].silverprice;
        console.log(`leninfo1`, this.lencheck)
        var res = this.arr.map((s: { pid: any; }) => s.pid);
        var res1 = this.arr.map((s: { size: any; }) => s.size);

        this.myString = res.toString();
        this.myString2 = res1.toString();
        console.log(`pids`, this.myString, this.myString2);

      });
  }
  movetofav(id: any, size: any) {
    this.api.post(`ecom/movetofavourites/${id}/${size}`, id, size)
      .subscribe((res: any) => {
        this.response = res;
        console.log(this.response)
        this.route.navigate([`wishlist`])
      });

    this.api.delete(`ecom/cart/${id}`,)
      .subscribe((res: any) => {
        this.response = res;
        console.log('done')
        this.route.navigate([`cart`])
      });

  }
  onApply(id: any, gift_card: any, amount: any) {

    let card = gift_card;
    let data = { card }
    this.api.post(`ecom/applygiftcard`, data)
      .subscribe((r: any) => {
        let card_id = id
        localStorage.setItem('card_id', card_id);
        localStorage.setItem('gift_card', gift_card);
        localStorage.setItem('gift_amount', amount);
        console.log('apply', r);
      });

  }

  removegiftcard() {
    let card = localStorage.getItem('gift_card');
    let data = { card }
    this.api.post(`ecom/giftcard`, data)
      .subscribe((r: any) => {
        console.log('remove', r);
      });
    localStorage.removeItem('card_id');
    localStorage.removeItem('gift_card');
    localStorage.removeItem('gift_amount');


  }
  ngDoCheck() {


    this.giftcardid = localStorage.getItem('card_id');
    this.giftamount = localStorage.getItem('gift_amount');
    if (this.giftamount != null) {
      this.finalamount = this.respons.payable_amount - this.giftamount
    }
    else {
      this.finalamount = this.respons.payable_amount
    }
    console.log("this is inside NgDOcHECK CARTPAGE")
  }


}

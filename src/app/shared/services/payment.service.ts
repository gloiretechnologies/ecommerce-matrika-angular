import {Injectable, Input} from '@angular/core';
import { JavascriptServiceService } from './javascript.service.service';
import {WindowRefService} from './window-ref.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import { Location } from '@angular/common'
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  charge: any;
  chargeredeem: any;
  eventCharge: any;
  gift_card!: string | null;

  constructor(
    private api: ApiService,
    private router: Router,
    private winRef: WindowRefService,
     private jsService: JavascriptServiceService,
     private location: Location

  
  ) {
     this.jsService.injectJsScript(`https://checkout.razorpay.com/v1/checkout.js`);
   }
    ecomPostingRazorpay(amount: number, live: number, pcount: number, p: number, enteredWalletAmount: any, size: number, live_price24: number, silver_liveprice: number,GiftCardId:any,stoneid:number) {
      // gift card validation\

      
      // end
    const options: any = {
      key: environment.razorPayApiKey,
      amount: (amount * 100), // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: `Ecommerce Goldsikka`, // company name or product name
      description: `Buy Product from Goldsikka`,  // product description
      image: 'assets/images/fav-icon.png', // company logo or product image
      // order_id: orderId, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#131f37'
      }
    };
    options.handler = ((response: { razorpay_payment_id: null; }, error: any) => {
      options.response = response;
      let no_of_products = pcount;
      let pid = p;
      let live_price = live;
      // let p_id =stoneid
      
      // stoneid
      // call your backend api to verify payment signature & capture transaction
      const paymentData = { amount, payment_id: null, no_of_products, pid, enteredWalletAmount, live_price24, size, live_price, silver_liveprice ,GiftCardId,stoneid };
        let card =localStorage.getItem('gift_card');
   const data={card}
 
      if ('razorpay_payment_id' in response) {
        paymentData.payment_id = response.razorpay_payment_id;
      } else {
        alert('Something went wrong, Please try again');
        window.location.href = '/user-organizations';
      }
      console.log(paymentData)
   
      this.api.post(`ecom/checkout`, paymentData)
        .subscribe((r: any) => {
          console.log(r)
          if (r.processed == true) {
            localStorage.removeItem('card_id');
            localStorage.removeItem('gift_card');
            localStorage.removeItem('gift_amount');
            let description = r.message
            sessionStorage.setItem('desc', 'Order placed at GoldSikka' + '' + description);
             console.log(r)
            // window.location.href = '/Ecommerce/myorders';
           
            this.api.post(`ecom/applygiftcard`,data)
            .subscribe((r: any) => {
           console.log(r)
        
         
          })
          localStorage.removeItem('card_id');
          localStorage.removeItem('gift_card');
          localStorage.removeItem('gift_amount');
            this.router.navigate(['/Ecommerce/myorders'])
            .then(() => {
              window.location.reload();
            });

          }
        },

          (err: HttpErrorResponse) => {
            console.log(err.status);
            if (err.status === 400) {
              alert('Transaction Failed');
              // window.location.href = '/ecommerce/checkout';
            }
          });
    });

    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
      alert('You are Cancelled Transaction.');
                
      // window.location.href = '/cart';
      // this.location.back();
      this.router.navigate(['/cart'])
      .then(() => {
        window.location.reload();
      });
     
      
     
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
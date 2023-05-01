import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  showUserImageModal!: boolean;
  myorders: any;
  len: any;
  ordertracking: any;
  favo: any;
  lenghts: any;
  lens: any;
order_id:any
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
    
  //   autoplay:true,
  //   navSpeed: 2000,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items:1
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 1
  //     }
  //   },
  //   nav: false
  // }
  info: any;
  ids: any;
  filteredPro!: any[];
  currentUser: any;
  mainn: any;
  favResoponse: any;

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.getmyorders()
this.cart() 
this.getfavouri()
this.cart();
  }
getmyorders() {
    


 this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
console.log(this.currentUser.verifyToken)
this.mainn=this.currentUser.verifyToken;
  if(this.mainn==null){
    Swal.fire({
      title: 'Log In Required',
      text: '',
      icon: 'question',
      confirmButtonColor: '#1a2e22',
      showCancelButton: true,
      
    }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                // redirect to delete data

                     this.router.navigate(['/login']);

              }})
  }
  else{
  
      this.api.get(`ecom/myorders`)
      .subscribe((r: any) => {
        console.log('order',r);
      this.myorders = r;
      this.len=this.myorders.length
      console.log('len',this.len);
      this.check();
      });

  }

  }
 
 check(){
 let id=this.myorders[0].userid;
    this.api.get(`ecom/orderdetailsbyid/${id}`)
    .subscribe((a: any) => {
      this.info = a;
      console.log('items order',this.info);
    });
 }
 
   downloadPdf(order_id:any) {
    let id =order_id;
            this.api.get(`ecom/invoice/${id}`, {responseType: 'blob'})
            .subscribe((r: any) => {
                saveAs(new Blob([r], {type: 'application/pdf'}), 'Transaction-slip.pdf');
            });

          }
  
   getordertracking(order_id:any){
    
   this.api.get(`ecom/ordertracking/${order_id}`)
    .subscribe((a: any) => {
      this.ordertracking = a;
      console.log('tracking',this.ordertracking);
    });
}
  cart() {
    this.api.get(`ecom/cart`)
      .subscribe((r: any) => {
      this.favo = r;
      this.lenghts=this.favo.length
      
      this.favResoponse = "No products in cart"
      if(this.favo == this.favResoponse){
          console.log("zero" );
          
      }
      
      console.log('cartlength',this.lenghts);
      });
    
  }
 getfavouri() {
    this.api.get(`ecom/favourites`)
      .subscribe((r: any) => {
        this.favo = r;
      this.lens=this.favo.length
      console.log('len',this.lens);
      });
        console.log('selling from my order',this.favo);
  }
  
  onImage(order_id:any,userid:any) {
    let id=order_id;
        this.showUserImageModal = true;
        this.api.get(`ecom/orderdetails/${id}`)
    .subscribe((a: any) => {
      this.info = a;
      console.log('info',this.info);
    });
    }
    hideUserImageModal() {
        this.showUserImageModal = false;
    }

}

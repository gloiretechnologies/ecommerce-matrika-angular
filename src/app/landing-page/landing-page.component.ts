import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  products:any
  ban: any;
  top: any;
  new: any;
  list: any;
  urls: any = environment.shareurl;

 customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    
    autoplay:true,
    navSpeed: 2000,
    nav: true,
    navText:["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items:2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    
  }
//  customOptions2: OwlOptions = {
//     loop: true,
//     mouseDrag: true,
//     touchDrag: true,
//     pullDrag: true,
//     dots: true,
//      autoWidth: true,
//     autoHeight: true,
//     autoplay:true,
//     navSpeed: 2000,
//     navText: ['', ''],
//     responsive: {
//       0: {
//         items: 1
//       },
//       400: {
//         items: 1
//       },
//       740: {
//         items: 1
//       },
//       940: {
//         items: 1
//       }
//     },
//     nav: false
//   }
  // custom: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //    autoWidth: true,
  //   autoHeight: true,
  //   autoplay:true,
  //   navSpeed: 2000,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 2
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 4
  //     }
  //   },
  //   nav: false
  // }
  cat: any;
  filteredProducts: any;
  id: any;
  fristis: any;
  currentUser: any;
  mainn: any;
  response1: any;
  response: any;
  allpro: any;
  giftfilter: any;
  size: any;
  responsewish: any;
  response_cart:any
  carat22: any;
  carat24: any;
  silverToday: any;
  liveDate: any;
  liveTime: any;
 
  constructor(private api:ApiService,private spinner: NgxSpinnerService,private route:Router, private routerActivated: ActivatedRoute) {
    // this. route.routeReuseStrategy.shouldReuseRoute= ()=>false
  //   this.api.cartData$.subscribe((res)=>{
  //     this.response_cart =res
  //     console.log("subject" , this.response_cart);
      
  //  })
   }

  ngOnInit(): void {
    setInterval(()=>{
      this.api.get(`gold/current/22caratPrice`).subscribe((res:any)=>{
        console.log('12345',res)
        this.carat22=res.sell_price_per_gram
        this.liveDate=res.live_date;
        this.liveTime=res.time;
      })
    },2000);
    setInterval(()=>{
      this.api.get(`gold/current/price`).subscribe((res:any)=>{
        console.log('24',res)
        this.carat24=res.sell_price_per_gram
        ;
      })
    },2000);
    setInterval(()=>{
      this.api.get(`ecom/silverprice`).subscribe((res:any)=>{
        console.log('silver',res)
        this.silverToday=res;
        ;
      })
    },2000);
    
    this.gettopselling();
    
    this.getnewarrival();
    this.getInfo();
    this.getbanners();
   
    
    
  }
 
  
 getbanners() {
    this.api.get(`ecom/banners`)
      .subscribe((r: any) => {
        this.ban = r;
        console.log(this.ban)

      });
  }

 gettopselling() {
    this.api.get(`ecom/topsellingproducts`)
      .subscribe((r: any) => {
        this.top = r;
        console.log('selling from homecomponent',this.top);

      });
  }
   getnewarrival() {
    this.api.get(`ecom/newarrivals`)
      .subscribe((r: any) => {
        this.new = r;
        console.log('new',this.new);


      });
  }
  getInfo() {
    this.api.get(`ecom/categories`)
      .subscribe((r: any) => {
        this.list = r;
        console.log(this.list)
        this.filteredProducts = [...this.list.filter((product: { catname: string; }) => product.catname ==='Bangles'||product.catname =='Chains'|| product.catname =='Nose Pins'|| product.catname =='Rings')]
console.log('catfilter',this.filteredProducts)
let id=this.filteredProducts[0].id
this.getid(id) 
      this.spinner.hide();

      });
  }
    getid(id:any) {
   
     this.id=this.filteredProducts[0].id
       console.log('npreid',this.id)
    this.api.get(`ecom/categories/${id}/products`)
      .subscribe((r: any) => {
        this.cat = r;
        console.log(this.cat)
      });
  }

func(id:any,size:any){
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
      
    }).then((result) => {
            if (result.isConfirmed) {
                // redirect to delete data

                    this.route.navigate(['/login']);

              }})
  }
  else{

   let pid=id
   console.log(size)
      const data = {size,pid};
  this.api.post(`ecom/cart`, data)
    .subscribe((res: any) => {
         this.response1=res;
        
         console.log("cartSubject" , this.response1 );
        //  this.api.cartData(this.response1)
        //  this.ngOnInit();
    console.log(this.response1)
    this.route.navigate(['cart'])
  .then(() => {
    window.location.reload();
  });
// this.route.navigate([`cart`])

      });
      
  }
}

wish(id:any,size:any){
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
      
    }).then((result) => {
            if (result.isConfirmed) {
                // redirect to delete data
              this.route.navigate(['/login']);
              }})
  }
  else{
let  pid =id
    const data = {size,pid};
  this.api.post(`ecom/favourites`, data)
    .subscribe((res: any) => {
      
        this.responsewish =res;
    console.log("postlenth" , this.responsewish.length)
    Swal.fire({
      title: 'Added to Favourites',
      text: '',
      icon: 'success',
          confirmButtonColor: '#1a2e22',
      showCancelButton: true,
      
    });
    // window.location.reload();
// this.route.navigate([`wishlist`])

// this.route.routeReuseStrategy.shouldReuseRoute = () => false;
// this.route.onSameUrlNavigation = 'reload';
// this.route.navigate(['./'], { relativeTo: this.router, queryParamsHandling: 'preserve' });

      });

      if(id)
       this.api.delete(`ecom/favourites/${id}`, id)
    .subscribe((res: any) => {
        this.response=res;
    console.log('done')


      });

  }
}
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  gold:any=[
    { 
      "id":1, 
       },

  ]
  silver:any=[
    { 
      "id":2, 
       },

  ]
 peopleLoading = false;
  allpro: any;
  allcal: any;
  prodname: any = [];
 
  all: any;
  cnames: any;
    public selection!: string;
  myForm: FormGroup<{ filterProduct: FormControl<string | null>; }>;
  filteredProducts: any[] = [];
  mainn: string | null | undefined;
  fil: any;
  value1: any;
  localStorageJsonData: any;
  currentUser: any;
  favo: any;
  lenghts: any;
  len: any;
  userDetails:any
  response_wish: any;
  response_cart: any;
  cartlenghts: any;
  favocart: any;
  cartsubj: any;
  message:any;
  cart_add: any;
  isNull: any;
  val: any;
  profileName: any;
  constructor(  public authenticationService: AuthenticationService,
    public router: Router,private api:ApiService,private fb: FormBuilder,private spinner: NgxSpinnerService, private route:Router) {
    this.myForm = this.fb.group({
      filterProduct: ['']
       }),

      
       this.api.cartData$.subscribe((response:any)=>{
        this.cart_add=response
        console.log("cartcart" , this.cart_add);
       })
    //    this.api.cartData$.subscribe((res)=>{
    //     this.response_cart =res
    //     console.log("subjectcartheader" , this.response_cart);

        
    //  })
    // 
    // this.api.cartData$.subscribe((res)=>{
    //   this.response_cart =res
    //   console.log('my cart count',res)

    // })
   }
  
   hideShowProfile:boolean=true;
    ngOnInit(): void {
    setInterval(()=>{
      this.profile();
    },5000)
    
    this.getlist();
    this.cart();
    setInterval(()=>{
      this.getfavouri();
      this.cart();
    },2000)
    this.api.wishCountData$.subscribe((res:any)=>{
    this.response_wish = res
      console.log("subjectwishheader" , this.response_wish);
      
   });
    // this.changeFn(this.val)
    
    const userData :any= localStorage.getItem('user');
    this. userDetails =JSON.parse(userData);
    console.log("headeruser",this.userDetails );
    if(this.userDetails==null){
      this.hideShowProfile= false;
    }    
  }

  navigateTo(e:any) {
    let val = e.target.value
    if (val) {
        this.router.navigate([val]);
    }
    return false;
}
getlist(){
//  this.api.get(`ecom/products`)
//       .subscribe((res: any) => {
//         this.allpro = res;
//         console.log(this.allpro)
//       this.prodname = this.allpro.map((res: { pname: any; })=>res.pname);
//       console.log(this.prodname)

//       });
 this.api.get(`ecom/categories`)
      .subscribe((res: any) => {
        this.allcal= res;
       this.prodname = this.allcal.map((res: { catname: any; })=>res.catname);
      console.log(this.allcal)
     console.log(this.prodname)
      });
     
}
func(){
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

                     this.router.navigate(['/login']);

              }})
  }
  else{
                       this.router.navigate(['/cart']);

  }
}
func1(){
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
                  this.router.navigate(['/login']);
            }})
  }
  else{
  this.router.navigate(['/wishlist']);

  }
}

   changeFn(val: any) {
      this.value1=val.$ngOptionLabel
      var uname = new String(val.$ngOptionLabel) 
    console.log(this.value1)
    if(uname.length>=2){
    this.spinner.show();
    this.api.get(`ecom/categories`)
      .subscribe((r: any) => {
       console.log("category",r)
        this.filteredProducts = [...r.filter((product: {catname: string;}) => product.catname===this.value1 )]
     console.log('fil',this.filteredProducts)
    
     let fil=this.filteredProducts[0].id;
    //  let myItems = r.filter((catname: { name: string; }) => catname.name === "name");
     console.log("fil" ,fil);
     
      // this.router.navigate([`Ecommerce/details/${fil}`]);
      this.router.navigate([`Ecommerce/searchProducts/${fil}`]);

      });

    }
    

  }
  search(value:any){
    this.router.navigate([`Ecommerce/${value}`]);
    console.log('value of search',value)
    alert(value)
  }
 
  ngDoCheck(){
    this.cart_add
    this.response_wish
    this.cartlenghts
    this.cartlenghts.length
    this.response_wish
    // this.len
    console.log("heardcart" ,this.cartlenghts, this.response_wish);
   }
   profile(){
    this.api.get(`user/profile`).subscribe((res:any)=>{
      this.profileName=res;
      console.log('profile.......',this.profileName);
    })
   }
   cart(){
    this.api.get(`ecom/cart`)
      .subscribe((r: any) => {
      this.favocart = r;
      // this.isNull= r.
      this.cartlenghts=this.favocart
      
      // this.api.cartData(this.cartlenghts)
      console.log('cartcart..',this.cartlenghts.length,this.cartlenghts);
      });
      
  }
  
 
   getfavouri() {
    this.api.get(`ecom/favourites`)
      .subscribe((r: any) => {
      this.favo = r;
      this.len=this.favo.length
      this.api.wishlistData(this.len);
      console.log('len',this.len);
      });
        console.log('selling from header',this.favo);
  }
  
 
    logout(): void {

      
    if (confirm('Are you sure you want to logout?')) {
     
        this.api.get(`auth/logout`)
            .subscribe((r: any) => {
                // this.currentUserSubject.next(null);
                localStorage.clear();
                localStorage.removeItem('user');
              this.hideShowProfile=true
             this.router.navigate(['/login']);
            });
    }
  }
  reLoadDOM(){
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    },1000)
    window.scroll(0,0);
  }

}

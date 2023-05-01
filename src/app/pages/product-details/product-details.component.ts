import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  producedetails: any;
  selectedTeam: any;
  cat: any;
  final: any;
  finalva1: any;
  m: any;
  weightfilter: any;
  finalprice3: any;
  finalprice2: any;
  finalprice: any;
  finalva: any;
  filteredProducts: any;
  values: any;
  myForm1: any;
  currentUser: any;
  mainn: any;
  response1: any;
  ids: any;
  reviews: any;
  response: any;
  img: any;
  img2: any;
  productName: any;
  giftPrdoduct: any;
  constructor(private spinner: NgxSpinnerService,private route:Router,private fb: FormBuilder,private api:ApiService,private router:ActivatedRoute) {
      this.myForm1 = this.fb.group({
    filterProduct1: new FormControl('',),

       })
    
       
   }

  ngOnInit(): void {
    this.getpriceunder();
    let pids = this.router.snapshot.paramMap.get('id');
    
    
  }
  
form = new FormGroup({
    
    review: new FormControl('',[Validators.required]),
    rating: new FormControl('',[Validators.required]),
    pid: new FormControl (this.router.snapshot.paramMap.get('id'))
  });

  getpriceunder() {
    let pids = this.router.snapshot.paramMap.get('id');
    let id=pids;
  
      this.api.get(`ecom/products/${id}`)
        .subscribe((r: any) => {
          
          this.getreviews(this.mmm)
          this.producedetails = r;
     this.selectedTeam=this.producedetails[0].size
          console.log('selling from details',this.producedetails);
          let cide =this.producedetails[0].cid;
          this.img =this.producedetails[0].image_uri;
          this.img2 =this.producedetails[0].image_uri;
          this.productName = r.pname
      this.giftPrdoduct = "Gift Card"
      
      // this.giftProStored = this.productName === this.giftPrdoduct 
          this.similarpro()
      this.spinner.hide();

        });      
    }
  mmm(mmm: any) {
    throw new Error('Method not implemented.');
  }
    similarpro(){
          let cide =this.producedetails[0].cid
      let id =cide
     this.api.get(`ecom/categories/${id}/products`)
      .subscribe((r: any) => {
        this.cat = r;
        console.log("similar",this.cat)
      });
    }
    	onSelected(value:string): void {
		this.selectedTeam = value;
    console.log('val',this.selectedTeam)
    this.filteredProducts = [...this.producedetails[0].sizes.filter((product: { sizes: any; }) => product.sizes == this.selectedTeam )]
     this.values=value;
        this.weightfilter=this.filteredProducts[0].weight;
        console.log('value', this.filteredProducts);
        // gold price
     this.finalprice=(this.producedetails[0].liveprice)*(this.weightfilter)
        this.finalva=(this.finalprice*this.producedetails[0].va)/100
	this.finalprice2=this.finalprice+this.finalva+((this.producedetails[0].stoneprice)+(this.producedetails[0].gstprice))
   
// silver price
this.final=((this.producedetails[0].liveprice)*(this.weightfilter))/1000
        this.finalva1=((this.final)*(this.producedetails[0].va))/100
        this.m=(this.final+this. finalva1)*((this.producedetails[0].gst)/100)

	this.finalprice3=(this.finalva1)+(this.final)+(this.m)+(this.producedetails[0].stoneprice)

}
  func1(id:any,size:any){
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
  //  console.log(size)
   let size =this.selectedTeam
      const data = {size,pid};
  this.api.post(`ecom/cart`, data)
    .subscribe((res: any) => {
      this.route.navigate(['cart'])
      .then(() => {
        window.location.reload();
      });

        this.response1=res;
    console.log(this.response1)


      });

  }
}
 
 onsubmit_form(id:any) {
  console.log(id)
  this.ids=id
  console.log(this.ids)
    const data = this.form.value;

    console.log(data);
    this.api.post(`ecom/ratings`, data)
      .subscribe((res: any) => {
        console.log(res);
        Swal.fire({
      title: 'Review Submited',
      text: '',
      icon: 'success',
          confirmButtonColor: '#1a2e22',
      showCancelButton: true,
      
    }).then((result) => {
            if (result.isConfirmed) {
            
               
              }})
     
      })
  }

  getreviews(mmm:any){
    let id=mmm
    this.api.get(`ecom/ratings/${id}`)
    .subscribe((a: any) => {
      this.reviews = a;
      console.log('reviews',this.reviews);
    });
  }


  wish(id:any,size:any){
    console.log("clicked")
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
   let size =this.selectedTeam

      const data = {size,pid};
    this.api.post(`ecom/favourites`, data)
      .subscribe((res: any) => {
          this.response=res;
      console.log(this.response)
      Swal.fire({
        title: 'Added to Favourites',
        text: '',
        icon: 'success',
            confirmButtonColor: '#1a2e22',
        showCancelButton: true,
        
      });

        });

        if(id)
         this.api.delete(`ecom/favourites/${id}`, id)
      .subscribe((res: any) => {
          this.response=res;
      console.log('done')


        });

    }
}
hideShow:boolean=true;

}

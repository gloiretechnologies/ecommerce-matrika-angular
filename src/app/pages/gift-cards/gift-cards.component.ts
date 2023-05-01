import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gift-cards',
  templateUrl: './gift-cards.component.html',
  styleUrls: ['./gift-cards.component.scss']
})
export class GiftCardsComponent {
  allpro: any;
  currentUser: any;
  mainn: any;
  response: any;
  all: any;
  id: any;
  size: any;
  giftcard: any;
 
  constructor(private rou:ActivatedRoute,private route:Router,private api:ApiService,private spinner: NgxSpinnerService) { 
    //  this.pro();

  }
  

  ngOnInit(): void {
 
 
this.pro()
this.wish(this.id,this.size)

}

pro(){
this.spinner.show();
    this.api.get(`ecom/showgiftcards`)
    
    .subscribe((res: any) => {
       console.log("show ifgt",res)
       this.giftcard = res
        // this.allpro = [...res.filter((product: { type: string; }) => product.type ==='gift')]

        //   this.all=this.allpro.length
    console.log("resp giftcard",this.giftcard)
    this.spinner.hide();
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
    this.route.navigate(['cart'])
    .then(() => {
      window.location.reload();
    });

      this.response1=res;
  console.log(this.response1)
    });
}
}
response1(response1: any) {
  throw new Error("Method not implemented.");
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
  if(data==null){
    console.log("firsttime" , data);
    
  }
  else{
    console.log("notposted" );
    
  }

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

}

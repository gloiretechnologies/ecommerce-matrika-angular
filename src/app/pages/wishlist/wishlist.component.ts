import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  response: any;
  isSubmitting!: boolean;
  errors: any;
  errorMessage!: string;
  favo1: any;
  errorMessage1: any;
  errorshow: any;

  constructor(private api:ApiService,private route:Router,
    private authService: AuthenticationService,private spinner: NgxSpinnerService
    ) { }
favo:any;

  ngOnInit(): void {
    this.authService.checkAccess();
    this.getfavouri();
  }
getfavouri() {
  this.spinner.show()
    this.api.get(`ecom/favourites`)
      .subscribe((r: any) => {
        this.favo = r;
        console.log('selling from..',r);
        this.spinner.hide();
        
      this.api.wishlistData(r.length)
     this.spinner.hide();

      },(err: HttpErrorResponse) => {
               this.spinner.hide();
          this.errorshow=err.error
               console.log(err.error)

        });

  }
  movetofav(id: any,size: any) {
   
       this.api.post(`ecom/movetocart/${id}/${size}`,id,size)
    .subscribe((res: any) => {
        this.response=res;
    console.log('done')

this.route.navigate([`cart`])
.then(() => {
  window.location.reload();
});

      });
    this.api.delete(`ecom/favourites/${id}`,)
    .subscribe((res: any) => {
        this.response=res;
    console.log('done')



      });

  }
del(id: any) {
    
       this.api.delete(`ecom/favourites/${id}`,)
    .subscribe((res: any) => {
        this.response=res;
    console.log('done')
    window.location.reload();
      });

  }

}

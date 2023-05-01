import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  
  profileResponse: any;
  profileDetails=null;
   name:any;
   errors: object = {};
   isSubmitting!: boolean;
   errorMessage!: string;
   successMessage!: string;
   addressResponse: any;
   bankAccountList: any;
   successMessage1!: string;
   errorMessage1: any;
 
 
   constructor(
      private api: ApiService,
     private authService: AuthenticationService,
     private router: Router,
   ) { }
 
   ngOnInit(): void {
     this.authService.checkAccess();
       this.getprofileDetails();
       this.getAddressList();
   this.getBanksList();
   }
 
   getBanksList(): void {
     this.api.get(`user/bankAccount`)
       .subscribe((res: any) => {
         this.bankAccountList = res.data;
       });
   }
 
   deleteBank(id:any): void {
     if (confirm('Are you sure to delete ? ')) {
       this.api.delete(`user/bankAccount/` + id)
         .subscribe((res: any) => {
             this.errorMessage = '';
             this.successMessage = '';
             this.getBanksList();
             this.successMessage1 = 'Bank Account Deleted Successfully';
           },
           (err: HttpErrorResponse) => {
             this.isSubmitting = false;
             this.errors = err.error.errors;
             if (err.error.message.length) {
               this.errorMessage1 = err.error.message.toString();
             }
 
             this.isSubmitting = false;
           });
     }
   }
 
   //Make Primary
   onMakePrimary2(id:any): void {
     this.api.get(`user/bankAccount/${id}/makePrimary`)
       .subscribe((res: any) => {
           this.getBanksList();
         },
         (err: HttpErrorResponse) => {
           this.isSubmitting = false;
         });
   }
   onSubmit(): void {}
    getprofileDetails(): void {
     this.api.get(`user/profile`)
       .subscribe((res: any) => {
         this.profileResponse = res;
           console.log("response", this.profileResponse);
         }, (err: HttpErrorResponse) => {
                          this.router.navigate(['/login']);
 
           });
            
           
   }
    getAddressList(): void {
     this.api.get(`user/address`)
       .subscribe((res: any) => {
         this.addressResponse = res;
       });
   }
 
   deleteAddress(id:any): void {
     if (confirm('Are you sure to delete ? ')){
       this.api.delete(`user/address/${id}`)
         .subscribe((res: any) => {
             this.errorMessage = '';
             this.successMessage = '';
             this.successMessage = 'Address Deleted Successfully';
             this.getAddressList();
           },
           (err: HttpErrorResponse) => {
             this.isSubmitting = false;
           });
     }
   }
 
   onMakePrimary(id:any): void {
     this.api.get(`user/address/${id}/makePrimary`)
       .subscribe((res: any) => {
           this.getAddressList();
         },
         (err: HttpErrorResponse) => {
           this.isSubmitting = false;
         });
   }
 

}

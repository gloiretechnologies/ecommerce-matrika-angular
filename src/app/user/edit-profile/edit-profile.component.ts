import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  profileDetails:any[] = [];
// profileemail:any[] = [];
// profilemobile:any[] = [];
  submitted: boolean=false;
  isSubmitting: boolean =false;
  name:any
  email:any;
  otpScreen: boolean=false;
  storeresponse:any;
  errors: object = {};
 errorMessage: any;
 successMessage:any;
 FormGroup:any;
 mainid!: any;

form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email,Validators.pattern('^.+@gmail.com$')]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$' ), Validators.minLength(10),Validators.maxLength(12),]),
  });
  storeResponse: any;
  profileName: any;
  profileEmail: any;
  profileMobile: any;
  
 constructor(
    private api: ApiService,
     private router: Router,
    private authService: AuthenticationService,
    private http:HttpClient,private activate:ActivatedRoute,
    ) 
  {}

  ngOnInit(): void {
     this.mainid = this.activate.snapshot.paramMap.get('id');
       this.authService.checkAccess();

    this.getProfile();
  }
   
 
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errors = [];
    this.errorMessage = '';
    this.profileVerify(this.form.value);

  }

  getProfile(): void {
    this.api.get(`user/profile`)
      .subscribe((res: any) => {
        this.profileName = res.name;
        this.profileEmail = res.email;
        this.profileMobile = res.mobile;

        console.log("profileDetails" , this.profileDetails);
        
        
      });
  }

 
  profileUpdate(data:any): void {
    this.api.post(`user/profile`, data)
      .subscribe((res: any) => {
          this.errorMessage = '';
          this.successMessage = '';
          this.errors = [];
          this.isSubmitting = false;
          this.submitted = false;
          this.otpScreen = false;
          this.successMessage = 'Successfully updated your profile';
          this.router.navigate(['/viewprofile']);
          this.getProfile();
        },
        (err: HttpErrorResponse) => {
          this.errors = err.error.errors;
          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
          }
          this.isSubmitting = false;
        });
  }
  profileVerify(data:any): void {
  this.errorMessage = '';
  this.successMessage = '';
  this.isSubmitting = true;
  this.api.post(`user/newMobile`, data)
  .subscribe((res: any) => {
  this.errors = [];
  this.isSubmitting = false;
  this.submitted = false;
  if (res.isNewMobile) {
  this.otpScreen = true;
  } else {
  this.profileUpdate(this.form.value);
  }
  },
  (err: HttpErrorResponse) => {
  this.errors = err.error.errors;
  if (err.error.message.length) {
  this.errorMessage = err.error.message.toString();
  }
  this.isSubmitting = false;
  });
  }
  
  profileOtpVerify(code:any): void {
    console.log("otp", code);
    
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;
    if (code.length === 6) {
    this.api.get(`user/verify-new-mobile-otp/${this.form.get('mobile')?.value}/${code}`)
      .subscribe((res: any) => {
          this.errors = [];
          this.isSubmitting = false;
          this.submitted = false;
          this.profileUpdate(this.form.value);
        },
        (err: HttpErrorResponse) => {
          this.errors = err.error.errors;
          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
          }
          this.isSubmitting = false;
        });
  }}


 get f():any {
    return this.form.controls;
  } 

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent {
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


   form1: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state_id: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$'), Validators.min(6)]),
  });
  storeResponse: any;
  profileName: any;
  profileEmail: any;
  profileMobile: any;
  mainid!: any;
  addressDetails: any;
  states: any;
  
 constructor(
    private api: ApiService,
     private router: Router,
    private authService: AuthenticationService,
    private http:HttpClient,
    private activate:ActivatedRoute,
    private spinner:NgxSpinnerService
    ) 
  {}

  ngOnInit(): void {
    this.mainid = this.activate.snapshot.paramMap.get('id');
console.log(`id`,this.mainid)
       this.authService.checkAccess();


     this.getStates();
     this.getAddressData();
  }
   
 
  


onSubmit1(): void {
    this.submitted = true;

    if (this.form1.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errors = [];
    this.errorMessage = '';
    this.successMessage = '';
    this.updateAddressData();


  }

  //Get Address
  getAddressData(): void {
    this.spinner.show();
    let id = this.activate.snapshot.paramMap.get('id');
    this.api.get(`user/address/` + id)
      .subscribe((res: any) => {
        this.addressDetails = res;
        this.form1.get('address')?.setValue(res.address);
        this.form1.get('city')?.setValue(res.city);
        this.form1.get('zip')?.setValue(res.zip);
        this.form1.get('title')?.setValue(res.title);
        this.form1.get('state_id')?.setValue(res.state_id);
        this.spinner.hide();
      });
  }

  //Update Address

  updateAddressData(): void {
    this.api.post(`user/address/` + this.addressDetails.id, this.form1.value)
      .subscribe((res: any) => {
          this.errors = [];
          this.isSubmitting = false;
          this.submitted = false;
          this.successMessage = 'Address Updated Successfully';
          this.router.navigate(['/viewprofile']);
        },
        (err: HttpErrorResponse) => {
          this.errors = err.error.errors;
          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
          }

          this.isSubmitting = false;
        });
  }


  get f() {
    return this.form1.controls;
  }


  getStates() {
    this.api.get(`states`)
      .subscribe((res: any) => {
        this.states = res;
      });
  }

}

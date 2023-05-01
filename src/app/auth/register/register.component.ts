import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // submitted!:false;
  // submitted!: boolean;
  submitted = false;
  successMessage!: string;
  showPasswordStatus!: boolean;
  isSubmitting!: boolean;
  errorMessage!: string;
  errors: object = {};
  otherHead!: boolean;

  triggerOtp!: boolean;
  showOtpScreen!: boolean;
  otpVerified!: boolean;
  user: any;
  isOrganizationType: boolean | undefined;
  orgInfo: object[] = [];
  mails: any;
  names: any;
  form!: FormGroup;
  formErrorService: any;
  verify: any;
  constructor(

    private api: ApiService,
    private router: Router,
    private authService: AuthenticationService,

    private formBuilder: FormBuilder

  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      roleType: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(10)]),
      password: new FormControl('Sample@123'),
      confirmPassword: new FormControl('Sample@123'),
      referral_code: new FormControl(''),
      heard_us: new FormControl('', [Validators.required]),
      heard_others_text: new FormControl(''),
      via_registration: new FormControl('3'),
      organization_type: new FormControl('1'),
      acceptTerms: [false, Validators.requiredTrue]
    });
    this.mails = localStorage.getItem('dataemail');
    this.names = localStorage.getItem('dataname');

  }

  onSubmit(): void {
    debugger;
    // this.spinner.show();
    // stop here if form is invalid
    this.submitted = true;
    // console.log(this.form.value)
    if (this.form.invalid) {
      return;
    }
    const fd: any = this.form.value
    console.log(this.form.value)



    if (!!this.orgInfo && this.orgInfo.length) {
      // fd.append(`org_photo`, this.orgInfo[0]['file'], this.orgInfo[0]['file']['name']);
    }
    if (!!this.orgInfo && this.orgInfo.length) {
      // fd.append(`org_registraion_photo`, this.orgInfo[0]['file'], this.orgInfo[0]['file']['name']);
    }

    this.errors = [];
    this.errorMessage = '';
    this.isSubmitting = true;
    this.api.post(`auth/register`, fd)
      .subscribe((res: any) => {



        this.showOtpScreen = true;
        this.verify = res.verifyToken;
        this.user = res;
        // console.log(this.user)
        // this.authService.updateAuthUser(this.user);
        //  this.router.navigate(['auth/login']);
        sessionStorage.setItem('desc', res.description);


      },
        (err) => {
         
          this.errors = err.error.errors;

          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
            alert("mobile number/mail id already register..!")
          }

        });

  }


  onOtpChange(otp: string | any[]): void {
    this.errorMessage = '';

    this.successMessage = '';
    if (otp.length === 6) {
      this.isSubmitting = true;
      this.api.get(`auth/register/${this.verify}/otp/verify/${otp}`)
        .subscribe((res: any) => {
          this.isSubmitting = false;
          this.otpVerified = true;
          this.authService.updateAuthUser(this.user);
          sessionStorage.setItem('desc', res.description);
          localStorage.setItem('desc', res.description)

        },
          (err) => {
            this.errors = err.error.errors;

            if (err.error.message.length) {
              this.errorMessage = err.error.message.toString();
            }

            this.isSubmitting = false;
          });
    }
  }

  // Function
  showPassword(): void {
    this.showPasswordStatus = !this.showPasswordStatus;
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  registerResendOtp() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;
    this.api.get(`otp/send`)
      .subscribe((res: any) => {
        this.errorMessage = '';
        this.successMessage = '';
        this.isSubmitting = false;
        this.successMessage = 'Otp is Sent to Your Mobile Number';
      },
        (err) => {
          this.errors = err.error.errors;

          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
          }

          this.isSubmitting = false;
        });
  }

  heardAboutus() {
    const others = this.form.get('heard_us')?.value;
    // console.log(others);
    if (others === '6') {
      this.otherHead = true;
    } else {
      this.otherHead = false;
    }
  }

  onRoleType() {
    const type = this.form.get('roleType')?.value;
    if (type === 2) {
      this.isOrganizationType = true;
    } else {
      this.isOrganizationType = false;
    }
  }

  /*get organizationTypesFormGroup(): FormGroup {

      return this.formBuilder.group({
          id: [''],
          org_name: ['', Validators.required],
          registration_number: ['', Validators.required],
          address: ['', Validators.required],organizationTypes
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip_code: ['', Validators.required],
          email: ['', Validators.required],
          mobile: ['', Validators.required],
      });
  } */

  /**
   * @param event
   */

  onOrgInfo(event: {}) {
    if (!!event) {
      this.orgInfo.push(event);
    }
  }
}

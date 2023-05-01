import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent {
    
  bank_name:any;
 submitted!: boolean;
  isSubmitting!: boolean;
  profileDetails = null;

  errorMessage!: string;
  successMessage!: string;
  errors: object = {};
  name!: string;
  private profileId!: string;
  form: FormGroup = new FormGroup({
    name_on_account: new FormControl('', [Validators.required]),
    account_number: new FormControl('', [Validators.required,
            Validators.minLength(10),
            Validators.maxLength(20)]),
    bank_name: new FormControl('', [Validators.required]),
    bank_branch: new FormControl('', [Validators.required]),
    ifsc_code: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  });

  constructor(
    private api: ApiService,
    private router: Router,


  ) {
  }

  ngOnInit(): void {
   


  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errors = [];
    this.errorMessage = '';
    this.successMessage = '';
    this.api.post(`user/bankAccount`, this.form.value)
      .subscribe((res: any) => {
          this.errors = [];
          this.isSubmitting = false;
          this.submitted = false;
          this.form.reset();
          this.successMessage = 'Bank Account Added Successfully';
          this.router.navigate(['/viewprofile'])
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
    return this.form.controls;
  }

}

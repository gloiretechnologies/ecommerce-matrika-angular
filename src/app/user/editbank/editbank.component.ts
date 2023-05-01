import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-editbank',
  templateUrl: './editbank.component.html',
  styleUrls: ['./editbank.component.scss']
})
export class EditbankComponent {
  submitted!: boolean;
  isSubmitting!: boolean;
  bankData =null;

  errorMessage!: string;
  successMessage!: string;
  errors: object = {};
  name!: string;
  private profileId!: string;
  form: FormGroup = new FormGroup({
    name_on_account: new FormControl('', [Validators.required]),
    account_number: new FormControl('', [Validators.required]),
    bank_name: new FormControl('', [Validators.required]),
    bank_branch: new FormControl('', [Validators.required]),
    ifsc_code: new FormControl('', [Validators.required, Validators.min(11)]),
  });

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
   

  ) {
  }

  ngOnInit(): void {
    


    this.getBankAccountData(this.route.snapshot.paramMap.get('id'));
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
    this.api.post(`user/bankAccount/`+ this.bankData, this.form.value)
      .subscribe((res: any) => {
          this.errors = [];
          this.isSubmitting = false;
          this.submitted = false;
          this.successMessage = 'Bank Account updated Successfully';
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

  // Get Bank Details

  getBankAccountData(id:any): void {
    this.api.get(`user/bankAccount/` + id)
      .subscribe((res: any) => {
        this.bankData = res.id;
       
        this.form.get('name_on_account')?.setValue(res['name_on_account']);
        this.form.get('account_number')?.setValue(res['account_number']);
        this.form.get('bank_name')?.setValue(res['bank_name']);
        this.form.get('bank_branch')?.setValue(res['bank_branch']);
        this.form.get('ifsc_code')?.setValue(res['ifsc_code']);
      });
  }

  get f() {
    return this.form.controls;
  }

}

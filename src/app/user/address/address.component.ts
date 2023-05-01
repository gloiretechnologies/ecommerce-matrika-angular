import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  submitted!: boolean;
  isSubmitting!: boolean;
  profileDetails = null;

  errorMessage!: string;
  successMessage!: string;
  errors: object = {};
  name!: string;
  states: [] = [];
  private profileId!: string;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
    state_id: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$'), Validators.min(6)]),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    

  ) {
  }

  ngOnInit(): void {
     

    this.getProfile();
    this.getStates();
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
    this.api.post(`user/address`, this.form.value)
      .subscribe((res: any) => {
          this.isSubmitting = false;
          this.submitted = false;
          this.form.reset();
          this.successMessage = 'Address Added Successfully';
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

  getProfile(): void {
    this.api.get(`user/profile`)
      .subscribe((res: any) => {
        this.profileDetails = res;
      });
  }

  get f() {
    return this.form.controls;
  }

  getStates() {
    this.api.get(`states`)
      .subscribe((res: any) => {
        this.states = res;
      });
  }
}

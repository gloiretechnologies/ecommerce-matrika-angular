import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})


export class TrendingComponent {
  new: any;
 

  constructor(private route:Router,private api:ApiService,private router: ActivatedRoute,private spinner: NgxSpinnerService) { 
     
     

  }
  
  ngOnInit(): void {
    this.spinner.show();
    this.getnewarrival();
  
  }
  getnewarrival() {
    this.api.get(`ecom/newarrivals`)
      .subscribe((r: any) => {
        this.new = r;
        console.log('new arrivals',this.new);
        this.spinner.hide();

      });

}
}

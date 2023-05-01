import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.scss']
})
export class OrdertrackingComponent {
  ordertracking: any;

  constructor(private api:ApiService,private activate:ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
     this.authService.checkAccess();
    this.getordertracking()
  }
 getordertracking(){
    let id = this.activate.snapshot.paramMap.get('id');
    this.api.get(`ecom/ordertracking/${id}`)
    .subscribe((a: any) => {
      this.ordertracking = a;
      console.log('tracking',this.ordertracking);
    });
  }

}

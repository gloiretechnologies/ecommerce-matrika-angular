import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

export interface IFrames {
  carat: any;
  weight:any;
  brand: string;
  size:any
  catname: string;
 id:any
image_uri:any
  totalprice: any;
  type:any;
  pname:any
  description:any
}
export type CheckboxFilter = {
  id: number;
  name: string;
  isChecked: boolean;
  vis:any;
  
};

@Component({
  selector: 'app-bangles-bracelets',
  templateUrl: './bangles-bracelets.component.html',
  styleUrls: ['./bangles-bracelets.component.scss']
})
export class BanglesBraceletsComponent {
  selectedIndex: any;
  select: any;
  categoryID!: number;

  changeSelection(event: any, index: any) {
    this.selectedIndex = event.target.checked ? index : undefined;

    // do your logic here...
  }
  change(event: any, index1: any) {
    this.select = event.target.checked ? index1 : undefined;

    // do your logic here...
  }
  id: any;

  colors = [
    {
      "id": 1,
      "cname": "Rings",
      "vis": "Rings"
    },
    {
      "id": 2,
      "cname": "Nose Pins",
      "vis": "Nose Pins"
    },
    {
      "id": 3,
      "cname": "Chains",
      "vis": "Chains",
    },
    {
      "id": 4,
      "cname": "Bracelet",
      "vis": "Bracelet",
    },
    {
      "id": 4,
      "cname": "Bangles",
      "vis": "Bangles",
    },
  ]
  brands = [
    {
      "id": 5,
      "brandName": "Matrika",
      "vis": "Matrika"
    },
    {
      "id": 6,
      "brandName": "White Rose",
      "vis": "White Rose"
    },
    {
      "id": 7,
      "brandName": "Ornem",
      "vis": "Ornem"
    },
    {
      "id": 15,
      "brandName": "goldsikka",
      "vis": "goldsikka"
    }
  ]
  types = [
    {
      "id": 8,
      "type": "gold",
      "vis": "gold",
    },
    {
      "id": 9,
      "type": "silver",
      "vis": "silver"
    },

  ]
  carats: any = [
    {
      "id": 10,
      "nu": 22,
      "vis": "22 Carats"
    },
    {
      "id": 11,
      "nu": 24,
      "vis": "24 Carats"
    }
  ]
  pricefil: any = [
    {
      "id": 121,
      "vis": "Upto - ₹30,000",
      "low": 30000,
      "high": 60000

    },
    {
      "id": 131,
      "vis": "Upto - ₹60,000",
      "low": 60000,
      "high": 100000
    },
    {
      "id": 141,
      "vis": "Upto - ₹1,00,000",
      "low": 100000,
      "high": 150000
    },
    {
      "id": 151,
      "vis": "Upto - ₹1,50,000",
      "low": 150000,
      "high": 200000
    },
    {
      "id": 161,
      "vis": "above - ₹1,50,000",
      "low": 10000000,
    },
    

  ]

  weightfill: any = [
    {
      "id": 161,
      "vis": "Upto  - 5gms",
      "low": 5

    },
    {
      "id": 171,
      "vis": "Upto - 10gms",
      "low": 10
    },
    {
      "id": 181,
      "vis": "Upto - 15gms",
      "low": 15
    },
    {
      "id": 191,
      "vis": "Upto - 20gms",
      "low": 20,
    },
    {
      "id": 201,
      "vis": "Upto - 50gms",
      "low": 50,
    },
    {
      "id": 221,
      "vis": "Above - 50gms",
      "low": 1000,
    },

  ]


  @Input()
  public filters!: CheckboxFilter[];
  @Output() public filterChange: EventEmitter<
    CheckboxFilter
  > = new EventEmitter<CheckboxFilter>();



  frames$!: Observable<IFrames[]>;
  public brandFilters!: CheckboxFilter[];
  public colorFilters!: CheckboxFilter[];
  public typesFilters!: CheckboxFilter[];
  public pricefilFilters!: CheckboxFilter[];
  public caratsFilters!: CheckboxFilter[];
  public weightfillFilters!: CheckboxFilter[];
  public filteredFrames$!: Observable<IFrames[]>;
  private colorFiltersApplied$ = new BehaviorSubject<string[]>([]);
  private brandFiltersApplied$ = new BehaviorSubject<string[]>([]);
  private typesFiltersApplied$ = new BehaviorSubject<string[]>([]);
  private pricefilFiltersApplied$ = new BehaviorSubject<string[]>([]);
  private caratsFiltersApplied$ = new BehaviorSubject<string[]>([]);
  private weightfillFiltersApplied$ = new BehaviorSubject<string[]>([]);
  // filteredItems: IFrames[] = [...this.frames]; // Create a shallow copy of the items array
  // filteredFrames: IFrames[] = [...this.frames];
  allpro: any;
  prodname: any;
  response: any;
  currentUser: any;
  mainn: any;

  constructor(private route: Router, private api: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService) {

    this.router.paramMap.subscribe((res: any) => {
      this.categoryID = res.params.id;
      this.pro();

      console.log('my category id', this.categoryID);
    })

  }

  ngOnInit(): void {
    this.spinner.show();

  }
  pro() {
    // let pids = this.router.snapshot.paramMap.get('id');   
    //let id =pids
    const id = this.categoryID;

    this.api.get(`ecom/categories/${id}/products`)
      .subscribe((r: any) => {
        this.allpro = r;
        console.log(`catupdate`, r)
        console.log('again cat id', this.categoryID)
        console.log("Api calling all products", this.allpro)
        this.douing();
      });
  }

  douing() {

    this.frames$ = of(this.allpro);
    this.spinner.hide();
    console.log('my filter price', this.pricefilFiltersApplied$)
    this.filteredFrames$ = combineLatest([
      this.frames$,
      this.colorFiltersApplied$,
      this.brandFiltersApplied$,
      this.typesFiltersApplied$,
      this.pricefilFiltersApplied$,
      this.caratsFiltersApplied$,
      this.weightfillFiltersApplied$,


    ]).pipe(
      map(([frames, colors, brands, types, pricefil, carats, weightfill]) => {
        console.log('pricefil', pricefil)
        console.log('price filter applied', this.pricefilFiltersApplied$)
        if (colors && colors.length) {
          frames = frames.filter((frame) => colors.includes(frame.catname));
        }

        if (brands && brands.length) {
          frames = frames.filter((frame) => brands.includes(frame.brand));
        }
        if (types && types.length) {

          frames = frames.filter((frame) => types.includes(frame.type));
        }
        if (pricefil && pricefil.length) {

          frames = frames.filter((frame) => pricefil >= (frame.totalprice));
        }
        if (carats && carats.length) {

          frames = frames.filter((frame) => carats.includes(frame.carat));
        }
        if (weightfill && weightfill.length) {

          frames = frames.filter((frame) => Number(weightfill) >= Number(frame.weight));
        }

        return frames;
      })
    );
    this.brandFilters = this.brands.map((brand) => {
      return <CheckboxFilter>{
        isChecked: false,
        name: brand.brandName,
        id: brand.id,
        vis: brand.vis,
      };
    });

    this.colorFilters = this.colors.map((color) => {
      return <CheckboxFilter>{
        isChecked: false,
        name: color.cname,
        id: color.id,
        vis: color.vis,
      };
    });
    this.typesFilters = this.types.map((t) => {
      return <CheckboxFilter>{
        isChecked: false,
        name: t.type,
        id: t.id,
        vis: t.vis,
      };
    });
    this.pricefilFilters = this.pricefil.map((pri: { low: any; fprice: any; id: any; vis: any }) => {
      return <CheckboxFilter>{
        isChecked: true,
        name: pri.low,
        id: pri.id,
        vis: pri.vis,
      };
    });
    this.caratsFilters = this.carats.map((car: { nu: any; id: any; vis: any }) => {
      return <CheckboxFilter>{
        isChecked: false,
        name: car.nu,
        id: car.id,
        vis: car.vis,
      };
    });
    this.weightfillFilters = this.weightfill.map((w: { low: any; id: any; vis: any; }) => {
      return <CheckboxFilter>{
        isChecked: false,
        name: w.low,
        id: w.id,
        vis: w.vis,
      };
    });

  }
  public brandChanged(filter: CheckboxFilter): void {
    const currentFilters = this.brandFiltersApplied$.getValue();
    const idx = currentFilters.indexOf(filter.name);
    if (idx >= 0) {
      currentFilters.splice(idx, 1);
    } else {
      currentFilters.push(filter.name);
    }

    this.brandFiltersApplied$.next(currentFilters);
  }

  public colorChanged(filter: CheckboxFilter): void {
    const currentFilters = this.colorFiltersApplied$.getValue();
    const idx = currentFilters.indexOf(filter.name);
    if (idx >= 0) {
      currentFilters.splice(idx, 1);
    } else {
      currentFilters.push(filter.name);
    }

    this.colorFiltersApplied$.next(currentFilters);
  }
  public typesChanged(filter: CheckboxFilter): void {
    const currentFilters = this.typesFiltersApplied$.getValue();

    const idx = currentFilters.indexOf(filter.name);
    if (idx >= 0) {
      currentFilters.splice(idx, 1);
    } else {
      currentFilters.push(filter.name);
    }

    this.typesFiltersApplied$.next(currentFilters);
  }
  public priceChanged(filter: CheckboxFilter, e: any): void {
    const currentFilters = this.pricefilFiltersApplied$.getValue();

    const idx = currentFilters.indexOf(filter.name);
    if (idx >= 0) {
      currentFilters.length = 0;
      currentFilters.splice(idx, 1);
      console.log(currentFilters);
    } else {
      currentFilters.length = 0;
      currentFilters.push(filter.name);
      console.log(currentFilters);
    }

    this.pricefilFiltersApplied$.next(currentFilters);
  }
  public caratsChanged(filter: CheckboxFilter): void {
    const currentFilters = this.caratsFiltersApplied$.getValue();

    const idx = currentFilters.indexOf(filter.name);
    if (idx >= 0) {
      currentFilters.splice(idx, 1);
    } else {
      currentFilters.push(filter.name);
    }
    this.caratsFiltersApplied$.next(currentFilters);
  }
  public weightfillChanged(filter: CheckboxFilter, e: any): void {
    const currentFilters = this.weightfillFiltersApplied$.getValue();

    const idx = currentFilters.indexOf(filter.name);
    if (idx >= 0) {
      currentFilters.length = 0;

      currentFilters.splice(idx, 1);
    } else {
      currentFilters.length = 0;

      currentFilters.push(filter.name);
    }

    this.weightfillFiltersApplied$.next(currentFilters);


  }

  // filters end  /////

  func(id: any, size: any) {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.currentUser.verifyToken)
    this.mainn = this.currentUser.verifyToken;
    if (this.mainn == null) {
      Swal.fire({
        title: 'Log In Required',
        text: '',
        icon: 'question',
        confirmButtonColor: '#1a2e22',
        showCancelButton: true,

      }).then((result) => {
        if (result.isConfirmed) {
          // redirect to delete data

          this.route.navigate(['/login']);

        }
      })
    }
    else {
      let pid = id
      console.log(size)
      const data = { size, pid };
      this.api.post(`ecom/cart`, data)
        .subscribe((res: any) => {
          this.route.navigate(['cart'])
            .then(() => {
              window.location.reload();
            });
          // this.route.navigate([`cart`])

          this.response1 = res;
          console.log(this.response1)


        });

    }
  }
  response1(response1: any) {
    throw new Error("Method not implemented.");
  }
  wish(id: any, size: any) {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.currentUser.verifyToken)
    this.mainn = this.currentUser.verifyToken;
    if (this.mainn == null) {
      Swal.fire({
        title: 'Log In Required',
        text: '',
        icon: 'question',
        confirmButtonColor: '#1a2e22',
        showCancelButton: true,

      }).then((result) => {
        if (result.isConfirmed) {
          // redirect to delete data

          this.route.navigate(['/login']);
        }
      })
    }
    else {
      let pid = id
      const data = { size, pid };
      this.api.post(`ecom/favourites`, data)
        .subscribe((res: any) => {
          this.response = res;
          console.log('favorites', this.response)
          Swal.fire({
            title: 'Added to Favourites',
            text: '',
            icon: 'success',
            confirmButtonColor: '#1a2e22',
            showCancelButton: true,

          });
        });
      if (id)
        this.api.delete(`ecom/favourites/${id}`, id)
          .subscribe((res: any) => {
            this.response = res;
            console.log('done')
          });




    }
  }
}

import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, Optional } from '@angular/core';
import { OrdersService } from '../../../core/services/Orders/orders.service';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly ordersService: OrdersService = inject(OrdersService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  // checkoutform: FormGroup = new FormGroup({
  //   details:new FormControl( [null, [Validators.required]]),
  //   phone:new FormControl( [null, [Validators.required]]),
  //   city:new FormControl( [null, [Validators.required]]),
  // });

  idCart: string = '';
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      console.log(res);
      this.idCart = res.get('idCart')!;
    });
  }

  checkoutform: FormGroup = this.formBuilder.group({
    details: [null, [Validators.required]],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [null, [Validators.required]],
  });

  onSubmit(): void {
    if (this.checkoutform.valid) {
      this.ordersService
        .CheckOutSession(this.idCart, this.checkoutform.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              // open(res.session.url, '_self');
            }
          },
          error(err) {
            console.log(err);
          },
        });

      // this.ordersService
      //   .CreatCashOrders(this.idCart, this.checkoutform.value)
      //   .subscribe({
      //     next: (res) => {
      //       console.log(res);
      //     },
      //     error(err) {
      //       console.log(err);
      //     },
      //   });
    }
  }
}

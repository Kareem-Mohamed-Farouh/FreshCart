import { jwtDecode } from 'jwt-decode';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/Orders/orders.service';
import {
  IAllorder,
  IUsertoken,
} from '../../shared/interfaces/usertoken/usertoken';
import { DatePipe } from '@angular/common';
import { subscribe } from 'diagnostics_channel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-order',
  imports: [DatePipe],
  templateUrl: './all-order.component.html',
  styleUrl: './all-order.component.scss',
})
export class AllOrderComponent implements OnInit, OnDestroy {
  private readonly ordersService = inject(OrdersService);
  myId: IUsertoken = {} as IUsertoken;
  allOrderData!: IAllorder[];
  subscrib!: Subscription;

  ngOnInit(): void {
    this.myId = jwtDecode(localStorage.getItem('token')!);
    console.log(this.myId);
    this.getAllOrder();
  }
  getAllOrder() {
    this.subscrib = this.ordersService.getUserOrders(this.myId.id).subscribe({
      next: (res) => {
        // console.log(res);
        this.allOrderData = res;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscrib.unsubscribe();
  }
}

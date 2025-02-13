import { jwtDecode } from 'jwt-decode';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/Orders/orders.service';

@Component({
  selector: 'app-all-order',
  imports: [],
  templateUrl: './all-order.component.html',
  styleUrl: './all-order.component.scss',
})
export class AllOrderComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  myId = jwtDecode(localStorage.getItem('token')!);

  ngOnInit(): void {}
}

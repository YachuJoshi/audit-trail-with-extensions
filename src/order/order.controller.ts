import { OrderItem } from '@prisma/client';
import { Body, Controller, Post } from '@nestjs/common';

import { OrderService } from './order.service';

interface CreateOrderDto {
  orderItems: OrderItem[];
}

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }
}

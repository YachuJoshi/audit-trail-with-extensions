import { OrderItem } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { OrderItemService } from '@/order-item/order-item.service';

interface CreateOrderDto {
  orderItems: OrderItem[];
}

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderItemService: OrderItemService,
  ) {}

  async create(payload: CreateOrderDto) {
    const order = await this.prisma.withGeneralAuditExtension().order.create({
      data: { userId: 1 },
    });

    const orderItems = await this.orderItemService.createManyAndReturn(
      payload.orderItems,
      order.id,
    );

    return { ...order, orderItems };
  }
}

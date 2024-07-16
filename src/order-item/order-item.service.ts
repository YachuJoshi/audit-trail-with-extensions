import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.OrderItemCreateInput) {
    return this.prisma.withGeneralAuditExtension().orderItem.create({ data });
  }

  createManyAndReturn(
    payload: Prisma.OrderItemCreateManyInput[],
    orderId: number,
  ) {
    return this.prisma
      .withGeneralAuditExtension()
      .orderItem.createManyAndReturn({
        data: payload.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          orderId,
        })),
      });
  }

  find(args: Prisma.OrderItemFindManyArgs) {
    return this.prisma.withGeneralAuditExtension().orderItem.findMany(args);
  }
}

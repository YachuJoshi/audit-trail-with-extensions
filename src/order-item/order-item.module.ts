import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}

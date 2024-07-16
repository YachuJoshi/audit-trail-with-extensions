import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { AppController } from './app.controller';

import { PrismaModule } from './prisma/prisma.module';
import { AuditTrailModule } from './audit-trail/audit-trail.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [PrismaModule, AuditTrailModule, ProductModule, OrderModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

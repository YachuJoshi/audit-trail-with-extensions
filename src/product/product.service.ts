import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput) {
    return this.prisma.withProductAuditExtension().product.create({ data });
  }

  verifyAll() {
    return this.prisma.withProductAuditExtension().product.updateMany({
      where: { verified: true },
      data: { verified: false },
    });
  }

  delete(id: number) {
    return this.prisma.withProductAuditExtension().product.delete({
      where: { id },
    });
  }
}

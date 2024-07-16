import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuditTrailService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: Prisma.AuditTrailCreateInput) {
    const userId = 1;

    return this.prisma.auditTrail.create({
      data: {
        hash: uuidv4(),
        data: payload.data,
        model: payload.model,
        operation: payload.operation,
        modelId: payload.modelId,
        userId,
      },
    });
  }
}

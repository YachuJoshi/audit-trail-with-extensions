import { Module } from '@nestjs/common';
import { AuditTrailService } from './audit-trail.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuditTrailService],
})
export class AuditTrailModule {}

import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { createManyAuditTrail } from '@/utils/prisma.util';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ log: ['query'] });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  withProductAuditExtension() {
    return this.$extends({
      name: 'product-audit-trail',
      query: {
        product: {
          create: async ({ model, args, query }) => {
            const result = await query(args);

            await this.productAuditTrail.create({
              data: {
                model,
                userId: 1,
                hash: uuidv4(),
                modelId: result.id,
                operation: 'CREATE',
                data: JSON.stringify(args.data),
              },
            });

            return result;
          },
          createMany: async ({ model, args, query }) => {
            // Run the query
            const result = await query(args);

            await createManyAuditTrail(
              args.data,
              model,
              this.productAuditTrail,
            );

            return result;
          },
          createManyAndReturn: async ({ model, args, query }) => {
            const result = await query(args);

            await Promise.all(
              result.map((item) => {
                return this.productAuditTrail.create({
                  data: {
                    model,
                    userId: 1,
                    hash: uuidv4(),
                    modelId: item.id,
                    operation: 'CREATE',
                    data: JSON.stringify(item),
                  },
                });
              }),
            );

            return result;
          },
          update: async ({ model, args, query }) => {
            const result = await query(args);

            await this.productAuditTrail.create({
              data: {
                model,
                userId: 1,
                hash: uuidv4(),
                modelId: result.id,
                operation: 'UPDATE',
                data: JSON.stringify(args.data),
              },
            });

            return result;
          },
          updateMany: async ({ model, args, query }) => {
            // Get the items to update
            const toUpdateItems = await this.product.findMany({
              where: args.where,
            });

            // Run the query
            const result = await query(args);

            // Get the updated items
            const updatedItems = await this.product.findMany({
              where: {
                id: { in: toUpdateItems.map((item) => item.id) },
              },
            });

            // Create audit trails for updated items
            await Promise.all(
              updatedItems.map((item) => {
                return this.productAuditTrail.create({
                  data: {
                    model,
                    userId: 1,
                    hash: uuidv4(),
                    modelId: item.id,
                    operation: 'UPDATE',
                    data: JSON.stringify(item),
                  },
                });
              }),
            );

            return result;
          },
          delete: async ({ model, args, query }) => {
            const result = await query(args);

            await this.productAuditTrail.create({
              data: {
                model,
                userId: 1,
                data: null,
                hash: uuidv4(),
                modelId: result.id,
                operation: 'DELETE',
              },
            });

            return result;
          },
          deleteMany: async ({ model, args, query }) => {
            const toDeleteItems = await this.product.findMany({
              where: args.where,
            });

            const result = await query(args);

            const deletedItems = await this.product.findMany({
              where: {
                id: { in: toDeleteItems.map((item) => item.id) },
              },
            });

            await Promise.all(
              deletedItems.map((item) => {
                return this.productAuditTrail.create({
                  data: {
                    model,
                    userId: 1,
                    data: null,
                    hash: uuidv4(),
                    modelId: item.id,
                    operation: 'DELETE',
                  },
                });
              }),
            );

            return result;
          },
        },
      },
    });
  }

  withGeneralAuditExtension() {
    return this.$extends({
      name: 'general-audit-trail',
      query: {
        $allModels: {
          create: async ({ model, args, query }) => {
            const result = await query(args);

            await this.auditTrail.create({
              data: {
                model,
                userId: 1,
                hash: uuidv4(),
                modelId: result.id,
                operation: 'CREATE',
                data: JSON.stringify(args.data),
              },
            });

            return result;
          },
          createMany: async ({ model, args, query }) => {
            // Run the query
            const result = await query(args);

            await createManyAuditTrail(args.data, model, this.auditTrail);

            return result;
          },
          createManyAndReturn: async ({ model, args, query }) => {
            const result = await query(args);

            await Promise.all(
              result.map((item) => {
                return this.auditTrail.create({
                  data: {
                    model,
                    userId: 1,
                    hash: uuidv4(),
                    modelId: item.id,
                    operation: 'CREATE',
                    data: JSON.stringify(item),
                  },
                });
              }),
            );

            return result;
          },
          update: async ({ model, args, query }) => {
            const result = await query(args);

            await this.auditTrail.create({
              data: {
                model,
                userId: 1,
                hash: uuidv4(),
                modelId: result.id,
                operation: 'UPDATE',
                data: JSON.stringify(args.data),
              },
            });

            return result;
          },
          updateMany: async ({ model, args, query }) => {
            const toUpdateItems = await this[model].findMany({
              where: args.where,
            });

            const result = await query(args);

            const updatedItems = await this[model].findMany({
              where: {
                id: { in: toUpdateItems.map((item) => item.id) },
              },
            });

            await Promise.all(
              updatedItems.map((item) => {
                return this.auditTrail.create({
                  data: {
                    model,
                    userId: 1,
                    hash: uuidv4(),
                    modelId: item.id,
                    operation: 'UPDATE',
                    data: JSON.stringify(item),
                  },
                });
              }),
            );

            return result;
          },
          delete: async ({ model, args, query }) => {
            const result = await query(args);

            await this.auditTrail.create({
              data: {
                model,
                userId: 1,
                data: null,
                hash: uuidv4(),
                modelId: result.id,
                operation: 'DELETE',
              },
            });

            return result;
          },
          deleteMany: async ({ model, args, query }) => {
            const toDeleteItems = await this[model].findMany({
              where: args.where,
            });

            const result = await query(args);

            const deletedItems = await this[model].findMany({
              where: {
                id: { in: toDeleteItems.map((item) => item.id) },
              },
            });

            await Promise.all(
              deletedItems.map((item) => {
                return this.productAuditTrail.create({
                  data: {
                    model,
                    userId: 1,
                    data: null,
                    hash: uuidv4(),
                    modelId: item.id,
                    operation: 'DELETE',
                  },
                });
              }),
            );

            return result;
          },
        },
      },
    });
  }
}

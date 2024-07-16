import { v4 as uuidv4 } from 'uuid';

function createAuditTrail(
  model: string,
  modelId: number,
  data: any,
  service: any,
) {
  return service.create({
    data: {
      model,
      modelId,
      userId: 1,
      hash: uuidv4(),
      operation: 'CREATE',
      data: JSON.stringify(data),
    },
  });
}

export function createManyAuditTrail(data: any, model: string, service: any) {
  if (Array.isArray(data)) {
    return Promise.all(
      data.map((item) => createAuditTrail(model, item.id, item, service)),
    );
  }

  return createAuditTrail(model, data.id, data, service);
}

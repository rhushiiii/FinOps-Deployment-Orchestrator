// backend/src/utils/mockData.ts
import { faker } from '@faker-js/faker'
import { LogEntry } from './types.js'

export function generateMockLogs(service: string, count: number = 50): LogEntry[] {
  const logs: LogEntry[] = []
  const now = Date.now()
  
  for (let i = 0; i < count; i++) {
    const isError = Math.random() > 0.7
    
    logs.push({
      timestamp: new Date(now - (i * 60000)).toISOString(),
      level: isError ? 'ERROR' : (Math.random() > 0.5 ? 'WARN' : 'INFO'),
      service,
      message: isError 
        ? `NullPointerException in ${service}.java:${faker.number.int({min: 100, max: 500})}`
        : faker.lorem.sentence(),
      stackTrace: isError ? generateStackTrace(service) : undefined,
      userId: faker.string.uuid(),
      requestId: faker.string.alphanumeric(16)
    })
  }
  
  return logs.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

function generateStackTrace(service: string): string {
  const lines = [
    `at com.company.${service}.Controller.process(Controller.java:127)`,
    `at com.company.${service}.Service.validate(Service.java:45)`,
    `at com.company.core.ValidationEngine.check(ValidationEngine.java:89)`,
    `at com.company.core.BaseService.execute(BaseService.java:234)`,
    `at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)`
  ]
  
  return lines.slice(0, faker.number.int({ min: 3, max: 5 })).join('\n    ')
}

export function generateIncidentLogs(service: string = 'payment-service'): LogEntry[] {
  const baseTime = Date.now()
  
  return [
    {
      timestamp: new Date(baseTime - 300000).toISOString(),
      level: 'INFO',
      service,
      message: 'Deployment v2.3.1 started',
      requestId: faker.string.alphanumeric(16)
    },
    {
      timestamp: new Date(baseTime - 240000).toISOString(),
      level: 'INFO',
      service,
      message: 'Deployment v2.3.1 completed successfully',
      requestId: faker.string.alphanumeric(16)
    },
    {
      timestamp: new Date(baseTime - 120000).toISOString(),
      level: 'ERROR',
      service,
      message: 'NullPointerException in PaymentController.java:127',
      stackTrace: generateStackTrace(service),
      userId: faker.string.uuid(),
      requestId: faker.string.alphanumeric(16)
    },
    {
      timestamp: new Date(baseTime - 90000).toISOString(),
      level: 'ERROR',
      service,
      message: 'NullPointerException in PaymentController.java:127',
      stackTrace: generateStackTrace(service),
      userId: faker.string.uuid(),
      requestId: faker.string.alphanumeric(16)
    },
    {
      timestamp: new Date(baseTime - 60000).toISOString(),
      level: 'ERROR',
      service,
      message: 'NullPointerException in PaymentController.java:127',
      stackTrace: generateStackTrace(service),
      userId: faker.string.uuid(),
      requestId: faker.string.alphanumeric(16)
    },
    {
      timestamp: new Date(baseTime).toISOString(),
      level: 'ERROR',
      service,
      message: 'NullPointerException in PaymentController.java:127',
      stackTrace: generateStackTrace(service),
      userId: faker.string.uuid(),
      requestId: faker.string.alphanumeric(16)
    }
  ]
}

export function generateRealisticLogs(service: string): LogEntry[] {
  const incident = generateIncidentLogs(service)
  const background = generateMockLogs(service, 20)
  
  return [...incident, ...background].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}
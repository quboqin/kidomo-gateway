import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigService } from './services/config/config.service'
import * as bodyParser from 'body-parser'
import { LoggingMiddleware } from './services/logger.middleware'
import { LoggingInterceptor } from './services/logger.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('users')
    .addTag('tasks')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  // Apply body-parser middleware with specific options
  app.use(bodyParser.json({ limit: '50mb' })) // Adjust options as needed
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

  // Create an instance of the middleware
  const loggingMiddleware = new LoggingMiddleware()
  app.use(loggingMiddleware.use.bind(loggingMiddleware))

  app.useGlobalInterceptors(new LoggingInterceptor())

  await app.listen(new ConfigService().get('port'))
}
bootstrap()

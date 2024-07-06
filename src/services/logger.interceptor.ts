import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const { method, url } = req

    const now = Date.now()
    return next.handle().pipe(
      tap((data) => {
        const responseTime = Date.now() - now
        // Log the response body and other details here
        this.logger.log(
          `Response: ${method} ${url} - Response Time: ${responseTime}ms - Body: ${JSON.stringify(data)}`
        )
      })
    )
  }
}

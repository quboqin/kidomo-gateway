import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, headers, body } = req
    // Optionally, you can remove sensitive headers or body properties here

    // Log the request details
    this.logger.log(
      `Request: ${method} ${originalUrl} - Headers: ${JSON.stringify(headers)} - Body: ${JSON.stringify(body)}`
    )

    res.on('finish', () => {
      const { statusCode } = res
      // Log the response status code
      this.logger.log(`Response: ${method} ${originalUrl} - Status: ${statusCode}`)
    })

    next()
  }
}

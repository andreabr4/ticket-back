import { Response } from 'express';
import { json } from 'body-parser';
import RequestWithRawBody from './requestWithRawBody.interface';
 
function rawBodyMiddleware() {
  return json({
    verify: (request: RequestWithRawBody, response: Response, buffer: Buffer) => {
      if (request.url === '/order/stripe-event' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  })
}
 
export default rawBodyMiddleware
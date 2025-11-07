import { HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHealth() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Welcome! Use /v1 for API endpoints.',
    };
  }
  headHealth() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Welcome! Use /v1 for API endpoints.',
    };
  }
}

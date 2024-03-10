import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello() {
    try {
      return 'Hello Worldddd!';
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to propagate it further
    }
  }
}

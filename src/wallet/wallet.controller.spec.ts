import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('WalletController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/api/wallet/balance (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/wallet/balance')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2IwOGE5OC0zMDU1LTQ2NDYtOWE0Ny1mYWNmZjQ5Y2FkNmIiLCJpYXQiOjE3NjgzODMzMjIsImV4cCI6MTc2ODM4NjkyMn0.z_jvI5MTt4rg0PvYA2mrCszhEqrLaVKqFqmSi9lfIGQ',
      )
      .expect(200);
  });
});

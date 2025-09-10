import { Test, TestingModule } from '@nestjs/testing';
import { OrderInfoResolver } from './order-info.resolver';

describe('OrderInfoResolver', () => {
  let resolver: OrderInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderInfoResolver],
    }).compile();

    resolver = module.get<OrderInfoResolver>(OrderInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

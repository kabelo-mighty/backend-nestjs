import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { paymentService } from './service/payment.service';
import { PaymentResolver } from './payment.resolver';
import { PaymentController } from './controller/payment.controller';
@Module({
    imports: [TypeOrmModule.forFeature([Payment])],
    providers: [paymentService, PaymentResolver],
    controllers: [PaymentController],
})
export class PaymentModule { }
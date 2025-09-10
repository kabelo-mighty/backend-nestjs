import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Payment } from '../payment.entity';
import { CreatePaymentDto } from '../dto/payment.dto';
import { paymentService } from '../service/payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: paymentService) {}

@Get()
async findAll(): Promise<Payment[]> {
  try {
    const payment = await this.paymentService.findAll();
    if (!payment || payment.length === 0) {
      throw new NotFoundException('No order item found');
    }
    return payment;
  } catch (error) {
    throw new NotFoundException('An error occurred while fetching payments');
  }
}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
    const payment = await this.paymentService.findOne(id);
    if (!payment) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }
    return payment;
  }

@Post()
async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<{ message: string; payment: Payment }> {
  try {
    const payment = await this.paymentService.create(createPaymentDto);
    return { message: 'payment successfully created', payment };
  } catch (error) {
    throw new BadRequestException('An error occurred while adding the payment');
  }
}

}
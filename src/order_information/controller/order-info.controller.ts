import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OrderInfo } from '../order-info.entity';
import { CreateOrderInfoDto } from '../dto/create-order-info-Dto';
import { OrderInfoService } from '../service/order-info.service';

@Controller('order-info')
export class OrderInfoController {
  constructor(private readonly orderInfoService: OrderInfoService) {}

@Get()
async findAll(): Promise<OrderInfo[]> {
  try {
    const orderInfo = await this.orderInfoService.findAll();
    if (!orderInfo || orderInfo.length === 0) {
      throw new NotFoundException('No order info found');
    }
    return orderInfo;
  } catch (error) {
    throw new NotFoundException('An error occurred while fetching order info');
  }
}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderInfo> {
    const orderInfo = await this.orderInfoService.findOne(id);
    if (!orderInfo) {
      throw new NotFoundException(`order info with ID ${id} not found`);
    }
    return orderInfo;
  }
@Delete(':id')
async deleteOrderInfo(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
  try {
    const orderInfo = await this.orderInfoService.findOne(id);
    if (!orderInfo) {
      throw new NotFoundException(`order info with ID ${id} not found`);
    }
    await this.orderInfoService.delete(id);
    return { message: `order info with ID ${id} has been successfully deleted` };
  } catch (error) {
    throw new NotFoundException(`An error occurred while deleting the order info with ID ${id}`);
  }
}

@Post()
async createOrderInfo(@Body() createOrderInfoDto: CreateOrderInfoDto): Promise<{ message: string; orderInfo: OrderInfo }> {
  try {
    const orderInfo = await this.orderInfoService.create(createOrderInfoDto);
    return { message: 'order info successfully created', orderInfo };
  } catch (error) {
    throw new BadRequestException('An error occurred while adding the order info');
  }
}
@Put(':id')
async updateOrderInfo(
  @Param('id', ParseIntPipe) id: number,
  @Body() createOrderInfoDto: Partial<CreateOrderInfoDto>,
): Promise<{ message: string; orderInfo: OrderInfo }> {
  try {
    const existingOrderInfo = await this.orderInfoService.findOne(id);
    if (!existingOrderInfo) {
      throw new NotFoundException(`order info with ID ${id} not found`);
    }
    const updateOrderInfo = await this.orderInfoService.update(id, createOrderInfoDto);
    return { message: `order info with ID ${id} successfully updated`, orderInfo: updateOrderInfo };
  } catch (error) {
    throw new BadRequestException(`An error occurred while updating the order info with ID ${id}`);
  }
}
}
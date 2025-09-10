import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OrderItem } from '../order-item.entity';
import { createOrderItemDto } from '../dto/create-order-item-Dto';
import { orderItemService } from '../service/order-item.service';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: orderItemService) {}

@Get()
async findAll(): Promise<OrderItem[]> {
  try {
    const orderItem = await this.orderItemService.findAll();
    if (!orderItem || orderItem.length === 0) {
      throw new NotFoundException('No order item found');
    }
    return orderItem;
  } catch (error) {
    throw new NotFoundException('An error occurred while fetching order items');
  }
}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemService.findOne(id);
    if (!orderItem) {
      throw new NotFoundException(`order item with ID ${id} not found`);
    }
    return orderItem;
  }
@Delete(':id')
async deleteOrderItem(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
  try {
    const orderItem = await this.orderItemService.findOne(id);
    if (!orderItem) {
      throw new NotFoundException(`order item with ID ${id} not found`);
    }
    await this.orderItemService.delete(id);
    return { message: `order item with ID ${id} has been successfully deleted` };
  } catch (error) {
    throw new NotFoundException(`An error occurred while deleting the order item with ID ${id}`);
  }
}

@Post()
async createOrderItem(@Body() createOrderItemDto: createOrderItemDto): Promise<{ message: string; orderItem: OrderItem }> {
  try {
    const orderItem = await this.orderItemService.create(createOrderItemDto);
    return { message: 'order item successfully created', orderItem };
  } catch (error) {
    throw new BadRequestException('An error occurred while adding the order item');
  }
}
@Put(':id')
async updateOrderItem(
  @Param('id', ParseIntPipe) id: number,
  @Body() createOrderItemDto: Partial<createOrderItemDto>,
): Promise<{ message: string; orderItem: OrderItem }> {
  try {
    const existingOrderitem = await this.orderItemService.findOne(id);
    if (!existingOrderitem) {
      throw new NotFoundException(`order item with ID ${id} not found`);
    }
    const updateOrderItem = await this.orderItemService.update(id, createOrderItemDto);
    return { message: `order item with ID ${id} successfully updated`, orderItem: updateOrderItem };
  } catch (error) {
    throw new BadRequestException(`An error occurred while updating the order item with ID ${id}`);
  }
}
}
import {
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductService } from './product.service';

interface CreateProductDto {
  name: string;
  price: number;
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put('verify/all')
  verifyAll() {
    return this.productService.verifyAll();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}

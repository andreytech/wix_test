import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post('send_to_wix')
  async sendProductsToWix(@Body('ids') ids: number[]) {
    const productsData = this.productsService.getProductsByIds(ids);
    return this.productsService.sendProductsToWix(productsData);
  }
}
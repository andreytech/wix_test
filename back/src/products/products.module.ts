import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      title: 'Wireless Mouse',
      picture: 'https://via.placeholder.com/150',
      price: 29.99,
      category: 'Electronics',
      inventory: 100,
      description: 'A high-precision wireless mouse with ergonomic design.',
      sku: 'ELEC-001',
    },
    {
      id: 2,
      title: 'Bluetooth Headphones',
      picture: 'https://via.placeholder.com/150',
      price: 49.99,
      category: 'Electronics',
      inventory: 50,
      description: 'Noise-cancelling over-ear Bluetooth headphones with long battery life.',
      sku: 'ELEC-002',
    },
    {
      id: 3,
      title: 'Stainless Steel Water Bottle',
      picture: 'https://via.placeholder.com/150',
      price: 19.99,
      category: 'Home & Kitchen',
      inventory: 200,
      description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours.',
      sku: 'HOME-001',
    },
    {
      id: 4,
      title: 'Yoga Mat',
      picture: 'https://via.placeholder.com/150',
      price: 99.99,
      category: 'Sports & Outdoors',
      inventory: 10,
      description: 'Eco-friendly non-slip yoga mat with extra cushioning for comfort.',
      sku: 'SPORT-001',
    },
    {
      id: 5,
      title: 'LED Desk Lamp',
      picture: 'https://via.placeholder.com/150',
      price: 9.99,
      category: 'Office Supplies',
      inventory: 500,
      description: 'Adjustable LED desk lamp with touch control and multiple brightness levels.',
      sku: 'OFFICE-001',
    },
    {
      id: 6,
      title: 'Smartphone Stand',
      picture: 'https://via.placeholder.com/150',
      price: 14.99,
      category: 'Accessories',
      inventory: 150,
      description: 'Adjustable smartphone stand with anti-slip base.',
      sku: 'ACC-001',
    },
    {
      id: 7,
      title: 'Portable Charger',
      picture: 'https://via.placeholder.com/150',
      price: 39.99,
      category: 'Electronics',
      inventory: 75,
      description: 'High-capacity portable charger with fast charging capability.',
      sku: 'ELEC-003',
    },
    {
      id: 8,
      title: 'Electric Kettle',
      picture: 'https://via.placeholder.com/150',
      price: 24.99,
      category: 'Home & Kitchen',
      inventory: 120,
      description: 'Stainless steel electric kettle with auto shut-off feature.',
      sku: 'HOME-002',
    },
    {
      id: 9,
      title: 'Running Shoes',
      picture: 'https://via.placeholder.com/150',
      price: 59.99,
      category: 'Sports & Outdoors',
      inventory: 80,
      description: 'Lightweight running shoes with breathable mesh upper.',
      sku: 'SPORT-002',
    },
    {
      id: 10,
      title: 'Wireless Keyboard',
      picture: 'https://via.placeholder.com/150',
      price: 49.99,
      category: 'Electronics',
      inventory: 60,
      description: 'Compact wireless keyboard with long battery life.',
      sku: 'ELEC-004',
    },
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getProducts() {
    return this.products;
  }

  getProductsByIds(ids: number[]) {
    return this.products.filter(product => ids.includes(product.id));
  }

  async sendProductsToWix(productsData: any[]) {
    const wixClient = createClient({
      modules: { products },
      auth: ApiKeyStrategy({
        siteId: this.configService.get<string>('WIX_SITE_ID'),
        apiKey: this.configService.get<string>('WIX_API_KEY'),
      }),
    });

    for (const product of productsData) {
      const productPayload = {
        name: product.title,
        priceData: { price: product.price },
        description: product.description,
        sku: product.sku,
        productType: products.ProductType.physical, // Use the enum value
      };
      const response = await wixClient.products.createProduct(productPayload);
      console.log(response);
    }
  }
}
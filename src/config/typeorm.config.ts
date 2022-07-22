import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
      migrations: ['src/../migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: 'scr/../migrations',
      },
      extra: {
        charset: 'utf8mb4_uncode_ci',
      },
      synchronize: false,
      logging: true,
    };
  },
};
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +(<string>process.env.POSTGRES_PORT) || 4666,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['../**/**/*.entities{.ts,.js}'],
  migrations: ['src/../migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'scr/../migrations',
  },
  extra: {
    charset: 'utf8mb4_uncode_ci',
  },
  synchronize: true,
  logging: true,
};

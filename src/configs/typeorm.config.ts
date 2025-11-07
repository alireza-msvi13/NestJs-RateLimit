import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from 'src/common/enum/environment.enum';

export function TypeOrmConfig(): TypeOrmModuleOptions {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;
  return {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT ? +DB_PORT : 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    autoLoadEntities: process.env.NODE_ENV === Environment.Development,
    synchronize: process.env.NODE_ENV === Environment.Development,
    ssl: process.env.NODE_ENV === Environment.Production,
    entities: [
      'dist/**/**/**/*.entity{.ts,.js}',
      'dist/**/**/*.entity{.ts,.js}',
    ],
  };
}

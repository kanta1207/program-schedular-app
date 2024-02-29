import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * This is the configuration for the database connection.
 * It is used in the `TypeOrmModule.forRoot` method in the `app.module.ts` file.
 * Created based on @see {@link https://thriveread.com/typeorm-nestjs-migrations/}
 */
export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

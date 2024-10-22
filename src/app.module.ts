import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats/cats.controller';
import { BreedsController } from './breeds/breeds.controller';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '',
      username: '',
      entities: [User],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UserModule,
  ],
  controllers: [AppController, CatsController, BreedsController],
  providers: [AppService],
})
export class AppModule {}

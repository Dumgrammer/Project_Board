import { Module } from '@nestjs/common';
import  { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './users/users.module.js'
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/project_board'),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

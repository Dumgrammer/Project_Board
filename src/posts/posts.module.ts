import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { Post, PostSchema } from '../schemas/Post.schema.js';
import { User, UserSchema } from '../schemas/User.schema.js';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Post.name,
                schema: PostSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ],
    providers: [PostsService],
    controllers: [PostsController]
})





export class PostModule { }
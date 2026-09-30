import { Controller, Post, Body } from "@nestjs/common";
import { CreatePostDto } from './dto/Post.dto.js';
import { PostsService } from './posts.service.js';

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) { }

    @Post()
    createPost(@Body() createPostDto: CreatePostDto) { 
        console.log(createPostDto)
        return this.postsService.createPost(createPostDto);
    }

}
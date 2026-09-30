import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(180)
    title: string;

    @IsNotEmpty()
    @IsString()
    contents: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
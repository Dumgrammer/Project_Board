import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsString()
    middlename?: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    profilePic?: string;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsOptional()
    middlename?: string;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsString()
    @IsOptional()
    password: string

    @IsString()
    @IsOptional()
    profilePic?: string;
}
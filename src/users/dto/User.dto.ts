import { IsNotEmpty, IsString, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import  { Type } from 'class-transformer';

export class CreateUserSettingsDto {
    @IsOptional()
    @IsBoolean()
    receivedNotifications?: boolean;

    @IsOptional()
    @IsBoolean()
    receivedSms?: boolean;

    @IsOptional()
    @IsBoolean()
    receivedEmail?: boolean;
}

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

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto)
    settings?: CreateUserSettingsDto;

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
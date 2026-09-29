import { Controller, Body, Param, Post, Get, Patch, Delete, HttpException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { RegisterUserDto, UpdateUserDto } from './dto/User.dto.js'
import mongoose from 'mongoose'


//Service Layer Interaction
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    registerUser(@Body() registerUserDto: RegisterUserDto) {
        console.log(registerUserDto)
        return this.usersService.registerUser(registerUserDto);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {

        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) throw new HttpException("Invalid Credentials", 400)

        const findUser = await this.usersService.getUserById(id);
        if (!findUser) throw new HttpException("User not found", 404);
        return findUser;
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

        console.log(updateUserDto)

        const isValid = mongoose.Types.ObjectId.isValid(id);

        if(!isValid) throw new HttpException("Invalid Credentials", 400);

        const updatedUser = this.usersService.updateUser(id, updateUserDto);

        return updatedUser;
    }
}
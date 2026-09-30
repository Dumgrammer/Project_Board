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
        return this.usersService.getUsers().populate(['settings', 'posts']);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {

        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) throw new HttpException("Invalid Credentials", 400)

        const findUser = await this.usersService.getUserById(id).populate('settings');
        if (!findUser) throw new HttpException("User not found", 404);
        return findUser;
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) throw new HttpException("Invalid Credentials", 400);

        const updatedUser = await this.usersService.updateUser(id, updateUserDto);

        if (!updatedUser) throw new HttpException('User not found', 404);

        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {

        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) throw new HttpException("Invalid Credentials", 400);

        const deletedUser = await this.usersService.deleteUser(id);

        if (!deletedUser) throw new HttpException('User not found', 404);

        return;
    }
}
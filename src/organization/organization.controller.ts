import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import mongoose from 'mongoose';
  
  import {
    CreateOrganizationDto,
    OrganizationMemberDto,
    UpdateOrganizationDto,
  } from './dto/Organization.dto.js';
  import { OrganizationService } from './organization.service.js';
  
  @Controller('organization')
  export class OrganizationController {
    constructor(private organizationService: OrganizationService) {}
  
    private ensureValidObjectId(id: string) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id format');
      }
    }
  
    @Post()
    createOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
      return this.organizationService.createOrganization(createOrganizationDto);
    }
  
    @Get()
    getOrganizations() {
      return this.organizationService.getOrganizations();
    }
  
    @Get(':id')
    async getOrganizatonById(@Param('id') id: string) {
      this.ensureValidObjectId(id);
  
      const findOrganization = await this.organizationService.getOrganizationById(id);
      if (!findOrganization) throw new HttpException('Organization not found', 404);
  
      return findOrganization;
    }
  
    @Patch(':id')
    async updateOrganization(
      @Param('id') id: string,
      @Body() updateOrganizationDto: UpdateOrganizationDto,
    ) {
      this.ensureValidObjectId(id);
  
      const updatedOrganization = await this.organizationService.updateOrganization(
        id,
        updateOrganizationDto,
      );
  
      if (!updatedOrganization) throw new HttpException('Organization not found', 404);
      return updatedOrganization;
    }
  
    @Patch(':id/members/add')
    addOrganizationMember(
      @Param('id') id: string,
      @Body() body: OrganizationMemberDto,
    ) {
      this.ensureValidObjectId(id);
      this.ensureValidObjectId(body.memberId);
  
      return this.organizationService.addOrganizationMember(id, body.memberId);
    }
  
    @Patch(':id/members/remove')
    removeOrganizationMember(
      @Param('id') id: string,
      @Body() body: OrganizationMemberDto,
    ) {
      this.ensureValidObjectId(id);
      this.ensureValidObjectId(body.memberId);
  
      return this.organizationService.removeOrganizationMember(id, body.memberId);
    }
  
    @Delete(':id')
    async deleteOrganization(@Param('id') id: string) {
      this.ensureValidObjectId(id);
  
      const deletedOrganization = await this.organizationService.deleteOrganization(id);
      if (!deletedOrganization) throw new HttpException('Organization not found', 404);
  
      return { message: 'Organization deleted successfully' };
    }
  }
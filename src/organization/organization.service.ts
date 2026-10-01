import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Organization } from '../schemas/Organization.schema.js';
import { User } from '../schemas/User.schema.js';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './dto/Organization.dto.js';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    const owner = await this.userModel.findById(createOrganizationDto.ownerId);
    if (!owner) throw new NotFoundException('Owner user not found');

    const members = Array.from(
      new Set([
        createOrganizationDto.ownerId,
        ...(createOrganizationDto.members ?? []),
      ]),
    );

    const newOrganization = new this.organizationModel({
      name: createOrganizationDto.name,
      ownerId: createOrganizationDto.ownerId,
      members,
    });

    return newOrganization.save();
  }

  getOrganizations() {
    return this.organizationModel
      .find()
      .populate('ownerId', 'firstname lastname email')
      .populate('members', 'firstname lastname email');
  }

  getOrganizationById(id: string) {
    return this.organizationModel
      .findById(id)
      .populate('ownerId', 'firstname lastname email')
      .populate('members', 'firstname lastname email');
  }

  updateOrganization(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    if (Object.keys(updateOrganizationDto).length === 0) {
      throw new BadRequestException('No fields provided for update');
    }

    return this.organizationModel.findByIdAndUpdate(
      id,
      { $set: updateOrganizationDto },
      { new: true, runValidators: true },
    );
  }

  async addOrganizationMember(id: string, memberId: string) {
    const memberToAdd = await this.userModel.findById(memberId);
    if (!memberToAdd) throw new NotFoundException('User not found');

    const updatedOrganization = await this.organizationModel
      .findByIdAndUpdate(
        id,
        { $addToSet: { members: memberId } },
        { new: true, runValidators: true },
      )
      .populate('ownerId', 'firstname lastname email')
      .populate('members', 'firstname lastname email');

    if (!updatedOrganization) {
      throw new NotFoundException('Organization not found');
    }

    return updatedOrganization;
  }

  async removeOrganizationMember(id: string, memberId: string) {
    const organization = await this.organizationModel.findById(id);
    if (!organization) throw new NotFoundException('Organization not found');

    if (organization.ownerId?.toString() === memberId) {
      throw new BadRequestException('Owner cannot be removed from members');
    }

    return this.organizationModel
      .findByIdAndUpdate(
        id,
        { $pull: { members: memberId } },
        { new: true, runValidators: true },
      )
      .populate('ownerId', 'firstname lastname email')
      .populate('members', 'firstname lastname email');
  }

  deleteOrganization(id: string) {
    return this.organizationModel.findByIdAndDelete(id);
  }
}

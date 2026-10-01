import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  name: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  members: string[];

  @IsMongoId()
  @IsNotEmpty()
  ownerId: string;
}

export class UpdateOrganizationDto {
  @IsString()
  @MaxLength(180)
  @IsOptional()
  name?: string;
}

export class OrganizationMemberDto {
  @IsMongoId()
  memberId: string;
}

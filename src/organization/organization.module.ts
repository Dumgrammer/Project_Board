import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { Organization, OrganizationSchema } from "../schemas/Organization.schema.js";
import { User, UserSchema } from "../schemas/User.schema.js";

import { OrganizationService } from "./organization.service.js";
import { OrganizationController } from "./organization.controller.js"

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Organization.name, 
            schema: OrganizationSchema
        }, {
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers: [OrganizationService],
    controllers: [OrganizationController]
})


export class OrganizationModule { }




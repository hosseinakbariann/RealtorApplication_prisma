import {SetMetadata} from '@nestjs/common'
import { UserType } from '../../enums/userType';

export const Roles = (...roles: UserType[])=> SetMetadata('roles',roles);
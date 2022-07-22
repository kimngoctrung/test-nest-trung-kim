import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  Mapper,
  MappingConfiguration,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Userentities } from './user/Models/post.entity';
import { UserResponse } from './user/Models/post.interface';
import { BithAndName } from './user/Models/bith-name.interface';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Userentities, UserResponse);
    };
  }

  //   mapping(user: Userentities) {
  //     return this.mapper.map(user, Userentities, UserResponse);
  //   }
}

import { ApiProperty } from '@nestjs/swagger';
import { MyRole } from 'src/role/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('user_post')
export class Userentities {
  @PrimaryGeneratedColumn()
  @AutoMap()
  @Generated('uuid')
  uuid: string;
  @Column()
  @ApiProperty()
  @AutoMap()
  name: string;
  @Column()
  @ApiProperty()
  @AutoMap()
  userName: string;
  @Column()
  @ApiProperty()
  @AutoMap()
  emailUser: string;
  @Column()
  @ApiProperty()
  @AutoMap()
  bthday: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: MyRole,
    default: MyRole.User,
  })
  @AutoMap()
  role: MyRole;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  @Column({
    default: true,
  })
  isActive: boolean;
}

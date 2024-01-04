import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '@app/entities';

@Module({
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagModule { }

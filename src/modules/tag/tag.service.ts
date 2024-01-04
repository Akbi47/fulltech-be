import { Injectable } from '@nestjs/common';
import { TagDTO } from './dto';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '@app/entities';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) { }
  async findAll(): Promise<TagDTO[] | null> {
    return await this.tagRepository.find();
  }
}

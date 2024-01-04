import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { TagDTO } from './dto';

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }
  @Get('fetch')
  async findAll(): Promise<TagDTO[] | null> {
    return await this.tagService.findAll();
  }
}

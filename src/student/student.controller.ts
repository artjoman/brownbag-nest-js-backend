import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query, CacheKey, CacheTTL,
} from '@nestjs/common';
import { Request } from 'express';

import StudentService from './student.service';
import CreateStudentDto from './dto/createStudent.dto';
import { PaginationParams } from 'src/utils/paginationParams';
import FindOneParams from 'src/utils/findOneParams';

@Controller('students')
@UseInterceptors(ClassSerializerInterceptor)
export default class StudentController {
  constructor(
    private readonly studentService: StudentService
  ) { }

  @Get()
  async getStudents(
    @Query('search') search: string,
    @Query() { offset, limit, startId }: PaginationParams
  ) {
    if (search) {
      return this.studentService.searchForStudents(search, offset, limit, startId);
    }
    return this.studentService.getAllStudents(offset, limit, startId);
  }

  @Get(':id')
  getStudentById(@Param() { id }: FindOneParams) {
    return this.studentService.getStudentById(Number(id));
  }

  @Post()
  async createStudent(@Body() student: CreateStudentDto, @Req() req: Request) {
    return this.studentService.createStudent(student);
  }
}

import { Injectable } from '@nestjs/common';
import CreateStudentDto from './dto/createStudent.dto';
import Student from './student.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoreThan, FindManyOptions } from 'typeorm';


@Injectable()
export default class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) { }


  async getAllStudents(offset?: number, limit?: number, startId?: number) {
    const where: FindManyOptions<Student>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.studentRepository.count();
    }

    const [items, count] = await this.studentRepository.findAndCount({
      where,
      order: {
        id: 'ASC'
      },
      skip: offset,
      take: limit
    });

    return {
      items,
      count: startId ? separateCount : count
    }
  }

  async getStudentById(id: number) {
    const student = await this.studentRepository.findOne(id);
    if (student) {
      return student;
    }
    throw new Error("Student not found");
  }

  async createStudent(student: CreateStudentDto) {
    const newStudent = await this.studentRepository.create({
      ...student
    });
    await this.studentRepository.save(newStudent);

    return newStudent;
  }


  async searchForStudents(text: string, offset?: number, limit?: number, startId?: number) {
    const items = await this.studentRepository
      .find();
    return {
      items
    }
  }
}

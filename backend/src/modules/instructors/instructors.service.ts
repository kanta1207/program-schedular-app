import { Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from 'src/entity/instructors.entity';
import { In, Repository } from 'typeorm';
import { CoursesInstructors } from 'src/entity/coursesInstructors.entity';
import { MasterContractType } from 'src/entity/masterContractTypes.entity';
import { MasterWeekdaysRange } from 'src/entity/masterWeekdaysRanges.entity';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
    @InjectRepository(CoursesInstructors)
    private readonly coursesInstructorsRepository: Repository<CoursesInstructors>,
    @InjectRepository(MasterContractType)
    private readonly masterContractTypeRepository: Repository<MasterContractType>,
    @InjectRepository(MasterWeekdaysRange)
    private readonly masterWeekdaysRangeRepository: Repository<MasterWeekdaysRange>,
  ) {}

  async create(createInstructorDto: CreateInstructorDto) {
    const { contractTypeId, weekdaysRangeId, ...dtoProps } =
      createInstructorDto;
    const contractType = await this.masterContractTypeRepository.findOne({
      where: { id: contractTypeId },
    });
    const weekdaysRange = await this.masterWeekdaysRangeRepository.findOne({
      where: { id: weekdaysRangeId },
    });
    const instructor = this.instructorRepository.create({
      ...dtoProps,
      contractType,
      weekdaysRange,
    });
    return await this.instructorRepository.save(instructor);
  }

  async findAll(rangeId: number | undefined, courseId: number | undefined) {
    let instructorIds = [];

    // If courseId is provided, get all instructorsId for that course and add them to instructorIds
    if (courseId) {
      const coursesInstructors = await this.coursesInstructorsRepository.find({
        where: {
          course: { id: courseId },
        },
        relations: { instructor: true },
      });

      instructorIds = coursesInstructors.map((ci) => ci.instructor.id);
    }

    return this.instructorRepository.find({
      where: {
        id: instructorIds.length > 0 ? In(instructorIds) : undefined,
        weekdaysRange: rangeId ? { id: rangeId } : undefined,
      },
      relations: {
        contractType: true,
        weekdaysRange: true,
        periodOfDays: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.instructorRepository.findOne({
      where: {
        id,
      },
      relations: {
        contractType: true,
        weekdaysRange: true,
        periodOfDays: true,
        courses: {
          course: true,
        },
      },
    });
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructor`;
  }
}

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {

  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CreateStudentDto;
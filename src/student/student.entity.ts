import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Student {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public name: string;
 
  @Column()
  public description: string;
}
 
export default Student;
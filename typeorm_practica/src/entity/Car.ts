import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  manufacturer: string;

  @Column("text")
  description: string;

  @Column({ type: "varchar", length: 20 })
  color: string;

  @Column({ type: "int" })
  year: number;

  @Column()
  isSold: boolean;
}

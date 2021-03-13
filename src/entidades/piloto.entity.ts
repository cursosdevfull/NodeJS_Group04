import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'piloto' })
export class Piloto {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50 })
	nombre: string;

	@Column({ type: 'boolean', default: true })
	activo: boolean;
}

import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './rol.entity';

@Entity({ name: 'usuario' })
export class Usuario {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50 })
	nombre: string;

	@Column({ type: 'varchar', length: 50 })
	correo: string;

	@Column({ type: 'varchar', length: 200 })
	password: string;

	@Column({ type: 'varchar', length: 100 })
	refreshToken: string;

	@Column({ type: 'boolean', default: true })
	activo: boolean;

	@ManyToMany(type => Rol, rol => rol.usuarios)
	@JoinTable()
	roles: Rol[];

	@Column({ type: 'varchar', length: 100 })
	foto: string;
}

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({ name: 'rol' })
export class Rol {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20 })
	rol: string;

	@Column({ type: 'boolean', default: true })
	activo: boolean;

	@ManyToMany(type => Usuario, usuario => usuario.roles)
	usuarios: Usuario[];
}

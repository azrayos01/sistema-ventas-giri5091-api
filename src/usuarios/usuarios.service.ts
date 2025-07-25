import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService) {}

    listar() {
        return this.prisma.usuario.findMany({
            select: {
                cveUsuario: true,
                nombre: true,
                apellidos: true,
                username: true,
                fechaRegistro: true,
                password: false
            }
        });
    }

    crear(usuario: CreateUsuarioDto) {
        return this.prisma.usuario.create({ data: usuario,
                select: {
                cveUsuario: true,
                nombre: true,
                apellidos: true,
                username: true,
                fechaRegistro: true,
                password: false
            }
         });
    }

    actualizar() {
        return 'Actualizando Usuarios';
    }

    async eliminar(cveUsuario: number) {
        return await this.prisma.usuario.delete({
        where:{
            cveUsuario: cveUsuario
        },
        select: {
            cveUsuario: true,
            nombre: true,
            apellidos: true,
            username: true,
            fechaRegistro: true,
            password: false
            }
        });
    }
}

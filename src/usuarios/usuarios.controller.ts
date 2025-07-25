import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';

@Controller('usuarios')
@UseGuards(AuthGuard)
//@UsePipes(new ValidationPipe())
export class UsuariosController {

    constructor(private usuarioSvc: UsuariosService,
                private utilSvc: UtilsService){ }

    @Get()
    listarUsuarios() {
        return this.usuarioSvc.listar();
    }

    @Get("clave")
    getUsuarioById(clave: number){
        return `Usuario: ${ clave }`;
    }

    @Post()
    async crear(@Body() usuario: CreateUsuarioDto) {

        // Encriptar contraseña
        var encrypted = await this.utilSvc.hashPassword(usuario.password);
        usuario.password = encrypted;

        return this.usuarioSvc.crear(usuario);
    }

    @Put()
    actualizar() {
        return this.usuarioSvc.actualizar();
    }

    @Delete(':cveUsuario')
    eliminar(@Param('cveUsuario', ParseIntPipe) cveUsuario: number) {
        return this.usuarioSvc.eliminar(cveUsuario);
    }
}

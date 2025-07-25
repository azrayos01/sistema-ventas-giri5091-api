import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { AuthDto } from 'src/shared/dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authSvc: AuthService,
                private utilSvc: UtilsService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async iniciarSesion(@Body() data: AuthDto) {

        // Obtener el username y password de la variable "data"
        const { username, password } = data;

        // Verificar si el usuario existe
        const usuario = await this.authSvc.obtenerUsuario(username);
        console.log(username)

        // En caso de que el usuario no exista devolver un mensaje NotAuthorized
        if(!usuario) {
            throw new UnauthorizedException('El usuario y/o contraseña es incorrecto');
        }

        // Si el usuario existe verificar la contraseña
        if (await this.utilSvc.checkPassword(password, usuario.password)) {
            // TODO: Si la contraseña es correcta generar un JWT
            const { password, fechaRegistro, ...payload } = usuario;
            const jwt = await this.utilSvc.generateJWT(payload);

            return { token : jwt };
        } else {
            // En caso contrario devolver un NotAuthorized
            throw new UnauthorizedException('El usuario y/o contraseña es incorrecto');
        }

        

        
    }
}

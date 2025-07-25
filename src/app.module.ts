import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TareasModule } from './tareas/tareas.module';
import { UtilsService } from './shared/services/utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ UsuariosModule, TareasModule, AuthModule],
  controllers: [],
  providers: [JwtService, UtilsService],
})
export class AppModule {}

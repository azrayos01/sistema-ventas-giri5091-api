import { Module } from "@nestjs/common";
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UtilsService } from "src/shared/services/utils/utils.service";

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, JwtService, UtilsService]
})
export class UsuariosModule { }
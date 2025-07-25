import { IsEmail, IsNotEmpty, IsString, MaxLength, maxLength, Min, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    @MinLength(3)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    apellidos: string;
    @IsEmail()
    correo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    password: string;
}
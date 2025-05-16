import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

    return this.prisma.usuario.create({
      data: {
        usuario: createUsuarioDto.usuario,
        password: hashedPassword,
        nombre: createUsuarioDto.nombre,
      },
    });
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        usuario: loginUsuarioDto.usuario,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUsuarioDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Retornamos el usuario sin la contraseña
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findAll() {
    const usuarios = await this.prisma.usuario.findMany();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return usuarios.map(({ password, ...rest }) => rest);
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (usuario) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async remove(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}

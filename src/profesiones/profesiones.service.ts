import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfesionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfesionDto: CreateProfesionDto) {
    const { nombre, codigo } = createProfesionDto;

    const profesionCreada = await this.prisma.profesion.create({
      data: {
        nombre: nombre.trim().toUpperCase(),
        codigo: codigo.trim().toUpperCase(),
      },
    });

    return profesionCreada;
  }

  async findAll() {
    return await this.prisma.profesion.findMany();
  }

  async findOneByCodigo(codigo: string) {
    const profesion = await this.prisma.profesion.findUnique({
      where: {
        codigo,
      },
    });

    if (!profesion)
      throw new NotFoundException(
        `La profesión con el código ${codigo} no existe`,
      );

    return profesion;
  }

  async update(id: number, updateProfesionDto: UpdateProfesionDto) {
    const { nombre, codigo } = updateProfesionDto;

    const profesion = await this.prisma.profesion.findUnique({
      where: { id },
    });

    if (!profesion)
      throw new NotFoundException(`La profesión con el id ${id} no existe`);

    return await this.prisma.profesion.update({
      where: { id },
      data: {
        nombre: nombre?.trim().toUpperCase(),
        codigo: codigo?.trim().toUpperCase(),
      },
    });
  }

  async remove(id: number) {
    const profesion = await this.prisma.profesion.findUnique({
      where: {
        id,
      },
    });

    if (!profesion)
      throw new NotFoundException(`La profesión con el id ${id} no existe`);

    return await this.prisma.profesion.delete({
      where: {
        id,
      },
    });
  }
}

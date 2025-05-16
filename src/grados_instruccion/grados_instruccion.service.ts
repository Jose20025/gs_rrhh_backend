import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGradosInstruccionDto } from './dto/create-grados_instruccion.dto';
import { UpdateGradosInstruccionDto } from './dto/update-grados_instruccion.dto';

@Injectable()
export class GradosInstruccionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGradosInstruccionDto: CreateGradosInstruccionDto) {
    const { nombre, codigo } = createGradosInstruccionDto;

    return await this.prisma.gradoInstruccion.create({
      data: {
        nombre: nombre.trim().toUpperCase(),
        codigo: codigo.trim().toUpperCase(),
      },
    });
  }

  async findAll() {
    return await this.prisma.gradoInstruccion.findMany();
  }

  async findOneByCodigo(codigo: string) {
    const gradoInstruccion = await this.prisma.gradoInstruccion.findUnique({
      where: {
        codigo,
      },
    });

    if (!gradoInstruccion) {
      throw new NotFoundException(
        `El grado de instrucción con el código ${codigo} no existe`,
      );
    }

    return gradoInstruccion;
  }

  async update(
    id: number,
    updateGradosInstruccionDto: UpdateGradosInstruccionDto,
  ) {
    const { nombre, codigo } = updateGradosInstruccionDto;

    const gradoInstruccion = await this.prisma.gradoInstruccion.findUnique({
      where: { id },
    });

    if (!gradoInstruccion) {
      throw new NotFoundException(
        `El grado de instrucción con el id ${id} no existe`,
      );
    }

    return await this.prisma.gradoInstruccion.update({
      where: { id },
      data: {
        nombre: nombre?.trim().toUpperCase(),
        codigo: codigo?.trim().toUpperCase(),
      },
    });
  }

  async remove(id: number) {
    const gradoInstruccion = await this.prisma.gradoInstruccion.findUnique({
      where: {
        id,
      },
    });

    if (!gradoInstruccion) {
      throw new NotFoundException(
        `El grado de instrucción con el id ${id} no existe`,
      );
    }

    return await this.prisma.gradoInstruccion.delete({
      where: {
        id,
      },
    });
  }
}

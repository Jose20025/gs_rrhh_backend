import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartamentosService {
  constructor(private prisma: PrismaService) {}

  create(createDepartamentoDto: CreateDepartamentoDto) {
    const { nombre, codigo } = createDepartamentoDto;

    return this.prisma.departamento.create({
      data: {
        nombre: nombre.trim().toUpperCase(),
        codigo: codigo.trim().toUpperCase(),
      },
    });
  }

  async findAll() {
    const departamentos = await this.prisma.departamento.findMany();

    return departamentos;
  }

  async findOneByCodigo(codigo: string) {
    const departamento = await this.prisma.departamento.findUnique({
      where: {
        codigo,
      },
    });

    if (!departamento) {
      throw new NotFoundException(
        `El departamento con el código ${codigo} no existe`,
      );
    }

    return departamento;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    const { nombre, codigo } = updateDepartamentoDto;

    const departamento = await this.prisma.departamento.findUnique({
      where: { id },
    });

    if (!departamento) {
      throw new NotFoundException(`El departamento con el id ${id} no existe`);
    }

    return this.prisma.departamento.update({
      where: { id },
      data: {
        nombre: nombre?.trim().toUpperCase(),
        codigo: codigo?.trim().toUpperCase(),
      },
    });
  }

  async remove(id: number) {
    const departamento = await this.prisma.departamento.findUnique({
      where: {
        id,
      },
    });

    if (!departamento) {
      throw new NotFoundException(`El departamento con el id ${id} no existe`);
    }

    return this.prisma.departamento.delete({
      where: {
        id,
      },
    });
  }
}

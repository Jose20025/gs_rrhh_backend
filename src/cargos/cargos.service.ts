import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CargosService {
  constructor(private prisma: PrismaService) {}

  create(createCargoDto: CreateCargoDto) {
    const { nombre, codigo, codigoDepartamento } = createCargoDto;

    return this.prisma.cargo.create({
      data: {
        nombre: nombre.trim().toUpperCase(),
        codigo: codigo.trim().toUpperCase(),
        codigoDepartamento: codigoDepartamento.trim().toUpperCase(),
      },
      include: {
        departamento: true,
      },
    });
  }

  async findAll() {
    const cargos = await this.prisma.cargo.findMany({
      include: {
        departamento: true,
      },
    });

    return cargos;
  }

  async findOneByCodigo(codigo: string) {
    const cargo = await this.prisma.cargo.findUnique({
      where: {
        codigo,
      },
      include: {
        departamento: true,
      },
    });

    if (!cargo) {
      throw new NotFoundException(`El cargo con el código ${codigo} no existe`);
    }

    return cargo;
  }

  async update(id: number, updateCargoDto: UpdateCargoDto) {
    const { nombre, codigo, codigoDepartamento } = updateCargoDto;

    const cargo = await this.prisma.cargo.findUnique({
      where: { id },
    });

    if (!cargo) {
      throw new NotFoundException(`El cargo con el id ${id} no existe`);
    }

    return this.prisma.cargo.update({
      where: { id },
      data: {
        nombre: nombre?.trim().toUpperCase(),
        codigo: codigo?.trim().toUpperCase(),
        codigoDepartamento: codigoDepartamento?.trim().toUpperCase(),
      },
      include: {
        departamento: true,
      },
    });
  }

  async remove(id: number) {
    const cargo = await this.prisma.cargo.findUnique({
      where: {
        id,
      },
    });

    if (!cargo) {
      throw new NotFoundException(`El cargo con el id ${id} no existe`);
    }

    return this.prisma.cargo.delete({
      where: {
        id,
      },
      include: {
        departamento: true,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const {
      nombre,
      apellido,
      ci,
      nacionalidad,
      genero,
      fechaNacimiento,
      ciudadNacimiento,
      estadoCivil,
      cantidadHijos,
      fechaIngreso,
      codigoCargo,
      codigoGradoInstruccion,
      codigoProfesion,
      correo,
      telefono,
      telefonoFijo,
      activo,
    } = createEmpleadoDto;

    return await this.prisma.empleado.create({
      data: {
        nombre: nombre.trim().toUpperCase(),
        apellido: apellido.trim().toUpperCase(),
        ci: ci.trim().toUpperCase(),
        nacionalidad: nacionalidad.trim().toUpperCase(),
        genero,
        fechaNacimiento: new Date(fechaNacimiento),
        ciudadNacimiento: ciudadNacimiento.trim().toUpperCase(),
        estadoCivil,
        cantidadHijos,
        fechaIngreso: new Date(fechaIngreso),
        codigoCargo: codigoCargo.trim().toUpperCase(),
        codigoGradoInstruccion: codigoGradoInstruccion.trim().toUpperCase(),
        codigoProfesion: codigoProfesion.trim().toUpperCase(),
        correo: correo.trim().toLowerCase(),
        telefono: telefono.trim(),
        telefonoFijo: telefonoFijo?.trim(),
        activo,
      },
      include: {
        cargo: true,
        gradoInstruccion: true,
        profesion: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.empleado.findMany({
      include: {
        cargo: true,
        gradoInstruccion: true,
        profesion: true,
      },
    });
  }

  async findOneById(id: number) {
    const empleado = await this.prisma.empleado.findUnique({
      where: { id },
      include: {
        cargo: true,
        gradoInstruccion: true,
        profesion: true,
      },
    });

    if (!empleado) {
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    }

    return empleado;
  }

  async findOneByCi(ci: string) {
    const empleado = await this.prisma.empleado.findUnique({
      where: { ci },
      include: {
        cargo: true,
        gradoInstruccion: true,
        profesion: true,
      },
    });

    if (!empleado) {
      throw new NotFoundException(
        `El empleado con el número de CI ${ci} no existe`,
      );
    }

    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const {
      nombre,
      apellido,
      ci,
      nacionalidad,
      genero,
      fechaNacimiento,
      ciudadNacimiento,
      estadoCivil,
      cantidadHijos,
      fechaIngreso,
      codigoCargo,
      codigoGradoInstruccion,
      codigoProfesion,
      correo,
      telefono,
      telefonoFijo,
      activo,
    } = updateEmpleadoDto;

    const empleado = await this.prisma.empleado.findUnique({
      where: { id },
    });

    if (!empleado) {
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    }

    return await this.prisma.empleado.update({
      where: { id },
      data: {
        nombre: nombre?.trim().toUpperCase(),
        apellido: apellido?.trim().toUpperCase(),
        ci: ci?.trim().toUpperCase(),
        nacionalidad: nacionalidad?.trim().toUpperCase(),
        genero,
        fechaNacimiento: fechaNacimiento
          ? new Date(fechaNacimiento)
          : undefined,
        ciudadNacimiento: ciudadNacimiento?.trim().toUpperCase(),
        estadoCivil,
        cantidadHijos,
        fechaIngreso: fechaIngreso ? new Date(fechaIngreso) : undefined,
        codigoCargo: codigoCargo?.trim().toUpperCase(),
        codigoGradoInstruccion: codigoGradoInstruccion?.trim().toUpperCase(),
        codigoProfesion: codigoProfesion?.trim().toUpperCase(),
        correo: correo?.trim().toLowerCase(),
        telefono: telefono?.trim(),
        telefonoFijo: telefonoFijo?.trim(),
        activo,
      },
      include: {
        cargo: true,
        gradoInstruccion: true,
        profesion: true,
      },
    });
  }

  async remove(id: number) {
    const empleado = await this.prisma.empleado.findUnique({
      where: { id },
    });

    if (!empleado) {
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    }

    return await this.prisma.empleado.delete({
      where: { id },
    });
  }
}

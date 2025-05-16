import { PrismaClient } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpieza de datos existentes
  await prisma.empleado.deleteMany();
  await prisma.cargo.deleteMany();
  await prisma.departamento.deleteMany();
  await prisma.profesion.deleteMany();
  await prisma.gradoInstruccion.deleteMany();

  // Crear Departamentos
  const departamentos = await Promise.all([
    prisma.departamento.create({
      data: {
        nombre: 'RECURSOS HUMANOS',
        codigo: 'RRHH',
      },
    }),
    prisma.departamento.create({
      data: {
        nombre: 'TECNOLOGÍA',
        codigo: 'TEC',
      },
    }),
    prisma.departamento.create({
      data: {
        nombre: 'CONTABILIDAD',
        codigo: 'CONT',
      },
    }),
  ]);

  // Crear Cargos
  const cargos = await Promise.all([
    prisma.cargo.create({
      data: {
        nombre: 'GERENTE DE RRHH',
        codigo: 'GER-RRHH',
        codigoDepartamento: 'RRHH',
      },
    }),
    prisma.cargo.create({
      data: {
        nombre: 'DESARROLLADOR SENIOR',
        codigo: 'DEV-SR',
        codigoDepartamento: 'TEC',
      },
    }),
    prisma.cargo.create({
      data: {
        nombre: 'CONTADOR GENERAL',
        codigo: 'CONT-GEN',
        codigoDepartamento: 'CONT',
      },
    }),
  ]);

  // Crear Profesiones
  const profesiones = await Promise.all([
    prisma.profesion.create({
      data: {
        nombre: 'INGENIERO EN SISTEMAS',
        codigo: 'ING-SIS',
      },
    }),
    prisma.profesion.create({
      data: {
        nombre: 'LICENCIADO EN ADMINISTRACIÓN',
        codigo: 'LIC-ADM',
      },
    }),
    prisma.profesion.create({
      data: {
        nombre: 'CONTADOR PÚBLICO',
        codigo: 'CONT-PUB',
      },
    }),
  ]);

  // Crear Grados de Instrucción
  const gradosInstruccion = await Promise.all([
    prisma.gradoInstruccion.create({
      data: {
        nombre: 'LICENCIATURA',
        codigo: 'LIC',
      },
    }),
    prisma.gradoInstruccion.create({
      data: {
        nombre: 'INGENIERÍA',
        codigo: 'ING',
      },
    }),
    prisma.gradoInstruccion.create({
      data: {
        nombre: 'MAESTRÍA',
        codigo: 'MSC',
      },
    }),
  ]);

  // Crear Empleados
  const empleados = await Promise.all([
    prisma.empleado.create({
      data: {
        nombre: 'JUAN',
        apellido: 'PÉREZ',
        ci: '12345678',
        nacionalidad: 'BOLIVIANA',
        genero: 'MASCULINO',
        fechaNacimiento: new Date('1990-01-15'),
        ciudadNacimiento: 'LA PAZ',
        estadoCivil: 'CASADO',
        cantidadHijos: 2,
        fechaIngreso: new Date('2023-01-01'),
        codigoCargo: 'GER-RRHH',
        codigoGradoInstruccion: 'LIC',
        codigoProfesion: 'LIC-ADM',
        correo: 'juan.perez@empresa.com',
        telefono: '71234567',
        activo: true,
      },
    }),
    prisma.empleado.create({
      data: {
        nombre: 'MARÍA',
        apellido: 'GARCÍA',
        ci: '87654321',
        nacionalidad: 'BOLIVIANA',
        genero: 'FEMENINO',
        fechaNacimiento: new Date('1995-06-20'),
        ciudadNacimiento: 'SANTA CRUZ',
        estadoCivil: 'SOLTERO',
        cantidadHijos: 0,
        fechaIngreso: new Date('2024-01-15'),
        codigoCargo: 'DEV-SR',
        codigoGradoInstruccion: 'ING',
        codigoProfesion: 'ING-SIS',
        correo: 'maria.garcia@empresa.com',
        telefono: '76543210',
        activo: true,
      },
    }),
    prisma.empleado.create({
      data: {
        nombre: 'CARLOS',
        apellido: 'RODRIGUEZ',
        ci: '98765432',
        nacionalidad: 'BOLIVIANA',
        genero: 'MASCULINO',
        fechaNacimiento: new Date('1988-12-10'),
        ciudadNacimiento: 'COCHABAMBA',
        estadoCivil: 'CASADO',
        cantidadHijos: 1,
        fechaIngreso: new Date('2023-06-01'),
        codigoCargo: 'CONT-GEN',
        codigoGradoInstruccion: 'LIC',
        codigoProfesion: 'CONT-PUB',
        correo: 'carlos.rodriguez@empresa.com',
        telefono: '79876543',
        activo: true,
      },
    }),
  ]);

  // Crear un usuario
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const usuario = await prisma.usuario.create({
    data: {
      usuario: 'admin',
      password: hashedPassword,
      nombre: 'ADMINISTRADOR',
    },
  });

  console.log({
    departamentos,
    cargos,
    profesiones,
    gradosInstruccion,
    empleados,
    usuario,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

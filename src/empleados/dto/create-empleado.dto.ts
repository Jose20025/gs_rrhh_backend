import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export enum GeneroEnum {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO',
}

export enum EstadoCivilEnum {
  SOLTERO = 'SOLTERO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUDO = 'VIUDO',
  CONCUBINO = 'CONCUBINO',
}

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  ci: string;

  @IsString()
  @IsNotEmpty()
  nacionalidad: string;

  @IsEnum(GeneroEnum)
  @IsOptional()
  genero?: GeneroEnum;

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  ciudadNacimiento: string;

  @IsEnum(EstadoCivilEnum)
  estadoCivil: EstadoCivilEnum;

  @IsInt()
  cantidadHijos: number;

  @IsDateString()
  @IsNotEmpty()
  fechaIngreso: string;

  @IsString()
  @IsNotEmpty()
  codigoCargo: string;

  @IsString()
  @IsNotEmpty()
  codigoGradoInstruccion: string;

  @IsString()
  @IsNotEmpty()
  codigoProfesion: string;

  @IsString()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsOptional()
  telefonoFijo?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}

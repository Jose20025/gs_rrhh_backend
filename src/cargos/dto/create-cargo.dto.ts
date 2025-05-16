import { IsString, MaxLength } from 'class-validator';

export class CreateCargoDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(15)
  codigo: string;

  @IsString()
  @MaxLength(15)
  codigoDepartamento: string;
}

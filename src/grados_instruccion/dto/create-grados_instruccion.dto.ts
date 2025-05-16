import { IsString, MaxLength } from 'class-validator';

export class CreateGradosInstruccionDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(15)
  codigo: string;
}

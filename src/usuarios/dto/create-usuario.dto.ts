import { IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MaxLength(100)
  usuario: string;

  @IsString()
  @MaxLength(100)
  password: string;

  @IsString()
  @MaxLength(100)
  nombre: string;
}

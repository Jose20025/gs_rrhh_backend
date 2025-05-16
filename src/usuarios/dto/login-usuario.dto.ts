import { IsString, MaxLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsString()
  @MaxLength(100)
  usuario: string;

  @IsString()
  @MaxLength(100)
  password: string;
}

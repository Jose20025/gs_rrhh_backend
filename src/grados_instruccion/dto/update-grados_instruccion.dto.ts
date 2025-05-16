import { PartialType } from '@nestjs/mapped-types';
import { CreateGradosInstruccionDto } from './create-grados_instruccion.dto';

export class UpdateGradosInstruccionDto extends PartialType(CreateGradosInstruccionDto) {}

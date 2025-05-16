import { Module } from '@nestjs/common';
import { GradosInstruccionController } from './grados_instruccion.controller';
import { GradosInstruccionService } from './grados_instruccion.service';

@Module({
  controllers: [GradosInstruccionController],
  providers: [GradosInstruccionService],
})
export class GradosInstruccionModule {}

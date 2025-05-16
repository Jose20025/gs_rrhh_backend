import { Module } from '@nestjs/common';
import { ProfesionesService } from './profesiones.service';
import { ProfesionesController } from './profesiones.controller';

@Module({
  controllers: [ProfesionesController],
  providers: [ProfesionesService],
})
export class ProfesionesModule {}

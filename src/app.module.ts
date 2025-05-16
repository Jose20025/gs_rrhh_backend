import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { PrismaModule } from './prisma/prisma.module';
import { CargosModule } from './cargos/cargos.module';
import { ProfesionesModule } from './profesiones/profesiones.module';
import { GradosInstruccionModule } from './grados_instruccion/grados_instruccion.module';
import { EmpleadosModule } from './empleados/empleados.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DepartamentosModule,
    PrismaModule,
    CargosModule,
    ProfesionesModule,
    GradosInstruccionModule,
    EmpleadosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

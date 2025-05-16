import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { PrismaModule } from './prisma/prisma.module';
import { CargosModule } from './cargos/cargos.module';
import { ProfesionesModule } from './profesiones/profesiones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DepartamentosModule,
    PrismaModule,
    CargosModule,
    ProfesionesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

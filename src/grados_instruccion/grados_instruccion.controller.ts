import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GradosInstruccionService } from './grados_instruccion.service';
import { CreateGradosInstruccionDto } from './dto/create-grados_instruccion.dto';
import { UpdateGradosInstruccionDto } from './dto/update-grados_instruccion.dto';

@Controller('grados-instruccion')
export class GradosInstruccionController {
  constructor(
    private readonly gradosInstruccionService: GradosInstruccionService,
  ) {}

  @Post()
  create(@Body() createGradosInstruccionDto: CreateGradosInstruccionDto) {
    return this.gradosInstruccionService.create(createGradosInstruccionDto);
  }

  @Get()
  findAll() {
    return this.gradosInstruccionService.findAll();
  }

  @Get(':codigo')
  findOneByCodigo(@Param('codigo') codigo: string) {
    return this.gradosInstruccionService.findOneByCodigo(codigo);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGradosInstruccionDto: UpdateGradosInstruccionDto,
  ) {
    return this.gradosInstruccionService.update(
      +id,
      updateGradosInstruccionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradosInstruccionService.remove(+id);
  }
}

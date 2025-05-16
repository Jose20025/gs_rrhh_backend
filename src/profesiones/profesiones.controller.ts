import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesionesService } from './profesiones.service';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';

@Controller('profesiones')
export class ProfesionesController {
  constructor(private readonly profesionesService: ProfesionesService) {}

  @Post()
  create(@Body() createProfesionDto: CreateProfesionDto) {
    return this.profesionesService.create(createProfesionDto);
  }

  @Get()
  findAll() {
    return this.profesionesService.findAll();
  }

  @Get(':codigo')
  findOneByCodigo(@Param('codigo') codigo: string) {
    return this.profesionesService.findOneByCodigo(codigo);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfesionDto: UpdateProfesionDto,
  ) {
    return this.profesionesService.update(+id, updateProfesionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesionesService.remove(+id);
  }
}

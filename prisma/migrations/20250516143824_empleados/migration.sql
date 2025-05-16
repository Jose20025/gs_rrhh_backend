-- CreateTable
CREATE TABLE `empleados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `ci` VARCHAR(15) NOT NULL,
    `nacionalidad` VARCHAR(100) NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMENINO') NOT NULL DEFAULT 'MASCULINO',
    `fecha_nacimiento` DATE NOT NULL,
    `ciudad_nacimiento` VARCHAR(100) NOT NULL,
    `estado_civil` ENUM('SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO', 'CONCUBINO') NOT NULL,
    `cantidad_hijos` INTEGER NOT NULL DEFAULT 0,
    `fecha_ingreso` DATE NOT NULL,
    `codigo_cargo` VARCHAR(15) NOT NULL,
    `codigo_grado_instruccion` VARCHAR(15) NOT NULL,
    `codigo_profesion` VARCHAR(15) NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(15) NOT NULL,
    `telefono_fijo` VARCHAR(15) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `empleados_ci_key`(`ci`),
    UNIQUE INDEX `empleados_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `empleados` ADD CONSTRAINT `empleados_codigo_profesion_fkey` FOREIGN KEY (`codigo_profesion`) REFERENCES `profesiones`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empleados` ADD CONSTRAINT `empleados_codigo_grado_instruccion_fkey` FOREIGN KEY (`codigo_grado_instruccion`) REFERENCES `grados_instruccion`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empleados` ADD CONSTRAINT `empleados_codigo_cargo_fkey` FOREIGN KEY (`codigo_cargo`) REFERENCES `cargos`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

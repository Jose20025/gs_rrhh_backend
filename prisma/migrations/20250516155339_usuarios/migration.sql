-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `usuarios_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

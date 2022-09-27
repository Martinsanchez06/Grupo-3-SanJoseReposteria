-- MySQL Script generated by MySQL Workbench
-- Wed Sep 14 16:45:39 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema san_jose_reposteria
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema san_jose_reposteria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `san_jose_reposteria` DEFAULT CHARACTER SET utf8 ;
USE `san_jose_reposteria` ;

-- -----------------------------------------------------
-- Table `san_jose_reposteria`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `san_jose_reposteria`.`categorias` (
  `idCategorias` INT(11) NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategorias`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `san_jose_reposteria`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `san_jose_reposteria`.`productos` (
  `idProductos` INT(10) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `imagen_1` VARCHAR(200) NOT NULL,
  `imagen_2` VARCHAR(200) NOT NULL,
  `imagen_3` VARCHAR(200) NOT NULL,
  `precio` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(1000) NOT NULL,
  `tamaño` VARCHAR(45) NOT NULL,
  `categoria_id` INT(11) NOT NULL,
  PRIMARY KEY (`idProductos`),
  INDEX `categoria_id` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `san_jose_reposteria`.`categorias` (`idCategorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `san_jose_reposteria`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `san_jose_reposteria`.`usuarios` (
  `idUsuarios` INT(11) NOT NULL AUTO_INCREMENT,
  `numeroID` VARCHAR(200) NOT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `email` VARCHAR(201) NOT NULL,
  `fechanacimiento` DATE NOT NULL,
  `ciudad` VARCHAR(202) NOT NULL,
  `password` VARCHAR(203) NULL DEFAULT NULL,
  `con_password` VARCHAR(204) NULL DEFAULT NULL,
  `politica` VARCHAR(45) NOT NULL,
  `avatar` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuarios`),
  UNIQUE INDEX `numeroID_UNIQUE` (`numeroID` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

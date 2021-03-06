-- MySQL Script generated by MySQL Workbench
-- 09/21/17 14:20:58
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema cidades_digitais_v8
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cidades_digitais_v8
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cidades_digitais_v8` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `cidades_digitais_v8` ;

-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`municipio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`municipio` (
  `cod_ibge` INT(7) NOT NULL,
  `nome_municipio` VARCHAR(50) NULL,
  `populacao` INT NULL,
  `uf` VARCHAR(2) NULL,
  `regiao` VARCHAR(15) NULL,
  `cnpj` VARCHAR(14) NULL,
  `dist_capital` INT NULL,
  `endereco` VARCHAR(45) NULL,
  `numero` VARCHAR(10) NULL,
  `complemento` VARCHAR(250) NULL,
  `bairro` VARCHAR(45) NULL,
  `idhm` FLOAT NULL,
  `latitude` VARCHAR(45) NULL,
  `longitude` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_ibge`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`entidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`entidade` (
  `cnpj` VARCHAR(14) NOT NULL,
  `nome` VARCHAR(50) NULL,
  `endereco` VARCHAR(100) NULL,
  `numero` VARCHAR(10) NULL,
  `bairro` VARCHAR(100) NULL,
  `cep` VARCHAR(8) NULL,
  `nome_municipio` VARCHAR(50) NULL,
  `uf` VARCHAR(2) NULL,
  `observacao` VARCHAR(1000) NULL,
  PRIMARY KEY (`cnpj`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`lote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`lote` (
  `cod_lote` INT NOT NULL,
  `entidade_cnpj` VARCHAR(14) NOT NULL,
  `contrato` VARCHAR(10) NULL,
  `dt_inicio_vig` DATE NULL,
  `dt_final_vig` DATE NULL,
  `dt_reajuste` DATE NULL,
  PRIMARY KEY (`cod_lote`),
  INDEX `fk_lote_entidade1_idx` (`entidade_cnpj` ASC),
  CONSTRAINT `fk_lote_entidade1`
    FOREIGN KEY (`entidade_cnpj`)
    REFERENCES `cidades_digitais_v8`.`entidade` (`cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`cd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`cd` (
  `municipio_cod_ibge` INT(7) NOT NULL,
  `lote_cod_lote` INT NOT NULL,
  `os_pe` VARCHAR(10) NULL,
  `data_pe` DATE NULL,
  `os_imp` VARCHAR(10) NULL,
  `data_imp` DATE NULL,
  INDEX `fk_cd_lote1_idx` (`lote_cod_lote` ASC),
  PRIMARY KEY (`municipio_cod_ibge`),
  CONSTRAINT `fk_cd_lote1`
    FOREIGN KEY (`lote_cod_lote`)
    REFERENCES `cidades_digitais_v8`.`lote` (`cod_lote`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cd_municipio1`
    FOREIGN KEY (`municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`municipio` (`cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`contato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`contato` (
  `cod_contato` INT NOT NULL,
  `entidade_cnpj` VARCHAR(14) NULL,
  `cd_municipio_cod_ibge` INT(7) NULL,
  `nome` VARCHAR(50) NULL,
  `email` VARCHAR(100) NULL,
  `funcao` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_contato`),
  INDEX `fk_contato_entidade1_idx` (`entidade_cnpj` ASC),
  INDEX `fk_contato_cd1_idx` (`cd_municipio_cod_ibge` ASC),
  CONSTRAINT `fk_contato_entidade1`
    FOREIGN KEY (`entidade_cnpj`)
    REFERENCES `cidades_digitais_v8`.`entidade` (`cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contato_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`telefone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`telefone` (
  `cod_telefone` INT NOT NULL,
  `contato_cod_contato` INT NOT NULL,
  `telefone` VARCHAR(11) NULL,
  `tipo` VARCHAR(10) NULL,
  PRIMARY KEY (`cod_telefone`),
  INDEX `fk_telefone_contato1_idx` (`contato_cod_contato` ASC),
  CONSTRAINT `fk_telefone_contato1`
    FOREIGN KEY (`contato_cod_contato`)
    REFERENCES `cidades_digitais_v8`.`contato` (`cod_contato`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`natureza_despesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`natureza_despesa` (
  `cod_natureza_despesa` INT NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`cod_natureza_despesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`classe_empenho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`classe_empenho` (
  `cod_classe_empenho` INT NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`cod_classe_empenho`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`tipo_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`tipo_item` (
  `cod_tipo_item` INT NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`cod_tipo_item`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`itens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`itens` (
  `cod_item` INT NOT NULL,
  `tipo_item_cod_tipo_item` INT NOT NULL,
  `natureza_despesa_cod_natureza_despesa` INT NOT NULL,
  `classe_empenho_cod_classe_empenho` INT NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `unidade` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_item`, `tipo_item_cod_tipo_item`),
  INDEX `fk_itens_classificacao_itens1_idx` (`natureza_despesa_cod_natureza_despesa` ASC),
  INDEX `fk_itens_subitem1_idx` (`classe_empenho_cod_classe_empenho` ASC),
  INDEX `fk_itens_tipo_item1_idx` (`tipo_item_cod_tipo_item` ASC),
  CONSTRAINT `fk_itens_classificacao_itens1`
    FOREIGN KEY (`natureza_despesa_cod_natureza_despesa`)
    REFERENCES `cidades_digitais_v8`.`natureza_despesa` (`cod_natureza_despesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_subitem1`
    FOREIGN KEY (`classe_empenho_cod_classe_empenho`)
    REFERENCES `cidades_digitais_v8`.`classe_empenho` (`cod_classe_empenho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_tipo_item1`
    FOREIGN KEY (`tipo_item_cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`tipo_item` (`cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`perfil` (
  `cod_perfil` INT NOT NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_perfil`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`usuario` (
  `cod_usuario` INT NOT NULL,
  `perfil_cod_perfil` INT NOT NULL,
  `nome` VARCHAR(50) NULL,
  `login` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  
  `email` VARCHAR(45) NULL,
  `telefone` VARCHAR(11) NULL,
  PRIMARY KEY (`cod_usuario`),
  INDEX `fk_usuario_perfil1_idx` (`perfil_cod_perfil` ASC),
  CONSTRAINT `fk_usuario_perfil1`
    FOREIGN KEY (`perfil_cod_perfil`)
    REFERENCES `cidades_digitais_v8`.`perfil` (`cod_perfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`categoria` (
  `cod_categoria` INT NOT NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`ponto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`ponto` (
  `cod_ponto` INT NOT NULL,
  `categoria_cod_categoria` INT NOT NULL,
  `cd_municipio_cod_ibge` INT(7) NOT NULL,
  `nome` VARCHAR(100) NULL,
  `endereco` VARCHAR(100) NULL,
  `numero` VARCHAR(10) NULL,
  `complemento` VARCHAR(250) NULL,
  `bairro` VARCHAR(45) NULL,
  `cep` VARCHAR(8) NULL,
  `latitude` VARCHAR(45) NULL,
  `longitude` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_ponto`, `categoria_cod_categoria`, `cd_municipio_cod_ibge`),
  INDEX `fk_ponto_categoria1_idx` (`categoria_cod_categoria` ASC),
  INDEX `fk_ponto_cd1_idx` (`cd_municipio_cod_ibge` ASC),
  CONSTRAINT `fk_ponto_categoria1`
    FOREIGN KEY (`categoria_cod_categoria`)
    REFERENCES `cidades_digitais_v8`.`categoria` (`cod_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ponto_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`cd_itens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`cd_itens` (
  `cd_municipio_cod_ibge` INT(7) NOT NULL,
  `itens_cod_item` INT NOT NULL,
  `itens_tipo_item_cod_tipo_item` INT NOT NULL,
  `quantidade_previsto` INT NULL,
  `quantidade_projeto_executivo` INT NULL,
  `quantidade_termo_instalacao` INT NULL,
  PRIMARY KEY (`cd_municipio_cod_ibge`, `itens_cod_item`, `itens_tipo_item_cod_tipo_item`),
  INDEX `fk_itens_has_cd_cd1_idx` (`cd_municipio_cod_ibge` ASC),
  INDEX `fk_cd_itens_itens2_idx` (`itens_cod_item` ASC, `itens_tipo_item_cod_tipo_item` ASC),
  CONSTRAINT `fk_itens_has_cd_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cd_itens_itens2`
    FOREIGN KEY (`itens_cod_item` , `itens_tipo_item_cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`itens` (`cod_item` , `tipo_item_cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`previsao_empenho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`previsao_empenho` (
  `cod_previsao_empenho` INT NOT NULL,
  `lote_cod_lote` INT NOT NULL,
  `natureza_despesa_cod_natureza_despesa` INT NOT NULL,
  `data` DATE NULL,
  `tipo` CHAR(1) NULL,
  `ano_referencia` INT NULL,
  PRIMARY KEY (`cod_previsao_empenho`),
  INDEX `fk_empenho_lote1_idx` (`lote_cod_lote` ASC),
  INDEX `fk_previsao_empenho_natureza_despesa1_idx` (`natureza_despesa_cod_natureza_despesa` ASC),
  CONSTRAINT `fk_empenho_lote10`
    FOREIGN KEY (`lote_cod_lote`)
    REFERENCES `cidades_digitais_v8`.`lote` (`cod_lote`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_previsao_empenho_natureza_despesa1`
    FOREIGN KEY (`natureza_despesa_cod_natureza_despesa`)
    REFERENCES `cidades_digitais_v8`.`natureza_despesa` (`cod_natureza_despesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`empenho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`empenho` (
  `cod_empenho` VARCHAR(12) NOT NULL,
  `previsao_empenho_cod_previsao_empenho` INT NOT NULL,
  `data` DATETIME NULL,
  PRIMARY KEY (`cod_empenho`),
  INDEX `fk_empenho_previsao_empenho1_idx` (`previsao_empenho_cod_previsao_empenho` ASC),
  CONSTRAINT `fk_empenho_previsao_empenho1`
    FOREIGN KEY (`previsao_empenho_cod_previsao_empenho`)
    REFERENCES `cidades_digitais_v8`.`previsao_empenho` (`cod_previsao_empenho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`lote_itens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`lote_itens` (
  `lote_cod_lote` INT NOT NULL,
  `itens_cod_item` INT NOT NULL,
  `itens_tipo_item_cod_tipo_item` INT NOT NULL,
  `preco` FLOAT NULL,
  PRIMARY KEY (`lote_cod_lote`, `itens_cod_item`, `itens_tipo_item_cod_tipo_item`),
  INDEX `fk_lote_has_itens_lote1_idx` (`lote_cod_lote` ASC),
  INDEX `fk_lote_itens_itens1_idx` (`itens_cod_item` ASC, `itens_tipo_item_cod_tipo_item` ASC),
  CONSTRAINT `fk_lote_has_itens_lote1`
    FOREIGN KEY (`lote_cod_lote`)
    REFERENCES `cidades_digitais_v8`.`lote` (`cod_lote`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lote_itens_itens1`
    FOREIGN KEY (`itens_cod_item` , `itens_tipo_item_cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`itens` (`cod_item` , `tipo_item_cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`itens_previsao_empenho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`itens_previsao_empenho` (
  `previsao_empenho_cod_previsao_empenho` INT NOT NULL,
  `lote_itens_itens_cod_item` INT NOT NULL,
  `lote_itens_itens_tipo_item_cod_tipo_item` INT NOT NULL,
  `lote_itens_lote_cod_lote` INT NOT NULL,
  `valor` FLOAT NULL,
  `quantidade` INT NULL,
  PRIMARY KEY (`previsao_empenho_cod_previsao_empenho`, `lote_itens_itens_cod_item`, `lote_itens_itens_tipo_item_cod_tipo_item`),
  INDEX `fk_itens_previsao_empenho_previsao_empenho1_idx` (`previsao_empenho_cod_previsao_empenho` ASC),
  INDEX `fk_itens_previsao_empenho_lote_itens1_idx` (`lote_itens_lote_cod_lote` ASC, `lote_itens_itens_cod_item` ASC, `lote_itens_itens_tipo_item_cod_tipo_item` ASC),
  CONSTRAINT `fk_itens_previsao_empenho_previsao_empenho1`
    FOREIGN KEY (`previsao_empenho_cod_previsao_empenho`)
    REFERENCES `cidades_digitais_v8`.`previsao_empenho` (`cod_previsao_empenho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_previsao_empenho_lote_itens1`
    FOREIGN KEY (`lote_itens_lote_cod_lote` , `lote_itens_itens_cod_item` , `lote_itens_itens_tipo_item_cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`lote_itens` (`lote_cod_lote` , `itens_cod_item` , `itens_tipo_item_cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`itens_empenho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`itens_empenho` (
  `cod_empenho` VARCHAR(12) NOT NULL,
  `cod_item` INT NOT NULL,
  `cod_tipo_item` INT NOT NULL,
  `cod_previsao_empenho` INT NOT NULL,
  `valor` FLOAT NULL,
  `quantidade` INT NULL,
  PRIMARY KEY (`cod_empenho`, `cod_item`, `cod_tipo_item`),
  INDEX `fk_itens_empenho_empenho1_idx` (`cod_empenho` ASC),
  INDEX `fk_itens_empenho_itens_previsao_empenho1_idx` (`cod_previsao_empenho` ASC, `cod_item` ASC, `cod_tipo_item` ASC),
  CONSTRAINT `fk_itens_empenho_empenho1`
    FOREIGN KEY (`cod_empenho`)
    REFERENCES `cidades_digitais_v8`.`empenho` (`cod_empenho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_empenho_itens_previsao_empenho1`
    FOREIGN KEY (`cod_previsao_empenho` , `cod_item` , `cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`itens_previsao_empenho` (`previsao_empenho_cod_previsao_empenho` , `lote_itens_itens_cod_item` , `lote_itens_itens_tipo_item_cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`fatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`fatura` (
  `num_nf` INT NOT NULL,
  `cd_municipio_cod_ibge` INT(7) NOT NULL,
  `dt_nf` DATE NULL,
  PRIMARY KEY (`num_nf`, `cd_municipio_cod_ibge`),
  INDEX `fk_Fatura_cd1_idx` (`cd_municipio_cod_ibge` ASC),
  CONSTRAINT `fk_Fatura_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`reajuste`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`reajuste` (
  `ano_ref` INT NOT NULL,
  `lote_cod_lote` INT NOT NULL,
  `percentual` FLOAT NULL,
  PRIMARY KEY (`ano_ref`, `lote_cod_lote`),
  INDEX `fk_reajuste_lote1_idx` (`lote_cod_lote` ASC),
  CONSTRAINT `fk_reajuste_lote1`
    FOREIGN KEY (`lote_cod_lote`)
    REFERENCES `cidades_digitais_v8`.`lote` (`cod_lote`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`tipologia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`tipologia` (
  `cod_tipologia` INT NOT NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_tipologia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`ponto_tipologia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`ponto_tipologia` (
  `ponto_cod_ponto` INT NOT NULL,
  `ponto_categoria_cod_categoria` INT NOT NULL,
  `ponto_cd_municipio_cod_ibge` INT(7) NOT NULL,
  `tipologia_cod_tipologia` INT NOT NULL,
  PRIMARY KEY (`ponto_cod_ponto`, `ponto_categoria_cod_categoria`, `ponto_cd_municipio_cod_ibge`, `tipologia_cod_tipologia`),
  INDEX `fk_ponto_has_tipologia_tipologia1_idx` (`tipologia_cod_tipologia` ASC),
  INDEX `fk_ponto_tipologia_ponto1_idx` (`ponto_cod_ponto` ASC, `ponto_categoria_cod_categoria` ASC, `ponto_cd_municipio_cod_ibge` ASC),
  CONSTRAINT `fk_ponto_has_tipologia_tipologia1`
    FOREIGN KEY (`tipologia_cod_tipologia`)
    REFERENCES `cidades_digitais_v8`.`tipologia` (`cod_tipologia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ponto_tipologia_ponto1`
    FOREIGN KEY (`ponto_cod_ponto` , `ponto_categoria_cod_categoria` , `ponto_cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`ponto` (`cod_ponto` , `categoria_cod_categoria` , `cd_municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`etapa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`etapa` (
  `cod_etapa` INT NOT NULL,
  `descricao` VARCHAR(45) NULL,
  `duracao` INT NULL,
  `ordem` INT NULL,
  `setor_resp` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_etapa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`etapas_cd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`etapas_cd` (
  `cd_municipio_cod_ibge` INT(7) NOT NULL,
  `etapa_cod_etapa` INT NOT NULL,
  `dt_inicio` DATETIME NULL,
  `dt_fim` DATETIME NULL,
  `responsavel` VARCHAR(45) NULL,
  PRIMARY KEY (`cd_municipio_cod_ibge`, `etapa_cod_etapa`),
  INDEX `fk_etapas_cd_etapa1_idx` (`etapa_cod_etapa` ASC),
  CONSTRAINT `fk_etapas_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_etapas_cd_etapa1`
    FOREIGN KEY (`etapa_cod_etapa`)
    REFERENCES `cidades_digitais_v8`.`etapa` (`cod_etapa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`log` (
  `cod_log` INT NOT NULL,
  `usuario_cod_usuario` INT NOT NULL,
  `operacao` VARCHAR(100) NULL,
  `data` DATETIME NULL,
  `entidade_cnpj` VARCHAR(14) NULL,
  `contato_cod_contato` INT NULL,
  `itens_empenho_sequencia` INT NULL,
  `itens_empenho_empenho_cod_empenho` INT NULL,
  `lote_cod_lote` INT NULL,
  `empenho_cod_empenho` INT NULL,
  `cd_municipio_cod_ibge` INT(7) NULL,
  `ponto_categoria_cod_categoria` INT NULL,
  `ponto_numero` INT NULL,
  `ponto_cd_municipio_cod_ibge` INT(7) NULL,
  `itens_otb_itens_fatura_itens_empenho_sequencia` INT NULL,
  `itens_otb_itens_fatura_itens_empenho_empenho_cod_empenho` INT NULL,
  `itens_otb_itens_fatura_Fatura_num_nf` INT NULL,
  `itens_otb_otb_cod_otb` INT NULL,
  `ponto_tipologia_ponto_categoria_cod_categoria` INT NULL,
  `ponto_tipologia_ponto_numero` INT NULL,
  `ponto_tipologia_ponto_cd_municipio_cod_ibge` INT(7) NULL,
  `ponto_tipologia_tipologia_cod_tipologia` INT NULL,
  `etapas_cd_cd_municipio_cod_ibge` INT(7) NULL,
  `etapas_cd_etapa_cod_etapa` INT NULL,
  `itens_cod_item` INT NULL,
  `itens_tipo_item_cod_tipo_item` INT NULL,
  PRIMARY KEY (`cod_log`),
  INDEX `fk_log_entidade1_idx` (`entidade_cnpj` ASC),
  INDEX `fk_log_contato1_idx` (`contato_cod_contato` ASC),
  INDEX `fk_log_itens_empenho1_idx` (`itens_empenho_sequencia` ASC, `itens_empenho_empenho_cod_empenho` ASC),
  INDEX `fk_log_lote1_idx` (`lote_cod_lote` ASC),
  INDEX `fk_log_empenho1_idx` (`empenho_cod_empenho` ASC),
  INDEX `fk_log_usuario1_idx` (`usuario_cod_usuario` ASC),
  INDEX `fk_log_cd1_idx` (`cd_municipio_cod_ibge` ASC),
  INDEX `fk_log_ponto1_idx` (`ponto_categoria_cod_categoria` ASC, `ponto_numero` ASC, `ponto_cd_municipio_cod_ibge` ASC),
  INDEX `fk_log_ponto_tipologia1_idx` (`ponto_tipologia_ponto_categoria_cod_categoria` ASC, `ponto_tipologia_ponto_numero` ASC, `ponto_tipologia_ponto_cd_municipio_cod_ibge` ASC, `ponto_tipologia_tipologia_cod_tipologia` ASC),
  INDEX `fk_log_etapas_cd1_idx` (`etapas_cd_cd_municipio_cod_ibge` ASC, `etapas_cd_etapa_cod_etapa` ASC),
  INDEX `fk_log_itens1_idx` (`itens_cod_item` ASC, `itens_tipo_item_cod_tipo_item` ASC),
  CONSTRAINT `fk_log_entidade1`
    FOREIGN KEY (`entidade_cnpj`)
    REFERENCES `cidades_digitais_v8`.`entidade` (`cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_contato1`
    FOREIGN KEY (`contato_cod_contato`)
    REFERENCES `cidades_digitais_v8`.`contato` (`cod_contato`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_itens_empenho1`
    FOREIGN KEY (`itens_empenho_empenho_cod_empenho`)
    REFERENCES `cidades_digitais_v8`.`itens_empenho` (`cod_empenho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_lote1`
    FOREIGN KEY (`lote_cod_lote`)
    REFERENCES `cidades_digitais_v8`.`lote` (`cod_lote`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_empenho1`
    FOREIGN KEY (`empenho_cod_empenho`)
    REFERENCES `cidades_digitais_v8`.`empenho` (`cod_empenho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `cidades_digitais_v8`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_ponto1`
    FOREIGN KEY (`ponto_categoria_cod_categoria` , `ponto_numero` , `ponto_cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`ponto` (`categoria_cod_categoria` , `cod_ponto` , `cd_municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_ponto_tipologia1`
    FOREIGN KEY (`ponto_tipologia_tipologia_cod_tipologia`)
    REFERENCES `cidades_digitais_v8`.`ponto_tipologia` (`tipologia_cod_tipologia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_etapas_cd1`
    FOREIGN KEY (`etapas_cd_cd_municipio_cod_ibge` , `etapas_cd_etapa_cod_etapa`)
    REFERENCES `cidades_digitais_v8`.`etapas_cd` (`cd_municipio_cod_ibge` , `etapa_cod_etapa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_itens1`
    FOREIGN KEY (`itens_cod_item` , `itens_tipo_item_cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`itens` (`cod_item` , `tipo_item_cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`prefeitos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`prefeitos` (
  `cod_prefeito` INT NOT NULL,
  `municipio_cod_ibge` INT(7) NOT NULL,
  `nome` VARCHAR(45) NULL,
  `cpf` VARCHAR(11) NULL,
  `rg` VARCHAR(20) NULL,
  `partido` VARCHAR(45) NULL,
  `exercicio` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_prefeito`),
  INDEX `fk_prefeitos_municipio1_idx` (`municipio_cod_ibge` ASC),
  CONSTRAINT `fk_prefeitos_municipio1`
    FOREIGN KEY (`municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`municipio` (`cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`processo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`processo` (
  `cod_processo` VARCHAR(20) NOT NULL,
  `cd_municipio_cod_ibge` INT(7) NOT NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_processo`, `cd_municipio_cod_ibge`),
  INDEX `fk_processo_cd1_idx` (`cd_municipio_cod_ibge` ASC),
  CONSTRAINT `fk_processo_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`cd_itens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`cd_itens` (
  `cd_municipio_cod_ibge` INT(7) NOT NULL,
  `itens_cod_item` INT NOT NULL,
  `itens_tipo_item_cod_tipo_item` INT NOT NULL,
  `quantidade_previsto` INT NULL,
  `quantidade_projeto_executivo` INT NULL,
  `quantidade_termo_instalacao` INT NULL,
  PRIMARY KEY (`cd_municipio_cod_ibge`, `itens_cod_item`, `itens_tipo_item_cod_tipo_item`),
  INDEX `fk_itens_has_cd_cd1_idx` (`cd_municipio_cod_ibge` ASC),
  INDEX `fk_cd_itens_itens2_idx` (`itens_cod_item` ASC, `itens_tipo_item_cod_tipo_item` ASC),
  CONSTRAINT `fk_itens_has_cd_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cd_itens_itens2`
    FOREIGN KEY (`itens_cod_item` , `itens_tipo_item_cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`itens` (`cod_item` , `tipo_item_cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`otb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`otb` (
  `cod_otb` INT NOT NULL,
  `dt_pgto` DATE NULL,
  PRIMARY KEY (`cod_otb`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`uacom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`uacom` (
  `cd_municipio_cod_ibge` INT(7) NOT NULL,
  `data` DATETIME NOT NULL,
  `relato` LONGTEXT NULL,
  PRIMARY KEY (`cd_municipio_cod_ibge`, `data`),
  INDEX `fk_uacom_cd1_idx` (`cd_municipio_cod_ibge` ASC),
  CONSTRAINT `fk_uacom_cd1`
    FOREIGN KEY (`cd_municipio_cod_ibge`)
    REFERENCES `cidades_digitais_v8`.`cd` (`municipio_cod_ibge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`assunto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`assunto` (
  `cod_assunto` INT NOT NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_assunto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`uacom_assunto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`uacom_assunto` (
  `uacom_cd_municipio_cod_ibge` INT(7) NOT NULL,
  `uacom_data` DATETIME NOT NULL,
  `assunto_cod_assunto` INT NOT NULL,
  PRIMARY KEY (`uacom_cd_municipio_cod_ibge`, `uacom_data`, `assunto_cod_assunto`),
  INDEX `fk_uacom_has_assunto_assunto1_idx` (`assunto_cod_assunto` ASC),
  INDEX `fk_uacom_has_assunto_uacom1_idx` (`uacom_cd_municipio_cod_ibge` ASC, `uacom_data` ASC),
  CONSTRAINT `fk_uacom_has_assunto_uacom1`
    FOREIGN KEY (`uacom_cd_municipio_cod_ibge` , `uacom_data`)
    REFERENCES `cidades_digitais_v8`.`uacom` (`cd_municipio_cod_ibge` , `data`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_uacom_has_assunto_assunto1`
    FOREIGN KEY (`assunto_cod_assunto`)
    REFERENCES `cidades_digitais_v8`.`assunto` (`cod_assunto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`itens_fatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`itens_fatura` (
  `fatura_num_nf` INT NOT NULL,
  `cod_empenho` VARCHAR(12) NOT NULL,
  `cod_item` INT NOT NULL,
  `cod_tipo_item` INT NOT NULL,
  `valor` FLOAT NULL,
  `quantidade` INT NULL,
  PRIMARY KEY (`fatura_num_nf`, `cod_empenho`, `cod_item`, `cod_tipo_item`),
  INDEX `fk_itens_empenho_has_Fatura_Fatura1_idx` (`fatura_num_nf` ASC),
  INDEX `fk_itens_fatura_itens_empenho1_idx` (`cod_empenho` ASC, `cod_item` ASC, `cod_tipo_item` ASC),
  CONSTRAINT `fk_itens_empenho_has_Fatura_Fatura1`
    FOREIGN KEY (`fatura_num_nf`)
    REFERENCES `cidades_digitais_v8`.`fatura` (`num_nf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_fatura_itens_empenho1`
    FOREIGN KEY (`cod_empenho` , `cod_item` , `cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`itens_empenho` (`cod_empenho` , `cod_item` , `cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`fatura_otb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`fatura_otb` (
  `fatura_num_nf` INT NOT NULL,
  `otb_cod_otb` INT NOT NULL,
  PRIMARY KEY (`fatura_num_nf`, `otb_cod_otb`),
  INDEX `fk_Fatura_has_otb_otb1_idx` (`otb_cod_otb` ASC),
  INDEX `fk_Fatura_has_otb_Fatura1_idx` (`fatura_num_nf` ASC),
  CONSTRAINT `fk_Fatura_has_otb_Fatura1`
    FOREIGN KEY (`fatura_num_nf`)
    REFERENCES `cidades_digitais_v8`.`fatura` (`num_nf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Fatura_has_otb_otb1`
    FOREIGN KEY (`otb_cod_otb`)
    REFERENCES `cidades_digitais_v8`.`otb` (`cod_otb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cidades_digitais_v8`.`itens_otb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades_digitais_v8`.`itens_otb` (
  `otb_cod_otb` INT NOT NULL,
  `itens_fatura_fatura_num_nf` INT NOT NULL,
  `cod_item` INT NOT NULL,
  `cod_tipo_item` INT NOT NULL,
  `cod_empenho` VARCHAR(12) NOT NULL,
  `valor` FLOAT NULL,
  `quantidade` INT NULL,
  PRIMARY KEY (`otb_cod_otb`, `itens_fatura_fatura_num_nf`, `cod_item`, `cod_tipo_item`),
  INDEX `fk_itens_fatura_has_otb_otb1_idx` (`otb_cod_otb` ASC),
  INDEX `fk_itens_otb_itens_fatura1_idx` (`itens_fatura_fatura_num_nf` ASC, `cod_empenho` ASC, `cod_item` ASC, `cod_tipo_item` ASC),
  CONSTRAINT `fk_itens_fatura_has_otb_otb1`
    FOREIGN KEY (`otb_cod_otb`)
    REFERENCES `cidades_digitais_v8`.`otb` (`cod_otb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_otb_itens_fatura1`
    FOREIGN KEY (`itens_fatura_fatura_num_nf` , `cod_empenho` , `cod_item` , `cod_tipo_item`)
    REFERENCES `cidades_digitais_v8`.`itens_fatura` (`fatura_num_nf` , `cod_empenho` , `cod_item` , `cod_tipo_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

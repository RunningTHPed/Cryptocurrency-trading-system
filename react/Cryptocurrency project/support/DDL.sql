CREATE TABLE IF NOT EXISTS `Post_information` (
  `postCode` VARCHAR(5) NOT NULL,
  `province` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  PRIMARY KEY (`postCode`));
  
  CREATE TABLE IF NOT EXISTS `Class_information` (
  `classNumber` INT NOT NULL,
  `classname` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `requirment` VARCHAR(45) NULL,
  PRIMARY KEY (`classNumber`));
  
  CREATE TABLE IF NOT EXISTS `User_information` (
  `id_card` VARCHAR(13) NOT NULL,
  `ClassNumber` INT NULL,
  `postCode` VARCHAR(5) NULL,
  `fnameTH` VARCHAR(45) NULL,
  `lnameTH` VARCHAR(45) NULL,
  `fnameEng` VARCHAR(45) NULL,
  `lnameEng` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `birthdate` DATE NULL,
  `gender` VARCHAR(10) NULL,
  `marriage_status` VARCHAR(10) NULL,
  `behind_id_card` VARCHAR(45) NULL,
  `phone_number` VARCHAR(10) NULL,
  `address` VARCHAR(45) NULL,
  PRIMARY KEY (`id_card`));
  
  CREATE TABLE IF NOT EXISTS `Sub_district` (
  `postCode` VARCHAR(5) NOT NULL,
  `sub_district_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`sub_district_name`, `postCode`));
  
  CREATE TABLE IF NOT EXISTS `Bank_information` (
  `bankshortname` VARCHAR(5) NOT NULL,
  `bankName` VARCHAR(45) NULL,
  `bankIcon` VARCHAR(45) NULL,
  PRIMARY KEY (`bankshortname`));
  
  CREATE TABLE IF NOT EXISTS `Payment_information` (
  `account_id` VARCHAR(45) NOT NULL,
  `bankshortname` VARCHAR(5) NOT NULL,
  `id_card` VARCHAR(13) NULL,
  `branch` VARCHAR(45) NULL,
  `account_name` VARCHAR(45) NULL,
  PRIMARY KEY (`account_id`, `bankshortname`));
  
  CREATE TABLE IF NOT EXISTS `Coin_order` (
  `id_card` VARCHAR(13) NOT NULL,
  `time_order` TIMESTAMP NOT NULL,
  `shortname` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  `price_per_coin` VARCHAR(45) NULL,
  `coin` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id_card`, `time_order`));
  
CREATE TABLE IF NOT EXISTS `Coin_information` (
  `shortname` VARCHAR(45) NOT NULL,
  `coin_name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`shortname`));
  
  
CREATE TABLE IF NOT EXISTS `Coin_view_history` (
  `id_card` VARCHAR(13) NOT NULL,
  `start_view_time` TIMESTAMP NOT NULL,
  `Coin_view_historycol` VARCHAR(45) NULL,
  PRIMARY KEY (`id_card`, `start_view_time`));

CREATE TABLE IF NOT EXISTS `Login_history` (
  `id_card` VARCHAR(13) NOT NULL,
  `time` TIMESTAMP NOT NULL,
  `IPaddress` VARCHAR(45) NULL,
  PRIMARY KEY (`id_card`, `time`));

CREATE TABLE IF NOT EXISTS `THB_transaction_history` (
  `TXNcode` VARCHAR(45) NOT NULL,
  `account_id` VARCHAR(45) NULL,
  `type` INT NULL,
  `value` DOUBLE NULL,
  `time` TIMESTAMP NULL,
  `fee` DOUBLE NULL,
  PRIMARY KEY (`TXNcode`));
  
  
CREATE TABLE IF NOT EXISTS `Coin_transaction_history` (
  `time_finish` TIMESTAMP NOT NULL,
  `id_card` VARCHAR(13) NULL,
  `shortname` VARCHAR(45) NULL,
  `time_order` TIMESTAMP NULL,
  `type` INT NULL,
  `value` DOUBLE NULL,
  `price` DOUBLE NULL,
  `fee` DOUBLE NULL,
  PRIMARY KEY (`time_finish`));
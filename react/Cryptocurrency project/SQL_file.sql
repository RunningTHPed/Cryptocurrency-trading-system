CREATE DATABASE  IF NOT EXISTS `Uncle` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Uncle`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: Uncle
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.21.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bank_information`
--

DROP TABLE IF EXISTS `Bank_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bank_information` (
  `bankshortname` varchar(45) NOT NULL,
  `bankName` varchar(45) DEFAULT NULL,
  `bankicon` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bankshortname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bank_information`
--

LOCK TABLES `Bank_information` WRITE;
/*!40000 ALTER TABLE `Bank_information` DISABLE KEYS */;
INSERT INTO `Bank_information` VALUES ('BAY','Bank of Ayudhya',NULL),('BBL','Bangkok Bank',NULL),('CIMB','CIMB THAI',NULL),('KBANK','Kasikornbank',NULL),('KTB','Krungthai Bank',NULL),('LH','LH Bank',NULL),('SCB','Siam Commercial Bank',NULL),('TBANK','Thanachart Bank',NULL),('TMB','TMB Bank',NULL),('UOB','UOB Personal Internet Banking',NULL);
/*!40000 ALTER TABLE `Bank_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coin_deposite_withdraw`
--

DROP TABLE IF EXISTS `Coin_deposite_withdraw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coin_deposite_withdraw` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_card` varchar(13) NOT NULL,
  `value` double NOT NULL,
  `shortname` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_card_idx` (`id_card`),
  CONSTRAINT `id_card` FOREIGN KEY (`id_card`) REFERENCES `user_information` (`id_card`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coin_deposite_withdraw`
--

LOCK TABLES `Coin_deposite_withdraw` WRITE;
/*!40000 ALTER TABLE `Coin_deposite_withdraw` DISABLE KEYS */;
INSERT INTO `Coin_deposite_withdraw` VALUES (1,'1111111111111',100,'PON'),(2,'1111111111111',50,'PON'),(3,'1111111111111',20,'PON'),(4,'1111111111111',50,'PON'),(5,'1111111111111',30,'PON'),(6,'1479900448357',1000,'PON'),(7,'1111111111111',30,'PON'),(8,'1111111111111',30,'PON'),(9,'1111111111111',2500,'BRB'),(10,'4455221130857',20,'PON'),(11,'4455221130857',40,'PON'),(12,'4455221130857',500,'PON');
/*!40000 ALTER TABLE `Coin_deposite_withdraw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coin_information`
--

DROP TABLE IF EXISTS `Coin_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coin_information` (
  `shortname` varchar(5) NOT NULL,
  `coin_name` varchar(45) NOT NULL,
  `describtion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`shortname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coin_information`
--

LOCK TABLES `Coin_information` WRITE;
/*!40000 ALTER TABLE `Coin_information` DISABLE KEYS */;
INSERT INTO `Coin_information` VALUES ('BRB','Barabank',NULL),('PON','Unclepon coin',NULL);
/*!40000 ALTER TABLE `Coin_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Login_history`
--

DROP TABLE IF EXISTS `Login_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Login_history` (
  `id_card` varchar(45) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IPaddress` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_card`,`time`),
  CONSTRAINT `userInfoToLoginhist` FOREIGN KEY (`id_card`) REFERENCES `user_information` (`id_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Login_history`
--

LOCK TABLES `Login_history` WRITE;
/*!40000 ALTER TABLE `Login_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `Login_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment_information`
--

DROP TABLE IF EXISTS `Payment_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment_information` (
  `account_id` varchar(45) NOT NULL,
  `bankshortname` varchar(45) NOT NULL,
  `id_card` varchar(13) NOT NULL,
  `branch` varchar(45) NOT NULL,
  `account_name` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_id`,`bankshortname`),
  KEY `fk_Bank_idx` (`bankshortname`),
  KEY `idCardToPayment_idx` (`id_card`),
  CONSTRAINT `fk_Bank` FOREIGN KEY (`bankshortname`) REFERENCES `Bank_information` (`bankshortname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_infomation` FOREIGN KEY (`id_card`) REFERENCES `user_information` (`id_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment_information`
--

LOCK TABLES `Payment_information` WRITE;
/*!40000 ALTER TABLE `Payment_information` DISABLE KEYS */;
INSERT INTO `Payment_information` VALUES ('1234567890','SCB','123123','CNX','pleumjai_wallet','PRIMARY'),('147258369','KBANK','1234567891234','ทุ่งครุ','มานี มานะ','PRIMARY'),('191','KTB','123','CNX','191','PRIMARY'),('192444','KTB','1111111111111','เพชรบุรี','ภาวิต ภูขามคม','PRIMARY'),('4567891236','KBANK','4455221130857','เจริญมาก','บอท น้อย','PRIMARY'),('5218764','KBANK','1479900448357','กรุงเทพ','Jatumongkon','PRIMARY');
/*!40000 ALTER TABLE `Payment_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_information`
--

DROP TABLE IF EXISTS `Post_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post_information` (
  `PostCode` varchar(45) NOT NULL,
  `province` varchar(45) DEFAULT NULL,
  `district` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PostCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_information`
--

LOCK TABLES `Post_information` WRITE;
/*!40000 ALTER TABLE `Post_information` DISABLE KEYS */;
INSERT INTO `Post_information` VALUES ('10000','BKK','MuangKrung'),('20000','SAK','MuangSakonNakhon'),('30000','HKT','MuangPhuket'),('40000','KKN','MuangKhonkaen'),('50000','CNX','MuangChiangmai');
/*!40000 ALTER TABLE `Post_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sub_district`
--

DROP TABLE IF EXISTS `Sub_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sub_district` (
  `PostCode` varchar(45) NOT NULL,
  `sub_district_name` varchar(45) NOT NULL,
  PRIMARY KEY (`PostCode`,`sub_district_name`),
  CONSTRAINT `postcodeToSubdistrict` FOREIGN KEY (`PostCode`) REFERENCES `Post_information` (`PostCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sub_district`
--

LOCK TABLES `Sub_district` WRITE;
/*!40000 ALTER TABLE `Sub_district` DISABLE KEYS */;
INSERT INTO `Sub_district` VALUES ('10000','ThungKhru'),('20000','BannKokkok'),('30000','Phuket'),('40000','NaiMuang'),('50000','Hangdong');
/*!40000 ALTER TABLE `Sub_district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `THB_transaction_history`
--

DROP TABLE IF EXISTS `THB_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `THB_transaction_history` (
  `TXNcode` int NOT NULL AUTO_INCREMENT,
  `id_card` varchar(13) NOT NULL,
  `type` int NOT NULL,
  `value` varchar(45) NOT NULL,
  `time` varchar(45) NOT NULL,
  `fee` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`TXNcode`),
  KEY `userInfoToTHBtransaction_idx` (`id_card`),
  CONSTRAINT `userInfoToTHBtransaction` FOREIGN KEY (`id_card`) REFERENCES `user_information` (`id_card`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `THB_transaction_history`
--

LOCK TABLES `THB_transaction_history` WRITE;
/*!40000 ALTER TABLE `THB_transaction_history` DISABLE KEYS */;
INSERT INTO `THB_transaction_history` VALUES (23,'1479900448357',1,'50','15:09:07','0'),(24,'9999444',1,'0','15:37:23','0'),(25,'9999444',1,'20','15:38:00','0'),(28,'9999444',0,'-20','15:42:08','0'),(29,'9999444',1,'200','15:47:07','0'),(30,'9999444',0,'-200','15:50:20','0'),(31,'9999444',1,'50000','15:50:36','0'),(32,'9999444',0,'-20000','15:51:01','0'),(33,'123123',1,'0','23:02:24','0'),(34,'1111111111111',1,'0','23:54:27','0'),(35,'1479900448357',1,'100000','19:28:01','0'),(36,'1479900448357',1,'50','19:36:38','0'),(37,'1479900448357',1,'5','19:39:10','0'),(38,'1479900448357',1,'50','20:03:25','0'),(39,'1111111111111',1,'10000','22:04:51','0'),(40,'123',1,'10000000','23:22:28','0'),(41,'1479900448357',0,'-1000','18:23:27','0'),(42,'1479900448357',0,'-1000','18:23:55','0'),(43,'123123',1,'5724.85','13:53:39','0'),(44,'123123',1,'1000000','13:55:44','0'),(45,'4455221130857',1,'0','16:03:39','0'),(46,'4455221130857',0,'-0','16:06:29','0'),(47,'4455221130857',1,'1000','16:06:54','0'),(48,'1479900448357',1,'200000','20:23:16','0'),(49,'1479900448357',1,'1000','23:24:51','0'),(50,'1479900448357',0,'-2000','23:25:11','0'),(51,'1479900448357',1,'1000','23:34:03','0'),(52,'1479900448357',0,'-2000','23:34:28','0'),(53,'1234567891234',1,'0','12:46:39','0'),(54,'1234567891234',1,'1000','13:15:47','0'),(55,'1234567891234',0,'-200','13:16:30','0'),(56,'1234567891234',0,'-800','13:16:37','0'),(57,'1234567891234',1,'100','13:16:48','0');
/*!40000 ALTER TABLE `THB_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `buy_order_view`
--

DROP TABLE IF EXISTS `buy_order_view`;
/*!50001 DROP VIEW IF EXISTS `buy_order_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `buy_order_view` AS SELECT 
 1 AS `no`,
 1 AS `id_card`,
 1 AS `time_order`,
 1 AS `shortname`,
 1 AS `type`,
 1 AS `price`,
 1 AS `price_per_coin`,
 1 AS `coin`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `class_information`
--

DROP TABLE IF EXISTS `class_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_information` (
  `classname` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `requirment` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`classname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_information`
--

LOCK TABLES `class_information` WRITE;
/*!40000 ALTER TABLE `class_information` DISABLE KEYS */;
INSERT INTO `class_information` VALUES ('admin',NULL,NULL),('user',NULL,NULL);
/*!40000 ALTER TABLE `class_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coin_order`
--

DROP TABLE IF EXISTS `coin_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_order` (
  `no` int NOT NULL AUTO_INCREMENT,
  `id_card` varchar(13) DEFAULT NULL,
  `time_order` timestamp NOT NULL,
  `shortname` varchar(5) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `price_per_coin` double DEFAULT NULL,
  `coin` double DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `fk_user_information_idx` (`id_card`),
  KEY `fk_coin_information_idx` (`shortname`),
  CONSTRAINT `fk_coin_information` FOREIGN KEY (`shortname`) REFERENCES `Coin_information` (`shortname`),
  CONSTRAINT `fk_user_information` FOREIGN KEY (`id_card`) REFERENCES `user_information` (`id_card`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_order`
--

LOCK TABLES `coin_order` WRITE;
/*!40000 ALTER TABLE `coin_order` DISABLE KEYS */;
INSERT INTO `coin_order` VALUES (103,'1479900448357','2021-06-03 17:49:51','PON',0,500,50,0,1),(104,'1111111111111','2021-06-03 17:49:56','PON',1,300,10,0,1),(105,'1479900448357','2021-06-03 17:50:37','PON',0,50,10,0,1),(106,'1479900448357','2021-06-03 17:51:11','PON',0,150,10,0,1),(107,'1111111111111','2021-06-04 15:16:06','PON',0,500,50,0,1),(108,'1111111111111','2021-06-04 16:17:32','PON',1,7000,70,100,0),(110,'1479900448357','2021-06-04 17:15:08','PON',1,0,40,0,1),(111,'1479900448357','2021-06-04 17:22:02','PON',0,0,20,0,1),(112,'1479900448357','2021-06-04 17:22:59','PON',1,300,30,0,1),(113,'1479900448357','2021-06-04 17:25:14','PON',1,449.84999999999997,29.99,0,1),(114,'1479900448357','2021-06-04 17:25:50','PON',1,209.29999999999998,29.9,0,1),(115,'1111111111111','2021-06-04 19:05:53','PON',0,210,30,0,1),(116,'1479900448357','2021-06-05 08:26:04','PON',1,440,22,0,1),(117,'1111111111111','2021-06-05 08:34:55','PON',0,150,15,10,0),(118,'1479900448357','2021-06-05 08:35:10','PON',1,1035,23,0,1),(119,'123123','2021-06-05 08:35:55','PON',0,0,35,0,1),(120,'1479900448357','2021-06-05 08:40:15','PON',0,1500,20,75,0),(121,'1479900448357','2021-06-05 08:40:45','PON',0,1000,19,52.63157894736842,0),(122,'1479900448357','2021-06-05 08:41:04','PON',1,440,44,10,0),(123,'1479900448357','2021-06-05 08:41:16','PON',1,675,45,15,0),(126,'1111111111111','2021-06-05 08:45:12','PON',0,0,36,0,1),(127,'1111111111111','2021-06-05 16:45:29','BRB',1,1500,125,0,1),(128,'1479900448357','2021-06-05 16:46:24','BRB',0,2500,125,0,1),(129,'1111111111111','2021-06-05 16:47:04','BRB',1,976,122,0,1),(130,'1111111111111','2021-06-05 16:50:44','BRB',1,1240,124,0,1),(131,'1479900448357','2021-06-05 16:51:05','BRB',0,1240,10,124,0),(132,'1479900448357','2021-06-05 16:52:25','BRB',0,1240,124,0,1),(133,'1479900448357','2021-06-05 16:53:04','BRB',0,247,123.5,0,1),(134,'1479900448357','2021-06-05 16:53:19','BRB',1,247,123.5,0,1),(135,'1111111111111','2021-06-05 16:55:29','BRB',1,247,123.5,0,1),(136,'1111111111111','2021-06-05 16:55:46','BRB',1,246,123,0,1),(137,'1111111111111','2021-06-05 16:56:27','BRB',0,250,125,0,1),(138,'1111111111111','2021-06-05 16:57:06','BRB',1,1743,124.5,0,1),(139,'1479900448357','2021-06-05 16:58:03','BRB',1,247,123.5,0,1),(140,'1479900448357','2021-06-05 16:59:15','BRB',0,2,123.5,0,1),(141,'1479900448357','2021-06-05 17:01:13','BRB',0,245,123.5,0,1),(142,'1111111111111','2021-06-05 17:01:58','BRB',0,247,123.5,0,1),(143,'1479900448357','2021-06-05 17:02:40','BRB',0,1743,124.5,0,1),(145,'1111111111111','2021-06-05 17:06:48','BRB',1,1075,125,8.6,0),(146,'1479900448357','2021-06-05 17:07:15','BRB',0,6175,123.5,50,0),(147,'123123','2021-06-06 06:56:00','PON',0,0,1000,0,1),(148,'1479900448357','2021-06-06 08:37:03','PON',1,0,36,0,1),(149,'1479900448357','2021-06-06 08:41:46','PON',1,0,35,0,1),(150,'1111111111111','2021-06-06 08:44:50','PON',0,0,40,0,1),(151,'1111111111111','2021-06-06 08:46:44','PON',1,0,20,0,1),(152,'4455221130857','2021-06-06 09:08:17','PON',0,300,22,13.636363636363637,0),(153,'4455221130857','2021-06-06 09:08:52','PON',0,250,23,10.869565217391305,0),(154,'4455221130857','2021-06-06 09:09:19','PON',0,52.00000000000001,24,2.166666666666667,0),(155,'4455221130857','2021-06-06 09:10:31','PON',0,0,25,0,1),(156,'4455221130857','2021-06-06 09:13:44','PON',1,2100,35,60,0),(157,'4455221130857','2021-06-06 09:14:24','PON',1,102,34,3,0),(158,'4455221130857','2021-06-06 09:14:46','PON',1,0,33,0,1),(161,'1479900448357','2021-06-06 09:30:29','PON',0,0,33,0,1),(165,'1479900448357','2021-06-06 16:52:47','PON',0,0,34,0,1),(166,'1479900448357','2021-06-06 16:53:43','PON',1,0,25,0,1),(167,'1479900448357','2021-06-06 17:02:14','PON',0,0,34,0,1),(168,'1479900448357','2021-06-06 17:12:33','PON',0,0,34,0,1),(169,'1479900448357','2021-06-06 17:30:52','PON',0,0,34,0,1),(170,'1479900448357','2021-06-06 17:34:10','PON',0,0,34,0,1),(171,'1479900448357','2021-06-06 17:50:20','PON',0,215,21.5,10,0),(172,'1479900448357','2021-06-06 17:50:43','PON',1,800,40,20,0),(173,'1479900448357','2021-06-06 17:51:15','PON',0,0,34,0,1),(174,'1479900448357','2021-06-06 17:51:49','PON',1,0,24,0,1),(175,'1479900448357','2021-06-07 05:54:30','BRB',0,0,125,0,1),(176,'1479900448357','2021-06-07 05:55:01','BRB',1,1860,124,15,0),(178,'1479900448357','2021-06-07 05:55:45','BRB',1,3666,123.8,29.61227786752827,0),(179,'123','2021-06-07 05:56:56','BRB',0,0,123.8,0,1),(180,'123','2021-06-07 05:57:41','BRB',1,0,123.5,0,1);
/*!40000 ALTER TABLE `coin_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coin_transaction_history`
--

DROP TABLE IF EXISTS `coin_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_transaction_history` (
  `time_finish` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_card` varchar(13) NOT NULL,
  `time_order` timestamp NOT NULL,
  `shortname` varchar(5) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `value` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `fee` double DEFAULT '0',
  `no_order` int NOT NULL,
  PRIMARY KEY (`time_finish`,`id_card`),
  KEY `no_order_idx` (`no_order`),
  KEY `userinfo_to_coin_transaction_idx` (`id_card`),
  KEY `coinifo_to_coin_transaction_idx` (`shortname`),
  CONSTRAINT `coinifo_to_coin_transaction` FOREIGN KEY (`shortname`) REFERENCES `Coin_information` (`shortname`),
  CONSTRAINT `no_order` FOREIGN KEY (`no_order`) REFERENCES `coin_order` (`no`),
  CONSTRAINT `userinfo_to_coin_transaction` FOREIGN KEY (`id_card`) REFERENCES `user_information` (`id_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_transaction_history`
--

LOCK TABLES `coin_transaction_history` WRITE;
/*!40000 ALTER TABLE `coin_transaction_history` DISABLE KEYS */;
INSERT INTO `coin_transaction_history` VALUES ('2021-06-03 17:49:56','1479900448357','2021-06-03 17:49:51','PON',0,10,100,0,103),('2021-06-03 17:49:57','1111111111111','2021-06-03 17:49:56','PON',1,10,100,0,104),('2021-06-03 17:50:37','1111111111111','2021-06-03 17:49:56','PON',1,5,50,0,104),('2021-06-03 17:50:37','1479900448357','2021-06-03 17:50:37','PON',0,5,50,0,105),('2021-06-03 17:51:11','1111111111111','2021-06-03 17:49:56','PON',1,15,150,0,104),('2021-06-03 17:51:11','1479900448357','2021-06-03 17:51:11','PON',0,15,150,0,106),('2021-06-04 17:15:08','1111111111111','2021-06-04 15:16:06','PON',0,10,400,0,107),('2021-06-04 17:15:08','1479900448357','2021-06-04 17:15:08','PON',1,10,400,0,110),('2021-06-04 19:05:54','1111111111111','2021-06-04 19:05:53','PON',0,7,209.29999999999998,0,115),('2021-06-04 19:05:54','1479900448357','2021-06-04 17:25:50','PON',1,7,209.29999999999998,0,114),('2021-06-05 08:35:56','123123','2021-06-05 08:35:55','PON',0,20,440,0,119),('2021-06-05 08:35:56','1479900448357','2021-06-05 08:26:04','PON',1,20,440,0,116),('2021-06-05 08:40:16','123123','2021-06-05 08:35:55','PON',0,45,1035,0,119),('2021-06-05 08:40:16','1479900448357','2021-06-05 08:35:10','PON',1,45,1035,0,118),('2021-06-05 08:40:46','123123','2021-06-05 08:35:55','PON',0,15,449.84999999999997,0,119),('2021-06-05 08:40:46','1479900448357','2021-06-04 17:25:14','PON',1,15,449.84999999999997,0,113),('2021-06-05 08:41:05','123123','2021-06-05 08:35:55','PON',0,10,300,0,119),('2021-06-05 08:41:05','1479900448357','2021-06-04 17:22:59','PON',1,10,300,0,112),('2021-06-05 16:46:25','1111111111111','2021-06-05 16:45:29','BRB',1,12,1500,0,127),('2021-06-05 16:46:25','1479900448357','2021-06-05 16:46:24','BRB',0,12,1500,0,128),('2021-06-05 16:47:05','1111111111111','2021-06-05 16:47:04','BRB',1,8,976,0,129),('2021-06-05 16:47:05','1479900448357','2021-06-05 16:46:24','BRB',0,8,976,0,128),('2021-06-05 16:52:26','1111111111111','2021-06-05 16:50:44','BRB',1,10,1240,0,130),('2021-06-05 16:52:26','1479900448357','2021-06-05 16:52:25','BRB',0,10,1240,0,132),('2021-06-05 16:55:46','1111111111111','2021-06-05 16:55:46','BRB',1,2,246,0,136),('2021-06-05 16:55:46','1479900448357','2021-06-05 16:53:04','BRB',0,2,246,0,133),('2021-06-05 16:56:27','1111111111111','2021-06-05 16:56:27','BRB',0,2,247,0,137),('2021-06-05 16:56:28','1479900448357','2021-06-05 16:53:19','BRB',1,2,247,0,134),('2021-06-05 16:59:16','1111111111111','2021-06-05 16:55:29','BRB',1,0.016194331983805668,2,0,135),('2021-06-05 16:59:16','1479900448357','2021-06-05 16:59:15','BRB',0,0.016194331983805668,2,0,140),('2021-06-05 17:01:13','1111111111111','2021-06-05 16:55:29','BRB',1,1.9838056680161944,245,0,135),('2021-06-05 17:01:13','1479900448357','2021-06-05 17:01:13','BRB',0,1.9838056680161944,245,0,141),('2021-06-05 17:01:59','1111111111111','2021-06-05 17:01:58','BRB',0,2,247,0,142),('2021-06-05 17:01:59','1479900448357','2021-06-05 16:58:03','BRB',1,2,247,0,139),('2021-06-05 17:02:40','1479900448357','2021-06-05 17:02:40','BRB',0,14,1743,0,143),('2021-06-05 17:02:41','1111111111111','2021-06-05 16:57:06','BRB',1,14,1743,0,138),('2021-06-06 06:56:01','123123','2021-06-06 06:56:00','PON',0,10,400,0,147),('2021-06-06 06:56:01','1479900448357','2021-06-04 17:15:08','PON',1,10,400,0,110),('2021-06-06 08:37:03','1111111111111','2021-06-05 08:45:12','PON',0,20,720,0,126),('2021-06-06 08:37:03','1479900448357','2021-06-06 08:37:03','PON',1,20,720,0,148),('2021-06-06 08:41:47','123123','2021-06-05 08:35:55','PON',0,10,350,0,119),('2021-06-06 08:41:47','1479900448357','2021-06-06 08:41:46','PON',1,10,350,0,149),('2021-06-06 08:44:51','1111111111111','2021-06-06 08:44:50','PON',0,180,7200,0,150),('2021-06-06 08:44:51','1479900448357','2021-06-04 17:15:08','PON',1,180,7200,0,110),('2021-06-06 08:46:44','1111111111111','2021-06-06 08:46:44','PON',1,1,20,0,151),('2021-06-06 08:46:44','1479900448357','2021-06-04 17:22:02','PON',0,1,20,0,111),('2021-06-06 09:30:30','1479900448357','2021-06-06 09:30:29','PON',0,45,1485,0,161),('2021-06-06 09:30:30','4455221130857','2021-06-06 09:14:46','PON',1,45,1485,0,158),('2021-06-06 16:52:48','1479900448357','2021-06-06 16:52:47','PON',0,2,68,0,165),('2021-06-06 16:52:48','4455221130857','2021-06-06 09:14:24','PON',1,2,68,0,157),('2021-06-06 16:53:43','1479900448357','2021-06-06 16:53:43','PON',1,12,300,0,166),('2021-06-06 16:53:43','4455221130857','2021-06-06 09:10:31','PON',0,12,300,0,155),('2021-06-06 17:02:15','1479900448357','2021-06-06 17:02:14','PON',0,2,68,0,167),('2021-06-06 17:02:15','4455221130857','2021-06-06 09:14:24','PON',1,2,68,0,157),('2021-06-06 17:12:33','1479900448357','2021-06-06 17:12:33','PON',0,2,68,0,168),('2021-06-06 17:12:33','4455221130857','2021-06-06 09:14:24','PON',1,2,68,0,157),('2021-06-06 17:30:52','1479900448357','2021-06-06 17:30:52','PON',0,2,68,0,169),('2021-06-06 17:30:52','4455221130857','2021-06-06 09:14:24','PON',1,2,68,0,157),('2021-06-06 17:34:11','1479900448357','2021-06-06 17:34:10','PON',0,2,68,0,170),('2021-06-06 17:34:11','4455221130857','2021-06-06 09:14:24','PON',1,2,68,0,157),('2021-06-06 17:51:16','1479900448357','2021-06-06 17:51:15','PON',0,2,68,0,173),('2021-06-06 17:51:16','4455221130857','2021-06-06 09:14:24','PON',1,2,68,0,157),('2021-06-06 17:51:50','1479900448357','2021-06-06 17:51:49','PON',1,2,48,0,174),('2021-06-06 17:51:50','4455221130857','2021-06-06 09:09:19','PON',0,2,48,0,154),('2021-06-07 05:54:31','1111111111111','2021-06-05 17:06:48','BRB',1,6.4,800,0,145),('2021-06-07 05:54:31','1479900448357','2021-06-07 05:54:30','BRB',0,6.4,800,0,175),('2021-06-07 05:56:57','123','2021-06-07 05:56:56','BRB',0,40.38772213247173,5000,0,179),('2021-06-07 05:56:57','1479900448357','2021-06-07 05:55:45','BRB',1,40.38772213247173,5000,0,178),('2021-06-07 05:57:43','123','2021-06-07 05:57:41','BRB',1,50,6175,0,180),('2021-06-07 05:57:43','1479900448357','2021-06-05 17:07:15','BRB',0,50,6175,0,146);
/*!40000 ALTER TABLE `coin_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `sell_order_view`
--

DROP TABLE IF EXISTS `sell_order_view`;
/*!50001 DROP VIEW IF EXISTS `sell_order_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `sell_order_view` AS SELECT 
 1 AS `no`,
 1 AS `id_card`,
 1 AS `time_order`,
 1 AS `shortname`,
 1 AS `type`,
 1 AS `price`,
 1 AS `price_per_coin`,
 1 AS `coin`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_information`
--

DROP TABLE IF EXISTS `user_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_information` (
  `id_card` varchar(13) NOT NULL,
  `fnameTH` varchar(45) DEFAULT NULL,
  `lnameTH` varchar(45) DEFAULT NULL,
  `fnameEN` varchar(45) DEFAULT NULL,
  `lnameEN` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `Birthdate` date DEFAULT NULL,
  `Gender` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `BehindID` varchar(45) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `role` varchar(45) DEFAULT 'user',
  `PostCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_card`),
  KEY `role_idx` (`role`),
  KEY `postcode_idx` (`PostCode`),
  CONSTRAINT `postcode` FOREIGN KEY (`PostCode`) REFERENCES `Post_information` (`PostCode`),
  CONSTRAINT `role` FOREIGN KEY (`role`) REFERENCES `class_information` (`classname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_information`
--

LOCK TABLES `user_information` WRITE;
/*!40000 ALTER TABLE `user_information` DISABLE KEYS */;
INSERT INTO `user_information` VALUES ('1111111111111','ภาวิต','ภูขามคม','Phawit','Pukamkom','phawit.warn@mail.kmutt.ac.th','$2b$10$vL5i6wiHGJ9VekU.htUN2OXEzdAMsYqREGqfkJhR5rz..U./WP5oa','2001-01-24','Male','Single','999999','0999999999','KMUTT','admin','10000'),('123','ปลื้ม','ใจ','ปลื้ม','ใจ','pleumjai@yahool.com','$2b$10$H2e/KqtQ4LgPmjEYh2YyIuO4RRBhsRZBOEQsAQ5zZ.fvaMHwb0pf6','2000-12-12','Male','Married','123','123456789','ban deaw kub wan','admin','50000'),('123123','ปลื้ม2','ใจ','ปลื้ม2','ใจ2','pleumjai2@yahool.com','$2b$10$Q6eoqlITf10ctCIZT8Tuj.ty76XVnYhw3Vla/NvmN3hj1pM.eE8aa','2000-12-12','Male','Married','123123','บ่บอก','บ่บอก','user','50000'),('1234567891234','มานี','มานะ','Manee','Mana','manee@gmail.com','$2b$10$nLlmaUN2SzyIzZnwWT8GiuRXMTN780mHmjrQ7hmQo9rxQf.6.RXc6','2017-11-16','Male','Single','SE-555','0871454988','45/9 ถนนเจริญกรุง','user','50000'),('1479900448357','จัตุมงคล','สุขศรีนวล','Jatumongkon','Suksrinuan','pedja@mail.com','$2b$10$WsMge8WrZ0BkymlQ7T7GEuP4rwURgHYYjnQuAAJbTO3SEsrpGj4VG','2000-07-09','Male','Single','SE-4527','0871757928','49/785 Ped','user','30000'),('4455221130857','บอท','น้อย','bot','noi','botnoi@mail.com','$2b$10$LOVuX/r9Akz/3EJg26MV/.Mn/NzG1Ga.GvQZF9YDhhu0iZ7jOcFH.','2014-06-18','Female','Single','FF-875-F5','0699999999','75 ถนนเจริญมาก ไม่มียางมะตอย','user','20000'),('9999444','ภาคิน','กลิ่นคะจอน','Pakin','Kinkajon','pakin@fackbook.com','$2b$10$3omTwWmj1QkSA2oZrVPjnOj.PxruMsoGdHdXip62QcCVYPRhlo1.S','2019-05-08','Male','Single','445-7852','0911234587','54/523','user','10000');
/*!40000 ALTER TABLE `user_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `buy_order_view`
--

/*!50001 DROP VIEW IF EXISTS `buy_order_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `buy_order_view` AS select `coin_order`.`no` AS `no`,`coin_order`.`id_card` AS `id_card`,`coin_order`.`time_order` AS `time_order`,`coin_order`.`shortname` AS `shortname`,`coin_order`.`type` AS `type`,`coin_order`.`price` AS `price`,`coin_order`.`price_per_coin` AS `price_per_coin`,`coin_order`.`coin` AS `coin`,`coin_order`.`status` AS `status` from `coin_order` where ((`coin_order`.`type` = 0) and (`coin_order`.`status` = 0)) order by `coin_order`.`price_per_coin` desc,`coin_order`.`time_order` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sell_order_view`
--

/*!50001 DROP VIEW IF EXISTS `sell_order_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `sell_order_view` AS select `coin_order`.`no` AS `no`,`coin_order`.`id_card` AS `id_card`,`coin_order`.`time_order` AS `time_order`,`coin_order`.`shortname` AS `shortname`,`coin_order`.`type` AS `type`,`coin_order`.`price` AS `price`,`coin_order`.`price_per_coin` AS `price_per_coin`,`coin_order`.`coin` AS `coin`,`coin_order`.`status` AS `status` from `coin_order` where ((`coin_order`.`type` = 1) and (`coin_order`.`status` = 0)) order by `coin_order`.`price_per_coin`,`coin_order`.`time_order` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-07 15:21:50

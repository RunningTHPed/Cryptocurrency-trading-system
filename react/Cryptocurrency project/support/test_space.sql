-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: test_space
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `coin_order`
--

DROP TABLE IF EXISTS `coin_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_order` (
  `no_order` int NOT NULL AUTO_INCREMENT,
  `time_finish` time NOT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`no_order`,`time_finish`),
  KEY `time_finish_idx` (`time_finish`),
  KEY `price_idx` (`price`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_order`
--

LOCK TABLES `coin_order` WRITE;
/*!40000 ALTER TABLE `coin_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `coin_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coin_transaction_history`
--

DROP TABLE IF EXISTS `coin_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_transaction_history` (
  `no_transaction` int NOT NULL AUTO_INCREMENT,
  `time_finish` time NOT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`no_transaction`,`time_finish`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_transaction_history`
--

LOCK TABLES `coin_transaction_history` WRITE;
/*!40000 ALTER TABLE `coin_transaction_history` DISABLE KEYS */;
INSERT INTO `coin_transaction_history` VALUES (1,'16:56:05',15000),(2,'23:13:01',12000),(3,'23:30:23',20000),(4,'23:30:31',18000),(5,'23:30:45',14000),(6,'23:30:50',16000),(7,'23:30:53',25000),(8,'23:30:57',22000),(9,'23:31:01',23000);
/*!40000 ALTER TABLE `coin_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_contact`
--

DROP TABLE IF EXISTS `test_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_contact` (
  `ID` int DEFAULT NULL,
  `Customer_Id` int DEFAULT NULL,
  `Customer_Info` varchar(50) NOT NULL,
  `Type` varchar(50) NOT NULL,
  KEY `par_ind` (`Customer_Id`),
  CONSTRAINT `fk_customer` FOREIGN KEY (`Customer_Id`) REFERENCES `test_customer` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_contact`
--

LOCK TABLES `test_contact` WRITE;
/*!40000 ALTER TABLE `test_contact` DISABLE KEYS */;
INSERT INTO `test_contact` VALUES (NULL,1,'Joseph@javatpoint.com','email'),(NULL,1,'121-121-121','work'),(NULL,1,'123-123-123','home'),(NULL,2,'Mary@javatpoint.com','email'),(NULL,2,'Mary@javatpoint.com','email'),(NULL,2,'212-212-212','work');
/*!40000 ALTER TABLE `test_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_customer`
--

DROP TABLE IF EXISTS `test_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_customer` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_customer`
--

LOCK TABLES `test_customer` WRITE;
/*!40000 ALTER TABLE `test_customer` DISABLE KEYS */;
INSERT INTO `test_customer` VALUES (1,'Joseph','California'),(2,'Mary','NewYork');
/*!40000 ALTER TABLE `test_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_information`
--

DROP TABLE IF EXISTS `user_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_information` (
  `id_card` varchar(13) NOT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_information`
--

LOCK TABLES `user_information` WRITE;
/*!40000 ALTER TABLE `user_information` DISABLE KEYS */;
INSERT INTO `user_information` VALUES ('12345','Captain','America','steve@usa.com','5678','911');
/*!40000 ALTER TABLE `user_information` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-11 14:10:59

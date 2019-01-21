-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: customerplan
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customerplan`
--

DROP TABLE IF EXISTS `customerplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customerplan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `brandId` int(11) DEFAULT NULL,
  `saleDate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerplan`
--

LOCK TABLES `customerplan` WRITE;
/*!40000 ALTER TABLE `customerplan` DISABLE KEYS */;
INSERT INTO `customerplan` VALUES (52,'timestapTest',1,1,'2017-12-23 00:00:00',1,'2017-12-12 18:44:09'),(53,'updateTest',1,1,'2017-12-07 00:00:00',1,'2017-12-07 00:00:00'),(54,'updateTest2',1,1,'2017-12-07 00:00:00',2,'2017-12-07 00:00:00'),(55,'mytest1',2,1,'2017-12-07 00:00:00',1,'2017-12-12 18:31:21'),(56,'1',2,1,'2017-12-05 00:00:00',1,'2017-12-12 18:43:46');
/*!40000 ALTER TABLE `customerplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerplan_event`
--

DROP TABLE IF EXISTS `customerplan_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customerplan_event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerPlanId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=884 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerplan_event`
--

LOCK TABLES `customerplan_event` WRITE;
/*!40000 ALTER TABLE `customerplan_event` DISABLE KEYS */;
INSERT INTO `customerplan_event` VALUES (4,53,15,'2017-12-07 00:00:00','2017-12-07 00:00:00',1),(5,53,22,'2017-12-07 00:00:00','2017-12-07 00:00:00',1),(6,54,15,'2017-12-07 00:00:00','2017-12-07 00:00:00',1),(7,54,22,'2017-12-07 00:00:00','2017-12-07 00:00:00',1),(8,55,14,'2017-12-30 00:00:00','2018-01-01 00:00:00',1),(9,55,15,'2017-12-07 00:00:00','2017-12-07 00:00:00',2),(873,53,23,'2017-12-07 00:00:00','2017-12-07 00:00:00',2),(875,54,23,'2017-12-07 00:00:00','2017-12-07 00:00:00',2),(876,54,22,'2017-12-07 00:00:00','2017-12-07 00:00:00',2),(877,54,23,'2017-12-07 00:00:00','2017-12-07 00:00:00',2),(878,56,14,'2017-12-28 00:00:00','2017-12-11 00:00:00',1),(879,56,15,'2017-12-23 00:00:00','2017-12-06 00:00:00',2),(880,55,0,'2017-12-07 00:00:00','2017-12-07 00:00:00',3),(881,55,17,'2017-12-07 00:00:00','2017-12-01 00:00:00',3),(882,56,21,'2017-12-16 00:00:00','2017-12-13 00:00:00',3),(883,52,14,'2017-12-15 00:00:00','2017-12-15 00:00:00',1);
/*!40000 ALTER TABLE `customerplan_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventTypeId` int(11) DEFAULT NULL,
  `eventNo` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `englishName` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `mark` varchar(45) DEFAULT NULL,
  `effect` int(11) DEFAULT NULL,
  `allowTime` int(11) DEFAULT NULL,
  `remindTime` int(11) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `createMan` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateMan` int(11) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,1,'1','设计开始',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(2,1,'2','设计审核',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(3,1,'3','收到T/P',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(4,5,'4','色样信息寄工厂',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(5,2,'5','1ST FIT 离厂',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(6,2,'6','1ST FITS 意见',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(7,2,'7','手刮样确认',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(8,2,'8','色样确认',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(9,2,'9','改样收到',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(10,3,'10','销样面料品质确认',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(11,3,NULL,'销样订单给工厂',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(12,3,NULL,'改样寄出',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(13,3,NULL,'改样意见',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(14,3,NULL,'照片样基础',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(15,3,NULL,'销样PO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(16,3,NULL,'PO上传',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(17,3,NULL,'AFL GS1 CODE ALLOCATION',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(18,3,NULL,'ALLOCATION REPORTES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(19,3,NULL,'销样离厂',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(20,3,NULL,'销样试身样离厂',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(21,4,NULL,'销售开始',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(22,4,NULL,'销售结束',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_type`
--

DROP TABLE IF EXISTS `event_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `eventTypeNo` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `createMan` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateMan` int(11) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_type`
--

LOCK TABLES `event_type` WRITE;
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
INSERT INTO `event_type` VALUES (1,'设计阶段','1','no','1',1,1,'2011-11-11 11:11:00',1,'2011-11-11 11:01:00'),(2,'打样阶段','2','no','1',1,1,'1111-11-11 00:00:00',1,'2011-11-11 11:11:01'),(3,'销样阶段','3','no','1',1,1,'2011-11-11 11:11:01',1,'2011-11-11 11:01:00'),(4,'销售阶段','4','no','1',1,1,'2011-11-11 11:11:00',1,'2011-11-11 01:00:00');
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template`
--

DROP TABLE IF EXISTS `template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template`
--

LOCK TABLES `template` WRITE;
/*!40000 ALTER TABLE `template` DISABLE KEYS */;
INSERT INTO `template` VALUES (1,'coat',0),(2,'jacket',0),(3,'skirt',0);
/*!40000 ALTER TABLE `template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_event`
--

DROP TABLE IF EXISTS `template_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `templateId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_event`
--

LOCK TABLES `template_event` WRITE;
/*!40000 ALTER TABLE `template_event` DISABLE KEYS */;
INSERT INTO `template_event` VALUES (1,1,1,1),(2,1,2,2),(3,1,3,3),(4,1,4,1),(5,1,5,2),(6,1,6,3),(7,1,7,4),(8,1,8,NULL),(9,1,9,NULL),(10,1,10,NULL),(11,1,11,NULL),(12,1,12,NULL),(13,1,13,NULL),(14,1,14,NULL),(15,1,15,NULL),(16,1,16,NULL),(17,1,17,NULL),(18,1,18,NULL),(19,1,19,NULL),(20,1,20,NULL),(21,1,21,NULL),(22,1,22,NULL),(23,2,1,NULL),(24,2,2,NULL),(25,2,3,NULL),(26,2,4,NULL),(27,2,5,NULL),(28,2,6,NULL),(29,2,7,NULL),(30,2,8,NULL),(31,2,12,NULL),(32,2,13,NULL),(33,2,21,NULL),(34,2,22,NULL),(35,3,1,NULL),(36,3,2,NULL),(37,3,3,NULL),(38,3,4,NULL);
/*!40000 ALTER TABLE `template_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'customerplan'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-11 15:51:19

-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: authorization
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
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (0,'未分组用户',0),(1,'逐日集团',0),(2,'嘉祥贸易',1),(3,'逐日科技',1),(4,'办公室部',2),(5,'财务审计部',2),(6,'规划发展部',2),(7,'设计管理部',2),(8,'工程管理部',2),(9,'成本管理部',2),(10,'营销策划部',2),(11,'客户服务部',2),(12,'产品研发部',3),(14,'运营维护部',3),(16,'工厂',1),(18,'工厂1',16),(19,'工厂2',16),(20,'工厂3',16);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internal_user`
--

DROP TABLE IF EXISTS `internal_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `internal_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `realName` varchar(45) DEFAULT NULL,
  `mobilePhone` varchar(45) DEFAULT NULL,
  `officePhone` varchar(45) DEFAULT NULL,
  `emailAddress` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internal_user`
--

LOCK TABLES `internal_user` WRITE;
/*!40000 ALTER TABLE `internal_user` DISABLE KEYS */;
INSERT INTO `internal_user` VALUES (1,'admin','123456',1,0,NULL,NULL,NULL,NULL,NULL),(2,'user','123456',1,0,NULL,NULL,NULL,NULL,NULL),(3,'examiner','123456',1,0,NULL,NULL,NULL,NULL,NULL),(4,'test','123456',0,0,'xiaoming',NULL,NULL,NULL,NULL),(5,'test2','123',1,0,'中文测试','10086','','',''),(6,'test3','123456',1,0,'fang','112235',NULL,NULL,NULL),(7,'test4','123456',1,2,NULL,'10086',NULL,'123@163.com','无'),(8,'test5','123456',1,2,NULL,NULL,NULL,NULL,NULL),(10,'test6','234',1,0,'金人杰','','','',''),(11,'test8','123456',1,0,'lrl','21345','1234','123@163.com','1234'),(12,'chinese','123',1,4,'中文测试','','','',''),(13,'test9','123456',1,4,'JRJ','','','','');
/*!40000 ALTER TABLE `internal_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iuser_role`
--

DROP TABLE IF EXISTS `iuser_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iuser_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iUserId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iuser_role`
--

LOCK TABLES `iuser_role` WRITE;
/*!40000 ALTER TABLE `iuser_role` DISABLE KEYS */;
INSERT INTO `iuser_role` VALUES (1,1,1),(2,2,2),(3,3,3),(4,3,2),(5,4,2),(6,5,2),(7,6,2),(8,10,2),(9,11,2),(10,12,2),(11,7,2),(13,5,3),(14,5,5),(15,8,2),(17,8,5),(19,11,2),(21,13,2);
/*!40000 ALTER TABLE `iuser_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chineseName` varchar(45) DEFAULT NULL,
  `englishName` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'系统管理员','ADMIN','拥有最高权限'),(2,'普通用户','USER','默认权限，拥有最低权限'),(3,'审查员','EXAMINER','对客户提交的信息进行审查'),(4,'测试角色1','TEST121','测试使用lalala'),(5,'测试角色2','TEST2','随便写点东西'),(6,'测试角色33','TEST3','测试使用'),(7,'测试角色4','TEST4','测试使用');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'authorization'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-11 15:48:28

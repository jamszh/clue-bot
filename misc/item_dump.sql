-- MySQL dump 10.16  Distrib 10.1.36-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: cluebot
-- ------------------------------------------------------
-- Server version	10.1.36-MariaDB

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
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `item` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rarity` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stackable` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (379,'Lobster','hard','common',1),(385,'Shark','hard','common',1),(561,'Nature rune','hard','common',1),(563,'Law rune','hard','common',1),(565,'Blood rune','hard','common',1),(617,'Coins','all','common',1),(859,'Magic longbow','hard','common',0),(861,'Magic shortbow','hard','common',0),(1079,'Rune platelegs','hard','common',0),(1093,'Rune plateskirt','hard','common',0),(1127,'Rune platebody','hard','common',0),(1163,'Rune full helm','hard','common',0),(1213,'Rune dagger','hard','common',0),(1275,'Rune pickaxe','hard','common',0),(1303,'Rune longsword','hard','common',0),(1359,'Rune axe','hard','common',0),(1373,'Rune battleaxe','hard','common',0),(2452,'Antifire potion(4)','hard','super',1),(2497,'Black d\'hide chaps','hard','common',0),(2503,'Black d\'hide body','hard','common',0),(2581,'Robin hood hat','hard','unique',0),(2615,'Rune platebody (g)','hard','unique',0),(2617,'Rune platelegs (g)','hard','unique',0),(2619,'Rune full helm (g)','hard','unique',0),(2621,'Rune kiteshield (g)','hard','unique',0),(2623,'Rune platebody (t)','hard','unique',0),(2625,'Rune platelegs (t)','hard','unique',0),(2627,'Rune full helm (t)','hard','unique',0),(2629,'Rune kiteshield (t)','hard','unique',0),(2639,'Tan cavalier','hard','unique',0),(2641,'Dark cavalier','hard','unique',0),(2643,'Black cavalier','hard','unique',0),(2651,'Pirate\'s hat','hard','unique',0),(2653,'Zamorak platebody','hard','unique',0),(2655,'Zamorak platelegs','hard','unique',0),(2657,'Zamorak full helm','hard','unique',0),(2659,'Zamorak kiteshield','hard','unique',0),(2661,'Saradomin platebody','hard','unique',0),(2663,'Saradomin platelegs','hard','unique',0),(2665,'Saradomin full helm','hard','unique',0),(2667,'Saradomin kiteshield','hard','unique',0),(2669,'Guthix platebody','hard','unique',0),(2671,'Guthix platelegs','hard','unique',0),(2673,'Guthix full helm','hard','unique',0),(2675,'Guthix kiteshield','hard','unique',0),(3016,'Super energy(4)','hard','super',1),(3024,'Super restore(4)','hard','super',1),(3476,'Rune plateskirt (g)','hard','unique',0),(3477,'Rune plateskirt (t)','hard','unique',0),(3478,'Zamorak plateskirt','hard','unique',0),(3479,'Saradomin plateskirt','hard','unique',0),(3480,'Guthix plateskirt','hard','unique',0),(3481,'Gilded platebody','hard','super',0),(3483,'Gilded platelegs','hard','super',0),(3485,'Gilded plateskirt','hard','super',0),(3486,'Gilded full helm','hard','super',0),(3488,'Gilded kiteshield','hard','super',0),(3827,'Saradomin page 1','all','pages',0),(3828,'Saradomin page 2','all','pages',0),(3829,'Saradomin page 3','all','pages',0),(3830,'Saradomin page 4','all','pages',0),(3831,'Zamorak page 1','all','pages',0),(3832,'Zamorak page 2','all','pages',0),(3833,'Zamorak page 3','all','pages',0),(3834,'Zamorak page 4','all','pages',0),(3835,'Guthix page 1','all','pages',0),(3836,'Guthix page 2','all','pages',0),(3837,'Guthix page 3','all','pages',0),(3838,'Guthix page 4','all','pages',0),(7329,'Red firelighter','all','common',1),(7330,'Green firelighter','all','common',1),(7331,'Blue firelighter','all','common',1),(7336,'Rune shield (h1)','hard','unique',0),(7342,'Rune shield (h2)','hard','unique',0),(7348,'Rune shield (h3)','hard','unique',0),(7354,'Rune shield (h4)','hard','unique',0),(7360,'Rune shield (h5)','hard','unique',0),(7374,'Blue d\'hide body (g)','hard','unique',0),(7376,'Blue d\'hide body (t)','hard','unique',0),(7382,'Blue d\'hide chaps (g)','hard','unique',0),(7384,'Blue d\'hide chaps (t)','hard','unique',0),(7398,'Enchanted robe','hard','unique',0),(7399,'Enchanted top','hard','unique',0),(7400,'Enchanted hat','hard','unique',0),(10284,'Magic comp bow','hard','common',0),(10286,'Rune helm (h1)','hard','unique',0),(10288,'Rune helm (h2)','hard','unique',0),(10290,'Rune helm (h3)','hard','unique',0),(10292,'Rune helm (h4)','hard','unique',0),(10294,'Rune helm (h5)','hard','unique',0),(10326,'Purple firelighter','all','common',1),(10327,'White firelighter','all','common',1),(10330,'3rd age range top','hard','3a',0),(10332,'3rd age range legs','hard','3a',0),(10334,'3rd age range coif','hard','3a',0),(10336,'3rd age vambraces','hard','3a',0),(10338,'3rd age robe top','hard','3a',0),(10340,'3rd age robe','hard','3a',0),(10342,'3rd age mage hat','hard','3a',0),(10344,'3rd age amulet','hard','3a',0),(10346,'3rd age platelegs','hard','3a',0),(10348,'3rd age platebody','hard','3a',0),(10352,'3rd age kiteshield','hard','3a',0),(10362,'Amulet of glory (t)','hard','unique',0),(10368,'Zamorak bracers','hard','unique',0),(10370,'Zamorak d\'hide','hard','unique',0),(10372,'Zamorak chaps','hard','unique',0),(10374,'Zamorak coif','hard','unique',0),(10376,'Guthix bracers','hard','unique',0),(10378,'Guthix dragonhide','hard','unique',0),(10380,'Guthix chaps','hard','unique',0),(10382,'Guthix coif','hard','unique',0),(10384,'Saradomin bracers','hard','unique',0),(10386,'Saradomin d\'hide','hard','unique',0),(10388,'Saradomin chaps','hard','unique',0),(10390,'Saradomin coif','hard','unique',0),(10440,'Saradomin crozier','hard','unique',0),(10442,'Guthix crozier','hard','unique',0),(10444,'Zamorak crozier','hard','unique',0),(10470,'Saradomin stole','hard','unique',0),(10472,'Guthix stole','hard','unique',0),(10474,'Zamorak stole','hard','unique',0),(10476,'Purple sweets','hard','common',1),(12199,'Ancient crozier','hard','unique',0),(12201,'Ancient stole','hard','unique',0),(12257,'Armadyl stole','hard','unique',0),(12263,'Armadyl crozier','hard','unique',0),(12269,'Bandos stole','hard','unique',0),(12275,'Bandos crozier','hard','unique',0),(12321,'White cavalier','hard','unique',0),(12323,'Red cavalier','hard','unique',0),(12325,'Navy cavalier','hard','unique',0),(12327,'Red d\'hide body (g)','hard','unique',0),(12329,'Red d\'hide chaps (g)','hard','unique',0),(12331,'Red d\'hide body (t)','hard','unique',0),(12333,'Red d\'hide chaps (t)','hard','unique',0),(12379,'Rune cane','hard','unique',0),(12490,'Ancient bracers','hard','unique',0),(12492,'Ancient d\'hide','hard','unique',0),(12494,'Ancient chaps','hard','unique',0),(12496,'Ancient coif','hard','unique',0),(12498,'Bandos bracers','hard','unique',0),(12500,'Bandos d\'hide','hard','unique',0),(12502,'Bandos chaps','hard','unique',0),(12504,'Bandos coif','hard','unique',0),(12506,'Armadyl bracers','hard','unique',0),(12508,'Armadyl d\'hide','hard','unique',0),(12510,'Armadyl chaps','hard','unique',0),(12512,'Armadyl coif','hard','unique',0),(12514,'Explorer backpack','hard','unique',0),(12516,'Pith helmet','hard','unique',0),(12518,'Green dragon mask','hard','unique',0),(12520,'Blue dragon mask','hard','unique',0),(12522,'Red dragon mask','hard','unique',0),(12524,'Black dragon mask','hard','unique',0),(12613,'Bandos page 1','all','pages',0),(12614,'Bandos page 2','all','pages',0),(12615,'Bandos page 3','all','pages',0),(12616,'Bandos page 4','all','pages',0),(12617,'Armadyl page 1','all','pages',0),(12618,'Armadyl page 2','all','pages',0),(12619,'Armadyl page 3','all','pages',0),(12620,'Armadyl page 4','all','pages',0),(12621,'Ancient page 1','all','pages',0),(12622,'Ancient page 2','all','pages',0),(12623,'Ancient page 3','all','pages',0),(12624,'Ancient page 4','all','pages',0),(13066,'Super potion set','hard','super',1),(19912,'Zombie head','hard','unique',0),(19915,'Cyclops head','hard','unique',0),(19918,'Nunchaku','hard','unique',0),(19921,'Ancient d\'hide boots','hard','unique',0),(19924,'Bandos d\'hide boots','hard','unique',0),(19927,'Saradomin d\'hide boots','hard','unique',0),(19930,'Armadyl d\'hide boots','hard','unique',0),(19933,'Saradomin d\'hide boots','hard','unique',0),(19936,'Zamorak d\'hide boots','hard','unique',0),(20146,'Gilded med helm','hard','super',0),(20149,'Gilded chainbody','hard','super',0),(20152,'Gilded sq shield','hard','super',0),(20155,'Gilded 2h sword','hard','super',0),(20158,'Gilded spear','hard','super',0),(20161,'Gilded hasta','hard','super',0),(22231,'Dragon boots ornament kit','hard','unique',0);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!50001 DROP VIEW IF EXISTS `pages`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `pages` (
  `id` tinyint NOT NULL,
  `item` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `pages`
--

/*!50001 DROP TABLE IF EXISTS `pages`*/;
/*!50001 DROP VIEW IF EXISTS `pages`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 */
/*!50001 VIEW `pages` AS select `i`.`id` AS `id`,`i`.`item` AS `item` from `items` `i` where (`i`.`rarity` = 'pages') */;
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

-- Dump completed on 2018-12-30 17:26:14

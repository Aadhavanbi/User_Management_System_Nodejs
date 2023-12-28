/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: address
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `addressTypeId` varchar(255) DEFAULT NULL,
  `cityId` varchar(255) DEFAULT NULL,
  `stateId` varchar(255) DEFAULT NULL,
  `countryId` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: addresstypes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `addresstypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `addressType` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: business
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `business` (
  `id` int NOT NULL AUTO_INCREMENT,
  `businessName` varchar(255) DEFAULT NULL,
  `uniqueBusinessKey` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: businessgroups
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `businessgroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `businessId` int DEFAULT NULL,
  `groupName` varchar(255) DEFAULT NULL,
  `uniqueBusinessKey` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cites
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cityName` varchar(255) DEFAULT NULL,
  `stateId` int DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: countries
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sortName` varchar(255) DEFAULT NULL,
  `countryName` varchar(255) DEFAULT NULL,
  `phoneCode` int DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: grouppermissions
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `grouppermissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `businessId` int DEFAULT NULL,
  `businessGroupId` int DEFAULT NULL,
  `permissionName` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: historyrecord
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `historyrecord` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unKnownId` int DEFAULT NULL,
  `tableName` varchar(255) DEFAULT NULL,
  `rowName` varchar(255) DEFAULT NULL,
  `oldData` varchar(255) DEFAULT NULL,
  `newData` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: permissionmaster
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `permissionmaster` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permissionName` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: states
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stateName` varchar(255) DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `businessId` int DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `mobileNumber` varchar(255) DEFAULT NULL,
  `dateOfBirth` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `uniqueBusinessKey` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usertogroups
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usertogroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `businessId` int DEFAULT NULL,
  `groupId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `groupPostion` varchar(255) DEFAULT NULL,
  `uniqueBusinessKey` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: address
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: addresstypes
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: business
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: businessgroups
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cites
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: countries
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: grouppermissions
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: historyrecord
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: permissionmaster
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: states
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usertogroups
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

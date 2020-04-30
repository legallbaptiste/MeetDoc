-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 30, 2020 at 11:13 AM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projetGI2Dev`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `fill_date_dimension` (IN `startdate` DATE, IN `stopdate` DATE)  BEGIN
    DECLARE currentdate DATE;
    SET currentdate = startdate;
    WHILE currentdate < stopdate DO
        INSERT INTO time_dimension VALUES (
                        YEAR(currentdate)*10000+MONTH(currentdate)*100 + DAY(currentdate),
                        currentdate,
                        YEAR(currentdate),
                        MONTH(currentdate),
                        DAY(currentdate),
                        QUARTER(currentdate),
                        WEEKOFYEAR(currentdate),
                        DATE_FORMAT(currentdate,'%W'),
                        DATE_FORMAT(currentdate,'%M'),
                        'f',
                        CASE DAYOFWEEK(currentdate) WHEN 1 THEN 't' WHEN 7 then 't' ELSE 'f' END,
                        NULL);
        SET currentdate = ADDDATE(currentdate,INTERVAL 1 DAY);
    END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Adresse`
--

CREATE TABLE `Adresse` (
  `id` int(11) NOT NULL,
  `voie` varchar(50) DEFAULT NULL,
  `numVoie` int(11) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `codePostale` int(5) DEFAULT NULL,
  `pays` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Adresse`
--

INSERT INTO `Adresse` (`id`, `voie`, `numVoie`, `ville`, `codePostale`, `pays`) VALUES
(31, 'Avenue Pierre masse', 13, 'Pau', 64000, 'France'),
(32, 'Avenue Pierre masse', 13, 'Pau', 64000, 'France'),
(61, 'Boulevard de la paix', 310, 'Pau', 64000, 'France'),
(62, 'Boulevard de la paix', 310, 'Pau', 64000, 'France'),
(67, 'Rue Alexander Taylor', 16, 'Pau', 64000, 'France'),
(68, 'Rue Alexander Taylor', 16, 'Pau', 64000, 'France'),
(69, 'Chemin Labriart', 11, 'Pau', 64000, 'France'),
(70, 'Chemin Labriart', 11, 'Pau', 64000, 'France'),
(71, 'Rue chanoine dufayet', 3, 'Cognac', 16100, 'France'),
(72, 'Rue chanoine dufayet', 3, 'Cognac', 16100, 'France'),
(73, 'Rue Ronsard', 21, 'Pau', 64000, 'France '),
(74, 'Rue de Mohedan', 2, 'Pau', 64000, 'France'),
(75, '', 1, '', 1, ''),
(76, 'S', 1, 'D', 1, 'D'),
(77, 'A', 1, 'A', 1, 'A');

-- --------------------------------------------------------

--
-- Table structure for table `Annonce`
--

CREATE TABLE `Annonce` (
  `id` int(11) NOT NULL,
  `titre` varchar(120) NOT NULL DEFAULT 'Titre',
  `typeOffre` varchar(50) DEFAULT NULL,
  `Retrocession` float DEFAULT NULL,
  `idEtablissement` int(11) DEFAULT NULL,
  `idRecruteur` int(11) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` text,
  `actived` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Annonce`
--

INSERT INTO `Annonce` (`id`, `titre`, `typeOffre`, `Retrocession`, `idEtablissement`, `idRecruteur`, `image`, `description`, `actived`) VALUES
(2, 'Cabinet du Dr Maboul', 'Plein Temps', 80.5, 1, 21, 'https://be-mydesk.com/img/cms/Articles%20de%20blog/amenagement-cabinet-medical.jpg', 'Cabinet du docteur Maboul, spécialisé en chirugie dentaire', 1),
(4, 'Cabinet du Dr Raoul', 'Plein Temps', 75.5, 1, 21, 'https://www.burofacil.fr/public/img/big/bureaux-equipes5aa156dd5c66c.jpg', 'Cabinet du docteur Raoul, spécialisé dans la médecine générale', 0),
(5, 'Cabinet du Dr Tournier', 'Mi-temps', 60, 3, 21, 'https://i.pinimg.com/originals/4a/6b/3c/4a6b3c52508652019696f8bd2162c7a3.jpg', 'Cabinet du docteur Tournier, spécialisé dans la gynécologie', 1);

-- --------------------------------------------------------

--
-- Table structure for table `AnnonceRemplacant`
--

CREATE TABLE `AnnonceRemplacant` (
  `id` int(11) NOT NULL,
  `idAnnonce` int(11) DEFAULT NULL,
  `idRemplacant` int(11) DEFAULT NULL,
  `accepter` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `AnnonceRemplacant`
--

INSERT INTO `AnnonceRemplacant` (`id`, `idAnnonce`, `idRemplacant`, `accepter`) VALUES
(1, 4, 20, 0),
(2, 4, 19, 0),
(3, 5, 19, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Etablissement`
--

CREATE TABLE `Etablissement` (
  `id` int(11) NOT NULL,
  `nomEtablissement` varchar(100) NOT NULL DEFAULT 'Nom de l''etablissement',
  `secretariatBool` tinyint(1) DEFAULT NULL,
  `typePatientele` varchar(50) DEFAULT NULL,
  `specialite` varchar(50) DEFAULT NULL,
  `visiteDomicile` tinyint(1) DEFAULT NULL,
  `activite` varchar(12) DEFAULT NULL,
  `descriptionLibre` text,
  `idAdresse` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Etablissement`
--

INSERT INTO `Etablissement` (`id`, `nomEtablissement`, `secretariatBool`, `typePatientele`, `specialite`, `visiteDomicile`, `activite`, `descriptionLibre`, `idAdresse`) VALUES
(1, 'Hopital Jean Michel', 1, 'Enfant', 'Pediatre', 1, 'blablabla', 'descirptiondescirptiondescriptiondescirption', 61),
(2, 'Clinique Jules Verne', 1, 'Enfant', 'Pediatre', 1, 'blablabla', 'descirptiondescirptiondescriptiondescirption', 62),
(3, 'Hopital du 13ème arrondissement', 1, 'Toute', 'Generaliste', 0, 'aeaeaea', 'aaaaaaaaaaaaaaaaaaaaadddddddddddddd', 69),
(4, 'Clinique médicale de verdun', 1, 'Toute', 'Generaliste', 0, 'aeaeaea', 'aaaaaaaaaaaaaaaaaaaaadddddddddddddd', 70);

-- --------------------------------------------------------

--
-- Table structure for table `Recruteur`
--

CREATE TABLE `Recruteur` (
  `id` int(11) NOT NULL,
  `specialite` varchar(50) DEFAULT NULL,
  `descriptionLibre` text,
  `idEtablissement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Recruteur`
--

INSERT INTO `Recruteur` (`id`, `specialite`, `descriptionLibre`, `idEtablissement`) VALUES
(21, 'Cardiologue', 'LALALALALAL', 1),
(22, 'Chirurgien', '', 1),
(23, 'Neurologue', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Remplacant`
--

CREATE TABLE `Remplacant` (
  `id` int(11) NOT NULL,
  `descriptionLibre` text,
  `cv` varchar(50) DEFAULT NULL,
  `specialite` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Remplacant`
--

INSERT INTO `Remplacant` (`id`, `descriptionLibre`, `cv`, `specialite`) VALUES
(19, NULL, NULL, NULL),
(20, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `motDePasse` varchar(50) DEFAULT NULL,
  `numTel` varchar(10) DEFAULT NULL,
  `idAdresse` int(11) DEFAULT NULL,
  `cartePro` varchar(50) DEFAULT NULL,
  `verifier` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `nom`, `prenom`, `email`, `motDePasse`, `numTel`, `idAdresse`, `cartePro`, `verifier`) VALUES
(19, 'Disdier', 'Yéyé', 'remplacant@eisti.eu', 'toto', '0645681890', 31, 'lienVerslimageDeLaCarte', 1),
(20, 'LeGall', 'Baptisite', 'remplacant2@eisti.eu', 'toto', '0669696969', 32, 'lienVerslimageDeLaCarte', 0),
(21, 'Toto', 'Michel', 'recruteur@eisti.eu', 'toto', '0677771890', 67, 'lienVerslimageDeLaCarte', 0),
(22, 'Le Gall', 'Baptiste', 'legallbapt@eisti.eu', 'totototo', '0629977341', 71, 'lienVersCartePro', 0),
(23, 'Yeye', 'YeyePrenom', 'yeye.disdier@gmail.com', 'toto', '0645681892', 73, 'lienVersCartePro', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Adresse`
--
ALTER TABLE `Adresse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Annonce`
--
ALTER TABLE `Annonce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRecruteur` (`idRecruteur`),
  ADD KEY `idEtablissement` (`idEtablissement`);

--
-- Indexes for table `AnnonceRemplacant`
--
ALTER TABLE `AnnonceRemplacant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRemplacant` (`idRemplacant`),
  ADD KEY `idAnnonce` (`idAnnonce`);

--
-- Indexes for table `Etablissement`
--
ALTER TABLE `Etablissement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAdresse` (`idAdresse`);

--
-- Indexes for table `Recruteur`
--
ALTER TABLE `Recruteur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEtablissement` (`idEtablissement`);

--
-- Indexes for table `Remplacant`
--
ALTER TABLE `Remplacant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAdresse` (`idAdresse`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Adresse`
--
ALTER TABLE `Adresse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
--
-- AUTO_INCREMENT for table `Annonce`
--
ALTER TABLE `Annonce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `AnnonceRemplacant`
--
ALTER TABLE `AnnonceRemplacant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Etablissement`
--
ALTER TABLE `Etablissement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `Recruteur`
--
ALTER TABLE `Recruteur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `Remplacant`
--
ALTER TABLE `Remplacant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Annonce`
--
ALTER TABLE `Annonce`
  ADD CONSTRAINT `Annonce_ibfk_1` FOREIGN KEY (`idRecruteur`) REFERENCES `Recruteur` (`id`),
  ADD CONSTRAINT `Annonce_ibfk_2` FOREIGN KEY (`idEtablissement`) REFERENCES `Etablissement` (`id`);

--
-- Constraints for table `AnnonceRemplacant`
--
ALTER TABLE `AnnonceRemplacant`
  ADD CONSTRAINT `AnnonceRemplacant_ibfk_1` FOREIGN KEY (`idRemplacant`) REFERENCES `Remplacant` (`id`),
  ADD CONSTRAINT `AnnonceRemplacant_ibfk_2` FOREIGN KEY (`idAnnonce`) REFERENCES `Annonce` (`id`);

--
-- Constraints for table `Etablissement`
--
ALTER TABLE `Etablissement`
  ADD CONSTRAINT `Etablissement_ibfk_1` FOREIGN KEY (`idAdresse`) REFERENCES `Adresse` (`id`);

--
-- Constraints for table `Recruteur`
--
ALTER TABLE `Recruteur`
  ADD CONSTRAINT `Recruteur_ibfk_1` FOREIGN KEY (`idEtablissement`) REFERENCES `Etablissement` (`id`),
  ADD CONSTRAINT `Recruteur_ibfk_2` FOREIGN KEY (`id`) REFERENCES `User` (`id`);

--
-- Constraints for table `Remplacant`
--
ALTER TABLE `Remplacant`
  ADD CONSTRAINT `Remplacant_ibfk_1` FOREIGN KEY (`id`) REFERENCES `User` (`id`);

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`idAdresse`) REFERENCES `Adresse` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


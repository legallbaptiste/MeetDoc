
-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  mar. 03 déc. 2019 à 19:30
-- Version du serveur :  5.6.38
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `projetGI2`
--

-- --------------------------------------------------------

--
-- Structure de la table `Annonce`
--

CREATE TABLE `Annonce` (
  `id` int(11) NOT NULL,
  `titre` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `rating` float NOT NULL,
  `distance` int(11) NOT NULL,
  `salaire` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `profilRecherche` int(11) DEFAULT NULL,
  `etat` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `idCabinet` int(11) DEFAULT NULL,
  `idRemplacant` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Annonce`
--

INSERT INTO `Annonce` (`id`, `titre`, `description`, `rating`, `distance`, `salaire`, `image`, `latitude`, `longitude`, `profilRecherche`, `etat`, `type`, `idCabinet`, `idRemplacant`) VALUES
(1, 'Cabinet médical', 'Cabinet médical du Docteur LE GALL', 5, 3, '50€/heure', 'https://be-mydesk.com/img/cms/Articles%20de%20blog/amenagement-cabinet-medical.jpg', 43.3, -0.366667, 1, 1, 'rv', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Profil`
--

CREATE TABLE `Profil` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `typeProfil` int(11) DEFAULT NULL,
  `mdp` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Profil`
--

INSERT INTO `Profil` (`id`, `nom`, `prenom`, `email`, `adresse`, `tel`, `typeProfil`, `mdp`) VALUES
(1, 'LE GALL', 'Baptiste', 'legallbapt@eisti.eu', '310 boulevard de la paix', '0629977341', 1, 'toto'),
(2, 'lololo', 'lololo', 'baptiste.le.galll@gmail.com', 'lol', '', 1, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Annonce`
--
ALTER TABLE `Annonce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCabinet` (`idCabinet`),
  ADD KEY `idRemplacant` (`idRemplacant`);

--
-- Index pour la table `Profil`
--
ALTER TABLE `Profil`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Annonce`
--
ALTER TABLE `Annonce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Profil`
--
ALTER TABLE `Profil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Annonce`
--
ALTER TABLE `Annonce`
  ADD CONSTRAINT `annonce_ibfk_1` FOREIGN KEY (`idCabinet`) REFERENCES `Profil` (`id`),
  ADD CONSTRAINT `annonce_ibfk_2` FOREIGN KEY (`idRemplacant`) REFERENCES `Profil` (`id`);

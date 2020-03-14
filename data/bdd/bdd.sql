DROP TABLE IF EXISTS Adresse;
CREATE TABLE Adresse (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  voie VARCHAR(50),
  numVoie INTEGER,
  ville VARCHAR(50),
  codePostale INTEGER(5),
  pays VARCHAR(30)
);

DROP TABLE IF EXISTS Periode;
CREATE TABLE Periode (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  dDebut DATE,
  dFin DATE
);

DROP TABLE IF EXISTS Horaire;
CREATE TABLE Horaire (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  jour VARCHAR(9) CHECK(jour in ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  hDebut TIME,
  hFin TIME
);

DROP TABLE IF EXISTS User;
CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  email VARCHAR(50),
  numTel VARCHAR(10),
  idAdresse INTEGER,
  cartePro VARCHAR(50),
  FOREIGN KEY (idAdresse) REFERENCES Adresse(id)
);

DROP TABLE IF EXISTS Remplacant;
CREATE TABLE Remplacant (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  descriptionLibre TEXT,
  cv VARCHAR(50),
  specialite VARCHAR(50),
  FOREIGN KEY (id) REFERENCES User(id)
);

DROP TABLE IF EXISTS Etablissement;
CREATE TABLE Etablissement (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  adresse INTEGER,
  secretaratBool Boolean,
  typePatientele VARCHAR(50),
  specialite VARCHAR(50),
  visiteDomicile Boolean,
  activite VARCHAR(12) CHECK (activite in('Seul','Association')),
  descriptionLibre TEXT,
  idAdresse INTEGER,
  FOREIGN KEY (idAdresse) REFERENCES Adresse(id)
);

DROP TABLE IF EXISTS Recruteur;
CREATE TABLE Recruteur (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  specialite VARCHAR(50),
  descriptionLibre TEXT,
  idEtablissement INTEGER,
  FOREIGN KEY (idEtablissement) REFERENCES Etablissement(id),
  FOREIGN KEY (id) REFERENCES User(id)
);

DROP TABLE IF EXISTS HoraireEtablissement;
CREATE TABLE HoraireEtablissement (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  idHoraire INTEGER,
  idEtablissement INTEGER,
  FOREIGN KEY (idHoraire) REFERENCES Horaire(id),
  FOREIGN KEY (idEtablissement) REFERENCES Etablissement(id)
);

DROP TABLE IF EXISTS PeriodeRemplacant;
CREATE TABLE PeriodeRemplacant (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  idPeriode INTEGER,
  idRemplacant INTEGER,
  FOREIGN KEY (idPeriode) REFERENCES Periode(id),
  FOREIGN KEY (idRemplacant) REFERENCES Remplacant(id)
);

DROP TABLE IF EXISTS HoraireRemplacant;
CREATE TABLE HoraireRemplacant (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  idHoraire INTEGER,
  idRemplacant INTEGER,
  FOREIGN KEY (idHoraire) REFERENCES Horaire(id),
  FOREIGN KEY (idRemplacant) REFERENCES Remplacant(id)
);

DROP TABLE IF EXISTS Annonce;
CREATE TABLE Annonce (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  typeOffre VARCHAR(50),
  Retrocession FLOAT,
  idEtablissement INTEGER,
  idRecruteur INTEGER,
  FOREIGN KEY (idRecruteur) REFERENCES Recruteur(id),
  FOREIGN KEY (idEtablissement) REFERENCES Etablissement(id)
);

-- Permet de creer un table avec tous les jours

DROP TABLE IF EXISTS time_dimension;
CREATE TABLE time_dimension (
        id                      INTEGER PRIMARY KEY,  -- year*10000+month*100+day
        db_date                 DATE NOT NULL,
        year                    INTEGER NOT NULL,
        month                   INTEGER NOT NULL, -- 1 to 12
        day                     INTEGER NOT NULL, -- 1 to 31
        quarter                 INTEGER NOT NULL, -- 1 to 4
        week                    INTEGER NOT NULL, -- 1 to 52/53
        day_name                VARCHAR(9) NOT NULL, -- 'Monday', 'Tuesday'...
        month_name              VARCHAR(9) NOT NULL, -- 'January', 'February'...
        holiday_flag            CHAR(1) DEFAULT 'f' CHECK (holiday_flag in ('t', 'f')),
        weekend_flag            CHAR(1) DEFAULT 'f' CHECK (weekday_flag in ('t', 'f')),
        event                   VARCHAR(50),
        UNIQUE td_ymd_idx (year,month,day),
        UNIQUE td_dbdate_idx (db_date)

) Engine=MyISAM;

DROP PROCEDURE IF EXISTS fill_date_dimension;
DELIMITER //
CREATE PROCEDURE fill_date_dimension(IN startdate DATE,IN stopdate DATE)
BEGIN
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
END
//
DELIMITER ;

TRUNCATE TABLE time_dimension;

CALL fill_date_dimension('2000-01-01','2100-01-01');
OPTIMIZE TABLE time_dimension;
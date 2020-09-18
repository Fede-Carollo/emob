-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2020 at 08:00 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vallauri_eventi`
--

-- --------------------------------------------------------

--
-- Table structure for table `eventi`
--

CREATE TABLE `eventi` (
  `id` int(11) NOT NULL,
  `nome_evento` varchar(50) NOT NULL,
  `descrizione_evento` varchar(500) DEFAULT NULL,
  `data` varchar(10) DEFAULT NULL,
  `ora` varchar(5) DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `num_attuale_partecipanti` int(11) DEFAULT NULL,
  `num_max_partecipanti` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eventi`
--

INSERT INTO `eventi` (`id`, `nome_evento`, `descrizione_evento`, `data`, `ora`, `link`, `num_attuale_partecipanti`, `num_max_partecipanti`) VALUES
(1, 'Incontro mobilità sostenibile', 'Incontro importante', '23/07/2020', '15:00', '#', 100, 100),
(2, 'Tesla', 'Incontro con Elon Musk', '23/09/2021', '21:30', '#', 999, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `iscrizione_evento`
--

CREATE TABLE `iscrizione_evento` (
  `id_evento` int(11) NOT NULL,
  `email_user` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iscrizione_evento`
--

INSERT INTO `iscrizione_evento` (`id_evento`, `email_user`) VALUES
(1, 'f.carol.0729@vallauri.edu'),
(1, 'f.carollo.0729@vallauri.edu'),
(2, 'f.carollo.0729@vallauri.edu');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `data_nascita` date NOT NULL,
  `passwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `nome`, `cognome`, `data_nascita`, `passwd`) VALUES
('c.rossi.4532@vallauri.edu', 'Cristian', 'Rossi', '2020-09-02', 'Password2002'),
('f.carol.0729@vallauri.edu', 'Fede', 'Carollo', '2004-09-01', 'Password1000'),
('f.carollo.0727@vallauri.edu', 'Federico', 'Carollo', '2002-07-23', 'passwd'),
('f.carollo.0728@vallauri.edu', 'Federico', 'Carollo', '2002-07-23', 'passwd'),
('f.carollo.0729@vallauri.edu', 'Federico', 'Carollo', '2002-07-23', 'passwd'),
('posta.fedcar@gmail.com', 'Fede', 'Carollo', '2020-09-08', 'Fede2002');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eventi`
--
ALTER TABLE `eventi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iscrizione_evento`
--
ALTER TABLE `iscrizione_evento`
  ADD PRIMARY KEY (`id_evento`,`email_user`),
  ADD KEY `iscrizione_evento_users_email_fk` (`email_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `eventi`
--
ALTER TABLE `eventi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `iscrizione_evento`
--
ALTER TABLE `iscrizione_evento`
  ADD CONSTRAINT `iscrizione_evento_eventi_id_fk` FOREIGN KEY (`id_evento`) REFERENCES `eventi` (`id`),
  ADD CONSTRAINT `iscrizione_evento_users_email_fk` FOREIGN KEY (`email_user`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

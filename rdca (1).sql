-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2025 at 11:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rdca`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `department_code` varchar(255) NOT NULL,
  `department_process` text NOT NULL,
  `department_status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `creation_date` varchar(25) NOT NULL,
  `delete_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `department_name`, `department_code`, `department_process`, `department_status`, `created_at`, `updated_at`, `creation_date`, `delete_status`) VALUES
(1, 'laser cutting', 'DEP001', '\"1\"', 0, '2025-08-20 09:34:38', '2025-08-20 09:34:38', '2025-08-20 15:04:38', 0),
(2, 'mj', 'DEP002', '\"1\"', 0, '2025-08-20 09:44:28', '2025-08-20 09:44:28', '2025-08-20 15:14:28', 0);

-- --------------------------------------------------------

--
-- Table structure for table `process`
--

CREATE TABLE `process` (
  `id` int(11) NOT NULL,
  `process_name` varchar(255) DEFAULT NULL,
  `process_code` varchar(255) NOT NULL,
  `process_status` int(11) NOT NULL,
  `process_fields` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `creation_date` varchar(25) DEFAULT NULL,
  `delete_status` int(11) NOT NULL DEFAULT 1,
  `raw_material` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `process`
--

INSERT INTO `process` (`id`, `process_name`, `process_code`, `process_status`, `process_fields`, `created_at`, `updated_at`, `creation_date`, `delete_status`, `raw_material`) VALUES
(7, 'test process 123', 'PRO001', 0, '[\"process1\",\"process2\",\"process2\"]', '2025-08-19 11:16:05', '2025-08-19 11:16:05', '2025-08-19 16:46:05', 2, 0),
(8, 'process 2', 'PRO008', 1, '[\"testprocess1\",\"testprocess2\",\"testprocess3\"]', '2025-08-19 12:03:03', '2025-08-19 12:03:03', '2025-08-19 17:33:03', 1, 0),
(9, 'process 3', 'PRO009', 1, '[\"dynamicprocess1\",\"dynamicprocess2\"]', '2025-08-19 12:31:07', '2025-08-19 12:31:07', '2025-08-19 18:01:07', 1, 0),
(10, 'laser printing', 'PRO010', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 05:20:57', '2025-08-20 05:20:57', '2025-08-20 10:50:57', 1, NULL),
(11, 'laser printing', 'PRO011', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 05:21:49', '2025-08-20 05:21:49', '2025-08-20 10:51:49', 1, NULL),
(12, 'laser printing', 'PRO012', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 05:22:50', '2025-08-20 05:22:50', '2025-08-20 10:52:50', 1, NULL),
(13, 'laser printing', 'PRO013', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 05:24:47', '2025-08-20 05:24:47', '2025-08-20 10:54:47', 1, 1),
(14, 'test process22', 'PRO014', 1, '[\"tttt\"]', '2025-08-20 05:37:02', '2025-08-20 05:37:02', '2025-08-20 11:07:02', 1, 1),
(15, 'laser printing', 'PRO015', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:08:57', '2025-08-20 06:08:57', '2025-08-20 11:38:57', 1, 1),
(16, 'laser printing', 'PRO016', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:09:00', '2025-08-20 06:09:00', '2025-08-20 11:39:00', 1, 1),
(17, 'laser printing', 'PRO017', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:09:23', '2025-08-20 06:09:23', '2025-08-20 11:39:23', 1, 1),
(18, 'laser printing', 'PRO018', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:09:24', '2025-08-20 06:09:24', '2025-08-20 11:39:24', 1, 1),
(19, 'laser printing', 'PRO019', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:09:24', '2025-08-20 06:09:24', '2025-08-20 11:39:24', 1, 1),
(20, 'laser printing', 'PRO020', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:09:25', '2025-08-20 06:09:25', '2025-08-20 11:39:25', 1, 1),
(21, 'laser printing', 'PRO021', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:09:26', '2025-08-20 06:09:26', '2025-08-20 11:39:26', 1, 1),
(22, 'laser printing', 'PRO022', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:09:26', '2025-08-20 06:09:26', '2025-08-20 11:39:26', 1, 1),
(23, 'laser printing', 'PRO023', 1, '[\"[\'\'size of cutting\']\"]', '2025-08-20 06:12:36', '2025-08-20 06:12:36', '2025-08-20 11:42:36', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_status` int(11) NOT NULL DEFAULT 1,
  `delete_status` int(11) NOT NULL DEFAULT 1,
  `creation_date` varchar(50) NOT NULL,
  `user_token` text NOT NULL,
  `empcode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `password`, `department`, `role`, `created_at`, `updated_at`, `user_status`, `delete_status`, `creation_date`, `user_token`, `empcode`) VALUES
(6, 'admin@gmail.com', 'test', NULL, '$2b$10$X7Oy0eSqa192uXdH0YoF8euwhH.c/I7/VY7UbcpCKaQjbFqY9.wR2', '[1,2]', '[2]', '2025-08-04 10:08:56', '2025-08-04 10:08:56', 1, 1, '', '', 'EMP001'),
(7, 'test@gmail.com', 'test', NULL, '$2b$10$5tGBFwPT/XfoDJIHb.pgqOLf.VIct4QUdxHPx9QfgNtg6zzCCq8Ly', '[1,2]', '[2]', '2025-08-04 10:24:44', '2025-08-04 10:24:44', 1, 1, '', '', 'EMP007');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `process`
--
ALTER TABLE `process`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `process`
--
ALTER TABLE `process`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

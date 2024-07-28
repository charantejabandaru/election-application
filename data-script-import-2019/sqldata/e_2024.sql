CREATE TABLE `spl_attributes` (
  `spl_attribute_id` tinyint NOT NULL,
  `cand_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `constituency` (
  `const_id` smallint DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `reserve_status` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE TABLE `contests` (
  `const_id` smallint NOT NULL,
  `cand_id` varchar(10) NOT NULL,
  `votes` int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE TABLE `party` (
  `party_id` varchar(10) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `symbol` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `candidates` (
  `cand_id` varchar(10) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `age` tinyint DEFAULT NULL,
  `party_id` varchar(10) DEFAULT NULL,
  `spl_attribute_id` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` varchar(20) NOT NULL PRIMARY KEY,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tokenised (
     `user_id` varchar(20) NOT NULL,
     `tokens` varchar(300) NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users(user_id)
);
     





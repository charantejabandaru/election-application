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

CREATE TABLE `contests` (
  `const_id` smallint NOT NULL,
  `cand_id` varchar(10) NOT NULL,
  `votes` int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





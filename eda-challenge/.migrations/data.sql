INSERT INTO `clients` (`id`, `name`, `email`, `created_at`) VALUES ('15b6eee5-4140-4755-9578-9e53a9c10fca', 'John Doe', 'john@j.com', '2024-02-13');
INSERT INTO `clients` (`id`, `name`, `email`, `created_at`) VALUES ('d3c57c23-3c8c-4861-86eb-69ff3cc526a2', 'Joanna Doe', 'joanna@j.com', '2024-02-13');

INSERT INTO `accounts` (`id`, `client_id`, `balance`, `created_at`) VALUES ('0e96d032-86fd-11ec-8b22-9a5ce86758a4', 'd3c57c23-3c8c-4861-86eb-69ff3cc526a2', 1000, '2024-02-13');
INSERT INTO `accounts` (`id`, `client_id`, `balance`, `created_at`) VALUES ('534b6b56-a988-11ec-b7e0-2b8e9696da41', '15b6eee5-4140-4755-9578-9e53a9c10fca', 2000, '2024-02-13');
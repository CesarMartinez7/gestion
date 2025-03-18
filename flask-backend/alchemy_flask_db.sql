-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-03-2025 a las 19:55:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alchemy_flask_db`
--
CREATE DATABASE IF NOT EXISTS `alchemy_flask_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `alchemy_flask_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'Hogar', 'Productos electrónicos como teléfonos y computadoras', 2),
(2, 'tecnologia', 'Vestimenta para todas las edades', 1),
(3, 'Hogar', 'Artículos para el hogar y decoración', 1),
(4, 'Juguetes', 'Juguetes para niños y adultos', 1),
(5, 'Deportes', 'Equipos y ropa deportiva', 2),
(36, 'deporte', 'Todos los productos que necesites para realizar deportes', 1),
(41, 'juegos', 'Todos los productos que necesites para realizar deportes', 1),
(42, 'juegos deportivos', 'Todos los productos que necesites para realizar deportes', 1),
(44, 'juegos deportivsssos', 'Todos los productos que necesites para realizar deportes', 1),
(45, 'juegos deportivsss', 'Todos los productos que necesites para realizar deportes', 2),
(46, 'juegos deportivss', 'Todos los productos que necesites para realizar deportes', 1),
(47, 'Electrodomesticos', 'en esta categoria podras encontrar muchos Electrodomesticos', 1),
(48, 'Electrodomestico', 'en esta categoria podras encontrar muchos Electrodomesticos', 1),
(49, 'Belleza', 'en esta categoria podras encontrar muchos productos de belleza femenina', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_cambios_categoria`
--

CREATE TABLE `historial_cambios_categoria` (
  `id` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `historial_cambios_categoria`
--

INSERT INTO `historial_cambios_categoria` (`id`, `id_categoria`, `nombre`, `descripcion`, `estado`, `fecha`) VALUES
(15, 1, 'tecnologia', 'Productos electrónicos como teléfonos y computadoras', 2, '2025-02-24 10:57:52'),
(16, 47, 'Electrodomesticos', 'en esta categoria podras encontrar muchos Electrodomesticos', 1, '2025-02-24 14:54:12'),
(17, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:13:49'),
(18, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:21'),
(19, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:53'),
(20, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:54'),
(21, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:55'),
(22, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:55'),
(23, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:56'),
(24, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:56'),
(25, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:57'),
(26, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:57'),
(27, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:58'),
(28, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:59'),
(29, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:27:59'),
(30, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:28:00'),
(31, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:28:00'),
(32, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:28:01'),
(33, 2, 'tecnologia', 'Vestimenta para todas las edades', 1, '2025-02-24 15:28:01'),
(34, 48, 'Electrodomestico', 'en esta categoria podras encontrar muchos Electrodomesticos', 1, '2025-02-24 15:51:16'),
(35, 49, 'Belleza', 'en esta categoria podras encontrar muchos productos de belleza femenina', 1, '2025-02-24 16:13:46'),
(36, 1, 'Hogar', 'Productos electrónicos como teléfonos y computadoras', 2, '2025-02-25 17:01:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_cambios_pedidos`
--

CREATE TABLE `historial_cambios_pedidos` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `cantidad` int(11) NOT NULL CHECK (`cantidad` > 0),
  `precio_unitario` decimal(10,2) NOT NULL,
  `total` decimal(10,2) GENERATED ALWAYS AS (`cantidad` * `precio_unitario`) STORED,
  `estado` tinyint(1) NOT NULL DEFAULT 3 CHECK (`estado` in (3,4,5,6))
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `historial_cambios_pedidos`
--

INSERT INTO `historial_cambios_pedidos` (`id`, `id_pedido`, `fecha_pedido`, `cantidad`, `precio_unitario`, `estado`) VALUES
(5, 9, '2025-02-24 15:26:34', 2, 10000.00, 3),
(6, 13, '2025-02-24 15:30:06', 4, 10000.00, 3),
(7, 15, '2025-02-24 15:30:33', 4, 10000.00, 3),
(8, 8, '2025-02-24 20:46:05', 2, 10000.00, 4),
(9, 16, '2025-02-25 13:30:21', 4, 10000.00, 3),
(10, 17, '2025-02-25 22:06:12', 23, 10000.00, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_cambios_producto`
--

CREATE TABLE `historial_cambios_producto` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` double(11,2) NOT NULL,
  `imagenes` int(255) DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `historial_cambios_producto`
--

INSERT INTO `historial_cambios_producto` (`id`, `id_producto`, `nombre`, `descripcion`, `cantidad`, `precio`, `imagenes`, `estado`, `fecha`) VALUES
(23, 6, 'Arroz diana', 'esto es arroz en bolsa de 1kg', 12, 10000.00, NULL, 1, '2025-02-20 16:07:37'),
(24, 6, 'Arroz diana', 'esto es arroz en bolsa de 1kg', 12, 20000.00, NULL, 1, '2025-02-20 16:08:02'),
(55, 6, 'Arroz diana', 'esto es arroz en bolsa de 1kg', 12, 20000.00, NULL, 2, '2025-02-21 13:45:07'),
(56, 2, 'arroz', 'esto es arroz en bolsa de 1kg', 12, 10000.00, NULL, 2, '2025-02-24 21:21:57'),
(57, 7, 'arro', 'esto es arroz en bolsa de 1kg', 12, 10000.00, 0, 1, '2025-02-24 22:24:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL CHECK (`cantidad` > 0),
  `precio_unitario` decimal(10,2) NOT NULL,
  `total` decimal(10,2) GENERATED ALWAYS AS (`cantidad` * `precio_unitario`) STORED,
  `estado` tinyint(1) NOT NULL DEFAULT 3 CHECK (`estado` in (3,4,5,6))
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `fecha_pedido`, `id_producto`, `cantidad`, `precio_unitario`, `estado`) VALUES
(8, '2025-02-24 15:26:32', 1, 2, 10000.00, 4),
(9, '2025-02-24 15:26:34', 1, 2, 10000.00, 3),
(10, '2025-02-24 15:29:49', 1, 4, 10000.00, 3),
(11, '2025-02-24 15:29:56', 1, 4, 10000.00, 3),
(12, '2025-02-24 15:29:57', 1, 4, 10000.00, 3),
(13, '2025-02-24 15:30:06', 1, 4, 10000.00, 3),
(14, '2025-02-24 15:30:13', 1, 4, 10000.00, 3),
(15, '2025-02-24 15:30:33', 1, 4, 10000.00, 3),
(16, '2025-02-25 13:30:21', 1, 4, 10000.00, 3),
(17, '2025-02-25 22:06:13', 1, 23, 10000.00, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 0,
  `precio` double(11,2) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `imagenes` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `cantidad`, `precio`, `id_categoria`, `imagenes`, `estado`) VALUES
(1, 'carro', 'carro de alta velocidad que alcanza los 1000 km x h', 1222, 10000.00, 1, NULL, 1),
(2, 'arroz', 'esto es arroz en bolsa de 1kg', 12, 10000.00, 3, NULL, 2),
(3, 'arroz', 'esto es arroz en bolsa de 1kg', 12, 10000.00, 1, NULL, 1),
(4, 'arroz', 'esto es arroz en bolsa de 1kg', 12, 10000.00, 1, NULL, 1),
(5, 'arroz', 'esto es arroz en bolsa de 1kg', 12, 10000.00, 1, NULL, 1),
(6, 'Arroz diana', 'esto es arroz en bolsa de 1kg', 12, 20000.00, 1, NULL, 2),
(7, 'arro', 'esto es arroz en bolsa de 1kg', 12, 10000.00, 1, 'http://localhost:5000/static/uploads/e9542cc0251b4675829b4eb761f02f6d.jpeg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `token`, `expires_at`) VALUES
(1, 1, '741bacadb419670cb2389eef8a6492a29049bd00fe581216b32b8357c0ded02f', '2025-02-25 15:52:26'),
(2, 1, '6724534edc106835a0790e7bc7154caddb89af39846aad03382f3f7e354fd75a', '2025-02-25 15:55:01'),
(3, 1, 'ebc142d6c4b855ced4166cae59f7f7bfb4d2974efa7b1df3077a36cc9408869a', '2025-02-25 15:55:07'),
(4, 1, '203b61fe8346dd1810db1deb346f95034fa638eb23b543269c54a09e3b3d91ec', '2025-02-25 16:12:14'),
(8, 1, 'f74d4e81e7aaae72e6e52e21c383f2416e4a664c9279feebfcff0b69c33ce96c', '2025-02-26 15:28:53'),
(9, 1, '9af14a1fa366490cbd763ed3d529db6636c287d60c4978caa485566a7d0d1604', '2025-02-26 15:34:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `historial_cambios_categoria`
--
ALTER TABLE `historial_cambios_categoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `historial_cambios_pedidos`
--
ALTER TABLE `historial_cambios_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `historial_cambios_producto`
--
ALTER TABLE `historial_cambios_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`) USING HASH,
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_cambios_categoria`
--
ALTER TABLE `historial_cambios_categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `historial_cambios_pedidos`
--
ALTER TABLE `historial_cambios_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `historial_cambios_producto`
--
ALTER TABLE `historial_cambios_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_cambios_categoria`
--
ALTER TABLE `historial_cambios_categoria`
  ADD CONSTRAINT `historial_cambios_categoria_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial_cambios_pedidos`
--
ALTER TABLE `historial_cambios_pedidos`
  ADD CONSTRAINT `fk_historial_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial_cambios_producto`
--
ALTER TABLE `historial_cambios_producto`
  ADD CONSTRAINT `historial_cambios_producto_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

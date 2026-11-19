# Anteiku Totem - TP Integrador

Sistema de autoservicio estilo cafetería + panel de administración. El proyecto frontend (totem) consume la API del proyecto backend (Node.js + Express + EJS + MySQL).

## Información académica

- **Materia:** Programación III
- **Institución:** Universidad Tecnológica Nacional — Facultad Regional Avellaneda
- **Carrera:** Tecnicatura Universitaria en Programación
- **Comisión:** 334
- **Trabajo:** TP Integrador - Autoservicio
- **Integrantes:** Juan Cruz Reynoso y Daniela Maigua

## Estructura

- `frontend/` : app del cliente (HTML, CSS y JS puros). Pantallas de bienvenida, productos, carrito y ticket.
- `backend/` : servidor Express con la API en JSON y las vistas EJS del backoffice.
- `backend/BBDD/anteiku_totem.sql` : base de datos (productos, usuarios, ventas, ventas-productos).

## Puesta en marcha

### 1. Levantar XAMPP (Apache y MySQL)
1. Abrir el panel de control de XAMPP (`C:\xampp\xampp-control.exe`).
2. Presionar **Start** en **Apache** y en **MySQL**. Los dos módulos tienen que quedar en verde.

### 2. Importar la base de datos (phpMyAdmin)
1. Abrir http://localhost/phpmyadmin
2. Ir a la pestaña **Importar**.
3. En "Elegir archivo" seleccionar `backend/BBDD/anteiku_totem.sql`.
4. Presionar **Importar** (debajo, a la derecha).
5. Tiene que aparecer la base `anteiku_totem` con sus 4 tablas: `products`, `users`, `sales` y `product_sales`.

Nota: solo se importa la primera vez. Si ya existe la base, no hace falta repetirlo.

### 3. Backend
En la carpeta `backend/`:
```
npm install     (solo la primera vez)
npm run dev
```
El servidor corre en http://localhost:3000 (se reinicia solo al guardar cambios gracias a `node --watch`).

### 4. Frontend (totem)
- Opción A: extensión **Live Server** de VS Code -> click derecho sobre `frontend/index.html` -> "Open with Live Server".
- Opción B: `npx serve frontend -l 5500`

### 5. Probar que todo anda
- Totem: http://localhost:5500 (pide nombre y muestra el menú)
- Backoffice: http://localhost:3000/login (admin@anteiku.com / admin123, o el botón de acceso rápido)
- phpMyAdmin: http://localhost/phpmyadmin para ver la base (`anteiku_totem`)

### Para apagar todo
1. En el panel de XAMPP, **Stop** en Apache y MySQL.
2. `Ctrl + C` en la consola del backend y del totem.

## Accesos

- Totem: abre con Live Server, primero pide el nombre del cliente.
- Backoffice: http://localhost:3000/login
  - Email: admin@anteiku.com
  - Contraseña: admin123
  - El login tiene un botón de acceso rápido que autocompleta estos datos.

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/products?page=1&limit=12&category=coffee | productos activos paginados |
| POST | /api/products | alta de producto (JSON) |
| PUT | /api/products/:id | modificación de producto (JSON) |
| PATCH | /api/products/:id/active | activar / desactivar (baja lógica) |
| POST | /api/users | crear usuario administrador (contraseña hasheada) |
| POST | /api/sales | registrar venta |
| GET | /api/sales | listado de ventas con sus productos |

## Notas

- Las contraseñas se guardan hasheadas con bcrypt, nunca en texto plano.
- El excel de ventas se descarga desde el dashboard del backoffice.
- El ticket de compra se descarga en PDF desde la pantalla del ticket.
- El totem tiene tema claro/oscuro y recuerda el elegido al recargar.

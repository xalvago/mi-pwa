# FichApp PWA Wrapper - Guía de Despliegue

Esta carpeta contiene la solución **PWA Wrapper (Envoltorio)** diseñada para transformar tu Google Apps Script Web App en una aplicación instalable sin modificar ni una sola línea de tu código backend actual.

## 📁 Contenido
- `index.html`: La "cáscara" de la aplicación. Carga tu Web App dentro de un marco seguro.
- `manifest.json`: Archivo de configuración que hace la app instalable (nombre, colores, iconos).
- `sw.js`: Service Worker que permite guardar esta cáscara en el móvil para que abra rápido.
- `offline.html`: Pantalla de error amigable cuando no hay internet.

## 🚀 Pasos para Desplegar (Hosting Gratuito)

### 1. Configurar la URL de tu Web App
1. Abre el archivo `index.html` en un editor de texto o bloc de notas.
2. Busca la línea que dice `<iframe id="app-frame" src="...">`.
3. Reemplaza la URL actual por la **URL del Ejecutable** de tu Web App.
   - **Importante**: Debe ser la URL que termina en `/exec` (no `/dev`) para que los usuarios finales la usen sin permisos de edición.

### 2. Preparar Iconos
1. Crea una carpeta llamada `icons` dentro de esta carpeta `PWA_Wrapper`.
2. Genera dos imágenes PNG de tu logo:
   - `icon-192x192.png` (192x192 px)
   - `icon-512x512.png` (512x512 px)
3. Las imágenes deben llamarse exactamente así para que el `manifest.json` las encuentre.

### 3. Subir a un Hosting (Recomendado: GitHub Pages)
Esta PWA **debe** servirse a través de HTTPS para ser instalable. GitHub Pages es la opción más sencilla y gratuita.

1. Crea un repositorio en GitHub (o usa uno existente).
2. Sube el contenido de esta carpeta `PWA_Wrapper` a la raíz (o a una carpeta docs).
3. Ve a **Settings -> Pages**.
4. Activa GitHub Pages seleccionando la rama (branch) donde subiste los archivos.
5. GitHub te dará una URL (ej. `https://tu-usuario.github.io/fichapp`).

## 📲 Cómo Instalar
1. Abre la URL que te dio GitHub en el navegador de tu móvil (Chrome en Android, Safari en iOS).
2. **Android**: Verás un aviso "Añadir FichApp a pantalla de inicio" o ve al menú -> "Instalar aplicación".
3. **iOS**: Pulsa el botón "Compartir" (cuadrado con flecha) -> "Añadir a pantalla de inicio".

¡Listo! Tu aplicación Apps Script ahora se comporta como una app nativa.

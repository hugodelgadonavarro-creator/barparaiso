# Bar New Paraíso — Web estática

Sitio de una sola página para Bar New Paraíso (Yuncos, Toledo).  
Abre directamente en el navegador con `index.html`. Sin servidor. Sin build. Sin dependencias locales.

---

## Despliegue en Netlify

Arrastra la carpeta completa (con `index.html`, `styles.css`, `script.js`) a **Netlify Drop** en [app.netlify.com/drop](https://app.netlify.com/drop).  
Con eso ya está en línea. No hace falta configurar nada más.

Para actualizaciones: arrastra la carpeta de nuevo. Netlify sobreescribe automáticamente.

---

## Dónde meter las fotos

Hay 5 huecos de foto preparados en el HTML. Cada hueco tiene el comentario `<!-- FOTO: ... -->` con el nombre del plato.  
El contenedor ya tiene `aspect-ratio: 4/3` y `object-fit: cover`, así que la foto no va a deformar el layout.

### Pasos para sustituir un placeholder:

1. Sube la foto a la misma carpeta que `index.html`.
2. En `index.html`, busca el comentario `<!-- FOTO: nombre-del-plato -->`.
3. Elimina el `<div class="photo-placeholder">...</div>` que hay debajo del comentario.
4. Sustituye por: `<img src="nombre-del-archivo.jpg" alt="Descripción del plato" loading="lazy" />`

### Lista de huecos:

| Sección (en index.html) | Comentario a buscar | Nombre de archivo sugerido |
|---|---|---|
| Plato 1 | `<!-- FOTO: bocadillo de pollo a la plancha -->` | `bocadillo-pollo.jpg` |
| Plato 2 | `<!-- FOTO: bocadillo de tortilla francesa con beicon y queso -->` | `bocadillo-tortilla.jpg` |
| Plato 3 | `<!-- FOTO: paella del Bar New Paraíso -->` | `paella.jpg` |
| Plato 4 | `<!-- FOTO: raciones o tapas del bar -->` | `raciones.jpg` |
| Plato 5 | `<!-- FOTO: papas fritas o baguette del bar -->` | `papas-fritas.jpg` |

**Tamaño recomendado:** 800×600px mínimo. Formato JPG o WebP. Menos de 200KB por foto (usa [Squoosh](https://squoosh.app) para comprimir).

### Foto para compartir por WhatsApp (Open Graph):

En la sección `<head>` de `index.html` hay esta línea comentada:

```html
<!-- <meta property="og:image" content="og-image.jpg" /> -->
```

Descoméntala y sube una foto del bar o de la comida en formato 1200×630px con el nombre `og-image.jpg`.  
Esta es la imagen que aparece al compartir el enlace en WhatsApp, Facebook, etc.

---

## Contacto y pedidos

**Todo el contacto es el teléfono fijo: 925 52 51 02.**

- No hay WhatsApp configurado. No hay botón de WhatsApp en ningún sitio.
- No hay integración con Glovo, Just Eat ni similar.
- Todos los CTAs de la web ya enlazan a `tel:925525102`.

Si en el futuro se añade WhatsApp o plataforma de delivery, busca en `index.html` los atributos `href="tel:925525102"` y añade los nuevos botones al lado (no sustituyas los existentes, son el canal principal).

---

## Horario y estado en vivo

El indicador "Abierto ahora / Cerrado" en la cabecera y en el hero se calcula en JavaScript con el horario real.  
El horario está definido en `script.js`, en el objeto `SCHEDULE`.

Si el horario cambia, edita ese objeto. El formato es: `open` y `close` en minutos desde medianoche (por ejemplo, 9:00 = 540).

**Nota sobre festivos locales:** el script trata los domingos y sábados igual. Los festivos municipales no se detectan automáticamente. Si el bar cierra en un festivo concreto, el indicador mostrará "Abierto" igualmente. Solución: añadir lógica de fechas concretas en `script.js` si se necesita.

---

## Autocrítica de diseño

**Riesgo 1 — El hero usa la reseña como titular, no el nombre del bar.**  
Es una apuesta grande: el nombre "New Paraíso" no aparece en H1. Lo resiste porque el nombre está en el header fijo (siempre visible) y en el bloque de meta del hero. La reseña vende más que cualquier claim inventado, y ese es el objetivo real de la página.

**Riesgo 2 — Sin imágenes reales, la sección de pizarra parece incompleta.**  
Los placeholders con emoji cumplen la función de reservar espacio sin romper el layout, pero el impacto visual depende de que se suban fotos reales. Con buenas fotos la sección pasa de correcta a apetecible. Sin fotos, el diseño tipográfico tiene que aguantar solo, y lo hace, pero no al 100%.

**Riesgo 3 — Paleta muy oscura en móvil de pantalla pequeña en exterior.**  
El fondo carbón sobre una pantalla brillante bajo el sol puede ser difícil de leer. Se compensa con texto crema de alto contraste y fuentes grandes, pero en condiciones de luz solar directa el fondo claro (sección reseñas, sección pedir) es más legible. Los CTAs más importantes están justamente en esas secciones claras.

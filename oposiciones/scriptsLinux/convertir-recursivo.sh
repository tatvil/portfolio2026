#!/bin/bash

# Directorio de salida (para centralizar todos los PDFs)
OUTPUT_DIR="apuntes_pdf"
mkdir -p "$OUTPUT_DIR"

# Buscamos todos los archivos .md desde el directorio actual hacia abajo
find . -type f -name "*.md" | while read -r archivo_md; do
    
    # Obtenemos el nombre base y la ruta para recrear la estructura o nombrar el archivo
    # Sustituimos las barras '/' por '_' para que el nombre del PDF indique su bloque
    nombre_limpio=$(echo "${archivo_md#./}" | sed 's/\//_/g' | sed 's/\.md$//')
    
    echo "Procesando: $archivo_md -> $nombre_limpio.pdf"
    
    # Conversión con Pandoc
    # Usamos weasyprint por su excelente soporte de CSS si quieres aplicarle estilos
    pandoc "$archivo_md" -o "$OUTPUT_DIR/${nombre_limpio}.pdf" \
        --pdf-engine=weasyprint \
        -V geometry:margin=2cm \
        --metadata title="Oposición TAI - $nombre_limpio"
done

echo "------------------------------------------"
echo "Conversión finalizada. Archivos en: $OUTPUT_DIR"

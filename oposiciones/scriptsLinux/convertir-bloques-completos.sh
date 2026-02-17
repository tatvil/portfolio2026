#!/bin/bash

# Script para concatenar archivos tema*.md en bloques completos y generar PDFs
# La idea es crear el temario en markdown, que es facil de editar, y luego
# generar un PDF con formato adecuado, y poder estudiar en papel.
HOY=$(date +%Y%m%d)

for i in 1 2 3 4; do
    # Buscar archivos tema*.md
    FILES=(../bloque$i/tema*.md)

    # Comprobar si existen
    if [ ! -e "${FILES[0]}" ]; then
        echo "⚠️  No hay archivos tema*.md en bloque$i — se omite este bloque."
        continue
    fi

    # Concatenar
    OUT_MD="../bloque${i}-completo${HOY}.md"
    cat ../bloque$i/tema*.md > "$OUT_MD"

    echo "✔ Generado $OUT_MD"

    # Crear PDF
    pandoc "$OUT_MD" \
        -o "../pdfs/bloque${i}_${HOY}.pdf" \
        --pdf-engine=weasyprint \
        --css=estilos.css \
        --toc \
        --metadata title="Bloque ${i} - Actualizado el ${HOY}"

    echo "📄 PDF generado: Bloque${i}_${HOY}.pdf"
done


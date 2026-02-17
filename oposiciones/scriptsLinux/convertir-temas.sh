#!/bin/bash

# Creamos una carpeta para los PDFs si no existe
mkdir -p pdfs_generados

# Recorremos todos los archivos .md
# for f in *.md; do
for f in ../cuestionarios/data/tai_2024A_supuesto2.md; do
    # Extraemos el nombre sin la extensión
    nombre="$(basename "${f%.*}")"
    
    echo "Convirtiendo $f..."
    
    # Convertimos a PDF
    # --pdf-engine=weasyprint es excelente para respetar CSS
    # Si no tienes weasyprint, puedes usar 'wkhtmltopdf' o 'xelatex'
     pandoc "$f" -o "pdfs_generados/${nombre}.pdf" --pdf-engine=weasyprint --metadata title="Oposición TAI - $nombre" -V margin-top=2cm -V margin-bottom=2cm  -V margin-left=1.5cm -V margin-right=1.5cm
done

echo "¡Listo! Tus temas están en la carpeta pdfs_generados"
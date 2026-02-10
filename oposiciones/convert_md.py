#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Convierte Markdown a PDF y DOCX por bloques, concatenando bloque{i}/tema*.md.

"""

import argparse
import subprocess
import sys
import shutil
from datetime import datetime
from pathlib import Path
from glob import glob

def check_cmd_exists(cmd: str) -> bool:
    return shutil.which(cmd) is not None

def run_cmd(cmd_list):
    try:
        subprocess.run(cmd_list, check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error ejecutando: {' '.join(cmd_list)}\n{e}", file=sys.stderr)
        sys.exit(1)

def build_pandoc_common_args(input_md: Path, title: str):
    return [
        "pandoc", str(input_md),
        "--from", "markdown",
        "--toc",
        "--metadata", f"title={title}",
    ]

def convert_to_pdf(input_md: Path, output_pdf: Path, css: str | None):
    args = build_pandoc_common_args(input_md, title=output_pdf.stem)
    args += ["-o", str(output_pdf), "--pdf-engine=weasyprint"]
    if css:
        args += ["--css", css]
    # Embebe recursos (imágenes, etc.) y usa rutas relativas al md
    args += ["--embed-resources", "--resource-path", f".;{input_md.parent}"]
    run_cmd(args)

def convert_to_docx(input_md: Path, output_docx: Path, ref_doc: str | None):
    args = build_pandoc_common_args(input_md, title=output_docx.stem)
    args += ["--to", "docx", "-o", str(output_docx)]
    if ref_doc:
        args += ["--reference-doc", ref_doc]
    args += ["--embed-resources", "--resource-path", f".;{input_md.parent}"]
    run_cmd(args)

def concat_markdown(block_dir: Path, out_md: Path) -> int:
    temas = sorted(glob(str(block_dir / "tema*.md")))
    if not temas:
        return 0
    with out_md.open("w", encoding="utf-8") as f_out:
        for md in temas:
            with open(md, "r", encoding="utf-8") as f_in:
                f_out.write(f_in.read().rstrip() + "\n\n")
    return len(temas)

def convert_to_odt(input_md: Path, output_odt: Path, ref_odt: str | None):
    args = build_pandoc_common_args(input_md, title=output_odt.stem)
    args += ["--to", "odt", "-o", str(output_odt)]
    if ref_odt:
        args += ["--reference-doc", ref_odt]
    args += ["--embed-resources", "--resource-path", f".;{input_md.parent}"]
    run_cmd(args)

def main():
    hoy = datetime.now().strftime("_%Y%m%d")
#    parser = argparse.ArgumentParser(description="Convertir Markdown a PDF y DOCX por bloques.")
#    parser.add_argument("--bloques", nargs="+", type=int, required=True,
#                        help="Lista de números de bloque, ej.: 1 2 3 4")
#    parser.add_argument("--css", type=str, default=None, help="CSS para PDF (WeasyPrint)")
#    parser.add_argument("--ref", type=str, default=None, help="Documento de referencia DOCX (plantilla.docx)")
#    parser.add_argument("--outdir-pdf", type=str, default="pdfs", help="Carpeta salida PDF")
#    parser.add_argument("--outdir-pdf", type=str, default="pdfs", help="Carpeta salida PDF")
#    parser.add_argument("--outdir-docx", type=str, default="docx", help="Carpeta salida DOCX")
#    parser.add_argument("--keep-md", action="store_true", help="Mantener los .md concatenados")
#    args = parser.parse_args()

    # Comprobaciones
    if not check_cmd_exists("pandoc"):
        print("❌ No se encontró 'pandoc' en PATH. Instálalo y vuelve a ejecutar.", file=sys.stderr)
        sys.exit(1)

    # WeasyPrint es opcional, pero si vas a PDF conviene avisar si no está
    weasy_available = check_cmd_exists("weasyprint")
#    if args.css and not Path(args.css).exists():
#        print(f"⚠️  CSS no encontrado: {args.css} (se omitirá en PDF)")

    outdir_pdf = Path("pdfs")
    outdir_docx = Path("docx")
    fichero_plantilla = Path("plantilla.docx")
    fichero_css=Path("scriptsLinux/estilos.css")
    outdir_pdf.mkdir(parents=True, exist_ok=True)
    outdir_docx.mkdir(parents=True, exist_ok=True)

    for i in 1, 2, 3, 4:
        block_dir = Path(f"bloque{i}")
        if not block_dir.exists():
            print(f"⚠️  No existe el directorio {block_dir} — se omite el bloque {i}.")
            continue

        out_md = Path(f"bloque{i}-completo{hoy}.md")
        count = concat_markdown(block_dir, out_md)
        if count == 0:
            print(f"⚠️  No hay archivos tema*.md en {block_dir} — se omite este bloque.")
            continue
        print(f"✔ Generado {out_md} ({count} temas concatenados)")

        title = f"Bloque {i} - Actualizado el {hoy}"

        # DOCX
        out_docx = outdir_docx / f"bloque{i}.docx"
        convert_to_docx(out_md, out_docx, str(fichero_plantilla) if fichero_plantilla.exists() else None)
        print(f"📝 DOCX generado: {out_docx}")

        # PDF
        out_pdf = outdir_pdf / f"bloque{i}.pdf"
        if weasy_available:
            css = fichero_css if fichero_css and Path(fichero_css).exists() else None
            convert_to_pdf(out_md, out_pdf, css)
            print(f"📄 PDF generado: {out_pdf}")
        else:
            print("⚠️  WeasyPrint no está disponible. Instálalo para generar PDF, o usa otra ruta (MiKTeX).")

        # Libre Office Writer (ODT)
        out_odt = outdir_docx / f"bloque{i}.odt"
        convert_to_odt(out_md, out_odt, "plantilla.odt")
        print(f"📝 ODT generado: {out_odt}")

        # Limpieza
        try:
            out_md.unlink()
        except Exception:
            pass  # Si quieres mantenerlos, usa --keep-md

if __name__ == "__main__":
    main()

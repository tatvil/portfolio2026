# 2. Administración de bases de datos. Sistemas de almacenamiento y su virtualización. Políticas, sistemas y procedimientos de backup y su recuperación. Backup de sistemas físicos y virtuales. Virtualización de sistemas y virtualización de puestos de usuario.

## Administración de bases de datos. 
## Sistemas de almacenamiento y su virtualización. 
### RAID
| Nivel | Descripción | Ventajas | Desventajas | Requisitos minimos |
| --- | --- | --- | --- | --- |
| RAID 0 | Striping | Velocidad maxima | No hay redundancia, si un disco falla se pierden todos los datos | 2 discos |
| RAID 1 | Mirroring | Redundancia total; Seguridad alta | Capacidad,  = 1 disco; coste alto | 2 discos |
| RAID 5 | Striping con paridad | Seguridad + velocidad equilibrada | Un disco puede fallar; Reconstruccion lenta | 3 discos |
| RAID 6  | Igual que RAID 5, pero con doble paridad | Puede soportal fallo de dos discos | Mas lento al escribir y mas caro | 4 discos minimo |
| RAID 10 | RAID 1 + RAID 0 | Alta velocidad + redundancia | Necesita muchos discos = coste alto | 4 discos |

## Políticas, sistemas y procedimientos de backup y su recuperación. 
## Backup de sistemas físicos y virtuales. 
## Virtualización de sistemas y virtualización de puestos de usuario.
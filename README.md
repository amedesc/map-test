# map-test
El contenido de este repositorio consta de 3 mapas de la Red Sismológica Nacional (RSN) sobre sismos, fallas y volcanes.

# Mapa de sismos
Despliega sismos en el mapa de Costa Rica de los últimos 15 días con posibilidad de visualizar solo las últimas 24 horas.

Los sismos se representan mediante pines en 3 colores:
Rojo: Mayor a 5.0 Mw
Naranja: De 3.6 Mw a 4.9 Mw
Verde: Menor a 3.5 Mw

El último sismo esta acompañado de un custom marker API de google maps, por lo que se le asigna la misma úbicación del sismo.
Se visualiza mediante CSS3 cómo un 2 circulos animados con pulsaciones crecientes.

El API de google se obtiene del este enlace: https://maps.googleapis.com/maps/api/js
Con este se crea el mapa, los marcadores, las ventadas de información y el marcador del último sismo animado.

El API de 

# Mapa de fallas
Depliega las fallas de Costa Rica acompañadas de un marcador con su nombre, mientras el cursor este sobre el marcador la falla
cambiara de color para facilitar su identificación ya que puede estar conformada por más de una línea, al hacer click en el
marcador se abrirá en una nueva pestaña un enlace de la RSN con información sobre la falla.



# Mapa de volcanes
Despliega los volcanes de Costa Rica en forma de marcador, al hacer click en estos se abré en una nueva pestaña un enlace de la 
RSN con información sobre el volcan seleccionado. Los marcadores tienen forma de volcan y solo los activos cuentan con fumarola.

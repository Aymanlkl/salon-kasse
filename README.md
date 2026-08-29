# Salon Kasse

Tageskasse für den Friseursalon. Läuft als App auf dem Handy, komplett offline,
alle Daten bleiben auf dem Gerät.

## Dateien

    index.html              die ganze App (Design + Logik in einer Datei)
    manifest.webmanifest    macht sie installierbar (Name, Icon, Vollbild)
    sw.js                   Service Worker: Offline-Betrieb + Update-Hinweis
    icons/                  App-Icons für Homescreen und Browser

## Online stellen

Zum Installieren muss die App über **https** erreichbar sein. Ein
Doppelklick auf `index.html` reicht dafür nicht – dann fehlt der Offline-Modus
und „Zum Home-Bildschirm“ funktioniert nicht richtig.

Drei einfache Wege, alle kostenlos:

1. **Netlify Drop** – netlify.com/drop öffnen, den Ordner `app` per Drag & Drop
   auf die Seite ziehen. Nach ein paar Sekunden gibt es eine https-Adresse.
2. **Vercel** – vercel.com, „New Project“, Ordner hochladen.
3. **GitHub Pages** – Ordnerinhalt in ein Repository legen,
   Settings → Pages → Branch auswählen.

## Auf dem Handy installieren

**iPhone (Safari):** Adresse öffnen → Teilen-Symbol → „Zum Home-Bildschirm“.
**Android (Chrome):** Adresse öffnen → Menü ⋮ → „App installieren“.

Danach startet sie im Vollbild ohne Browser-Leiste, ohne Zoom und ohne
seitliches Scrollen.

## Datensicherung

Die Daten liegen ausschließlich im Browser-Speicher des Handys. Sie gehen
verloren, wenn die App gelöscht oder die Website-Daten geleert werden.

Deshalb regelmäßig: **Mehr → Backup speichern**. Die Datei irgendwo sichern
(iCloud, Google Drive, E-Mail an sich selbst). Zurückholen über
**Mehr → Backup wiederherstellen**.

Für den Steuerberater: **Bericht → Zeitraum exportieren** liefert eine
CSV-Datei, die sich direkt in Excel öffnen lässt.

## Neue Version veröffentlichen

Nach Änderungen an `index.html` in `sw.js` die Zeile

    const VERSION = 'salon-kasse-v1';

hochzählen (`-v2`, `-v3`, …) und alles neu hochladen. Die App meldet sich dann
beim nächsten Start mit „Neue Version“ und aktualisiert sich auf Knopfdruck.
Die gespeicherten Daten bleiben dabei erhalten.

# Salon Kasse

Tageskasse für den Friseursalon. Läuft als App auf dem Handy, komplett offline,
alle Daten bleiben auf dem Gerät.

**Live:** https://aymanlkl.github.io/salon-kasse/

## Dateien

    index.html              die ganze App (Design + Logik in einer Datei)
    manifest.webmanifest    macht sie installierbar (Name, Icon, Vollbild)
    sw.js                   Service Worker: Offline-Betrieb + Update-Hinweis
    icons/                  App-Icons für Homescreen und Browser

## Veröffentlichen

Die App liegt auf GitHub Pages. Änderungen gehen so live:

    git add -A && git commit -m "..." && git push

Nach ein bis zwei Minuten ist die neue Fassung unter der Live-Adresse
erreichbar.

## Auf dem Handy installieren

**iPhone (Safari):** Adresse öffnen → Teilen-Symbol → „Zum Home-Bildschirm“.
**Android (Chrome):** Adresse öffnen → Menü ⋮ → „App installieren“.

Danach startet sie im Vollbild ohne Browser-Leiste, ohne Zoom und ohne
seitliches Scrollen.

## Wie die Daten gespeichert werden

Alles bleibt auf dem Handy, nichts geht an einen Server. Damit die Daten dort
auch dauerhaft liegen bleiben, macht die App drei Dinge:

1. **Zwei Speicher parallel** – localStorage und IndexedDB. Räumt der Browser
   einen davon weg, holt die App die Daten beim nächsten Start aus dem anderen.
2. **Dauerhafter Speicher** – die App bittet den Browser, ihre Daten von der
   automatischen Aufräumung auszunehmen. Status unter *Mehr → Speicher &
   Sicherung*; steht dort „nicht aktiv“, lässt es sich dort einschalten.
   Installiert man die App auf dem Homescreen, sagt der Browser meist zu.
3. **Wiederherstellungspunkte** – einmal pro Tag legt die App automatisch einen
   Stand ab, die letzten zehn bleiben erhalten. Auch die Rettung, wenn mal aus
   Versehen etwas gelöscht wurde.

Trotzdem gilt: kein Browser-Speicher ist garantiert. Deshalb erinnert die App
alle 14 Tage an **Mehr → Backup speichern**. Die Datei in iCloud oder Google
Drive legen, zurückholen über *Mehr → Backup wiederherstellen*.

## Export

Unter **Bericht → Zeitraum exportieren** (oder *Mehr → Bericht exportieren*):

- **PDF-Bericht** – Umsatz, Bar/Karte, Umsatz je Friseur, Gehalt bezahlt/offen,
  Ausgaben, Ergebnis und Tagesübersicht.
- **PDF mit allen Buchungen** – zusätzlich jede einzelne Buchung, für den
  Steuerberater.
- **CSV-Datei** – öffnet direkt in Excel.

Die PDFs werden in der App selbst erzeugt, ohne fremde Bibliothek. Der Export
funktioniert deshalb auch offline.

## Neue Version veröffentlichen

Nach Änderungen an `index.html` in `sw.js` die Zeile

    const VERSION = 'salon-kasse-v1';

hochzählen (`-v2`, `-v3`, …) und alles neu hochladen. Die App meldet sich dann
beim nächsten Start mit „Neue Version“ und aktualisiert sich auf Knopfdruck.
Die gespeicherten Daten bleiben dabei erhalten.

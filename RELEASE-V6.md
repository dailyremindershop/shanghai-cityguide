# Shanghai — The City Edit · V6

## Publication (en attente de confirmation)

Cette version est préparée sans déploiement en production. Ne remplacer ni GitHub Pages ni un site existant avant validation finale.

### GitHub Pages (préserve l’origine du carnet)
1. Ouvrir la V5 actuelle sur le téléphone et exporter le carnet JSON avant toute mise à jour.
2. Depuis le projet V6, exécuter `node build.mjs` (Node 18+ ; sans dépendance).
3. Publier le contenu de `dist/` à la racine du dépôt `dailyremindershop/shanghai-cityguide`, sur la branche configurée pour Pages, uniquement après confirmation. Ne pas supprimer les fichiers personnels du navigateur. Aucun secret ni service distant n’est nécessaire.
4. Fermer tous les anciens onglets du guide puis rouvrir. Le nouveau service worker attend la fermeture des anciens onglets : aucune mise à jour brutale d’un carnet ouvert.
5. Dans « Emporter son Shanghai », télécharger et vérifier les ressources. Couper le réseau puis rouvrir le guide pour vérifier sur l’iPhone réel.

### Nouveau site Sites
La version enregistrée peut être déployée après confirmation. Un changement d’origine ne peut pas transférer automatiquement IndexedDB : exporter depuis l’ancien site puis importer ici. Le déploiement Sites peut appliquer un contrôle d’accès en ligne : pour un voyage hors réseau, privilégier l’installation sur GitHub Pages et vérifier la réouverture sur l’appareil réel.

## Données personnelles
- Base conservée : `shanghai-city-edit`, version 1, stores `entries` et `custom`.
- Identifiants conservés : `p0` à `p54`, sans changement d’ordre.
- Checklist conservée sous `shanghai-checklist` ; clés de groupes inchangées.
- Sauvegardes V5/V6 compatibles : `club-daily-reminder-shanghai`, version 1.
- Import : validation avant écriture ; transaction IndexedDB unique pour les entrées et adresses personnelles ; fusion des coches. Les autres fiches restent intactes. Les fiches de mêmes identifiants sont remplacées après confirmation.
- Notes enregistrées à la fermeture du dialogue, changement de fiche et action dans la fiche. Bouton d’enregistrement explicite disponible. Pas de garantie contre une fermeture forcée de l’application avant sauvegarde.
- Photos privées dans IndexedDB, compression JPEG 1 400 px ; pas d’envoi réseau.
- Échecs de stockage signalés. Le mode de secours localStorage est limité en capacité et ne garantit pas l’atomicité entre stores : exporter régulièrement.

## Hors ligne
- Ressources locales, aucune police ou bibliothèque CDN, aucune API distante nécessaire à la lecture.
- Installation atomique du service worker : toutes les ressources du manifeste doivent être récupérées.
- Bouton de téléchargement : vérifie chaque entrée en cache et annonce les erreurs.
- Le cache ne purge que les anciennes versions du guide, jamais les autres caches ni IndexedDB.
- Liens externes (cartes, réservations, sources) en ligne. La carte intégrée est un plan de repérage de huit points documentés, sans rues ni calcul d’itinéraire.
- Le stockage peut être évincé par le navigateur, notamment iOS ; le statut indique une vérification à l’instant du contrôle, pas une garantie permanente.

## Contenu et limites
- 55 fiches conservées, dont 5 restaurants de la sélection Michelin V5. Certaines fiches représentent encore une activité sans prestataire choisi : elles restent clairement signalées.
- 9 photographies documentaires locales avec auteurs/licences/sources. Aucune image de substitution pour les restaurants ou le musée Est.
- 8 points WGS84 documentés. La carte ne couvre pas les 55 adresses. Les autres ne sont pas géocodées arbitrairement.
- 55 tampons numérotés (six motifs SVG originaux). Les visites sont déclaratives, sans suivi de position. Pas de dessin architectural unique pour chacune des 55 fiches.
- Les adresses héritées ne sont pas toutes revérifiées. Les horaires/tarifs hérités de V5 ne sont plus affichés comme des faits actuels ; les sources restent accessibles. Vérification exhaustive des établissements et du classement Michelin actuel encore nécessaire.
- Pas de test natif Safari/iOS ni de test réseau depuis la Chine dans cet environnement.

## Construction
`node --check app.js` ; `node --check data.js` ; `node --check sw.js` ; `node build.mjs`.
Les résultats détaillés des contrôles sont dans TESTS-V6.md, livré avec le code source.

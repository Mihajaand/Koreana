# Koreana Website — Guide simple pour modifier le site

Bonjour,

Ce document vous aide à modifier le contenu du site web de Koreana sans avoir besoin de savoir coder.

Vous pouvez utiliser ce guide même si vous n’avez jamais ouvert du code.

---

## 1. À quoi sert ce site ?

Ce site présente :

- l’hôtel Koreana
- les chambres et tarifs
- le restaurant
- la galerie photo
- les coordonnées de contact

---

## 2. Comment ouvrir le projet

### Option simple

1. Ouvrez le dossier du projet dans VS Code.
2. Ouvrez un terminal.
3. Tapez :

```bash
pnpm install
pnpm dev
```

4. Le site va se lancer dans votre navigateur.

Si vous voyez une page web, c’est que tout est prêt.

---

## 3. Où modifier les textes du site

La plupart des textes sont regroupés dans un seul fichier :

- [src/i18n/translations.js](src/i18n/translations.js)

Ce fichier contient les textes du site en plusieurs langues.

### Exemple de contenu que vous pouvez changer ici

- le titre de la page d’accueil
- le sous-titre du hero
- les textes du restaurant
- les textes du contact
- les textes de la galerie
- les libellés des boutons

### Comment faire

1. Ouvrez [src/i18n/translations.js](src/i18n/translations.js)
2. Cherchez le texte que vous voulez changer
3. Remplacez seulement le texte entre guillemets
4. Enregistrez le fichier
5. Rechargez le navigateur

> Important : ne changez pas les noms des clés, seulement les valeurs. Exemples : `heroTitle`, `hotelHeroLead`, `contactEmail`, etc.

---

## 4. Où modifier les informations de l’hôtel

Les informations de base comme l’adresse, le téléphone, l’email et le Facebook sont dans le fichier :

- [src/data/hotelData.js](src/data/hotelData.js)

### Vous pouvez y modifier :

- le nom de l’hôtel
- l’adresse
- le téléphone
- l’email
- le lien Facebook

### Exemple

Si vous voulez changer le téléphone :

- ouvrez [src/data/hotelData.js](src/data/hotelData.js)
- recherchez `phone`
- remplacez la valeur par votre nouveau numéro

---

## 5. Comment modifier les photos du site

Les images sont dans le dossier :

- [src/assets](src/assets)

### Ce qu’il faut faire

1. Ouvrez le dossier [src/assets](src/assets)
2. Remplacez une image par une autre image de même nom
3. OU remplacez le lien dans le fichier concerné si vous souhaitez utiliser une nouvelle image

### Dossiers importants

- [src/assets](src/assets) = images globales
- [src/assets/Restaurants](src/assets/Restaurants) = photos du restaurant
- [src/assets/galerie](src/assets/galerie) = galerie photo

---

## 6. Comment changer une photo du hero

Le hero = la grande image en haut des pages.

### Si vous voulez changer une image de la page d’accueil

- ouvrez [src/components/Hero.jsx](src/components/Hero.jsx)
- ouvrez [src/components/Hero.css](src/components/Hero.css)

Dans ce cas, il faut remplacer la source de l’image par une autre image déjà présente dans le projet.

### Si vous voulez changer l’image de la page Hôtel

- ouvrez [src/pages/Hotels.jsx](src/pages/Hotels.jsx)

Ici, l’image utilisée pour le hero est importée depuis le dossier des assets.

---

## 7. Comment changer les chambres et tarifs

Les chambres et les tarifs sont dans :

- [src/data/hotelData.js](src/data/hotelData.js)

### Vous pouvez changer :

- le nom des catégories de chambres
- le nombre de chambres
- la description
- les tarifs Day Use
- les tarifs Nuitée + petit-déjeuner

### À noter

Il y a deux catégories :

- Standard
- Appartement

Vous pouvez modifier leur texte ou leurs prix sans changer l’architecture du site.

---

## 8. Comment changer le menu du restaurant

Les images du menu du restaurant sont dans :

- [src/assets/Restaurants](src/assets/Restaurants)

Les textes et libellés du restaurant se trouvent aussi dans :

- [src/i18n/translations.js](src/i18n/translations.js)

Si vous voulez simplement remplacer les images du menu,

1. ouvrez [src/assets/Restaurants](src/assets/Restaurants)
2. remplacez les images existantes
3. gardez les mêmes noms si possible

---

## 9. Comment changer la langue du site

Le site peut être affiché en plusieurs langues.

Les langues sont gérées dans :

- [src/i18n/translations.js](src/i18n/translations.js)

Il y a déjà :

- français
- anglais
- coréen

### Si vous voulez modifier un texte dans une langue

1. ouvrez [src/i18n/translations.js](src/i18n/translations.js)
2. choisissez la section `fr`, `en` ou `ko`
3. modifiez le texte voulu

---

## 10. Comment lancer le site en local

Dans le terminal, à la racine du projet :

```bash
pnpm dev
```

Ensuite, le site s’ouvre généralement sur :

```text
http://localhost:5173
```

---

## 11. Comment vérifier si tout fonctionne

Quand vous avez fini vos modifications :

```bash
pnpm build
```

Si la commande affiche "built" sans erreur, alors le site est validé.

---

## 12. Ce que vous ne devez pas modifier sans besoin

Pour éviter de casser le site :

- ne supprimez pas les fichiers importés dans le code
- ne changez pas les noms des clés dans [src/i18n/translations.js](src/i18n/translations.js)
- ne déplacez pas les images sans mettre à jour les liens dans le code

En gros :

- texte = modifiez dans [src/i18n/translations.js](src/i18n/translations.js)
- infos hôtel = modifiez dans [src/data/hotelData.js](src/data/hotelData.js)
- photos = remplacez dans [src/assets](src/assets)

---

## 13. Résumé ultra simple

### Si vous voulez changer un texte

→ modifiez [src/i18n/translations.js](src/i18n/translations.js)

### Si vous voulez changer une information de contact

→ modifiez [src/data/hotelData.js](src/data/hotelData.js)

### Si vous voulez changer une image

→ remplacez le fichier dans [src/assets](src/assets)

---

## 14. Cas d’usage les plus fréquents

### Changer le numéro de téléphone

- [src/data/hotelData.js](src/data/hotelData.js)

### Changer le texte du hero

- [src/i18n/translations.js](src/i18n/translations.js)

### Changer une photo du restaurant

- [src/assets/Restaurants](src/assets/Restaurants)

### Changer l’adresse Facebook

- [src/data/hotelData.js](src/data/hotelData.js)

---

## 15. Contact technique

Si vous avez besoin d’aide pour un changement simple, contactez la personne qui gère ce site ou le développeur du projet.

---

## 16. En une phrase

Vous n’avez pas besoin de savoir coder pour modifier la majorité du contenu du site : il suffit d’ouvrir les bons fichiers et de remplacer le texte ou les images.


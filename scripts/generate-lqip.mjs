import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

// Même ordre que les imports dans Galerie.jsx — NE PAS CHANGER L'ORDRE
// sans mettre à jour les deux fichiers en même temps.
const imagePaths = [
  // Galerie (legacy)
  "src/assets/galerie/1.jpg",
  "src/assets/galerie/2.jpg",
  "src/assets/galerie/3.jpg",
  "src/assets/galerie/4.jpg",
  "src/assets/galerie/5.jpg",
  "src/assets/galerie/6.jpg",
  "src/assets/galerie/7.jpg",
  "src/assets/galerie/8.jpg",
  "src/assets/galerie/9.jpg",
  "src/assets/galerie/10.jpg",
  "src/assets/galerie/11.jpg",
  "src/assets/galerie/12.jpg",
  "src/assets/galerie/13.jpg",
  "src/assets/galerie/14.jpg",
  "src/assets/galerie/15.jpg",
  "src/assets/galerie/16.png",
  "src/assets/galerie/17.png",
  "src/assets/galerie/18.png",
  "src/assets/galerie/19.png",
  "src/assets/galerie/20.png",
  // Chambres standard
  "src/assets/hotel/standard/chambre-standard-1.jpg",
  "src/assets/hotel/standard/chambre-standard-2.jpg",
  "src/assets/hotel/standard/chambre-standard-3.jpg",
  "src/assets/hotel/standard/chambre-standard-4.jpg",
  "src/assets/hotel/standard/chambre-standard-5.jpg",
  // Appartements
  "src/assets/hotel/appartement/chambre-appart-1.jpg",
  "src/assets/hotel/appartement/chambre-appart-2.jpg",
  "src/assets/hotel/appartement/chambre-appart-3.jpg",
  "src/assets/hotel/appartement/chambre-appart-4.jpg",
  "src/assets/hotel/appartement/chambre-appart-5.jpg",
  "src/assets/hotel/appartement/chambre-appart-6.jpg",
  "src/assets/hotel/appartement/chambre-appart-7.jpg",
  // Restaurant
  "src/assets/restaurant/restau-1.jpg",
  "src/assets/restaurant/restau-2.jpg",
  "src/assets/restaurant/restau-3.jpg",
  "src/assets/restaurant/restau-4.jpg",
  "src/assets/restaurant/restau-5.jpg",
  "src/assets/restaurant/restau-6.jpg",
  "src/assets/restaurant/restau-7.jpg",
  "src/assets/restaurant/restau-8.jpg",
  "src/assets/restaurant/restau-9.jpg",
  "src/assets/restaurant/restau-10.jpg",
  // Extérieur / intérieur
  "src/assets/ext-int/facade-1.jpg",
  "src/assets/ext-int/facade-2.jpg",
  "src/assets/ext-int/facade-3.jpg",
  "src/assets/ext-int/facade-4.jpg",
  "src/assets/ext-int/facade-5.jpg",
];

async function generatePlaceholder(relativePath) {
  const absolutePath = path.join(process.cwd(), relativePath);
  const buffer = await sharp(absolutePath)
    .resize(24) // largeur minuscule, la hauteur suit le ratio
    .blur(2)
    .jpeg({ quality: 40 })
    .toBuffer();

  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function run() {
  console.log(`Génération de ${imagePaths.length} placeholders LQIP...`);

  const results = [];
  for (const relativePath of imagePaths) {
    try {
      const dataUrl = await generatePlaceholder(relativePath);
      results.push(dataUrl);
      console.log(`✓ ${relativePath}`);
    } catch (error) {
      console.error(`✗ ${relativePath} — ${error.message}`);
      results.push(null); // garde l'index aligné même si une image échoue
    }
  }

  const outputPath = path.join(process.cwd(), "src/assets/galerie-lqip.json");
  await writeFile(outputPath, JSON.stringify(results));
  console.log(`\nTerminé → ${outputPath}`);
}

run();
import pkg from "follow-redirects";
const { https } = pkg;

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FULL Image Mapping (paste your full set here — truncated here for example)
const imageMapping = {
  // Hero Section
  "hero-background.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/d017f584f49299eea470d7a8bc37f69744904b76?width=2930",

  // Header
  "header-logo.png":
    "https://api.builder.io/api/v1/image/assets/TEMP/bf971480616ae304b06f187f6ece010db95a27d2?width=270",

  // Footer
  "footer-background.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/c036b52ffa11a3811f2636e4d28da869b70f578c?width=2912",

  // Search Section
  "search-background.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/69e682d02dec2a18b684bfc5aed1bb2d9ed4fe30?width=2906",

  // Adventure Section
  "adventure-travel.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/66c18779ccac0813fb0f27ec336fdd03d32e7912?width=1528",
  "adventure-travel-icon.png":
    "https://api.builder.io/api/v1/image/assets/TEMP/93afa1215b371694bc8a72f2309290d416696ca9?width=80",
  "romantic-travel.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/4fa98871237a98152cdd2600e60382dc5a0ee988?width=1272",
  "romantic-travel-icon.png":
    "https://api.builder.io/api/v1/image/assets/TEMP/62c8b937820d40eb1a7b711e65a4df90d8e33ad1?width=80",
  "mountains-travel.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/13d1840767418e6095373b48874bbffd2ef31b43?width=1350",
  "mountains-travel-icon.png":
    "https://api.builder.io/api/v1/image/assets/TEMP/b56d4e74ed50761f4cc9bd3d693a19be69e068f1?width=80",
  "solo-travel.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/a7777bb2f8f7982c9bb1baefea7b027c341efdc6?width=698",
  "solo-travel-icon.png":
    "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",

  // Travel Categories
  "couple-travel.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/a965d1fe3ee5a5426db1de2f70fa2771a3036c1d?width=852",
  "family-travel.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/e4c10fe3a283ba9ecf021399bbf6e11b31a7e1a1?width=852",
  "corporate-party.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/b9412142fdfd8da8dc2c578c767a4a8f64f0f2a7?width=874",
  "adventure-travel-category.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/e4708ca67dd306df73abfef4eff276d9fadb4971?width=678",
  "solo-travel-category.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/6188719a63d4a99fa94167affb95b28af5bc8afe?width=852",

  // Popular Destinations
  "marina-bay-sands.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/12b05cd9147ab80327e2e186144ace9a20522ba9?width=922",
  "gardens-by-bay.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/adcfa8d38f483dcd3faedc958cb6537791e1100c?width=2212",
  "putrajaya.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/2a725d05762255d9e79faf8a54137c18f60ca35c?width=1868",
  "tioman-island.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/c0dfb3172b68acf712608652b12309e79dc5e45c?width=1824",
  "dubai-marina.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/709d0efd55c9757034e8683ebc87994887052333?width=532",
  "popular-bg-1.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/30b5b380063e62b80cfd3f38a0aa025eeeb18ece?width=1020",
  "popular-bg-2.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/47b04e25c9696b9538a6464ed140e2b4402e62cc?width=3254",

  // Gallery
  "gallery-couple-beach.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/d3a238491e9d58b45a4477ab6a77356efb7a8f3b?width=1386",
  "gallery-james-bond-island.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/d6c3e2c17c09579ad8a76649659ecce38dc11421?width=2624",
  "gallery-mountain-view.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/4b10ff2d2fb315feb60ea578e51b9fd9ca718e9f?width=1428",

  // Testimonials
  "testimonials-background.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/97368234b6a8db01e228a323161070de5979777c?width=2889",
  "testimonial-avatar.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80",

  // Events
  "event-singapore-airport.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/e9bad5dfd42f149747f7bb58d2cbb322037846b8?width=1984",
  "event-maldives-island.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/9d904c6d6e0d1817b904926a1fa0be56e93f9a0c?width=1160",
  "event-japan-temples.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/b32c05bf724451f2ce196a8bdde2740ba08cced0?width=1060",

  // Local Happenings
  "taxi-service.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/68835b40af72c60c1b6918937781906ce4d7a41a?width=1578",
  "private-party.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/7e15d38b94bcf3465259e6de0036568ef97fb6f5?width=1572",
  "restaurant.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/be9181cd175c1ef6b130f617c8f443fc02f943ae?width=1484",

  // Social Media
  "social-instagram-post.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/ec8b3527307302feb1f32be130e36048d339d663?width=492",
  "social-video-thumbnail.jpg":
    "https://api.builder.io/api/v1/image/assets/TEMP/24e3a3abbf59534f7c72d504600eb2972bac0807?width=974",
};

// Directory logic
function getDirectory(filename) {
  if (filename.includes("hero")) return "hero";
  if (filename.includes("header")) return "header";
  if (filename.includes("search")) return "hero";
  if (
    filename.includes("adventure") ||
    filename.includes("travel") ||
    filename.includes("mountains") ||
    filename.includes("solo") ||
    filename.includes("romantic")
  )
    return "adventures";
  if (
    filename.includes("category") ||
    filename.includes("couple") ||
    filename.includes("family") ||
    filename.includes("corporate")
  )
    return "travel-categories";
  if (
    filename.includes("marina") ||
    filename.includes("gardens") ||
    filename.includes("putrajaya") ||
    filename.includes("tioman") ||
    filename.includes("dubai") ||
    filename.includes("popular-bg")
  )
    return "popular-destinations";
  if (filename.includes("gallery")) return "gallery";
  if (filename.includes("testimonial")) return "testimonials";
  if (filename.includes("event")) return "events";
  if (
    filename.includes("taxi") ||
    filename.includes("party") ||
    filename.includes("restaurant")
  )
    return "local-happenings";
  if (filename.includes("social")) return "social-media";
  if (filename.includes("footer")) return "footer";
  return "hero";
}

// Download helper
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`✅ Downloaded: ${filepath}`);
            resolve();
          });
        } else {
          console.log(`❌ Failed to download ${url}: ${response.statusCode}`);
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      })
      .on("error", (err) => {
        console.log(`❌ Error downloading ${url}: ${err.message}`);
        reject(err);
      });
  });
}

// Main function
async function downloadAllImages() {
  console.log("🚀 Starting image downloads...\n");

  for (const [filename, url] of Object.entries(imageMapping)) {
    const directory = getDirectory(filename);
    const filepath = path.join(
      __dirname,
      "public",
      "images",
      directory,
      filename,
    );

    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.log(`❌ Failed to download ${filename}: ${error.message}`);
    }
  }

  console.log("\n✅ All downloads completed!");
}

downloadAllImages();

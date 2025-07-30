# Image Migration Guide: API to Local Assets

This guide shows how to convert all API-based images to local assets in your Nellai Tourism project.

## 📁 Directory Structure

```
public/
└── images/
    ├── hero/
    │   ├── hero-background.jpg
    │   └── search-background.jpg
    ├── header/
    │   └── header-logo.png
    ├── adventures/
    │   ├── adventure-travel.jpg
    │   ├── adventure-travel-icon.png
    │   ├── romantic-travel.jpg
    │   ├── romantic-travel-icon.png
    │   ├── mountains-travel.jpg
    │   ├── mountains-travel-icon.png
    │   ├── solo-travel.jpg
    │   └── solo-travel-icon.png
    ├── travel-categories/
    │   ├── couple-travel.jpg
    │   ├── family-travel.jpg
    │   ├── corporate-party.jpg
    │   ├── adventure-travel-category.jpg
    │   └── solo-travel-category.jpg
    ├── popular-destinations/
    │   ├── marina-bay-sands.jpg
    │   ├── gardens-by-bay.jpg
    │   ├── putrajaya.jpg
    │   ├── tioman-island.jpg
    │   ├── dubai-marina.jpg
    │   ├── popular-bg-1.jpg
    │   └── popular-bg-2.jpg
    ├── gallery/
    │   ├── gallery-couple-beach.jpg
    │   ├── gallery-james-bond-island.jpg
    │   └── gallery-mountain-view.jpg
    ├── testimonials/
    │   ├── testimonials-background.jpg
    │   └── testimonial-avatar.jpg
    ├── events/
    │   ├── event-singapore-airport.jpg
    │   ├── event-maldives-island.jpg
    │   └── event-japan-temples.jpg
    ├── local-happenings/
    │   ├── taxi-service.jpg
    │   ├── private-party.jpg
    │   └── restaurant.jpg
    ├── social-media/
    │   ├── social-instagram-post.jpg
    │   └── social-video-thumbnail.jpg
    └── footer/
        └── footer-background.jpg
```

## 🔄 Components to Update

### ✅ Already Updated:
- `HeroSection.tsx` - Uses `/images/hero/hero-background.jpg`
- `Header.tsx` - Uses `/images/header/header-logo.png`
- `SearchSection.tsx` - Uses `/images/hero/search-background.jpg`

### 📝 Remaining Components to Update:

#### 1. AdventureSection.tsx
```tsx
// Replace these API URLs:
"https://api.builder.io/api/v1/image/assets/TEMP/66c18779ccac0813fb0f27ec336fdd03d32e7912?width=1528"
"https://api.builder.io/api/v1/image/assets/TEMP/93afa1215b371694bc8a72f2309290d416696ca9?width=80"

// With these local paths:
"/images/adventures/adventure-travel.jpg"
"/images/adventures/adventure-travel-icon.png"
```

#### 2. TravelCategories.tsx
```tsx
// Replace API URLs with:
"/images/travel-categories/couple-travel.jpg"
"/images/travel-categories/family-travel.jpg"
"/images/travel-categories/corporate-party.jpg"
"/images/travel-categories/adventure-travel-category.jpg"
"/images/travel-categories/solo-travel-category.jpg"
```

#### 3. PopularDestinations.tsx
```tsx
// Replace API URLs with:
"/images/popular-destinations/marina-bay-sands.jpg"
"/images/popular-destinations/gardens-by-bay.jpg"
"/images/popular-destinations/putrajaya.jpg"
"/images/popular-destinations/tioman-island.jpg"
"/images/popular-destinations/dubai-marina.jpg"
"/images/popular-destinations/popular-bg-1.jpg"
"/images/popular-destinations/popular-bg-2.jpg"
```

#### 4. Gallery.tsx
```tsx
// Replace API URLs with:
"/images/gallery/gallery-couple-beach.jpg"
"/images/gallery/gallery-james-bond-island.jpg"
"/images/gallery/gallery-mountain-view.jpg"
```

#### 5. Testimonials.tsx
```tsx
// Replace API URLs with:
"/images/testimonials/testimonials-background.jpg"
"/images/testimonials/testimonial-avatar.jpg"
```

#### 6. EventsSection.tsx
```tsx
// Replace API URLs with:
"/images/events/event-singapore-airport.jpg"
"/images/events/event-maldives-island.jpg"
"/images/events/event-japan-temples.jpg"
```

#### 7. LocalHappenings.tsx
```tsx
// Replace API URLs with:
"/images/local-happenings/taxi-service.jpg"
"/images/local-happenings/private-party.jpg"
"/images/local-happenings/restaurant.jpg"
```

#### 8. SocialMediaSection.tsx
```tsx
// Replace API URLs with:
"/images/social-media/social-instagram-post.jpg"
"/images/social-media/social-video-thumbnail.jpg"
```

#### 9. Footer.tsx
```tsx
// Replace API URL with:
"/images/footer/footer-background.jpg"
```

## 🚀 Manual Download Process

### Option 1: Browser Download
1. Open each API URL in a new browser tab
2. Right-click on the image and "Save As"
3. Save with the appropriate filename in the correct directory

### Option 2: Use the Download Script
```bash
node download-images.js
```

### Option 3: Use Online Tools
- Use online image downloaders
- Copy the API URLs and download them in batches

## 📋 Complete Image List

### Hero Section
- `hero-background.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/d017f584f49299eea470d7a8bc37f69744904b76?width=2930
- `search-background.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/69e682d02dec2a18b684bfc5aed1bb2d9ed4fe30?width=2906

### Header
- `header-logo.png` - https://api.builder.io/api/v1/image/assets/TEMP/bf971480616ae304b06f187f6ece010db95a27d2?width=270

### Adventures
- `adventure-travel.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/66c18779ccac0813fb0f27ec336fdd03d32e7912?width=1528
- `adventure-travel-icon.png` - https://api.builder.io/api/v1/image/assets/TEMP/93afa1215b371694bc8a72f2309290d416696ca9?width=80
- `romantic-travel.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/4fa98871237a98152cdd2600e60382dc5a0ee988?width=1272
- `romantic-travel-icon.png` - https://api.builder.io/api/v1/image/assets/TEMP/62c8b937820d40eb1a7b711e65a4df90d8e33ad1?width=80
- `mountains-travel.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/13d1840767418e6095373b48874bbffd2ef31b43?width=1350
- `mountains-travel-icon.png` - https://api.builder.io/api/v1/image/assets/TEMP/b56d4e74ed50761f4cc9bd3d693a19be69e068f1?width=80
- `solo-travel.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/a7777bb2f8f7982c9bb1baefea7b027c341efdc6?width=698
- `solo-travel-icon.png` - https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80

### Travel Categories
- `couple-travel.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/a965d1fe3ee5a5426db1de2f70fa2771a3036c1d?width=852
- `family-travel.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/e4c10fe3a283ba9ecf021399bbf6e11b31a7e1a1?width=852
- `corporate-party.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/b9412142fdfd8da8dc2c578c767a4a8f64f0f2a7?width=874
- `adventure-travel-category.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/e4708ca67dd306df73abfef4eff276d9fadb4971?width=678
- `solo-travel-category.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/6188719a63d4a99fa94167affb95b28af5bc8afe?width=852

### Popular Destinations
- `marina-bay-sands.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/12b05cd9147ab80327e2e186144ace9a20522ba9?width=922
- `gardens-by-bay.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/adcfa8d38f483dcd3faedc958cb6537791e1100c?width=2212
- `putrajaya.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/2a725d05762255d9e79faf8a54137c18f60ca35c?width=1868
- `tioman-island.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/c0dfb3172b68acf712608652b12309e79dc5e45c?width=1824
- `dubai-marina.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/709d0efd55c9757034e8683ebc87994887052333?width=532
- `popular-bg-1.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/30b5b380063e62b80cfd3f38a0aa025eeeb18ece?width=1020
- `popular-bg-2.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/47b04e25c9696b9538a6464ed140e2b4402e62cc?width=3254

### Gallery
- `gallery-couple-beach.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/d3a238491e9d58b45a4477ab6a77356efb7a8f3b?width=1386
- `gallery-james-bond-island.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/d6c3e2c17c09579ad8a76649659ecce38dc11421?width=2624
- `gallery-mountain-view.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/4b10ff2d2fb315feb60ea578e51b9fd9ca718e9f?width=1428

### Testimonials
- `testimonials-background.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/97368234b6a8db01e228a323161070de5979777c?width=2889
- `testimonial-avatar.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/05b9dc694bad3b02e4fdcb32d0a634865965bff9?width=80

### Events
- `event-singapore-airport.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/e9bad5dfd42f149747f7bb58d2cbb322037846b8?width=1984
- `event-maldives-island.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/9d904c6d6e0d1817b904926a1fa0be56e93f9a0c?width=1160
- `event-japan-temples.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/b32c05bf724451f2ce196a8bdde2740ba08cced0?width=1060

### Local Happenings
- `taxi-service.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/68835b40af72c60c1b6918937781906ce4d7a41a?width=1578
- `private-party.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/7e15d38b94bcf3465259e6de0036568ef97fb6f5?width=1572
- `restaurant.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/be9181cd175c1ef6b130f617c8f443fc02f943ae?width=1484

### Social Media
- `social-instagram-post.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/ec8b3527307302feb1f32be130e36048d339d663?width=492
- `social-video-thumbnail.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/24e3a3abbf59534f7c72d504600eb2972bac0807?width=974

### Footer
- `footer-background.jpg` - https://api.builder.io/api/v1/image/assets/TEMP/c036b52ffa11a3811f2636e4d28da869b70f578c?width=2912

## ✅ Benefits of Local Assets

1. **Faster Loading** - No external API calls
2. **Better Performance** - Images served from your server
3. **Offline Support** - Works without internet
4. **No Dependencies** - No reliance on external services
5. **Better Control** - You own the assets
6. **SEO Friendly** - Better for search engines

## 🔧 After Migration

1. **Test the application** - Ensure all images load correctly
2. **Optimize images** - Compress images for better performance
3. **Update alt text** - Add descriptive alt text for accessibility
4. **Remove API dependencies** - Clean up any unused API-related code

## 🎯 Next Steps

1. Download all images manually or using the script
2. Update each component with the new local paths
3. Test the application thoroughly
4. Optimize images for web use
5. Update any remaining API references 
// Makes small WebP thumbnails for the pet project galleries.
// Run once after adding or renaming screenshots:  npm run thumbs
//
// public/media/images/project-photos/<project>/<name>.png
//   -> public/media/images/project-photos/<project>/thumbs/<name>.webp  (640px wide)
//
// The grid shows the light thumbnail; the lightbox opens the full PNG.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = 'public/media/images/project-photos';

for (const project of fs.readdirSync(root)) {
    const dir = path.join(root, project);
    const thumbsDir = path.join(dir, 'thumbs');
    fs.mkdirSync(thumbsDir, { recursive: true });

    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.png'))) {
        const target = path.join(thumbsDir, file.replace(/\.png$/, '.webp'));
        await sharp(path.join(dir, file)).resize({ width: 640 }).webp({ quality: 78 }).toFile(target);
    }
    console.log(`${project}: done`);
}

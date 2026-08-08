import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MEDIA_ROOT = path.join(__dirname, '../public/media')

// Helper to normalize folder names
const normalizeFolders = () => {
  const folders = fs.readdirSync(MEDIA_ROOT)
  for (const folder of folders) {
    if (folder.toLowerCase() === 'our-photos' && folder !== 'our-photos') {
      fs.renameSync(path.join(MEDIA_ROOT, folder), path.join(MEDIA_ROOT, 'our-photos'))
    }
  }
}

// Media categories configuration
const CATEGORIES = [
  { folder: 'graduation', prefix: 'graduation' },
  { folder: 'umrah', prefix: 'umrah' },
  { folder: 'memories', prefix: 'memory' },
  { folder: 'our-photos', prefix: 'our-photo' },
  { folder: 'videos', prefix: 'vid' },
  { folder: 'music', prefix: 'track' },
]

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']
const VIDEO_EXTS = ['.mp4', '.mov', '.webm']
const AUDIO_EXTS = ['.mp3', '.wav', '.ogg']

// Process a single directory
const processDirectory = (category) => {
  const dirPath = path.join(MEDIA_ROOT, category.folder)
  if (!fs.existsSync(dirPath)) {
    console.log(`Folder not found: ${category.folder}`)
    return []
  }

  const files = fs.readdirSync(dirPath).filter((f) => {
    const ext = path.extname(f).toLowerCase()
    return IMAGE_EXTS.includes(ext) || VIDEO_EXTS.includes(ext) || AUDIO_EXTS.includes(ext)
  })

  const results = []
  let index = 1

  // Temporary renaming step to avoid collisions
  const tempFiles = files.map((f, i) => {
    const ext = path.extname(f).toLowerCase()
    const oldPath = path.join(dirPath, f)
    const tempName = `temp_${category.prefix}_${i}${ext}`
    const tempPath = path.join(dirPath, tempName)
    fs.renameSync(oldPath, tempPath)
    return { tempName, tempPath, ext }
  })

  // Final renaming
  for (const file of tempFiles) {
    let finalName
    let finalPath
    
    // Find next available sequential name
    do {
      finalName = `${category.prefix}-${String(index).padStart(2, '0')}${file.ext}`
      finalPath = path.join(dirPath, finalName)
      index++
    } while (fs.existsSync(finalPath) && finalPath !== file.tempPath)

    fs.renameSync(file.tempPath, finalPath)
    results.push(finalName)
  }

  console.log(`Processed ${results.length} files in ${category.folder}`)
  return results
}

const run = () => {
  normalizeFolders()
  
  const inventory = {}
  for (const cat of CATEGORIES) {
    inventory[cat.folder] = processDirectory(cat)
  }
  
  // Write the inventory to a JSON file so another script can read it to update data files,
  // or we can update the data files directly here.
  fs.writeFileSync(path.join(__dirname, 'inventory.json'), JSON.stringify(inventory, null, 2))
}

run()

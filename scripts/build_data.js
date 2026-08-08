import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_MEDIA = path.join(__dirname, '../public/media')

const getFiles = (dir) => {
  const fullPath = path.join(PUBLIC_MEDIA, dir)
  if (!fs.existsSync(fullPath)) return []
  return fs.readdirSync(fullPath).filter((f) => !f.endsWith('.svg'))
}

const gradFiles = getFiles('graduation')
const umrahFiles = getFiles('umrah')
const memoryFiles = getFiles('memories')
const photoFiles = getFiles('our-photos')
const videoFiles = getFiles('videos')
const musicFiles = getFiles('music')

console.log('GRADUATION FILES:', gradFiles.length)
console.log('UMRAH FILES:', umrahFiles.length)
console.log('MEMORIES FILES:', memoryFiles.length)
console.log('OUR PHOTOS FILES:', photoFiles.length)
console.log('VIDEO FILES:', videoFiles.length)
console.log('MUSIC FILES:', musicFiles.length)

// 1. Generate galleryContent.js
const galleryMemories = memoryFiles.map((file, i) => {
  const aspects = ['portrait', 'landscape', 'square']
  const aspect = aspects[i % 3]
  return {
    id: `memory-${i + 1}`,
    title: `ذكرياتنا الجميلة - ${i + 1}`,
    description: `لحظة دافئة ملتقطة بكل حب وشغف برفقة حبيبي M♡S♡O 💎.`,
    src: `/media/memories/${file}`,
    category: 'ذكرياتنا',
    aspect,
  }
})

const galleryPhotos = photoFiles.map((file, i) => {
  const aspects = ['portrait', 'landscape', 'square']
  const aspect = aspects[i % 3]
  return {
    id: `photo-${i + 1}`,
    title: `قصتنا معاً - ${i + 1}`,
    description: `إطلالة ساحرة وصورة توثق أجمل اللحظات التي تجمعنا معاً.`,
    src: `/media/our-photos/${file}`,
    category: 'صورنا',
    aspect,
  }
})

const galleryContentCode = `export const memoriesGallery = ${JSON.stringify(galleryMemories, null, 2)}

export const photoGallery = ${JSON.stringify(galleryPhotos, null, 2)}
`

fs.writeFileSync(path.join(__dirname, '../src/data/galleryContent.js'), galleryContentCode)

// 2. Generate timelineContent.js
const gradMilestones = gradFiles.map((file, i) => ({
  id: `grad-${i + 1}`,
  title: i === 0 ? 'بداية الشغف والاجتهاد' : i === gradFiles.length - 1 ? 'لحظة التتويج والنجاح الفاخر' : `محطة الإنجاز والتميز ${i + 1}`,
  story: `مسيرة حافلة بالإصرار والعمل الدؤوب توجت بأجمل لحظات النجاح والتفوق لحبيبي محمد سفيان M♡S♡O 💎.`,
  date: `محطة ${i + 1}`,
  image: `/media/graduation/${file}`,
}))

const umrahMilestones = umrahFiles.map((file, i) => ({
  id: `umrah-${i + 1}`,
  title: i === 0 ? 'نداء الطمأنينة والإيمان' : i === umrahFiles.length - 1 ? 'بركة مستمرة ونور دائم' : `نفحات إيمانية مباركة ${i + 1}`,
  story: `محطة إيمانية خاشعة ومشاعر السكينة والدعاء الصادق من القلب لحبيبي محمد سفيان M♡S♡O 💎.`,
  date: `نفحة ${i + 1}`,
  image: `/media/umrah/${file}`,
}))

const timelineContentCode = `export const graduationMilestones = ${JSON.stringify(gradMilestones, null, 2)}

export const umrahMilestones = ${JSON.stringify(umrahMilestones, null, 2)}
`

fs.writeFileSync(path.join(__dirname, '../src/data/timelineContent.js'), timelineContentCode)

// 3. Generate videoContent.js
const videos = videoFiles.map((file, i) => {
  const posterIndex = i % photoFiles.length
  const poster = photoFiles[posterIndex] ? `/media/our-photos/${photoFiles[posterIndex]}` : '/media/our-photos/our-photo-01.jpg'
  return {
    id: `video-${i + 1}`,
    title: `فيديو عيد الميلاد السينمائي ${i + 1}`,
    description: `عرض احتفالي مميز وموثق بأجمل المشاعر والأوقات السعيدة لحبيبي محمد سفيان M♡S♡O 💎.`,
    poster,
    url: `/media/videos/${file}`,
    duration: '01:30',
  }
})

const videoContentCode = `export const birthdayVideos = ${JSON.stringify(videos, null, 2)}
`

fs.writeFileSync(path.join(__dirname, '../src/data/videoContent.js'), videoContentCode)

// 4. Generate memoryBookContent.js
const memoryBookPages = photoFiles.slice(0, 15).map((file, i) => ({
  id: `memory-book-${i + 1}`,
  title: `صفحة من قصتنا - ${i + 1}`,
  memory: `كل لحظة نقضيها معاً تجعل من الحياة رحلة مليئة بالدفء، والجمال، والحب المستمر مع حبيبي محمد سفيان M♡S♡O 💎.`,
  image: `/media/our-photos/${file}`,
}))

const memoryBookContentCode = `export const luxuryMemoryBookPages = ${JSON.stringify(memoryBookPages, null, 2)}
`

fs.writeFileSync(path.join(__dirname, '../src/data/memoryBookContent.js'), memoryBookContentCode)

// 5. Generate media.js
const mediaCode = `export const galleryItems = ${JSON.stringify(galleryMemories.slice(0, 4), null, 2)}

export const videoItems = ${JSON.stringify(videos.slice(0, 3), null, 2)}

export const musicTracks = [
  {
    id: 'track-1',
    title: 'أنغام حبنا | Romantic Celebration',
    artist: 'M♡S♡O 💎 Studio',
    src: '${musicFiles[0] ? `/media/music/${musicFiles[0]}` : '/media/music/soft-piano.wav'}',
    cover: '${photoFiles[0] ? `/media/our-photos/${photoFiles[0]}` : '/media/our-photos/our-photo-01.jpg'}',
  },
]
`

fs.writeFileSync(path.join(__dirname, '../src/data/media.js'), mediaCode)

// 6. Generate homeContent.js
const homeCode = `export const introMessage =
  'احتفال خاص وسحر دافئ في يوم ميلاد حبيبي وقرة عيني—إلى محمد سفيان M♡S♡O 💎 الذي يجعل حياتي أجمل بوجوده.'

export const featuredPhotos = [
  {
    id: 'featured-1',
    src: '${photoFiles[0] ? `/media/our-photos/${photoFiles[0]}` : '/media/our-photos/our-photo-01.jpg'}',
    alt: 'صورة فاخرة لحبيبي محمد سفيان M♡S♡O 💎',
    label: 'أناقة وحب',
  },
  {
    id: 'featured-2',
    src: '${photoFiles[1] ? `/media/our-photos/${photoFiles[1]}` : `/media/our-photos/${photoFiles[0] || 'our-photo-01.jpg'}`}',
    alt: 'مشهد احتفالي مميز يجمعنا معاً',
    label: 'بريق وتألق',
  },
]

export const latestMemories = [
  {
    id: 'memory-1',
    title: 'ضحكاتنا تحت الضوء',
    description: 'أمسية دافئة مليئة بالضحك، الموسيقى، والذكريات الرائعة مع حبيبي محمد سفيان.',
    src: '${memoryFiles[0] ? `/media/memories/${memoryFiles[0]}` : '/media/memories/memory-01.jpg'}',
  },
  {
    id: 'memory-2',
    title: 'لحظات ذهبية تجمعنا',
    description: 'لحظات فريدة وثمينة في قصتنا تبقى محفورة في القلب والذاكرة.',
    src: '${memoryFiles[1] ? `/media/memories/${memoryFiles[1]}` : '/media/memories/memory-02.jpg'}',
  },
  {
    id: 'memory-3',
    title: 'مفاجآت سارة وحب دائم',
    description: 'احتفال يفيض بالجمال والدفء والحب الصادق لمحمد سفيان.',
    src: '${memoryFiles[2] ? `/media/memories/${memoryFiles[2]}` : '/media/memories/memory-03.jpg'}',
  },
]

export const quoteContent = {
  text: 'أجمل الذكريات هي تلك التي نصنعها مع الشخص الذي يمنحنا الحب والشعور بالوطن والأمان.',
  author: 'إلى حبيبي الغالي محمد سفيان M♡S♡O 💎 في يوم ميلاده',
}
`

fs.writeFileSync(path.join(__dirname, '../src/data/homeContent.js'), homeCode)

console.log('All data files built successfully!')

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(undefined)

const translations = {
  ar: {
    // Branding
    brandName: 'M♡S♡O 💎',
    fullName: 'محمد سفيان',
    nickname: 'M♡S♡O',

    // Navigation
    home: 'الرئيسية',
    guestbook: 'دفتر الزوار',
    gallery: 'معرض الذكريات',
    photos: 'صورنا',
    graduation: 'التخرج',
    umrah: 'العمرة',
    memoryBook: 'كتاب الذكريات',
    videos: 'فيديوهات عيد الميلاد',
    letters: 'رسائل المحبة',
    finalSurprise: 'المفاجأة الأخيرة',
    music: 'الموسيقى',
    favorites: 'المفضلة',

    // Common UI
    theme: 'المظهر',
    language: 'اللغة',
    arabic: 'العربية',
    english: 'English',
    playMusic: 'تشغيل الموسيقى',
    pauseMusic: 'إيقاف الموسيقى',
    downloadPhoto: 'تحميل الصورة',
    exploreMemories: 'استكشاف الذكريات',
    close: 'إغلاق',
    loading: 'جاري التحميل...',

    // Page Titles & Descriptions
    homeTitle: 'الرئيسية',
    homeDesc: 'مساحة احتفالية فاخرة تحتفي بعيد ميلاد محمد سفيان M♡S♡O 💎 بأرقى التفاصيل والذكريات.',
    galleryTitle: 'معرض الذكريات',
    galleryDesc: 'مجموعة مختارة بعناية من أجمل اللحظات والصور التذكارية الخالدة.',
    photosTitle: 'صورنا',
    photosDesc: 'معرض صور فاخر يستعرض أجمل اللحظات والصور التي تجمعنا.',
    graduationTitle: 'رحلة التخرج',
    graduationDesc: 'تسلسل زمني يعكس مسيرة الاجتهاد والنجاح والإنجازات المستحقة.',
    umrahTitle: 'رحلة العمرة',
    umrahDesc: 'محطات إيمانية خاشعة ومشاعر السكينة والامتنان في رحاب البيت الحرام.',
    memoryBookTitle: 'كتاب الذكريات',
    memoryBookDesc: 'صفحات تفيض بالدفء والمحبة توثق أجمل المواقف والأوقات.',
    videosTitle: 'فيديوهات عيد الميلاد',
    videosDesc: 'عروض سينمائية مميزة مصممة للاحتفاء بمناسبة عيد الميلاد.',
    lettersTitle: 'رسائل المحبة',
    lettersDesc: 'رسائل حب غرامية وجدانية تعبر عن التقدير والعشق لحبيبي محمد سفيان.',
    guestbookTitle: 'دفتر الزوار والتهاني',
    guestbookDesc: 'مساحة خاصة لكتابة أرق التهاني وأجمل الدعوات لحبيبي M♡S♡O 💎.',
    finalSurpriseTitle: 'المفاجأة الختامية الخاصة',
    finalSurpriseDesc: 'لحظة فاخرة وسينمائية ختامية إهداء لحبيبي محمد سفيان M♡S♡O 💎.',
    makeAWish: 'اتمنَّ أمنية ✨',
    blowOutCandles: 'انقر على الكعكة لإطفاء الشموع واكتشاف الرسالة الختامية ✨',
    finalMessageTitle: 'كل عام وأنت حبيبي يا M♡S♡O 💎',
    finalMessageBody: 'إلى حبيبي الغالي محمد سفيان، هذه ليست مجرد نهاية لموقع إلكتروني، بل هي تحية حب وامتنان صادقة من أعماق قلبي إليك. أتمنى أن تكون أيامك القادمة دائماً مليئة بالفرح والنجاح والسكينة، وأن نواصل كتابة أجمل حكاياتنا معاً. كل عام وأنت الشخص الذي يحتل أسمى مكانة في حياتي.',

    // Footer
    footerTitle: 'صُنِع لأجمل اللحظات وأغلى الذكريات',
    footerCopy: 'احتفال فاخر خاص بمناسبة عيد ميلاد محمد سفيان M♡S♡O 💎.',

    // GuestBook specific
    wishesFeed: 'سجل التهاني',
    photoInteractions: 'تفاعلات الصور والذكريات',
    wishesPosted: 'تهنئة منشورة',
    heartsShared: 'قلب ومحبة',
    replies: 'رد وتعليق',
    leaveWish: 'اكتب تهنئة بعيد الميلاد',
    yourName: 'اسمك / لقبك',
    birthdayMessage: 'رسالة التهنئة',
    postWish: 'نشر التهنئة',
    searchWishes: 'البحث في التهاني...',
    sortNewest: 'الأحدث أولاً',
    sortOldest: 'الأقدم أولاً',
    sortMostLiked: 'الأكثر إعجاباً',
    verifiedGuest: 'مهنئ معتمد',
    addReply: 'إضافة رد دافئ...',
    comments: 'تعليق',
  },
  en: {
    // Branding
    brandName: 'M♡S♡O 💎',
    fullName: 'Mohamed Soufiane',
    nickname: 'M♡S♡O',

    // Navigation
    home: 'Home',
    guestbook: 'Guest Book',
    gallery: 'Our Memories',
    photos: 'Our Photos',
    graduation: 'Graduation',
    umrah: 'Umrah',
    memoryBook: 'Memory Book',
    videos: 'Birthday Videos',
    letters: 'Letters',
    finalSurprise: 'Final Surprise',
    music: 'Music',
    favorites: 'Favorites',

    // Common UI
    theme: 'Theme',
    language: 'Language',
    arabic: 'العربية',
    english: 'English',
    playMusic: 'Play Music',
    pauseMusic: 'Pause Music',
    downloadPhoto: 'Download Photo',
    exploreMemories: 'Explore Memories',
    close: 'Close',
    loading: 'Loading...',

    // Page Layout
    homeTitle: 'Home',
    homeDesc: 'An elegant luxury celebration space dedicated to Mohamed Soufiane M♡S♡O 💎.',
    galleryTitle: 'Our Memories',
    galleryDesc: 'A carefully curated collection of beautiful snapshots and timeless celebration moments.',
    photosTitle: 'Our Photos',
    photosDesc: 'A luxury gallery featuring our most cherished moments and beautiful memories together.',
    graduationTitle: 'Graduation',
    graduationDesc: 'A graceful timeline of growth, determination, and milestone achievements.',
    umrahTitle: 'Umrah Journey',
    umrahDesc: 'A reflective timeline of sacred steps, gratitude, and lifelong meaning.',
    memoryBookTitle: 'Memory Book',
    memoryBookDesc: 'An interactive luxury book of cherished memories and heartfelt stories.',
    videosTitle: 'Birthday Videos',
    videosDesc: 'A premium collection of celebratory video sequences.',
    lettersTitle: 'Letters of Love',
    lettersDesc: 'Heartfelt handwritten-style romantic messages created with warmth and deep love.',
    guestbookTitle: 'Guest Book & Celebration Wishes',
    guestbookDesc: 'Leave your heartfelt birthday wishes, blessings, and celebrate MSO’s special day.',
    finalSurpriseTitle: 'Final Birthday Surprise',
    finalSurpriseDesc: 'A cinematic luxury ending experience dedicated to Mohamed Soufiane M♡S♡O 💎.',
    makeAWish: 'Make a Wish ✨',
    blowOutCandles: 'Tap the cake to blow out the candles and reveal the final romantic message ✨',
    finalMessageTitle: 'Happy Birthday M♡S♡O 💎',
    finalMessageBody: 'To my dearest Mohamed Soufiane, this is not just the end of a website, but a tribute of love written straight from my heart. May your days be filled with endless joy, success, and peace. Happy Birthday to the one who holds the most cherished place in my heart.',

    // Footer
    footerTitle: 'Built for memorable moments',
    footerCopy: 'A scalable luxury foundation dedicated to Mohamed Soufiane M♡S♡O 💎.',

    // GuestBook specific
    wishesFeed: 'Birthday Wishes Feed',
    photoInteractions: 'Photo & Memory Interactions',
    wishesPosted: 'Wishes Posted',
    heartsShared: 'Hearts Shared',
    replies: 'Replies & Comments',
    leaveWish: 'Leave a Birthday Wish',
    yourName: 'Your Name / Nickname',
    birthdayMessage: 'Birthday Message',
    postWish: 'Post Birthday Message',
    searchWishes: 'Search wishes...',
    sortNewest: 'Newest First',
    sortOldest: 'Oldest First',
    sortMostLiked: 'Most Liked',
    verifiedGuest: 'Verified Guest',
    addReply: 'Write a warm reply...',
    comments: 'Comments',
  },
}

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'ar'
  }

  const storedLanguage = window.localStorage.getItem('language')
  return storedLanguage && (storedLanguage === 'ar' || storedLanguage === 'en') ? storedLanguage : 'ar'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem('language', language)
  }, [language])

  const t = (key) => translations[language]?.[key] ?? translations.ar[key] ?? translations.en[key] ?? key

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isRTL: language === 'ar',
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}

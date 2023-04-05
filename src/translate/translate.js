export default function t(text, options) {
  return translations[text.toLowerCase()] ?? text;
}

const translations = {
  error: 'خطأ',
  loading: 'جار التحميل',
  playing: 'يلعب',
  current_channel: 'القناة الحالية',
  play: 'شغل',
  pause: 'أوقف',
  stop: 'توقف',
};

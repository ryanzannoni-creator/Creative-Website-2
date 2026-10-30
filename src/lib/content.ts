export const STORE_URL = '#demo';
export const STICKER_URL = `${import.meta.env.BASE_URL}img/freshcheck-lid.svg`;
export const navigation = [
  {label:'Meet FreshCheck',href:'#hero'},
  {label:'The everyday problem',href:'#value'},
  {label:'How it works',href:'#benefits'},
  {label:'Try the demo',href:'#demo'},
  {label:'Designed for you',href:'#pack'},
  {label:'Pricing & bundle',href:'pricing.html'},
  {label:'Share feedback',href:'#clubs'},
];
export const benefits = [
 {title:'Close it. Start tracking.',text:'The proposed automatic timer starts when you close the lid, so you don’t have to remember when you put leftovers away.',icon:'◷',color:'green'},
 {title:'See a simple signal.',text:'A proposed sensor checks for gases associated with spoilage and translates its readings into a green, yellow, or red indicator. Reliability still needs validation.',icon:'●',color:'blue'},
 {title:'Get a timely nudge.',text:'Planned app reminders would help bring leftovers back to your attention. The goal is less forgotten food in a busy week.',icon:'↗',color:'red'},
] as const;

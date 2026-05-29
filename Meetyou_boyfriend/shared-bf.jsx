// shared-bf.jsx — data, icons, components for the boyfriend-view prototype.
// Visual reference: 美柚 app screenshots (warm pink gradient banners,
// white cards on light-gray bg, • dotted section headers, curved phase ring,
// pink circular symptom badges).

// ─── Data ─────────────────────────────────────────────────────
const HER = { name: '福尔摩诗', initial: '诗', kind: 'female' };
const HIM = { name: '夏洛克',  initial: '夏', kind: 'male'   };

const PHASES = [
  { key: 'period',   label: '月经期', soft: '#FFD3DD' },
  { key: 'follicle', label: '卵泡期', soft: '#DBEFD0' },
  { key: 'ovulate',  label: '排卵日', soft: '#E6D0F0' },
  { key: 'luteal',   label: '黄体期', soft: '#FFB347' },
];

const CYCLE = {
  phaseKey: 'luteal',
  phaseLabel: '黄体期',
  phaseDay: 11,
  daysToPeriod: 3,
  nextPeriodDate: '5月30日',
  todayDate: '5月27日',
  warning: 4, // 今日警戒 ★★★★
};

const FOCUS_PARAGRAPH =
  '黄体期快结束这几天，她的雌激素和孕激素都在快速下降。' +
  '今天她可能突然话变少、情绪也容易低落，平时随手能做的事都会让她觉得累。' +
  '提前帮她把晚饭安排好，别让她一个人在家想太多；' +
  '如果她突然不想说话，就坐在旁边陪着，比讲道理管用 10 倍。';

const SYMPTOM_PARAGRAPH_HOME =
  '体内激素变化引起的盆腔充血，可能会让她觉得腹部有一些坠胀甚至疼痛感。';

const SYMPTOM_PARAGRAPH_DETAIL =
  '雌激素水平进一步下降，皮肤和头发会更容易出油；' +
  '盆腔充血也可能让她觉得腹部坠胀。这两天她对气味、噪音都会更敏感。';

const SYMPTOMS = [
  { id: 'bloat', name: '小腹坠胀', accent: '#F4889E' },
  { id: 'pain',  name: '腹痛',     accent: '#EE6F88' },
  { id: 'mood',  name: '情绪低落', accent: '#B596E6' },
  { id: 'tired', name: '容易疲倦', accent: '#E5A55B' },
];

// 小互动 — what the boyfriend can do today.
const MICRO_ACTIONS = [
  { id: 'milk',  emoji: '🍵', title: '泡杯温牛奶',     sub: '37°C 最贴心' },
  { id: 'hug',   emoji: '🤍', title: '5 秒拥抱',       sub: '比说话管用' },
  { id: 'home',  emoji: '🏠', title: '早点回家',       sub: '今天别加班' },
  { id: 'avoid', emoji: '🚫', title: '"你又来事了"', sub: '千万别问' },
];

// 恋爱日记 — 统一卡片样式：日期 + 引号 + 正文（可选照片网格）
// 类型：text / photo / video（仅占位）。已移除 link/milestone/system 等差异化卡片
const DIARY = [
  {
    id: 'd1', day: '27', weekday: '星期二', period: '2026/5', counter: '在一起 102 天',
    kind: 'photo',
    body: '陪她去公园散步，她忽然把手伸过来。\n回家的时候她说今天好开心。',
    pics: [['#FFD0DC','#FFA0B8'], ['#FFE0CC','#FFB89E']],
    author: '夏洛克', time: '21:42',
  },
  {
    id: 'd2', day: '26', weekday: '星期一', period: '2026/5', counter: '在一起 101 天',
    kind: 'text',
    body: '她今天来例假了。\n她说："你今天怎么这么乖。"\n我说："因为是你呀。"',
    author: '夏洛克', time: '23:08',
  },
  {
    id: 'd3', day: '25', weekday: '星期天', period: '2026/5', counter: '在一起 100 天',
    kind: 'photo',
    badge: '100 天纪念日',
    body: '在一起整整 100 天 ❤\n送了她一直在看的那条项链，她哭了三次。',
    pics: [['#FFD0DC','#FFA0B8'], ['#FFE0CC','#FFB89E'], ['#E8D4FF','#C5A4F2']],
    author: '夏洛克', time: '20:00',
  },
  {
    id: 'd4', day: '20', weekday: '星期二', period: '2026/5', counter: '在一起 95 天',
    kind: 'video',
    body: '排了 40 分钟队的可颂，她说值。一起拍了段小视频。',
    pics: [['#FFE6D0','#FFC299']],
    videoBadge: true,
    author: '夏洛克', time: '08:30',
  },
  {
    id: 'd5', day: '15', weekday: '星期四', period: '2026/5', counter: '在一起 90 天',
    kind: 'text',
    body: '系统提前 1 天提醒我她要来例假了，订好了红糖姜茶。\n第二天她抱着暖宝宝说："好幸福哦。"',
    author: '夏洛克', time: '06:12',
  },
];

// ─── Icons ────────────────────────────────────────────────────
const Chevron = ({ size = 16, stroke = 'currentColor', sw = 2, dir = 'right' }) => {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[dir] || 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M9 6l6 6-6 6"/>
    </svg>
  );
};
const BackArrow = ({ size = 22, stroke = '#fff', sw = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 6l-7 6 7 6"/>
  </svg>
);
const SearchIcon = ({ size = 20, stroke = '#2A1F23', sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
  </svg>
);
const PencilIcon = ({ size = 18, stroke = '#2A1F23', sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 6l4 4"/>
  </svg>
);
const HeartIcon = ({ size = 18, fill = 'none', stroke = 'currentColor', sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
    <path d="M12 21s-7-4.5-9.5-9C1 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 5.5 3.5 4 7-2.5 4.5-9.5 9-9.5 9z"/>
  </svg>
);
const InfoIcon = ({ size = 14, stroke = '#B6A4AC', sw = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8.5v.01"/>
  </svg>
);
const CameraIcon = ({ size = 20, stroke = '#fff', sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round">
    <path d="M3 8h3l2-3h8l2 3h3v11H3z"/><circle cx="12" cy="13" r="4"/>
  </svg>
);
const HomeTabIcon = ({ active }) => (
  <svg width={26} height={26} viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="13" r="11" fill={active ? '#FF5C8A' : '#F0E0E5'}/>
    <path d="M9 11.5L13 8l4 3.5V17a1 1 0 01-1 1h-2v-3h-2v3h-2a1 1 0 01-1-1v-5.5z" fill="#fff"/>
  </svg>
);
const MsgTabIcon = ({ active }) => (
  <svg width={26} height={26} viewBox="0 0 26 26" fill="none" stroke={active ? '#FF5C8A' : '#B6A4AC'} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M22 13c0 4.4-4 8-9 8-1.4 0-2.7-.2-3.9-.7L4 22l1.4-4.4C4.5 16.4 4 14.7 4 13c0-4.4 4-8 9-8s9 3.6 9 8z" fill={active ? '#FFE0EA' : 'none'}/>
  </svg>
);
const MeTabIcon = ({ active }) => (
  <svg width={26} height={26} viewBox="0 0 26 26" fill="none" stroke={active ? '#FF5C8A' : '#B6A4AC'} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <circle cx="13" cy="9" r="4" fill={active ? '#FFE0EA' : 'none'}/><path d="M5 22c1.3-4 4.4-6.5 8-6.5s6.7 2.5 8 6.5"/>
  </svg>
);
// Avatar — soft pink puff (no character/face).
function PuffHeart({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <radialGradient id="puffG" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF1F5"/>
          <stop offset="55%" stopColor="#FFC4D6"/>
          <stop offset="100%" stopColor="#FF95B5"/>
        </radialGradient>
        <radialGradient id="puffShine" cx="35%" cy="30%" r="35%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      {/* soft puffy outline using overlapping circles */}
      <g fill="url(#puffG)">
        <circle cx="50" cy="50" r="32"/>
        <circle cx="32" cy="42" r="14"/>
        <circle cx="68" cy="42" r="14"/>
        <circle cx="36" cy="62" r="13"/>
        <circle cx="64" cy="62" r="13"/>
        <circle cx="50" cy="28" r="13"/>
        <circle cx="50" cy="72" r="13"/>
      </g>
      <ellipse cx="42" cy="38" rx="12" ry="8" fill="url(#puffShine)"/>
      {/* tiny white heart sparkle */}
      <path d="M50 60c-3-3-7-4.5-7-8 0-2.5 2-4 4-4 1.4 0 2.4.7 3 1.6.6-.9 1.6-1.6 3-1.6 2 0 4 1.5 4 4 0 3.5-4 5-7 8z"
        fill="rgba(255,255,255,0.55)"/>
    </svg>
  );
}

// ─── Cycle phase ring ─────────────────────────────────────────
// Matches reference: pink (top-right), green (bottom-right),
// purple flower (bottom), orange (left, active) with white dots
// and an indicator that "points" inward via a stick to the center puff.
function CyclePhaseRing({ size = 280 }) {
  const cx = size/2, cy = size/2;
  const r  = size * 0.36;
  const sw = size * 0.13;
  const toRad = (d) => (d - 90) * Math.PI / 180;
  const pt = (deg, rad = r) => {
    const a = toRad(deg);
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  const arc = (s, e) => {
    const [x0,y0] = pt(s); const [x1,y1] = pt(e);
    const large = (e - s) > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };

  // angle ranges (0° = top, clockwise)
  const PERIOD   = [30,  92];   // top-right pink
  const FOLLICLE = [108, 175];  // bottom-right green
  const OVULATE  = 188;         // small flower at bottom
  const LUTEAL   = [212, 350];  // left side orange (active)

  // current day marker — near end of luteal (黄体期 day 11 of ~14)
  const indDeg = 332;
  const [indX, indY] = pt(indDeg);
  // connector toward center puff
  const [innerX, innerY] = pt(indDeg, r - sw * 0.95);

  // flower at bottom-center
  const [fx, fy] = pt(OVULATE);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* — phase arcs — */}
        <path d={arc(...PERIOD)}   fill="none" stroke="#FFD3DD" strokeWidth={sw} strokeLinecap="round"/>
        <path d={arc(...FOLLICLE)} fill="none" stroke="#DBEFD0" strokeWidth={sw} strokeLinecap="round"/>
        {/* luteal (active) — base solid */}
        <path d={arc(...LUTEAL)} fill="none" stroke="#FFB347" strokeWidth={sw} strokeLinecap="round"/>
        {/* highlight gradient overlay for warmth */}
        <defs>
          <linearGradient id="lutHi" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD580"/>
            <stop offset="100%" stopColor="#FFA94D"/>
          </linearGradient>
        </defs>
        <path d={arc(...LUTEAL)} fill="none" stroke="url(#lutHi)" strokeWidth={sw} strokeLinecap="round" opacity="0.85"/>
        {/* white progress dots along luteal arc */}
        {Array.from({ length: 11 }).map((_, i) => {
          const t = i / 10;
          const deg = LUTEAL[0] + 8 + t * (LUTEAL[1] - LUTEAL[0] - 16);
          const [px, py] = pt(deg);
          return <circle key={i} cx={px} cy={py} r={size*0.014} fill="rgba(255,255,255,0.85)"/>;
        })}

        {/* — 排卵日 flower (5 petals, purple) — */}
        <g transform={`translate(${fx},${fy})`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <ellipse key={i} cx="0" cy={-size*0.04} rx={size*0.022} ry={size*0.035}
              fill="#D9BCEC" transform={`rotate(${i * 72})`}/>
          ))}
          <circle cx="0" cy="0" r={size*0.018} fill="#C9A6E0"/>
        </g>

        {/* — connector stick from arc to center — */}
        <line x1={indX} y1={indY} x2={innerX} y2={innerY}
          stroke="#FFB347" strokeWidth={size*0.018} strokeLinecap="round"/>
        <circle cx={innerX} cy={innerY} r={size*0.022} fill="#FFB347"/>
        {/* indicator dot */}
        <circle cx={indX} cy={indY} r={size*0.040} fill="#fff"/>
        <circle cx={indX} cy={indY} r={size*0.028} fill="#FFD580"/>
        <circle cx={indX} cy={indY} r={size*0.040} fill="none" stroke="#FFB347" strokeWidth={size*0.010}/>
      </svg>

      {/* — center: drop-zone for mascot PNG, with PuffHeart as fallback — */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: size * 0.42, height: size * 0.42, position: 'relative' }}>
          {/* fallback puff sits behind; image-slot covers it when filled */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <PuffHeart size={size * 0.34}/>
          </div>
          <image-slot
            id="cycle-mascot"
            shape="circle"
            placeholder="拖入官方吉祥物 PNG"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
              background: 'transparent', borderRadius: '50%' }}
          ></image-slot>
        </div>
      </div>

      {/* — phase labels — vertical Chinese stacked text — */}
      <PhaseLabel pos="top-right"    text="月经期" size={size} color="#F4889E"  bg="#FFD3DD"/>
      <PhaseLabel pos="bottom-right" text="卵泡期" size={size} color="#7CC18F" bg="#DBEFD0"/>
      <PhaseLabel pos="bottom"       text="排卵日" size={size} color="#C9A6E0" bg="transparent"/>
      <PhaseLabel pos="left"         text="黄体期" size={size} color="#F08A2A" bg="transparent" bold/>
    </div>
  );
}

function PhaseLabel({ pos, text, size, color, bold }) {
  const styles = {
    'top-right':    { top:  size * 0.07, right: size * 0.08, writingMode: 'vertical-rl', textOrientation: 'upright' },
    'bottom-right': { bottom: size * 0.10, right: size * 0.04, writingMode: 'vertical-rl', textOrientation: 'upright' },
    'bottom':       { bottom: size * 0.0, left: '50%', transform: 'translateX(-50%)' },
    'left':         { top:  size * 0.20, left:  size * 0.04, writingMode: 'vertical-rl', textOrientation: 'upright' },
  };
  return (
    <div style={{
      position: 'absolute', ...styles[pos],
      fontSize: size * 0.052, fontWeight: bold ? 700 : 600,
      color, letterSpacing: 2, fontFamily: '"Noto Sans SC", sans-serif',
      lineHeight: 1.1,
    }}>{text}</div>
  );
}

// ─── Symptom badge — pink/peach gradient circle with abstract glyph ────
function SymptomBadge({ id, size = 64 }) {
  // Each symptom = soft-pink filled circle + a simple geometric mark.
  const marks = {
    bloat: (
      // belly profile suggestion: a soft dome curve with downward arrow + dot
      <g>
        <path d="M14 28 Q32 14 50 28 L50 50 Q32 56 14 50 Z" fill="#FFF0F4" opacity="0.75"/>
        <path d="M18 28 Q32 20 46 28" fill="none" stroke="#FFA0B5" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M32 30 L32 42 M28 38 L32 42 L36 38" stroke="#F4889E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="46" r="2" fill="#F4889E"/>
      </g>
    ),
    pain: (
      <g>
        <path d="M14 26 Q32 14 50 26 L50 50 Q32 56 14 50 Z" fill="#FFE0EA" opacity="0.75"/>
        {/* lightning bolt */}
        <path d="M32 22 L26 34 L32 34 L28 46 L40 30 L34 30 L38 22 Z"
          fill="#EE6F88" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round"/>
      </g>
    ),
    mood: (
      <g>
        {/* downturned mouth */}
        <circle cx="32" cy="32" r="18" fill="#FFE0EA"/>
        <circle cx="26" cy="28" r="2" fill="#B596E6"/>
        <circle cx="38" cy="28" r="2" fill="#B596E6"/>
        <path d="M25 41 Q32 35 39 41" fill="none" stroke="#B596E6" strokeWidth="2.4" strokeLinecap="round"/>
        {/* tear */}
        <path d="M39 33 q1 3 0 5 a2 2 0 0 1 -3 -1 Z" fill="#B596E6" opacity="0.7"/>
      </g>
    ),
    tired: (
      <g>
        <circle cx="32" cy="32" r="18" fill="#FFE6D0"/>
        {/* closed eyes */}
        <path d="M22 30 Q26 28 30 30" fill="none" stroke="#E5A55B" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M34 30 Q38 28 42 30" fill="none" stroke="#E5A55B" strokeWidth="2.2" strokeLinecap="round"/>
        {/* small zZz */}
        <text x="44" y="22" fontSize="10" fill="#E5A55B" fontWeight="700">zZ</text>
        <path d="M24 40 Q32 44 40 40" fill="none" stroke="#E5A55B" strokeWidth="2.2" strokeLinecap="round"/>
      </g>
    ),
  };
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #FFE3EA 55%, #FFCBD8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 6px 14px rgba(255,140,170,0.18)',
    }}>
      <svg width={size * 0.82} height={size * 0.82} viewBox="0 0 64 64">
        {marks[id] || marks.bloat}
      </svg>
    </div>
  );
}

// ─── Avatar disc (initial inside gradient) — used in nav, hero ────
function InitialAvatar({ size = 36, initial = '柚', from = '#FFC1D2', to = '#FF8AA9', ring }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${from}, ${to})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: size * 0.44,
      flexShrink: 0, boxShadow: ring ? `0 0 0 3px ${ring}` : 'none',
      letterSpacing: -0.5, fontFamily: '"Noto Sans SC", sans-serif',
    }}>{initial}</div>
  );
}

// ─── AvatarPortrait — abstract male/female SVG portrait (no specific person) ───
function AvatarPortrait({ kind = 'female', size = 44, ring = '#fff', ringWidth = 3 }) {
  const isF = kind === 'female';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', overflow: 'hidden',
      border: `${ringWidth}px solid ${ring}`,
      boxShadow: '0 4px 10px rgba(0,0,0,0.14)',
      flexShrink: 0,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 64 64">
        <defs>
          <radialGradient id={`bg-${kind}`} cx="50%" cy="38%" r="65%">
            {isF
              ? <><stop offset="0%" stopColor="#FFF1F5"/><stop offset="100%" stopColor="#FFC1D2"/></>
              : <><stop offset="0%" stopColor="#E3F0FF"/><stop offset="100%" stopColor="#A4C3E8"/></>
            }
          </radialGradient>
        </defs>
        <rect width="64" height="64" fill={`url(#bg-${kind})`}/>
        {isF ? (
          <g>
            {/* shoulders */}
            <ellipse cx="32" cy="64" rx="26" ry="18" fill="#FFE0EA"/>
            {/* hair back (long bob) */}
            <path d="M14 32 Q14 14 32 14 Q50 14 50 32 L50 48 Q42 40 32 40 Q22 40 14 48 Z" fill="#5B3A2E"/>
            {/* face */}
            <ellipse cx="32" cy="32" rx="12.5" ry="14.5" fill="#FFE2D0"/>
            {/* fringe */}
            <path d="M19 24 Q24 18 32 22 Q40 18 45 24 Q40 22 32 24 Q24 22 19 24 Z" fill="#5B3A2E"/>
            {/* blush */}
            <ellipse cx="23" cy="36" rx="2.4" ry="1.6" fill="#FFA8C0" opacity="0.7"/>
            <ellipse cx="41" cy="36" rx="2.4" ry="1.6" fill="#FFA8C0" opacity="0.7"/>
            {/* eyes */}
            <ellipse cx="26" cy="32" rx="1.3" ry="1.7" fill="#2A1F1F"/>
            <ellipse cx="38" cy="32" rx="1.3" ry="1.7" fill="#2A1F1F"/>
            {/* mouth */}
            <path d="M29 39 Q32 41.5 35 39" stroke="#D87090" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          </g>
        ) : (
          <g>
            {/* shoulders */}
            <ellipse cx="32" cy="64" rx="26" ry="18" fill="#B7CFEC"/>
            {/* hair short (top) */}
            <path d="M19 26 Q19 14 32 14 Q45 14 45 26 L45 30 Q40 24 32 24 Q24 24 19 30 Z" fill="#2D1F18"/>
            {/* face */}
            <ellipse cx="32" cy="33" rx="11.5" ry="13.5" fill="#F4D9B5"/>
            {/* brows */}
            <path d="M25 30 q1.5 -1 3 0" stroke="#2D1F18" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            <path d="M36 30 q1.5 -1 3 0" stroke="#2D1F18" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            {/* eyes */}
            <circle cx="27" cy="33" r="1.3" fill="#2A1F1F"/>
            <circle cx="38" cy="33" r="1.3" fill="#2A1F1F"/>
            {/* mouth */}
            <path d="M29 40 Q32 42 35 40" stroke="#A6593E" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          </g>
        )}
      </svg>
    </div>
  );
}

// ─── Washi tape strip — small decorative tape for sticky notes / polaroids ──
function WashiTape({ width = 60, height = 16, color = '#FFD86B', altColor, rot = -20,
                    left, right, top = -8, style }) {
  // alt-color stripes for a "washi" pattern
  const stripe = altColor
    ? `repeating-linear-gradient(45deg, ${color} 0 6px, ${altColor} 6px 12px)`
    : color;
  return (
    <div style={{
      position: 'absolute',
      width, height,
      left, right, top,
      background: stripe,
      transform: `rotate(${rot}deg)`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      opacity: 0.9,
      ...style,
    }}/>
  );
}

// ─── Heart sparkle — tiny decorative SVG heart ───
function HeartSparkle({ size = 14, color = '#FF7898', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}
      style={{ position: 'absolute', ...style }}>
      <path d="M12 21s-7-4.5-9.5-9C1 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 5.5 3.5 4 7-2.5 4.5-9.5 9-9.5 9z"/>
    </svg>
  );
}

// ─── Photo placeholder ───
function PhotoBox({ from, to, label, w = '100%', h = 88, radius = 12, hint }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${from}, ${to})`,
      display: 'flex', alignItems: 'flex-end', padding: 8,
      color: 'rgba(255,255,255,0.95)', fontSize: 10, fontWeight: 500,
    }}>
      <div style={{ position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, transparent 0 10px, rgba(255,255,255,0.08) 10px 11px)' }}/>
      {hint && <div style={{ position: 'absolute', top: 6, left: 8, fontSize: 9,
        background: 'rgba(0,0,0,0.22)', color: '#fff', padding: '1px 5px', borderRadius: 4,
        fontFamily: 'ui-monospace, monospace' }}>{hint}</div>}
      <div style={{ position: 'relative', textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>{label}</div>
    </div>
  );
}

// ─── Section header — • 红点 + 加粗黑色文字 ───
function SectionTitle({ children, dotColor = '#FF5C8A', size = 15 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: size, fontWeight: 700, color: '#1F1318',
      letterSpacing: -0.2,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0,
      }}/>
      {children}
    </div>
  );
}

// ─── Bottom tab — 3 tabs to match reference (陪伴 / 消息 / 我) ───
function BottomTab({ active = 'home', onChange = () => {} }) {
  const items = [
    { id: 'home', label: '陪伴', Icon: HomeTabIcon },
    { id: 'msg',  label: '消息', Icon: MsgTabIcon, badge: 4 },
    { id: 'me',   label: '我',   Icon: MeTabIcon },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '7px 8px 22px', background: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.05)',
    }}>
      {items.map(it => {
        const on = active === it.id;
        return (
          <div key={it.id} onClick={() => onChange(it.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 2, padding: '4px 0', cursor: 'pointer', position: 'relative',
            color: on ? '#FF5C8A' : '#B6A4AC',
          }}>
            <div style={{ position: 'relative' }}>
              <it.Icon active={on}/>
              {it.badge && (
                <div style={{
                  position: 'absolute', top: -3, right: -10, minWidth: 17, height: 17,
                  padding: '0 4px', borderRadius: 9, background: '#FF4D6A',
                  color: '#fff', fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid #fff',
                }}>{it.badge}</div>
              )}
            </div>
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, letterSpacing: 0.2 }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Expose
Object.assign(window, {
  HER, HIM, PHASES, CYCLE, FOCUS_PARAGRAPH, SYMPTOM_PARAGRAPH_HOME, SYMPTOM_PARAGRAPH_DETAIL,
  SYMPTOMS, MICRO_ACTIONS, DIARY,
  Chevron, BackArrow, SearchIcon, PencilIcon, HeartIcon, InfoIcon, CameraIcon,
  CyclePhaseRing, SymptomBadge, InitialAvatar, AvatarPortrait, HeartSparkle,
  PhotoBox, SectionTitle, BottomTab, PuffHeart,
});

// screens-shared.jsx — 美柚设计规范 token + 共享基础组件
// 严格遵循 CLAUDE.md / DESIGN-meiyou-510.md v1.0-ai

// ─── 设计 Token ─────────────────────────────────────────────────
const MY = {
  // 颜色
  brandRed:   '#ff4d88',
  brandSoft:  'rgba(255,77,136,0.08)',
  brandSoft2: 'rgba(255,77,136,0.14)',
  bg:         '#f2f2f5',
  surface:    '#ffffff',
  textPri:    '#323232',
  textSec:    '#666666',
  textTer:    '#999999',
  line:       'rgba(0,0,0,0.08)',
  disabled:   'rgba(0,0,0,0.25)',
  success:    '#00cc99',
  warning:    '#ff9500',
  danger:     '#ff4d4d',
  link:       '#4f7cae',
  // 圆角
  rxs:   4,
  rsm:   8,
  rmd:   12,
  rpill: 999,
  // 阴影
  shadow1: '0 2px 10px rgba(50,50,50,0.08)',
  shadow2: '0 8px 24px rgba(0,0,0,0.14)',
  // 字体
  font: '"PingFang SC","SF Pro Text","Helvetica Neue",Arial,sans-serif',
};

// PETAL alias — 兼容旧 API，新写法直接用 MY
const PETAL = {
  rose:     MY.brandRed,
  roseDeep: '#cc0066',
  rosePale: 'rgba(255,77,136,0.15)',
  blush:    MY.brandSoft,
  blushSoft:MY.brandSoft,
  pageBg:   MY.bg,
  cream:    MY.surface,
  ink:      MY.textPri,
  ink60:    MY.textSec,
  ink40:    MY.textTer,
  ink12:    MY.line,
  line:     MY.line,
  card:     MY.surface,
  font:     MY.font,
};

// 用户身份常量 — 全局统一
const USER    = { name: '女友殿下', initial: '女', bg: '#FFB5C8' };
const PARTNER = { name: '男友先生', initial: '男', bg: '#A8C5E0' };

// ─── 基础图形组件 ────────────────────────────────────────────────

// ── 头像剪影 SVG（女 / 男，通用）────────────────────────────────
// ── 头像剪影 SVG（女 / 男，通用）────────────────────────────────
function _AvatarSVG({ isFemale, size }) {
  const w = size * 0.72, h = size * 0.82;
  if (isFemale) return (
    <svg width={w} height={h} viewBox="0 0 36 41" fill="none">
      <ellipse cx="18" cy="10" rx="7" ry="7.5" fill="rgba(255,255,255,0.92)"/>
      <path d="M11 10 Q11 2 18 2 Q25 2 25 10" fill="rgba(255,255,255,0.92)"/>
      <path d="M11 8 Q9 12 10 16" stroke="rgba(255,255,255,0.92)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M25 8 Q27 12 26 16" stroke="rgba(255,255,255,0.92)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 22 Q10 18 18 18 Q26 18 26 22 L29 41 H7 Z" fill="rgba(255,255,255,0.92)"/>
      <path d="M13 20 Q18 23 23 20" stroke="rgba(255,255,255,0.28)" strokeWidth="1" fill="none"/>
    </svg>
  );
  return (
    <svg width={w} height={h} viewBox="0 0 36 41" fill="none">
      <ellipse cx="18" cy="10" rx="7" ry="7.5" fill="rgba(255,255,255,0.92)"/>
      <path d="M11 10 Q11 3 18 3 Q25 3 25 10 L25 8 Q18 5 11 8 Z" fill="rgba(255,255,255,0.92)"/>
      <path d="M8 22 Q8 18 18 18 Q28 18 28 22 L27 41 H9 Z" fill="rgba(255,255,255,0.92)"/>
      <path d="M15 18 L18 22 L21 18" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
    </svg>
  );
}

// 头像 — 剪影形象（initial='女'→女生，其余→男生）
function Avatar({ size = 36, bg = '#FFB5C8', initial = '女' }) {
  const isFemale = initial === '女';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'inline-flex', alignItems: 'flex-end', justifyContent: 'center',
      flexShrink: 0, overflow: 'hidden',
    }}>
      <_AvatarSVG isFemale={isFemale} size={size}/>
    </div>
  );
}

// 双头像（重叠）
function CoupleAvatars({ size = 32, left, right }) {
  const l = left  || { bg: USER.bg,    initial: USER.initial };
  const r = right || { bg: PARTNER.bg, initial: PARTNER.initial };
  const AvaCircle = ({ person, border }) => (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: person.bg,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      overflow: 'hidden', border: border || 'none', flexShrink: 0,
    }}>
      <_AvatarSVG isFemale={person.initial === '女'} size={size}/>
    </div>
  );
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AvaCircle person={l} border="2px solid #fff"/>
      </div>
      <div style={{ marginLeft: -size * 0.35 }}>
        <AvaCircle person={r} border="2px solid #fff"/>
      </div>
    </div>
  );
}

// 男性占位剪影（未绑定时使用）
function MalePlaceholder({ size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: '#D8D4CF', overflow: 'hidden',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width={size} height={size} viewBox="0 0 64 64">
        <circle cx="32" cy="23" r="11" fill="#A8A09A"/>
        <rect x="28" y="32" width="8" height="6" fill="#A8A09A"/>
        <path d="M10 64 Q10 44 32 42 Q54 44 54 64 Z" fill="#A8A09A"/>
        <path d="M27 40 L32 50 L37 40 L37 46 L27 46 Z" fill="#D8D4CF"/>
      </svg>
    </div>
  );
}

// 图片占位 — 斜线底纹
function ImgSlot({ w = '100%', h = 120, label = 'photo', radius = MY.rsm }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      background: `repeating-linear-gradient(135deg, #f7f5f6 0 8px, #fff 8px 16px)`,
      border: `1px solid ${MY.line}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: MY.textTer, fontFamily: 'ui-monospace,monospace',
      fontSize: 11, letterSpacing: 0.2,
    }}>{label}</div>
  );
}

// 状态栏
function StatusBar({ dark = false }) {
  const c = dark ? '#fff' : MY.textPri;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 22px 6px', fontFamily: MY.font, color: c,
    }}>
      <div style={{ fontWeight: 600, fontSize: 15 }}>9:41</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill={c}/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill={c}/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill={c}/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill={c}/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11">
          <path d="M7.5 3a7 7 0 0 1 5.3 2.4l1-1A8.4 8.4 0 0 0 7.5 1 8.4 8.4 0 0 0 1.2 4.4l1 1A7 7 0 0 1 7.5 3z" fill={c}/>
          <circle cx="7.5" cy="9" r="1.3" fill={c}/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke={c} strokeOpacity="0.4"/>
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill={c}/>
          <rect x="22.5" y="3.5" width="1.5" height="5" rx="0.5" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// Home Indicator
function HomeBar({ dark = false }) {
  return (
    <div style={{
      position: 'absolute', bottom: 6, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{
        width: 134, height: 5, borderRadius: 3,
        background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.22)',
      }}/>
    </div>
  );
}

// 手机外壳 — 360×780，内容区 inset 36px top / 24px bottom
// StatusBar 以透明绝对层叠在最上方，children 容器去掉 overflow:hidden
// 使带渐变 hero 的页面可以将 hero 延伸到 top:-36 自然覆盖状态栏区域
function Phone({ children, bg = MY.surface, statusDark = false }) {
  return (
    <div style={{
      width: 360, height: 780, borderRadius: 36, overflow: 'hidden',
      position: 'relative', background: bg,
      boxShadow: '0 24px 56px rgba(50,50,50,0.16), 0 0 0 1px rgba(0,0,0,0.08)',
      fontFamily: MY.font, color: MY.textPri,
      WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale',
    }}>
      {/* 内容层：inset 36px 为状态栏预留空间，去掉 overflow:hidden 使 hero 可延伸至 top:-36 */}
      <div style={{ position: 'absolute', inset: '36px 0 24px' }}>
        {children}
      </div>
      {/* 状态栏透明叠层：内容自然透出，图标始终在最上方 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        pointerEvents: 'none', zIndex: 20,
      }}>
        <StatusBar dark={statusDark}/>
      </div>
      <HomeBar dark={statusDark}/>
    </div>
  );
}

// 一级页顶部栏 — 「美柚」居中 + 右侧搜索（背景与页面底色一致）
function HomeTopBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '8px 16px 8px', position: 'relative', minHeight: 44,
      background: MY.bg,
    }}>
      <span style={{ fontSize: 17, fontWeight: 500, color: MY.textPri, letterSpacing: 0.5 }}>美柚</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
        <circle cx="11" cy="11" r="7" stroke={MY.textPri} strokeWidth="1.8" fill="none"/>
        <path d="M16.5 16.5L21 21" stroke={MY.textPri} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// 二级页顶部栏 — 返回 + 居中标题 + 可选右侧文字
function TopBar({ title, right, dark = false, onBack }) {
  const c = dark ? '#fff' : MY.textPri;
  const cr = dark ? 'rgba(255,255,255,0.7)' : MY.textSec;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', height: 44, flexShrink: 0,
    }}>
      <div onClick={onBack} style={{ width: 60, display: 'flex', alignItems: 'center', cursor: onBack ? 'pointer' : 'default' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M15 5l-7 7 7 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{ fontSize: 17, fontWeight: 500, color: c, letterSpacing: 0 }}>{title}</span>
      <div style={{ width: 60, textAlign: 'right', fontSize: 14, color: cr, whiteSpace: 'nowrap' }}>
        {right || ''}
      </div>
    </div>
  );
}

// 底部 Tab — 5 个，选中品牌红，无默认红点
function TabBar({ active = 'home', firstLabel = '推荐', onChange }) {
  const items = [
    { id: 'home', label: firstLabel, icon: (c, on) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        {on
          ? <g fill={c}><ellipse cx="12" cy="5.5" rx="3" ry="4"/><ellipse cx="18.5" cy="12" rx="4" ry="3"/><ellipse cx="12" cy="18.5" rx="3" ry="4"/><ellipse cx="5.5" cy="12" rx="4" ry="3"/><circle cx="12" cy="12" r="3" fill="#fff"/></g>
          : <g stroke={c} strokeWidth="1.6" fill="none"><ellipse cx="12" cy="5.5" rx="3" ry="4"/><ellipse cx="18.5" cy="12" rx="4" ry="3"/><ellipse cx="12" cy="18.5" rx="3" ry="4"/><ellipse cx="5.5" cy="12" rx="4" ry="3"/></g>
        }
      </svg>
    )},
    { id: 'record', label: '记录', icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5" width="16" height="16" rx="3" stroke={c} strokeWidth="1.8"/>
        <rect x="7" y="3" width="2" height="4" rx="1" fill={c}/>
        <rect x="15" y="3" width="2" height="4" rx="1" fill={c}/>
        <path d="M8 11h8M8 15h5" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    )},
    { id: 'shop', label: '返现', icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/>
        <path d="M8.5 14.5c0 1.4 1.6 2.5 3.5 2.5s3.5-1.1 3.5-2.5c0-1.8-3.5-2.5-3.5-4C12 8.6 13.6 7.5 15.5 7.5"
          stroke={c} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <path d="M12 6v12" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    )},
    { id: 'msg', label: '消息', icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2V6z"
          stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'me', label: '我', icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.8"/>
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )},
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: MY.surface, borderTop: `1px solid ${MY.line}`,
      display: 'flex', justifyContent: 'space-around',
      padding: '6px 4px 20px',
    }}>
      {items.map(it => {
        const on = it.id === active;
        const c = on ? MY.brandRed : '#7C7479';
        return (
          <div key={it.id} onClick={() => onChange && onChange(it.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            flex: 1, color: c, fontSize: 10, fontWeight: on ? 600 : 400,
            cursor: 'pointer', minHeight: 44, justifyContent: 'center',
          }}>
            {it.icon(c, on)}
            <span style={{ letterSpacing: 0 }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// 开关（纯视觉）
function Toggle({ on = true }) {
  return (
    <div style={{
      width: 44, height: 26, borderRadius: 13,
      background: on ? MY.brandRed : '#D9D6D9',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 20 : 2,
        width: 22, height: 22, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }}/>
    </div>
  );
}

// 浮动发帖 FAB — 铅笔 icon
function PostFAB() {
  return (
    <div style={{
      position: 'absolute', right: 16, bottom: 64,
      width: 48, height: 48, borderRadius: '50%',
      background: MY.brandRed,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 8px 16px rgba(255,77,136,0.38)`,
      cursor: 'pointer', zIndex: 5,
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 20h4l11-11-4-4L4 16v4z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 6l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SHARED DIARY DATA + COMPONENTS
// ═══════════════════════════════════════════════════════════════

// Unified diary entries — used by all 4 diary surfaces
const DIARY_DAYS = [
  {
    id: 'd1', date: '今天', sub: '在一起 102 天',
    cards: [
      { kind: 'photo', authorKey: 'M', time: '21:42',
        text: '一起走完雁荡山，还是成就感满满的！',
        photos: 3,
        comments: [{ authorKey: 'F', text: '对呀！下次一起去麦理浩径吧 🥾' }] },
    ],
  },
  {
    id: 'd2', date: '5月26日', sub: '在一起 101 天',
    cards: [
      { kind: 'text', authorKey: 'M', time: '23:08',
        text: '记得今天早点回家，最近肚子是不是有点不舒服？',
        comments: [{ authorKey: 'F', text: '没事啦，就是经期前几天，谢谢你 ❤︎' }] },
    ],
  },
  {
    id: 'd3', date: '5月25日', sub: '在一起 100 天',
    cards: [
      { kind: 'text', authorKey: 'M', time: '20:00',
        text: '送了她一直在看的那条项链，她说："你怎么知道我想要这个。"',
        comments: [{ authorKey: 'F', text: '在一起 100 天，谢谢你一直都在 ❤︎' }] },
    ],
  },
  {
    id: 'd4', date: '5月23日', sub: '在一起 97 天',
    cards: [
      { kind: 'photo', authorKey: 'F', time: '20:15',
        text: '你送我的玫瑰真的好惊喜，第一次有人这样认真挑花给我 🌹',
        photos: 2,
        comments: [{ authorKey: 'M', text: '你笑的样子比花还好看' }] },
    ],
  },
  {
    id: 'd5', date: '5月20日', sub: '在一起 94 天',
    cards: [
      { kind: 'text', authorKey: 'F', time: '14:30',
        text: '今天痛经痛了一整天 😭 一动也不想动。',
        comments: [{ authorKey: 'M', text: '已经给你煮好红糖姜茶放保温杯里了，下班接你 🍵' }] },
    ],
  },
];

// Resolve author: 'M' = 男友先生, 'F' = 女友殿下
function _author(key) {
  return key === 'M' ? PARTNER : USER;
}

// Single diary card (photo or text)
function DiaryEntryCard({ card }) {
  const au = _author(card.authorKey);
  return (
    <div style={{ background: MY.bg, borderRadius: MY.rsm, padding: '10px 12px' }}>
      {/* photos */}
      {card.kind === 'photo' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${card.photos === 1 ? 1 : card.photos === 2 ? 2 : 3}, 1fr)`,
          gap: 3, marginBottom: 8,
        }}>
          {Array.from({ length: card.photos }).map((_, i) => (
            <ImgSlot key={i} h={64} label="" radius={MY.rxs}/>
          ))}
        </div>
      )}
      {/* body */}
      <div style={{ fontSize: 13, color: MY.textPri, lineHeight: '20px' }}>{card.text}</div>
      {/* meta row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, marginTop: 8,
        paddingTop: 8, borderTop: `1px solid ${MY.line}`,
      }}>
        <Avatar size={18} bg={au.bg} initial={au.initial}/>
        <span style={{ fontSize: 11.5, color: MY.textTer, flex: 1 }}>{au.name} · {card.time}</span>
        <span style={{ fontSize: 12, color: MY.textTer }}>🤍 赞</span>
        <span style={{ fontSize: 12, color: MY.textTer, marginLeft: 8 }}>💬 回复</span>
      </div>
      {/* comments */}
      {card.comments && card.comments.map((c, i) => {
        const ca = _author(c.authorKey);
        return (
          <div key={i} style={{ marginTop: 6, paddingTop: 6, borderTop: `1px solid ${MY.line}` }}>
            <span style={{ fontSize: 12, color: MY.textSec, fontWeight: 600 }}>{ca.name}：</span>
            <span style={{ fontSize: 12, color: MY.textSec }}>{c.text}</span>
          </div>
        );
      })}
    </div>
  );
}

// 100-day milestone card
function MilestoneCard({ day }) {
  return (
    <div style={{
      borderRadius: MY.rmd, padding: '18px 18px',
      background: 'linear-gradient(125deg, #FFE9C7 0%, #FFD0B5 50%, #FFC3CE 100%)',
      boxShadow: '0 6px 18px rgba(255,160,120,0.22)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* decorative circle */}
      <div style={{
        position: 'absolute', top: -36, right: -28, width: 140, height: 140,
        borderRadius: '50%', background: 'rgba(255,255,255,0.28)',
      }}/>
      {/* sparkle hearts */}
      {[[12,'#fff',{top:10,right:14}],[8,'rgba(255,255,255,0.7)',{top:28,right:40}],[10,'rgba(255,255,255,0.55)',{bottom:14,left:16}]].map(([sz,fill,pos],i)=>(
        <svg key={i} width={sz} height={sz} viewBox="0 0 24 24" fill={fill} style={{ position:'absolute', ...pos }}>
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/>
        </svg>
      ))}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* big number */}
        <div style={{
          background: '#fff', borderRadius: MY.rmd, padding: '8px 16px',
          boxShadow: '0 3px 8px rgba(0,0,0,0.09)',
          display: 'flex', alignItems: 'baseline', gap: 2, transform: 'rotate(-4deg)',
        }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: '#E07A3B', letterSpacing: -2, lineHeight: 1 }}>{day.stat}</span>
          <span style={{ fontSize: 11, color: '#A87644', fontWeight: 600 }}>天</span>
        </div>
        <div style={{ flex: 1, color: '#6E3B1C' }}>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.2 }}>{day.title}</div>
          <div style={{ fontSize: 12.5, marginTop: 5, lineHeight: '19px', opacity: 0.9 }}>{day.text}</div>
        </div>
      </div>
    </div>
  );
}

// One date group — dot + date label + cards
function DiaryDayGroup({ day }) {
  if (day.kind === 'milestone') {
    return (
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div style={{
          position: 'absolute', left: -14, top: 3, width: 10, height: 10,
          borderRadius: '50%', background: '#E07A3B',
          boxShadow: `0 0 0 3px ${MY.surface}`,
        }}/>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: MY.textPri }}>{day.date}</span>
          <span style={{ fontSize: 11, color: MY.textTer }}>{day.sub}</span>
        </div>
        <MilestoneCard day={day}/>
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', marginBottom: 16 }}>
      <div style={{
        position: 'absolute', left: -14, top: 3, width: 8, height: 8,
        borderRadius: '50%', background: MY.brandRed,
        boxShadow: `0 0 0 3px ${MY.surface}`,
      }}/>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: MY.textPri }}>{day.date}</span>
        <span style={{ fontSize: 11, color: MY.textTer }}>{day.sub}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(day.cards || []).map((c, i) => <DiaryEntryCard key={i} card={c}/>)}
      </div>
    </div>
  );
}

// Home module: compact timeline (clipped ~half height) + fade + "查看全部" button overlaid on fade
function DiaryHomeModule({ onViewAll }) {
  return (
    <div style={{ background: MY.surface, borderRadius: MY.rmd, padding: '14px 14px 12px', boxShadow: MY.shadow1 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: MY.textPri, marginBottom: 14 }}>恋爱记</div>

      {/* Clipped content area */}
      <div style={{ position: 'relative' }}>
        <div style={{ height: 140, overflow: 'hidden', position: 'relative', paddingLeft: 14 }}>
          <div style={{
            position: 'absolute', left: 4, top: 6, bottom: 0, width: 0,
            borderLeft: `1.5px dashed #FFD0DC`,
          }}/>
          {DIARY_DAYS.slice(0, 2).map(d => <DiaryDayGroup key={d.id} day={d}/>)}
        </div>

        {/* Gradient fade: covers bottom 72px of clipped area */}
        <div style={{
          position: 'absolute',
          top: 68, left: 0, right: 0, height: 72,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.97) 80%, #ffffff 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}/>

        {/* Button overlaid on the fade */}
        <button onClick={onViewAll} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          width: '100%', height: 40, marginTop: -14,
          border: `1px solid ${MY.line}`, borderRadius: MY.rpill, background: MY.surface,
          color: MY.textSec, fontSize: 13, cursor: 'pointer', fontFamily: MY.font,
          position: 'relative', zIndex: 2,
        }}>查看全部记录 ›</button>
      </div>
    </div>
  );
}

// Full diary timeline (all groups)
function DiaryFullTimeline() {
  return (
    <div style={{ position: 'relative', paddingLeft: 18 }}>
      <div style={{
        position: 'absolute', left: 5, top: 6, bottom: 6, width: 0,
        borderLeft: `1.5px dashed #FFD0DC`,
      }}/>
      {DIARY_DAYS.map(d => <DiaryDayGroup key={d.id} day={d}/>)}
      <div style={{ textAlign: 'center', fontSize: 13, color: MY.textTer, paddingTop: 8 }}>
        — 我们的故事，未完待续 —
      </div>
    </div>
  );
}

Object.assign(window, {
  MY, PETAL, USER, PARTNER,
  DIARY_DAYS, DiaryEntryCard, DiaryDayGroup, MilestoneCard, DiaryHomeModule, DiaryFullTimeline,
  Avatar, CoupleAvatars, MalePlaceholder, ImgSlot,
  StatusBar, HomeBar, Phone, HomeTopBar, TopBar, TabBar, Toggle, PostFAB,
});

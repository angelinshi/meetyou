// screens-diary-v2.jsx — 恋爱记新版 UI + 交互
// 覆盖：DiaryHomeModule / Screen5DiaryAll / BFDiary
// 依赖：MY / USER / PARTNER / Phone / ImgSlot（来自 screens-shared.jsx）

// ── 注入动画 CSS ─────────────────────────────────────────────────
;(function() {
  if (document.getElementById('diary-v2-css')) return;
  const s = document.createElement('style');
  s.id = 'diary-v2-css';
  s.textContent = [
    '@keyframes diarySlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}',
    '@keyframes diaryBlink{0%,100%{opacity:1}50%{opacity:0}}',
    '@keyframes diaryWave{0%,100%{height:4px}50%{height:14px}}',
    '@keyframes diaryFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes fanPop{0%{transform:scale(0);opacity:0;}70%{transform:scale(1.14);opacity:1;}100%{transform:scale(1);opacity:1;}}',
    '@keyframes emojiRainFall{0%{transform:translateY(-30px) translateX(0) rotate(0deg);opacity:1;}70%{opacity:0.85;}100%{transform:translateY(860px) translateX(var(--emoji-drift)) rotate(var(--emoji-spin));opacity:0;}}',
    '@keyframes spin{to{transform:rotate(360deg)}}',
  ].join('');
  document.head.appendChild(s);
})();

// ── 剪影头像（替换字母 Avatar）──────────────────────────────────
function DiaryAva({ person, size = 36 }) {
  const isFemale = person === USER || person.initial === '女';
  const bg = person.bg || '#FFB5C8';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      flexShrink: 0, overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      {isFemale ? (
        <svg width={size * 0.72} height={size * 0.82} viewBox="0 0 36 41" fill="none">
          <ellipse cx="18" cy="10" rx="7" ry="7.5" fill="rgba(255,255,255,0.92)"/>
          <path d="M11 10 Q11 2 18 2 Q25 2 25 10" fill="rgba(255,255,255,0.92)"/>
          <path d="M11 8 Q9 12 10 16" stroke="rgba(255,255,255,0.92)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M25 8 Q27 12 26 16" stroke="rgba(255,255,255,0.92)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M10 22 Q10 18 18 18 Q26 18 26 22 L29 41 H7 Z" fill="rgba(255,255,255,0.92)"/>
          <path d="M13 20 Q18 23 23 20" stroke="rgba(255,255,255,0.28)" strokeWidth="1" fill="none"/>
        </svg>
      ) : (
        <svg width={size * 0.72} height={size * 0.82} viewBox="0 0 36 41" fill="none">
          <ellipse cx="18" cy="10" rx="7" ry="7.5" fill="rgba(255,255,255,0.92)"/>
          <path d="M11 10 Q11 3 18 3 Q25 3 25 10 L25 8 Q18 5 11 8 Z" fill="rgba(255,255,255,0.92)"/>
          <path d="M8 22 Q8 18 18 18 Q28 18 28 22 L27 41 H9 Z" fill="rgba(255,255,255,0.92)"/>
          <path d="M15 18 L18 22 L21 18" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
        </svg>
      )}
    </div>
  );
}

// ── 语音气泡 ─────────────────────────────────────────────────────
function DiaryVoiceBubble({ sec, playing, onPlay }) {
  const BARS = 20;
  const heights = Array.from({ length: BARS }, (_, i) => {
    const x = i / BARS;
    return 3 + Math.round(Math.sin(x * Math.PI * 3 + 1) * 5 + Math.sin(x * Math.PI * 7) * 3 + 3);
  });
  return (
    <div onClick={onPlay} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: playing ? MY.brandSoft : MY.bg,
      border: `1.5px solid ${playing ? MY.brandRed : 'transparent'}`,
      borderRadius: 20, padding: '8px 12px', cursor: 'pointer',
      transition: 'all 0.18s',
    }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: MY.brandRed,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {playing
          ? <svg width="10" height="12" viewBox="0 0 10 12"><rect x="0" y="0" width="3.5" height="12" rx="1.5" fill="#fff"/><rect x="6.5" y="0" width="3.5" height="12" rx="1.5" fill="#fff"/></svg>
          : <svg width="10" height="12" viewBox="0 0 10 12"><path d="M1 1l8 5-8 5V1z" fill="#fff"/></svg>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2.5, height: 20 }}>
        {heights.map((h, i) => (
          <div key={i} style={{
            width: 2.5, height: h, background: playing ? MY.brandRed : '#C0B8C8', borderRadius: 2,
            animation: playing ? `diaryWave ${0.5 + i * 0.04}s ease-in-out infinite alternate` : 'none',
            animationDelay: playing ? `${i * 0.04}s` : '0s',
          }}/>
        ))}
      </div>
      <span style={{ fontSize: 12.5, color: playing ? MY.brandRed : MY.textSec, fontWeight: 500, flexShrink: 0 }}>{sec}"</span>
    </div>
  );
}

// ── 日记数据（v2）────────────────────────────────────────────────
// ── 互动文案池 ────────────────────────────────────────────────────
const INTERACT_COPY = {
  '抱抱': ['张开双臂，收留你所有不安的片刻','把体温叠成一封信，寄到你怀里','拥抱是宇宙最短的回音，而你听见了'],
  '亲亲': ['吻是落在额头的逗号，故事未完待续','从月亮上偷来一个吻，今晚好梦','风替我绕过山海，在你脸颊停了一秒'],
  '贴贴': ['靠近一点，听我们的心跳在押韵','两朵云碰在一起时，人间下起了糖','脸颊挨着脸颊，像春天挨着春天'],
  '想你': ['想你这件事，像云朵长在了天空里','月亮打喷嚏时，抖落了满天的想你','黄昏忽然有了重量，因为你在远方'],
  '爱你': ['爱你是宇宙里最温柔的既定航向','把你的名字揉进春风，花开满余生','你是我在人间的韵脚，让句子完整'],
};
function getInteractCopy(label) {
  const pool = INTERACT_COPY[label];
  if (!pool) return '送出了一个' + label;
  return pool[Math.floor(Math.random() * pool.length)];
}

const DIARY_POSTS_V2 = [
  { id: 'dv1',  authorKey: 'F', time: '21:42', daysTag: '第102天', kind: 'text',
    text: '一起走完雁荡山，下山的时候腿都软了 😂 真的好有成就感！', photos: 3,
    comments: [{ authorKey: 'M', text: '辛苦你了～下次一起去麦理浩径吧 🥾' }] },
  { id: 'dv1b', authorKey: 'M', time: '14:20', daysTag: '第102天', kind: 'text',
    text: '今天出发前帮你备好了防晒和水，出门记得带哦 ☀️', photos: 0,
    comments: [] },
  { id: 'dv0a', authorKey: 'M', time: '10:15', daysTag: '第102天', kind: 'interact',
    interactEmoji: '🫂', interactLabel: '抱抱', interactColor: '#FF8C42',
    interactCopy: '张开双臂，收留你所有不安的片刻', comments: [] },
  { id: 'dv0b', authorKey: 'M', time: '09:30', daysTag: '第102天', kind: 'interact',
    interactEmoji: '❤️', interactLabel: '爱你', interactColor: '#FF4D4D',
    interactCopy: '爱你是宇宙里最温柔的既定航向', comments: [] },
  { id: 'dv2',  authorKey: 'M', time: '23:08', daysTag: '第101天', kind: 'voice',
    voiceSec: 18, photos: 0,
    comments: [{ authorKey: 'F', text: '没事啦，谢谢你这么细心 ❤︎' }] },
  { id: 'dv3',  authorKey: 'F', time: '20:15', daysTag: '第97天', kind: 'text',
    text: '你送我的玫瑰真的好惊喜，第一次有人这样认真挑花给我 🌹', photos: 2,
    comments: [{ authorKey: 'M', text: '你笑的样子比花还好看' }] },
  { id: 'dv4',  authorKey: 'M', time: '19:30', daysTag: '第94天', kind: 'voice',
    voiceSec: 9, photos: 0, comments: [] },
  { id: 'dv5',  authorKey: 'F', time: '14:30', daysTag: '第94天', kind: 'text',
    text: '今天痛经痛了一整天 😭 一动也不想动。', photos: 0,
    comments: [{ authorKey: 'M', text: '已经给你煮好红糖姜茶，下班接你回家 🍵' }] },
];

// ── 时间格式化辅助 ────────────────────────────────────────────────
const _TODAY_DAY_NUM = 102; // 第102天 = 今天（2026年6月1日）
const _TODAY_DATE = new Date(2026, 5, 1);
function _diffFromTag(daysTag) {
  if (daysTag === '今天') return 0;
  const m = daysTag.match(/第(\d+)天/);
  return m ? _TODAY_DAY_NUM - parseInt(m[1]) : null;
}
function getDayLabel(daysTag) {
  const diff = _diffFromTag(daysTag);
  if (diff === null) return daysTag;
  if (diff === 0) return `今天 · ${daysTag === '今天' ? '今天' : daysTag}`;
  if (diff === 1) return `昨天 · ${daysTag}`;
  const d = new Date(_TODAY_DATE); d.setDate(d.getDate() - diff);
  return `${d.getMonth() + 1}月${d.getDate()}日 · ${daysTag}`;
}
function getPostTimeLabel(daysTag, time) {
  const diff = _diffFromTag(daysTag);
  if (diff === null || diff === 0) return time;
  if (diff === 1) return `昨天 ${time}`;
  const d = new Date(_TODAY_DATE); d.setDate(d.getDate() - diff);
  return `${d.getMonth() + 1}月${d.getDate()}日 ${time}`;
}

// ── 单条帖子卡片 ─────────────────────────────────────────────────
function DiaryPostCard({ post, showDayTag, isLast, playingId, onPlay, onReply, replyingId, onDelete, onReact, viewerKey = 'F' }) {
  const au = post.authorKey === 'M' ? PARTNER : USER;
  const isMe = post.authorKey === viewerKey;

  // ── 互动卡片渲染 ──
  if (post.kind === 'interact') {
    const color = post.interactColor || MY.brandRed;
    return (
      <div style={{ padding: '0 16px', paddingBottom: isLast ? 6 : 8, animation: 'diaryFade 0.22s ease' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 10, overflow: 'hidden',
          border: `1px solid ${color}22`, background: '#fff', boxShadow: `0 2px 8px ${color}14` }}>
          <div style={{ flexShrink: 0, width: 44,
            background: `linear-gradient(160deg,${color}1E,${color}0F)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
            padding: '8px 0', borderRight: `1px dashed ${color}30` }}>
            <div style={{ fontSize: 20, lineHeight: 1 }}>{post.interactEmoji}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: `${color}BB`, letterSpacing: '0.04em' }}>{post.interactLabel}</div>
          </div>
          <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: MY.textPri, lineHeight: 1.3 }}>
              {post.interactCopy || (isMe ? '送出了一个' + post.interactLabel : 'TA送来了一个' + post.interactLabel)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9.5, color: MY.textTer }}>
              <DiaryAva person={au} size={13}/>
              {au.name} · {post.time}

            </div>
          </div>
        </div>
      </div>
    );
  }
  const nameColor = isMe ? MY.brandRed : MY.link;
  const isPlaying = playingId === post.id;
  const isReplying = replyingId === post.id;
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [myReaction, setMyReaction] = React.useState(null);

  const REACT_EMOJIS_V2 = ['❤️','🥰','😊','🫂','😂','👍'];

  const ReactionBubble = () => (
    <div style={{ position: 'relative' }}>
      {pickerOpen && (
        <>
          <div onClick={() => setPickerOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 10 }}/>
          <div style={{
            position: 'absolute', bottom: 'calc(100% + 6px)', left: 0,
            background: '#fff', borderRadius: 20,
            boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
            padding: '6px 8px', display: 'flex', gap: 2, alignItems: 'center',
            zIndex: 11, animation: 'diaryFade 0.15s ease',
          }}>
            {REACT_EMOJIS_V2.map(e => (
              <span key={e}
                onClick={() => { setMyReaction(e); setPickerOpen(false); onReact && onReact(e); }}
                style={{ fontSize: 24, lineHeight: 1, padding: '4px 4px',
                  borderRadius: 8, cursor: 'pointer', display: 'block', transition: 'transform .12s' }}
                onMouseEnter={ev => ev.currentTarget.style.transform = 'scale(1.28)'}
                onMouseLeave={ev => ev.currentTarget.style.transform = 'scale(1)'}
              >{e}</span>
            ))}
          </div>
        </>
      )}
      {myReaction ? (
        <div onClick={() => setMyReaction(null)}
          style={{ display: 'inline-flex', alignItems: 'center',
            background: 'rgba(255,77,136,0.08)', border: '1.5px solid rgba(255,77,136,0.2)',
            borderRadius: 20, padding: '3px 8px 3px 20px',
            fontSize: 17, lineHeight: 1, cursor: 'pointer', position: 'relative' }}>
          <div style={{ position: 'absolute', left: -2, top: '50%', transform: 'translateY(-50%)',
            width: 18, height: 18, borderRadius: '50%', overflow: 'hidden',
            border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
            <DiaryAva person={USER} size={18}/>
          </div>
          {myReaction}
        </div>
      ) : (
        <div onClick={() => setPickerOpen(s => !s)}
          style={{ width: 28, height: 28, borderRadius: '50%',
            background: pickerOpen ? 'rgba(255,77,136,0.1)' : MY.bg,
            border: `1.5px solid ${pickerOpen ? 'rgba(255,77,136,0.25)' : 'rgba(0,0,0,0.08)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 21C6.5 15.5 2 11.5 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 4-4.5 8-10 13.5z"
              stroke={pickerOpen ? MY.brandRed : '#999'} strokeWidth="1.8"
              fill={pickerOpen ? MY.brandRed : 'none'}/>
          </svg>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ padding: '0 16px', paddingBottom: isLast ? 8 : 12, animation: 'diaryFade 0.22s ease' }}>
      <div style={{ background: '#fff', borderRadius: 14, position: 'relative',
        boxShadow: '0 1px 1px rgba(0,0,0,0.08),0 3px 8px rgba(0,0,0,0.08),0 8px 20px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.04)', padding: '11px 13px' }}>
        {isMe && (
          <div onClick={() => onDelete && onDelete(post.id)}
            style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', opacity: 0.22, transition: 'opacity 0.15s', zIndex: 2 }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.22'}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <polyline points="3 6 5 6 21 6" stroke="#666" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M19 6l-1 14H6L5 6" stroke="#666" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <DiaryAva person={au} size={28}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: nameColor }}>{au.name}</div>
            <div style={{ fontSize: 10.5, color: MY.textTer, marginTop: 1 }}>{post.daysTag} · {post.time}</div>
          </div>
        </div>
        {post.kind === 'voice'
          ? <DiaryVoiceBubble sec={post.voiceSec} playing={isPlaying} onPlay={() => onPlay && onPlay(post.id)}/>
          : <div style={{ fontSize: 14, color: MY.textPri, lineHeight: '22px', marginBottom: 6 }}>{post.text}</div>
        }
        {post.photos > 0 && (
          <div style={{ display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(post.photos, 3)}, 1fr)`,
            gap: 3, marginTop: 8, marginBottom: 6 }}>
            {Array.from({ length: post.photos }).map((_, i) => (
              <ImgSlot key={i} h={post.photos === 1 ? 130 : post.photos === 2 ? 100 : 76} label="" radius={MY.rxs}/>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8,
          paddingTop: 8, borderTop: `1px solid ${MY.line}` }}>
          {!isMe && <ReactionBubble/>}
          <div style={{ flex: 1 }}/>
          <div onClick={() => onReply && onReply(post.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
              padding: '4px 10px', borderRadius: 99,
              background: isReplying ? MY.brandSoft : MY.bg,
              border: `1px solid ${isReplying ? MY.brandRed : 'transparent'}` }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke={isReplying ? MY.brandRed : MY.textTer} strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 12, color: isReplying ? MY.brandRed : MY.textTer }}>回复</span>
          </div>
        </div>
        {post.comments && post.comments.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
            {post.comments.map((c, i) => {
              const ca = c.authorKey === 'M' ? PARTNER : USER;
              const cc = c.authorKey === 'F' ? MY.brandRed : MY.link;
              return (
                <div key={i} style={{ animation: 'diaryFade 0.18s ease' }}>
                  <div style={{ background: MY.bg, borderRadius: 10, padding: '6px 10px',
                    display: 'inline-flex', maxWidth: '92%' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: cc, marginRight: 5, flexShrink: 0 }}>{ca.name}</span>
                    <span style={{ fontSize: 13, color: MY.textSec, lineHeight: '18px' }}>{c.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── 模拟键盘 ─────────────────────────────────────────────────────
const _D2_ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['⇧','z','x','c','v','b','n','m','⌫'],
];
const _D2_SUGG = ['❤️','🥰','😘','今天','在一起','好开心','爱你','想你','记录一下'];

function DiaryKeyboard({ text, placeholder, onChar, onDelete, onSend, onClose, onVoice, sendLabel = '发送' }) {
  const [shifted, setShifted] = React.useState(false);
  const press = k => {
    if (k === '⌫') { onDelete(); return; }
    if (k === '⇧') { setShifted(s => !s); return; }
    onChar(shifted ? k.toUpperCase() : k);
    if (shifted) setShifted(false);
  };
  const kbBg = '#D1D5DB', keyBg = '#FFFFFF', specBg = '#ADB5BD';

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      background: '#F7F7F7', boxShadow: '0 -1px 0 rgba(0,0,0,0.08)',
      animation: 'diarySlideUp 0.22s cubic-bezier(0.32,0.72,0,1)' }}>

      {/* 输入行 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px 6px', background: MY.surface, borderBottom: `1px solid ${MY.line}` }}>
        <div style={{ flex: 1, background: MY.bg, borderRadius: 20, padding: '7px 14px',
          display: 'flex', alignItems: 'center', border: `1.5px solid ${MY.brandRed}`, minHeight: 36 }}>
          <span style={{ flex: 1, fontSize: 14, lineHeight: '20px',
            color: text ? MY.textPri : MY.textTer, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            {text || placeholder}
          </span>
          <span style={{ display: 'inline-block', width: 2, height: 18,
            background: MY.brandRed, borderRadius: 1, marginLeft: 1,
            animation: 'diaryBlink 1s step-end infinite' }}/>
        </div>
        <button onMouseDown={e => { e.preventDefault(); onSend(); }} style={{
          height: 34, padding: '0 14px', borderRadius: 17, flexShrink: 0, border: 'none',
          background: text.trim() ? MY.brandRed : '#E0DDE6',
          color: text.trim() ? '#fff' : MY.textTer,
          fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          fontFamily: MY.font,
        }}>{sendLabel}</button>
      </div>

      {/* 工具栏 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '4px 8px', background: MY.surface, borderBottom: `1px solid ${MY.line}` }}>
        {[
          { label: '语音', icon: <svg width="18" height="20" viewBox="0 0 16 20" fill="none"><rect x="5" y="1" width="6" height="10" rx="3" fill={MY.textSec}/><path d="M2 9c0 3.314 2.686 6 6 6s6-2.686 6-6" stroke={MY.textSec} strokeWidth="1.6" strokeLinecap="round"/><line x1="8" y1="15" x2="8" y2="19" stroke={MY.textSec} strokeWidth="1.6" strokeLinecap="round"/><line x1="5" y1="19" x2="11" y2="19" stroke={MY.textSec} strokeWidth="1.6" strokeLinecap="round"/></svg>, action: onVoice },
          { label: '图片', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="15" rx="2.5" stroke={MY.textSec} strokeWidth="1.6"/><circle cx="12" cy="12.5" r="3.5" stroke={MY.textSec} strokeWidth="1.6"/><path d="M7 5l1.5-2h7L17 5" stroke={MY.textSec} strokeWidth="1.6" strokeLinejoin="round"/></svg>, action: null },
          { label: '表情', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={MY.textSec} strokeWidth="1.6"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke={MY.textSec} strokeWidth="1.6" strokeLinecap="round"/><circle cx="9" cy="10" r="1.2" fill={MY.textSec}/><circle cx="15" cy="10" r="1.2" fill={MY.textSec}/></svg>, action: null },
          { label: '收起', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke={MY.textSec} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, action: onClose },
        ].map((item, i) => (
          <div key={i} onClick={item.action || undefined} style={{
            width: 38, height: 38, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: item.action ? 'pointer' : 'default',
          }}>{item.icon}</div>
        ))}
      </div>

      {/* 联想词 */}
      <div style={{ display: 'flex', overflowX: 'auto', padding: '5px 10px',
        background: '#EFEFEF', borderBottom: `1px solid ${MY.line}` }}>
        {_D2_SUGG.map((s, i) => (
          <button key={i} onMouseDown={e => { e.preventDefault(); s.split('').forEach(c => onChar(c)); }} style={{
            flexShrink: 0, background: 'none', border: 'none', padding: '3px 10px',
            fontSize: 13.5, color: MY.textPri, cursor: 'pointer',
            borderRight: i < _D2_SUGG.length - 1 ? '1px solid #DDD' : 'none',
          }}>{s}</button>
        ))}
      </div>

      {/* 按键区 */}
      <div style={{ background: kbBg, paddingBottom: 2 }}>
        {_D2_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 5, margin: '4px 0', padding: '0 4px' }}>
            {row.map(k => {
              const sp = k === '⇧' || k === '⌫';
              return (
                <button key={k} onMouseDown={e => { e.preventDefault(); press(k); }} style={{
                  flex: sp ? 1.5 : 1, maxWidth: sp ? 44 : 34, height: 40,
                  background: sp ? specBg : keyBg, color: '#000',
                  border: 'none', borderRadius: 5, fontSize: 15, cursor: 'pointer',
                  boxShadow: '0 1px 0 #8A8E96',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {k === '⇧'
                    ? <svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 4L4 14h5v6h6v-6h5L12 4z" fill={shifted ? MY.brandRed : '#333'}/></svg>
                    : k === '⌫'
                    ? <svg width="18" height="14" viewBox="0 0 24 18"><path d="M9 1H22V17H9L1 9L9 1Z" stroke="#333" strokeWidth="1.5" fill="none"/><path d="M12 6L18 12M18 6L12 12" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    : shifted ? k.toUpperCase() : k}
                </button>
              );
            })}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 5, padding: '4px 6px 4px', justifyContent: 'center' }}>
          <button onMouseDown={e => { e.preventDefault(); onChar(' '); }} style={{ flex: 1, height: 40, background: '#B0B8C4', border: 'none', borderRadius: 5, fontSize: 12, cursor: 'pointer', boxShadow: '0 1px 0 #8A8E96', color: '#333' }}>123</button>
          <button onMouseDown={e => { e.preventDefault(); onChar(' '); }} style={{ flex: 3, height: 40, background: keyBg, border: 'none', borderRadius: 5, cursor: 'pointer', boxShadow: '0 1px 0 #8A8E96' }}>空格</button>
          <button onMouseDown={e => { e.preventDefault(); onClose(); }} style={{ flex: 1.5, height: 40, background: '#B0B8C4', border: 'none', borderRadius: 5, fontSize: 12, cursor: 'pointer', boxShadow: '0 1px 0 #8A8E96', color: '#333' }}>收起</button>
        </div>
      </div>
    </div>
  );
}

// ── 语音录制浮层 ──────────────────────────────────────────────────
function DiaryVoiceRecorder({ onFinish, onCancel, onTranscribe }) {
  const [sec, setSec] = React.useState(0);
  const [phase, setPhase] = React.useState('recording'); // recording | preview | transcribing
  const [transcript, setTranscript] = React.useState('');
  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    intervalRef.current = setInterval(() => setSec(s => s + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const stopRecording = () => { clearInterval(intervalRef.current); setPhase('preview'); };
  const reRecord = () => { setSec(0); setTranscript(''); setPhase('recording'); intervalRef.current = setInterval(() => setSec(s => s + 1), 1000); };

  const handleTranscribe = async () => {
    setPhase('transcribing');
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 200,
          messages: [{ role: 'user', content: `请模拟一段恋人之间真实自然的语音转文字结果，内容温柔甜蜜，语气口语化，长度约${Math.max(10, sec * 3)}字以内，只返回转写文字本身` }] }),
      });
      const data = await res.json();
      setTranscript(data.content?.[0]?.text?.trim() || '');
    } catch { setTranscript('（转写失败，请重试）'); }
    setPhase('preview');
  };

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const BARS = 26;

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)',
      display: 'flex', alignItems: 'flex-end', zIndex: 40 }}>
      <div style={{ width: '100%', background: MY.surface, borderRadius: '20px 20px 0 0', padding: '24px 20px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: MY.textPri }}>
            {phase === 'recording' ? '正在录音…' : phase === 'transcribing' ? '正在转文字…' : transcript ? '转写结果' : '预览语音'}
          </div>
          {phase !== 'transcribing' && !transcript && (
            <div style={{ fontSize: 26, fontWeight: 700, color: MY.brandRed, marginTop: 6, letterSpacing: 2 }}>
              {fmt(sec)}
            </div>
          )}
        </div>

        {phase === 'transcribing' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 60, gap: 8, marginBottom: 24 }}>
            <div style={{ width: 26, height: 26, border: `3px solid ${MY.brandSoft}`, borderTop: `3px solid ${MY.brandRed}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
            <span style={{ fontSize: 13, color: MY.textTer }}>AI 语音转文字中…</span>
          </div>
        ) : transcript ? (
          <div style={{ background: MY.bg, borderRadius: 12, padding: '12px 14px', marginBottom: 20, minHeight: 52 }}>
            <p style={{ fontSize: 14.5, color: MY.textPri, lineHeight: '22px', margin: 0 }}>{transcript}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, height: 36, marginBottom: 22 }}>
            {Array.from({ length: BARS }).map((_, i) => {
              const h = 4 + Math.round(Math.sin(i / BARS * Math.PI * 4) * 8 + Math.sin(i / BARS * Math.PI * 9) * 4 + 5);
              return (
                <div key={i} style={{
                  width: 3, height: h, borderRadius: 2,
                  background: phase === 'recording' ? MY.brandRed : '#C0B8C8',
                  animation: phase === 'recording' ? `diaryWave ${0.45 + i * 0.035}s ease-in-out infinite alternate` : 'none',
                  animationDelay: `${i * 0.035}s`,
                }}/>
              );
            })}
          </div>
        )}

        {phase === 'recording' ? (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
            <button onClick={onCancel} style={{ width: 54, height: 54, borderRadius: '50%', background: MY.bg, border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={MY.textSec} strokeWidth="2" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 10, color: MY.textSec }}>取消</span>
            </button>
            <button onClick={stopRecording} style={{ width: 70, height: 70, borderRadius: '50%', background: MY.brandRed, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 8px ${MY.brandSoft}` }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: '#fff' }}/>
            </button>
            <button onClick={onCancel} style={{ width: 54, height: 54, borderRadius: '50%', background: MY.bg, border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, opacity: 0 }}/>
          </div>
        ) : transcript ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={reRecord} style={{ flex: 1, height: 44, borderRadius: 22, background: MY.bg, border: 'none', cursor: 'pointer', fontSize: 14, color: MY.textSec }}>重录</button>
            <button onClick={() => onTranscribe && onTranscribe(transcript)} style={{ flex: 2, height: 44, borderRadius: 22, background: MY.brandRed, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#fff' }}>使用文字</button>
          </div>
        ) : phase !== 'transcribing' ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={reRecord} style={{ flex: 1, height: 44, borderRadius: 22, background: MY.bg, border: 'none', cursor: 'pointer', fontSize: 13.5, color: MY.textSec }}>重录</button>
            <button onClick={handleTranscribe} style={{ flex: 1, height: 44, borderRadius: 22, background: MY.bg, border: 'none', cursor: 'pointer', fontSize: 13.5, color: MY.textSec }}>转文字</button>
            <button onClick={() => onFinish(sec)} style={{ flex: 1, height: 44, borderRadius: 22, background: MY.brandRed, border: 'none', cursor: 'pointer', fontSize: 13.5, fontWeight: 600, color: '#fff' }}>发送语音</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ── 全屏发布页（同 Meetyou_diary_v7 PublishScreen）─────────────
function DiaryPublishScreen({ onCancel, onSave }) {
  const [text, setText]         = React.useState('');
  const [selectedPhotos, setSelectedPhotos] = React.useState([]);
  const [showEmoji, setShowEmoji] = React.useState(false);
  const photoRef = React.useRef(null);
  const attId = React.useRef(0);
  const [uploadedPhotos, setUploadedPhotos] = React.useState([]);

  const ALBUM = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    bg: `hsl(0,0%,${82 - i % 4 * 4}%)`,
  }));
  const EMOJIS = ['❤️','🥰','😊','🫂','😂','🌹','✨','💕','🎉','💌','🌸','🫶'];

  const toggleAlbum = (id) => {
    setSelectedPhotos(ps =>
      ps.includes(id) ? ps.filter(x => x !== id) : ps.length < 9 ? [...ps, id] : ps
    );
  };

  const handleSave = () => {
    const now = new Date();
    onSave({
      text: text.trim(),
      photos: selectedPhotos.length + uploadedPhotos.length,
      photoUrls: uploadedPhotos.map(p => p.url),
      dateStr: now.toISOString().slice(0, 10),
      time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#fff', zIndex: 60,
      display: 'flex', flexDirection: 'column',
      animation: 'diarySlideUp 0.28s cubic-bezier(0.32,0.72,0,1)',
    }}>
      {/* 隐藏文件上传 */}
      <input ref={photoRef} type="file" accept="image/*" multiple style={{ display: 'none' }}
        onChange={e => {
          Array.from(e.target.files).forEach(f => {
            setUploadedPhotos(ps => [...ps, { id: ++attId.current, url: URL.createObjectURL(f) }]);
          });
          e.target.value = '';
        }}/>

      {/* 状态栏由外层 Phone 提供，发布页不重复渲染 */}

      {/* 顶部导航：取消 | (空) | 草稿 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: 44, flexShrink: 0,
        borderBottom: `.5px solid ${MY.line}`,
      }}>
        <button onClick={onCancel} style={{
          background: 'none', border: 'none', fontSize: 16,
          color: MY.textSec, cursor: 'pointer', padding: '4px 0', fontFamily: MY.font,
        }}>取消</button>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'transparent' }}>记录</span>
        <button onClick={handleSave} style={{
          background: 'none', border: 'none', fontSize: 16,
          color: MY.textSec, cursor: 'pointer', padding: '4px 0', fontFamily: MY.font,
        }}>草稿</button>
      </div>

      {/* 内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* 文字输入 */}
        <div style={{ padding: '14px 16px 10px', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="写点什么…"
            autoFocus
            style={{
              width: '100%', border: 'none', outline: 'none', resize: 'none',
              fontSize: 16, lineHeight: '26px', color: MY.textPri,
              background: 'transparent', fontFamily: MY.font,
              flex: 1, minHeight: 80,
            }}
          />
        </div>

        {/* 已选图片预览条 */}
        {(selectedPhotos.length > 0 || uploadedPhotos.length > 0) && (
          <div style={{ padding: '0 16px 14px', borderTop: `.5px solid ${MY.line}` }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12 }}>
              {selectedPhotos.map((id, idx) => (
                <div key={id} style={{ width: 80, height: 80, borderRadius: 8, position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', background: ALBUM[id].bg }}/>
                  <div onClick={() => toggleAlbum(id)} style={{
                    position: 'absolute', top: -7, right: -7, width: 20, height: 20,
                    borderRadius: 10, background: '#8A8A8A', border: '2px solid #fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}>
                    <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1l6 6M7 1L1 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </div>
                  <div style={{
                    position: 'absolute', bottom: 4, left: 4, width: 16, height: 16, borderRadius: 8,
                    background: MY.brandRed, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: '#fff',
                  }}>{idx + 1}</div>
                </div>
              ))}
              {uploadedPhotos.map(p => (
                <div key={p.id} style={{ width: 80, height: 80, borderRadius: 8, position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden' }}>
                    <img src={p.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                  <div onClick={() => setUploadedPhotos(ps => ps.filter(x => x.id !== p.id))} style={{
                    position: 'absolute', top: -7, right: -7, width: 20, height: 20,
                    borderRadius: 10, background: '#8A8A8A', border: '2px solid #fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}>
                    <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1l6 6M7 1L1 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </div>
                </div>
              ))}
              {(selectedPhotos.length + uploadedPhotos.length) < 9 && (
                <div onClick={() => photoRef.current?.click()} style={{
                  width: 80, height: 80, borderRadius: 8, flexShrink: 0,
                  background: '#F2F2F5', border: `1.5px dashed ${MY.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="#AEAAA4" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 工具栏 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          padding: '6px 12px', borderTop: `.5px solid ${MY.line}`,
          borderBottom: `.5px solid ${MY.line}`, flexShrink: 0, background: '#fff',
        }}>
          <button onClick={() => photoRef.current?.click()} style={{
            width: 42, height: 42, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="15" rx="2.5" stroke={MY.textSec} strokeWidth="1.6"/>
              <circle cx="12" cy="12.5" r="3.5" stroke={MY.textSec} strokeWidth="1.6"/>
              <path d="M7 5l1.5-2h7L17 5" stroke={MY.textSec} strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => setShowEmoji(s => !s)} style={{
            width: 42, height: 42, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke={showEmoji ? MY.brandRed : MY.textSec} strokeWidth="1.6"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke={showEmoji ? MY.brandRed : MY.textSec} strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="9" cy="10" r="1.2" fill={showEmoji ? MY.brandRed : MY.textSec}/>
              <circle cx="15" cy="10" r="1.2" fill={showEmoji ? MY.brandRed : MY.textSec}/>
            </svg>
          </button>
          <button onClick={handleSave} style={{
            marginLeft: 'auto', background: MY.brandRed, color: '#fff', border: 'none',
            borderRadius: 20, padding: '7px 22px', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,77,136,0.30)',
            fontFamily: MY.font,
          }}>保存</button>
        </div>

        {/* Emoji 选择条 */}
        {showEmoji && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 4,
            padding: '10px 14px', background: MY.bg,
            borderBottom: `.5px solid ${MY.line}`, flexShrink: 0,
          }}>
            {EMOJIS.map(e => (
              <span key={e} onClick={() => setText(t => t + e)}
                style={{ fontSize: 22, cursor: 'pointer', padding: '4px 5px', borderRadius: 8 }}
              >{e}</span>
            ))}
          </div>
        )}
      </div>

      {/* 相册网格（黑色背景，3行4列） */}
      <div style={{ flexShrink: 0, background: '#000', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1.5 }}>
          {/* 拍照格 */}
          <div onClick={() => photoRef.current?.click()} style={{
            aspectRatio: '1', background: '#2A2A2A',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 6, cursor: 'pointer',
          }}>
            <svg width="26" height="24" viewBox="0 0 24 22" fill="none">
              <rect x="1" y="5" width="22" height="16" rx="2.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6"/>
              <circle cx="12" cy="13" r="4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6"/>
              <path d="M7 5l2-3h6l2 3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>点击拍照</span>
          </div>
          {ALBUM.slice(0, 11).map(p => {
            const sel = selectedPhotos.includes(p.id);
            return (
              <div key={p.id} onClick={() => toggleAlbum(p.id)} style={{
                aspectRatio: '1', background: p.bg,
                position: 'relative', cursor: 'pointer',
                opacity: sel ? 0.75 : 1, transition: 'opacity 0.15s',
              }}>
                {sel ? (
                  <div style={{
                    position: 'absolute', top: 5, left: 5, width: 22, height: 22,
                    borderRadius: 11, background: MY.brandRed, border: '2px solid #fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#fff',
                  }}>{selectedPhotos.indexOf(p.id) + 1}</div>
                ) : (
                  <div style={{
                    position: 'absolute', top: 5, left: 5, width: 22, height: 22,
                    borderRadius: 11, background: 'rgba(0,0,0,0.18)',
                    border: '1.5px solid rgba(255,255,255,0.6)',
                  }}/>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 日记屏幕主体（Screen5DiaryAll / BFDiary 共用）────────────────
function DiaryScreenInner({ onBack, onPublish, onScrollChange, isEmpty = false, authorKey = 'F', showFilter = false, hideNav = false }) {
  const [posts, setPosts]         = React.useState(DIARY_POSTS_V2.map(p => ({ ...p })));
  const [replyingId, setReplyId]  = React.useState(null);
  const [replyText, setReplyText] = React.useState('');
  const [playingId, setPlayingId] = React.useState(null);
  const [showPublish, setShowPublish] = React.useState(false);
  const [kbOpen, setKbOpen]       = React.useState(false);
  const [replyKb, setReplyKb]     = React.useState(false);
  const [kbText, setKbText]       = React.useState('');
  const [navScrolled, setNav]     = React.useState(false);
  const [showVoice, setVoice]     = React.useState(false);
  const [showMore, setShowMore]   = React.useState(false);
  const [fabOpen, setFabOpen]     = React.useState(false);
  const [interactOpen, setInteractOpen] = React.useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);
  const [emojiRain, setEmojiRain] = React.useState(null);
  const [coverIdx, setCoverIdx]   = React.useState(0);
  const feedRef = React.useRef(null);
  const KB_H = 286;

  const COVERS = [
    'linear-gradient(135deg, #FFD3E2 0%, #FFAAC8 45%, #E8A0C0 100%)',
    'linear-gradient(135deg, #D4EAFF 0%, #A8CFFF 45%, #8AB8F0 100%)',
    'linear-gradient(135deg, #D9F5E8 0%, #A8E4C4 45%, #7BC9A0 100%)',
    'linear-gradient(135deg, #F5E0FF 0%, #DFB0FF 45%, #C080F0 100%)',
    'linear-gradient(135deg, #FFF0C8 0%, #FFD880 45%, #F0B840 100%)',
  ];

  const INTERACT_OPTIONS_V2 = [
    { emoji:'🫂', label:'抱抱', color:'#FF8C42' },
    { emoji:'😘', label:'亲亲', color:MY.brandRed },
    { emoji:'🧸', label:'贴贴', color:'#A064DC' },
    { emoji:'💭', label:'想你', color:'#60A5FA' },
    { emoji:'❤️', label:'爱你', color:'#FF4D4D' },
  ];

  const handleInteract = (opt) => {
    const np = { id: Date.now(), authorKey, daysTag: '今天', kind: 'interact',
      interactEmoji: opt.emoji, interactLabel: opt.label, interactColor: opt.color,
      interactCopy: getInteractCopy(opt.label),
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      photos: 0, comments: [] };
    setPosts(ps => [np, ...ps]);
    setInteractOpen(false); setFabOpen(false);
    triggerRain(opt.emoji);
    if (feedRef.current) feedRef.current.scrollTop = 0;
  };

  const dismissKb = () => { setKbOpen(false); setReplyKb(false); setReplyId(null); };

  const [filterKey, setFilterKey] = React.useState('all');
  const filteredPosts = React.useMemo(() => {
    if (!showFilter || filterKey === 'all') return posts;
    if (filterKey === 'her') return posts.filter(p => p.authorKey === 'F');
    if (filterKey === 'mine') return posts.filter(p => p.authorKey === 'M');
    if (filterKey === 'interact') return posts.filter(p => p.kind === 'interact');
    return posts;
  }, [posts, filterKey, showFilter]);
  const displayPosts = showFilter ? filteredPosts : posts;

  React.useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    const fn = () => { const s = el.scrollTop > 170; setNav(s); onScrollChange && onScrollChange(s); };
    el.addEventListener('scroll', fn, { passive: true });
    return () => el.removeEventListener('scroll', fn);
  }, []);

  React.useEffect(() => {
    if (playingId === null) return;
    const post = posts.find(p => p.id === playingId);
    if (!post) return;
    const t = setTimeout(() => setPlayingId(null), (post.voiceSec || 5) * 1000);
    return () => clearTimeout(t);
  }, [playingId, posts]);

  const handleSend = () => {
    if (!kbText.trim()) return;
    const np = { id: Date.now(), authorKey, daysTag: '今天', kind: 'text',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      text: kbText.trim(), photos: 0, comments: [] };
    setPosts(ps => [np, ...ps]);
    setKbText(''); setKbOpen(false);
    if (feedRef.current) feedRef.current.scrollTop = 0;
  };

  const handleReplySend = () => {
    if (!replyText.trim()) return;
    setPosts(ps => ps.map(p => p.id === replyingId
      ? { ...p, comments: [...p.comments, { authorKey: 'F', text: replyText.trim() }] } : p));
    setReplyText(''); setReplyKb(false); setReplyId(null);
  };

  const triggerRain = (emoji) => {
    const DECO = ['✨','⭐','💫','💕','🌟','❤️','✦','·'];
    const particles = Array.from({length:36},(_,i)=>({id:i,
      x:3+Math.random()*94,delay:Math.random()*1.2,
      dur:1.5+Math.random()*1.8,
      size:i<18?18+Math.random()*18:i<28?11+Math.random()*10:8+Math.random()*8,
      drift:(Math.random()-0.5)*100,spin:(Math.random()-0.5)*180,
      opacity:i<18?1:i<28?0.55+Math.random()*0.35:0.3+Math.random()*0.4,
      symbol:i<18?emoji:DECO[Math.floor(Math.random()*DECO.length)],
    }));
    setEmojiRain({emoji,particles});
    setTimeout(()=>setEmojiRain(null),3800);
  };

  const handleTranscribeFinish = (text) => {
    setVoice(false);
    const now = new Date();
    const ds = now.toISOString().slice(0,10);
    const ts = now.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
    const np = { id: Date.now(), authorKey, daysTag: '今天', kind: 'text',
      time: ts, text, photos: 0, comments: [] };
    setPosts(ps => [np, ...ps]);
    if (feedRef.current) feedRef.current.scrollTop = 0;
  };

  const handleDelete = id => setDeleteConfirmId(id);
  const confirmDeleteFn = () => { if (deleteConfirmId) setPosts(ps => ps.filter(p => p.id !== deleteConfirmId)); setDeleteConfirmId(null); };

  const handleVoiceFinish = sec => {
    setVoice(false);
    const np = { id: Date.now(), authorKey, daysTag: '今天', kind: 'voice', voiceSec: sec,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      photos: 0, comments: [] };
    setPosts(ps => [np, ...ps]);
    if (feedRef.current) feedRef.current.scrollTop = 0;
  };

  const isKbAny = kbOpen || replyKb;

  return (
    <div style={{ position: 'absolute', inset: 0, background: MY.surface }}>

      {/* ── 滚动 feed（键盘开启时点击收起）── */}
      <div ref={feedRef}
        onClick={isKbAny ? dismissKb : undefined}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          bottom: isKbAny ? KB_H : 0,
          overflowY: 'auto', transition: 'bottom 0.25s cubic-bezier(0.32,0.72,0,1)',
          zIndex: 1,
        }}>
        {/* 封面 — marginTop:-44 随 feed 滚动 */}
        <div style={{
          marginTop: -44, height: 300, position: 'relative', overflow: 'hidden', flexShrink: 0,
          background: COVERS[coverIdx], transition: 'background 0.4s ease',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 180, height: 180,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.32) 0%, transparent 65%)' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.38) 100%)' }}/>
          <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <div style={{ position: 'relative', width: 72, height: 46 }}>
              <div style={{ position: 'absolute', left: 0, top: 2, width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '2.5px solid rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
                <DiaryAva person={USER} size={40}/>
              </div>
              <div style={{ position: 'absolute', right: 0, bottom: 2, width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '2.5px solid rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
                <DiaryAva person={PARTNER} size={40}/>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>女友殿下 ❤︎ 男友先生</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.88)', marginTop: 3, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>在一起 102 天 · 共记 {posts.length} 篇</div>
            </div>
          </div>
        </div>
        <div style={{ height: 12 }}/>

        {/* 帖子列表 */}
        {isEmpty ? (
          <>
            <div style={{ height: 20 }}/>
            {/* 今天 — 大行动卡 */}
            <div style={{ display: 'flex', padding: '0 14px' }}>
              <div style={{ width: 18, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: MY.brandRed, flexShrink: 0, zIndex: 1, boxShadow: `0 0 0 3px ${MY.brandSoft}` }}/>
                <div style={{ flex: 1, width: 1.5, background: '#E0E0E0', marginTop: 4 }}/>
              </div>
              <div style={{ flex: 1, paddingLeft: 10, paddingBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: MY.textPri, marginBottom: 10, lineHeight: 1 }}>今天 · 第102天</div>
                <div style={{ background: MY.surface, borderRadius: 14, overflow: 'hidden', boxShadow: MY.shadow1 }}>
                  <div style={{ background: 'linear-gradient(135deg,#FFF0F6 0%,#FFE4EF 100%)', padding: '18px 20px 12px', textAlign: 'center' }}>
                    <svg width="148" height="88" viewBox="0 0 160 100" fill="none">
                      <ellipse cx="80" cy="85" rx="68" ry="12" fill="rgba(255,77,136,0.07)"/>
                      <circle cx="55" cy="30" r="14" fill="#FFAAC8"/><circle cx="55" cy="30" r="11" fill="#FFD3E2"/>
                      <path d="M40 60 Q40 42 55 42 Q70 42 70 60 L70 80 L40 80 Z" fill="#FF80B0"/>
                      <rect x="58" y="56" width="28" height="20" rx="4" fill="#fff" stroke="#FFD3E2" strokeWidth="1.4"/>
                      <line x1="62" y1="63" x2="82" y2="63" stroke="#FFAAC8" strokeWidth="1.1"/>
                      <line x1="62" y1="68" x2="82" y2="68" stroke="#FFAAC8" strokeWidth="1.1"/>
                      <line x1="62" y1="73" x2="74" y2="73" stroke="#FFAAC8" strokeWidth="1.1"/>
                      <path d="M100 20 C100 16 94 12 94 18 C94 12 88 16 88 20 C88 26 94 30 94 30 C94 30 100 26 100 20Z" fill="#FF4D88" opacity="0.75"/>
                      <circle cx="115" cy="32" r="13" fill="#B8D4FF"/><circle cx="115" cy="32" r="10" fill="#D4E8FF"/>
                      <path d="M101 60 Q101 44 115 44 Q129 44 129 60 L129 80 L101 80 Z" fill="#7AAEE8"/>
                      <rect x="118" y="54" width="13" height="20" rx="2.5" fill="#fff" stroke="#B8D4FF" strokeWidth="1.4"/>
                      <rect x="120" y="58" width="9" height="11" rx="1.5" fill="#D4E8FF"/>
                      <path d="M72 50 Q80 44 95 50" stroke="#FFD3E2" strokeWidth="1.1" strokeDasharray="3 2" fill="none"/>
                    </svg>
                  </div>
                  <div style={{ padding: '12px 16px 14px' }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: MY.textPri, marginBottom: 4 }}>在一起第102天，记一笔</div>
                    <div style={{ fontSize: 12.5, color: MY.textSec, lineHeight: '18px', marginBottom: 12 }}>今天发生了什么？一句话、一张照片，都是你们的故事</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[{icon:'✏️',label:'写点什么'},{icon:'📷',label:'上传照片'},{icon:'🎙',label:'语音记录'}].map(item => (
                        <div key={item.label} onClick={() => setKbOpen(true)} style={{
                          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                          gap: 4, background: MY.brandSoft, borderRadius: 10, padding: '8px 4px', cursor: 'pointer',
                        }}>
                          <span style={{ fontSize: 18 }}>{item.icon}</span>
                          <span style={{ fontSize: 11, color: MY.brandRed, fontWeight: 500 }}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 昨天节点 */}
            <div style={{ display: 'flex', padding: '0 14px' }}>
              <div style={{ width: 18, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: MY.brandRed, flexShrink: 0 }}/>
                <div style={{ flex: 1, width: 1.5, background: '#E8E8E8', marginTop: 3 }}/>
              </div>
              <div style={{ flex: 1, paddingLeft: 10, paddingBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: MY.textPri, marginBottom: 8 }}>昨天 · 第101天</div>
                <div style={{ background: MY.surface, borderRadius: 12, padding: '12px 14px', boxShadow: MY.shadow1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: MY.brandSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke={MY.brandRed} strokeWidth="1.5"/><circle cx="9" cy="10" r="2" stroke={MY.brandRed} strokeWidth="1.5"/><path d="M3 17l4-4 4 4 3-3 4 4" stroke={MY.brandRed} strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <div><div style={{ fontSize: 12.5, fontWeight: 500, color: MY.textPri }}>昨天的故事还没记录</div><div style={{ fontSize: 11, color: MY.textSec, marginTop: 2 }}>现在记录也不迟</div></div>
                    <div style={{ marginLeft: 'auto', fontSize: 11, color: MY.brandRed, fontWeight: 500, background: MY.brandSoft, padding: '4px 10px', borderRadius: 99 }}>记录</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 第1天节点 */}
            <div style={{ display: 'flex', padding: '0 14px' }}>
              <div style={{ width: 18, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: MY.brandRed, flexShrink: 0 }}/>
              </div>
              <div style={{ flex: 1, paddingLeft: 10, paddingBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: MY.textPri, marginBottom: 8 }}>纪念日 · 第1天</div>
                <div style={{ background: MY.surface, borderRadius: 12, padding: '12px 14px', boxShadow: MY.shadow1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: MY.brandSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💌</div>
                    <div><div style={{ fontSize: 12.5, fontWeight: 500, color: MY.textPri }}>记下你们相识的故事</div><div style={{ fontSize: 11, color: MY.textSec, marginTop: 2 }}>爱的起点值得珍藏</div></div>
                    <div style={{ marginLeft: 'auto', fontSize: 11, color: MY.brandRed, fontWeight: 500, background: MY.brandSoft, padding: '4px 10px', borderRadius: 99 }}>记录</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ height: 20 }}/>
            {showFilter && (
              <div style={{ display: 'flex', gap: 8, padding: '4px 16px 10px', background: MY.bg, flexShrink: 0 }}>
                {[{k:'all',l:'全部'},{k:'her',l:'她写的'},{k:'mine',l:'我写的'},{k:'interact',l:'互动'}].map(f=>(
                  <div key={f.k} onClick={()=>setFilterKey(f.k)}
                    style={{ padding:'5px 14px', borderRadius:999, fontSize:12, fontWeight:500, cursor:'pointer',
                      background: filterKey===f.k ? '#fff' : 'rgba(0,0,0,0.04)',
                      border: `1.5px solid ${filterKey===f.k ? 'rgba(255,77,136,0.25)' : 'transparent'}`,
                      color: filterKey===f.k ? MY.brandRed : MY.textSec, transition:'all .15s' }}>{f.l}</div>
                ))}
              </div>
            )}
            {displayPosts.map((post, i) => {
              const prevSameDay = i > 0 && displayPosts[i - 1].daysTag === post.daysTag;
              return (
                <DiaryPostCard key={post.id} post={post}
                  showDayTag={!prevSameDay}
                  isLast={i === posts.length - 1}
                  playingId={playingId}
                  onPlay={id => setPlayingId(p => p === id ? null : id)}
                  onReply={id => { setReplyId(id); setReplyText(''); setReplyKb(true); setKbOpen(false); }}
                  replyingId={replyingId}
                  onDelete={handleDelete}
                  onReact={triggerRain}
                  viewerKey={authorKey}
                />
              );
            })}
            <div style={{ height: 16 }}/>
          </>
        )}
      </div>

      {/* ── 导航栏（透明→白，随滚动切换）── */}
      {!hideNav && (<div style={{
        position: 'absolute', top: -44, left: 0, right: 0, height: 88,
        zIndex: 10, pointerEvents: 'none',
        background: navScrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: navScrolled ? 'blur(12px)' : 'none',
        borderBottom: navScrolled ? `.5px solid ${MY.line}` : 'none',
        transition: 'background 0.25s, border-bottom 0.25s',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '0 12px 8px',
      }}>
        <div onClick={onBack} style={{
          pointerEvents: 'auto', width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke={navScrolled ? MY.textPri : 'rgba(255,255,255,0.92)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          {/* 更多按钮 */}
          <div onClick={() => setShowMore(v => !v)} style={{
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="5"  cy="12" r="1.8" fill={navScrolled ? MY.textPri : 'rgba(255,255,255,0.92)'}/>
              <circle cx="12" cy="12" r="1.8" fill={navScrolled ? MY.textPri : 'rgba(255,255,255,0.92)'}/>
              <circle cx="19" cy="12" r="1.8" fill={navScrolled ? MY.textPri : 'rgba(255,255,255,0.92)'}/>
            </svg>
          </div>
          {/* 下拉菜单 */}
          {showMore && (
            <div style={{
              position: 'absolute', top: 42, right: 0,
              background: MY.surface, borderRadius: MY.rsm,
              boxShadow: MY.shadow2, minWidth: 120, overflow: 'hidden', zIndex: 30,
            }}>
              <div onClick={() => {
                setCoverIdx(idx => (idx + 1) % COVERS.length);
                setShowMore(false);
              }} style={{
                padding: '13px 16px', fontSize: 14, color: MY.textPri,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke={MY.textSec} strokeWidth="1.8"/>
                  <circle cx="8.5" cy="8.5" r="2" fill={MY.brandRed}/>
                  <path d="M3 16l5-5 4 4 3-3 6 6" stroke={MY.textSec} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                换封面
              </div>
            </div>
          )}
        </div>
      </div>)}

      {/* 点击空白收起更多菜单 */}
      {showMore && (
        <div onClick={() => setShowMore(false)}
          style={{ position: 'absolute', inset: 0, zIndex: 20 }}/>
      )}

      {/* 表情雨 — top:-36 bottom:-24 填满整个手机 */}
      {emojiRain && (
        <div style={{ position: 'absolute', top: -36, bottom: -24, left: 0, right: 0, pointerEvents: 'none', zIndex: 100, overflow: 'hidden' }}>
          {emojiRain.particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute', top: 0, left: `${p.x}%`,
              fontSize: p.size, lineHeight: 1,
              animation: `emojiRainFall ${p.dur}s ${p.delay}s ease-in forwards`,
              '--emoji-drift': `${p.drift}px`,
              '--emoji-spin': `${p.spin}deg`,
              opacity: p.opacity,
            }}>{p.symbol || emojiRain.emoji}</div>
          ))}
        </div>
      )}

      {/* ── 美柚规范删除弹窗 ── */}
      {deleteConfirmId && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 60,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 32px', animation: 'diaryFade 0.15s ease' }}
          onClick={() => setDeleteConfirmId(null)}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 12, width: '100%',
              padding: '24px 20px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.20)' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 17, fontWeight: 500, color: '#323232', marginBottom: 8 }}>删除这条记录？</div>
              <div style={{ fontSize: 13, color: '#666' }}>删除后无法恢复</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={confirmDeleteFn} style={{
                height: 44, borderRadius: 8, border: 'none',
                background: '#ff4d4d', color: '#fff',
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255,77,77,0.25)' }}>删除</button>
              <button onClick={() => setDeleteConfirmId(null)} style={{
                height: 44, borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.12)', background: '#fff',
                color: '#666', fontSize: 15, cursor: 'pointer' }}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* FAB 覆层 */}
      {fabOpen && (
        <div onClick={() => { setFabOpen(false); setInteractOpen(false); }}
          style={{ position: 'absolute', inset: 0, zIndex: 18,
            background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)' }}/>
      )}

      {/* 互动选择面板 */}
      {interactOpen && (
        <div style={{ position: 'absolute', bottom: 80, left: 16, right: 16, zIndex: 25,
          background: '#fff', borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: '16px 12px',
          animation: 'diaryFade 0.2s ease' }}>
          <div style={{ fontSize: 12, color: MY.textTer, marginBottom: 12, textAlign: 'center' }}>选一个互动发出</div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {INTERACT_OPTIONS_V2.map(opt => (
              <div key={opt.emoji} onClick={() => handleInteract(opt)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  cursor: 'pointer', minWidth: 44, minHeight: 44, justifyContent: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 22,
                  background: `${opt.color}18`, border: `1.5px solid ${opt.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {opt.emoji}
                </div>
                <span style={{ fontSize: 11, color: MY.textSec, fontWeight: 500 }}>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 方案3 扇形 FAB */}
      <div style={{ position: 'absolute', right: 18, bottom: 28, zIndex: 20, width: 52, height: 52 }}>
        {fabOpen && [
          { label: '互动', bg: `linear-gradient(135deg,${MY.brandRed},#FF8475)`, shadow: 'rgba(255,77,136,0.42)', delay: '0s',
            left: 4, top: -86, onClick: () => setInteractOpen(s => !s),
            icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21C6.5 15.5 2 11.5 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 4-4.5 8-10 13.5z" fill="#fff"/></svg>) },
          { label: '图文', bg: 'linear-gradient(135deg,#6B9FD4,#4A7AAF)', shadow: 'rgba(74,122,175,0.42)', delay: '0.07s',
            left: -58, top: -58, onClick: () => { setShowPublish(true); setFabOpen(false); setInteractOpen(false); },
            icon: (<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 20h9" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
          { label: '语音', bg: 'linear-gradient(135deg,#A78BFA,#7C3AED)', shadow: 'rgba(124,58,237,0.38)', delay: '0.14s',
            left: -86, top: 4, onClick: () => { setVoice(true); setFabOpen(false); setInteractOpen(false); },
            icon: (<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><rect x="9" y="2" width="6" height="12" rx="3" stroke="#fff" strokeWidth="2"/><path d="M5 11a7 7 0 0014 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="18" x2="12" y2="22" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="22" x2="15" y2="22" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>) },
        ].map(b => (
          <div key={b.label} onClick={b.onClick}
            style={{ position: 'absolute', left: b.left, top: b.top,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              cursor: 'pointer',
              animation: `fanPop 0.3s ${b.delay} cubic-bezier(0.34,1.56,0.64,1) both` }}>
            <div style={{ width: 44, height: 44, borderRadius: 22,
              background: b.bg, boxShadow: `0 5px 16px ${b.shadow}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {b.icon}
            </div>
            <span style={{ fontSize: 11, color: '#fff', fontWeight: 600,
              textShadow: '0 1px 4px rgba(0,0,0,0.45)', whiteSpace: 'nowrap' }}>{b.label}</span>
          </div>
        ))}
        <div onClick={() => setFabOpen(s => !s)} style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: `linear-gradient(135deg,${MY.brandRed},#FF8475)`,
          boxShadow: '0 8px 20px rgba(255,77,136,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          transform: fabOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 4v14M4 11h14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* 全屏发布页 */}
      {showPublish && (
        <DiaryPublishScreen
          onCancel={() => setShowPublish(false)}
          onSave={(data) => {
            if (data.text || data.photos > 0) {
              const now = new Date();
              const np = {
                id: Date.now(), authorKey, daysTag: '今天', kind: 'text',
                time: data.time || now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
                text: data.text || '',
                photos: data.photos || 0,
                photoUrls: data.photoUrls || [],
                comments: [],
              };
              setPosts(ps => [np, ...ps]);
              if (feedRef.current) feedRef.current.scrollTop = 0;
            }
            setShowPublish(false);
          }}
        />
      )}

      {/* 发布键盘 */}
      {kbOpen && (
        <DiaryKeyboard text={kbText} placeholder="记录这一刻…"
          onChar={c => setKbText(t => t + c)} onDelete={() => setKbText(t => t.slice(0, -1))}
          onSend={handleSend} onClose={() => setKbOpen(false)}
          onVoice={() => { setKbOpen(false); setVoice(true); }} sendLabel="发布"/>
      )}

      {/* 回复键盘 */}
      {replyKb && (() => {
        const rp = posts.find(p => p.id === replyingId);
        const rname = rp ? (rp.authorKey === 'M' ? PARTNER.name : USER.name) : '';
        return (
          <DiaryKeyboard text={replyText} placeholder={`回复 ${rname}…`}
            onChar={c => setReplyText(t => t + c)} onDelete={() => setReplyText(t => t.slice(0, -1))}
            onSend={handleReplySend}
            onClose={() => { setReplyKb(false); setReplyId(null); setReplyText(''); }}
            onVoice={() => { setReplyKb(false); setVoice(true); }} sendLabel="回复"/>
        );
      })()}

      {/* 语音录制 */}
      {showVoice && (
        <DiaryVoiceRecorder onFinish={handleVoiceFinish} onCancel={() => setVoice(false)} onTranscribe={handleTranscribeFinish}/>
      )}
    </div>
  );
}

// ── 首页恋爱记模块（纯文字标题 + 时间轴与二级页一致）────────────
function DiaryHomeModule({ onViewAll, isEmpty = false }) {

  // ── 空值态 ──────────────────────────────────────────────────
  const EmptyContent = () => (
    <>
      <div style={{ fontSize: 12, color: MY.textSec, marginBottom: 12, lineHeight: '17px' }}>
        开始记录你们在一起的点滴吧
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {[
          { icon: '✏️', label: '写点什么', sub: '文字记录' },
          { icon: '📷', label: '上传照片', sub: '相册选取' },
          { icon: '🎙', label: '语音记录', sub: '语音转文字' },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: MY.brandSoft, borderRadius: 12,
            padding: '10px 6px 8px', textAlign: 'center', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: MY.textPri }}>{s.label}</div>
            <div style={{ fontSize: 10.5, color: MY.textTer, marginTop: 1 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <button onClick={onViewAll} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '100%', height: 38, borderRadius: MY.rpill,
        border: `1px solid ${MY.line}`, background: MY.surface,
        color: MY.textSec, fontSize: 13, cursor: 'pointer', fontFamily: MY.font,
      }}>查看全部记录 ›</button>
    </>
  );

  return (
    <div style={{ background: MY.surface, borderRadius: MY.rmd, padding: '14px 14px 14px', boxShadow: MY.shadow1 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: MY.textPri, marginBottom: 14 }}>恋爱记</div>

      {isEmpty ? <EmptyContent/> : (
        <>
          {/* 帖子列表 — 白色卡片样式（与 v7 一致），截断渐隐 */}
          <div style={{ position: 'relative' }}>
            <div style={{ maxHeight: 160, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {DIARY_POSTS_V2.slice(0, 2).map((post, i) => {
                const au = post.authorKey === 'M' ? PARTNER : USER;
                const nameColor = post.authorKey === 'F' ? MY.brandRed : MY.link;
                if (post.kind === 'interact') {
                  const color = post.interactColor || MY.brandRed;
                  return (
                    <div key={post.id} style={{ display: 'flex', alignItems: 'stretch', borderRadius: 10, overflow: 'hidden',
                      border: `1px solid ${color}22`, background: '#fff', boxShadow: `0 2px 8px ${color}10` }}>
                      <div style={{ flexShrink: 0, width: 36, background: `linear-gradient(160deg,${color}1E,${color}0F)`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
                        padding: '6px 0', borderRight: `1px dashed ${color}30` }}>
                        <div style={{ fontSize: 16 }}>{post.interactEmoji}</div>
                        <div style={{ fontSize: 7, fontWeight: 600, color: `${color}BB` }}>{post.interactLabel}</div>
                      </div>
                      <div style={{ flex: 1, padding: '6px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: MY.textPri }}>
                          {post.interactCopy || (post.authorKey === 'F' ? '你送出了一个' + post.interactLabel : 'TA送来了一个' + post.interactLabel)}
                        </div>
                        <div style={{ fontSize: 9.5, color: MY.textTer }}>{au.name} · {post.time}</div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={post.id} style={{ background: '#fff', borderRadius: 12,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08),0 3px 10px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(0,0,0,0.04)', padding: '9px 11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <DiaryAva person={au} size={22}/>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: nameColor }}>{au.name}</div>
                        <div style={{ fontSize: 9.5, color: MY.textTer, marginTop: 0.5 }}>{post.daysTag} · {post.time}</div>
                      </div>
                    </div>
                    {post.kind === 'voice'
                      ? <div style={{ fontSize: 12, color: MY.textTer }}>🎙 语音 {post.voiceSec}"</div>
                      : post.text ? (
                          <div style={{ fontSize: 12.5, color: MY.textPri, lineHeight: '18px',
                            overflow: 'hidden', textOverflow: 'ellipsis',
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {post.text}
                          </div>
                        ) : null
                    }
                    {post.photos > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(post.photos,3)},1fr)`, gap: 2, marginTop: 5 }}>
                        {Array.from({ length: Math.min(post.photos,3) }).map((_,pi) => (
                          <div key={pi} style={{ height: 40, borderRadius: 4,
                            background: `hsl(${340+pi*18},50%,${88-pi*3}%)` }}/>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
              background: 'linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,0.96) 80%,#fff 100%)',
              pointerEvents: 'none', zIndex: 1 }}/>
          </div>
          <button onClick={onViewAll} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: 40, marginTop: 10,
            border: `1px solid ${MY.line}`, borderRadius: MY.rpill, background: MY.surface,
            color: MY.textSec, fontSize: 13, cursor: 'pointer', fontFamily: MY.font,
          }}>查看全部记录 ›</button>
        </>
      )}
    </div>
  );
}


// ── 覆盖旧版 Screen5DiaryAll ──────────────────────────────────────
function Screen5DiaryAll({ onBack, onPublish, diaryEmpty = false }) {
  const [scrolled, setScrolled] = React.useState(false);
  return (
    <Phone bg={MY.surface}>
      <DiaryScreenInner onBack={onBack} onPublish={onPublish} onScrollChange={setScrolled} isEmpty={diaryEmpty}/>
    </Phone>
  );
}

// ── 覆盖旧版 BFDiary ──────────────────────────────────────────────
function BFDiary({ onBack, diaryEmpty = false }) {
  const [scrolled, setScrolled] = React.useState(false);
  return (
    <Phone bg={MY.surface}>
      <DiaryScreenInner onBack={onBack} onPublish={() => {}} onScrollChange={setScrolled} isEmpty={diaryEmpty}/>
    </Phone>
  );
}

// ── 导出到全局，覆盖旧版组件 ─────────────────────────────────────
Object.assign(window, {
  DiaryAva, DiaryVoiceBubble, DIARY_POSTS_V2,
  DiaryPostCard, DiaryKeyboard, DiaryVoiceRecorder,
  DiaryScreenInner, DiaryHomeModule,
  Screen5DiaryAll, BFDiary,
});

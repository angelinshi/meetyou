// screens-bf.jsx — Home / Detail / Diary screens for the boyfriend prototype.
// Visual fidelity: close to reference (pink gradient banners, white cards on
// light-gray, • dotted section headers, vertical phase labels, etc).

const BG_PAGE = '#F4F4F6';
const TEXT_DARK = '#1F1318';
const TEXT_MUTED = '#9B8A91';
const PINK_PRIMARY = '#FF5C8A';
const PINK_DEEP = '#E94472';
const PINK_GRAD_FROM = '#FF7898';
const PINK_GRAD_TO   = '#FFAFC2';
const DIARY_BG = '#FFF1F4';
const HANDWRITE_FONT = '"Ma Shan Zheng", "Caveat", "Noto Sans SC", cursive, sans-serif';

// ────────────────────────────────────────────────────────────────
//   HOME — 主页
// ────────────────────────────────────────────────────────────────
function BFHome({ onNav }) {
  return (
    <div style={{ background: BG_PAGE, paddingTop: 44, paddingBottom: 12, minHeight: '100%' }}>
      {/* Top nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px 12px', background: BG_PAGE,
      }}>
        <SearchIcon size={22}/>
        <div style={{ fontSize: 17, fontWeight: 700, color: TEXT_DARK, letterSpacing: 0.5 }}>
          美柚
        </div>
        <div style={{ width: 22 }}/>
      </div>

      {/* — Module 1: 今日密报 entry — pink gradient hero card — */}
      <div style={{ padding: '0 12px' }}>
        <HeroSecretCard onNav={() => onNav('detail')}/>
      </div>

      {/* — Module 2: 恋爱日记 — */}
      <div style={{ padding: '12px 12px 0' }}>
        <DiaryCard onNav={() => onNav('diary')}/>
      </div>

      {/* — Module 3: 今日密报详情透出 — */}
      <div style={{ padding: '12px 12px 16px' }}>
        <SecretPreviewCard/>
      </div>
    </div>
  );
}

function HeroSecretCard({ onNav }) {
  return (
    <div onClick={onNav} style={{
      position: 'relative', borderRadius: 16, padding: '18px 18px 16px',
      background: `linear-gradient(120deg, ${PINK_GRAD_FROM} 0%, ${PINK_GRAD_TO} 100%)`,
      overflow: 'hidden', cursor: 'pointer',
      boxShadow: '0 8px 20px rgba(255,108,140,0.25)',
    }}>
      {/* decorative cloud-shaped pocket on right */}
      <CloudBadge/>

      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: -0.3, lineHeight: 1.1 }}>
          距月经开始还有 <span style={{ fontSize: 28 }}>3</span> 天
        </div>
        <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.92)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 2 }}>
          预测经期开始日 5月30日
          <Chevron size={12} stroke="rgba(255,255,255,0.85)" sw={2.2}/>
        </div>
        <button style={{
          marginTop: 14, padding: '7px 16px', borderRadius: 100, border: 'none',
          background: '#FFE5EC', color: '#E94472', fontWeight: 700, fontSize: 12.5,
          letterSpacing: 0.2, cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 2px 8px rgba(233,68,114,0.18)',
        }}>查看详情</button>
      </div>
    </div>
  );
}

// Cloud-shape "今日警戒指数 ★★★★" widget at top right of the hero.
function CloudBadge() {
  return (
    <div style={{ position: 'absolute', top: 14, right: 14, width: 96, height: 78 }}>
      <svg width="96" height="78" viewBox="0 0 96 78" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="cloudG" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.55"/>
          </radialGradient>
        </defs>
        <g fill="url(#cloudG)">
          <ellipse cx="48" cy="42" rx="34" ry="24"/>
          <circle cx="26" cy="38" r="14"/>
          <circle cx="70" cy="38" r="14"/>
          <circle cx="34" cy="58" r="12"/>
          <circle cx="62" cy="58" r="12"/>
          <circle cx="48" cy="24" r="13"/>
        </g>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 10.5, color: '#E94472', fontWeight: 600, letterSpacing: 0.3 }}>今日怀孕几率</div>
        <div style={{ fontSize: 19, color: '#E94472', fontWeight: 800, marginTop: 1, letterSpacing: 0.5 }}>
          4.1<span style={{ fontSize: 13 }}>%</span>
        </div>
      </div>
    </div>
  );
}

// Module 2 — 恋爱日记 (home preview card)
function DiaryCard({ onNav }) {
  // 主页只展示最近 1 条
  const preview = DIARY.slice(0, 1);

  return (
    <div style={{
      background: '#fff', borderRadius: 14,
      padding: '16px 14px 14px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      {/* title — 只保留"恋爱日记" */}
      <div style={{ fontSize: 15, fontWeight: 800, color: TEXT_DARK, letterSpacing: -0.2 }}>
        恋爱日记
      </div>

      {/* entries */}
      <div style={{
        marginTop: 12,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {preview.map((c) => <DiaryEntry key={c.id} card={c} variant="compact"/>)}
      </div>

      {/* see all */}
      <button onClick={onNav} style={{
        marginTop: 14, marginInline: 'auto', display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 22px', borderRadius: 100, border: '1px solid #FFC9D5',
        background: 'linear-gradient(120deg, #FFF5F8, #FFE9F0)',
        color: '#E94472', fontSize: 12.5, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit',
      }}>
        翻开全部 102 天 <Chevron size={12} stroke="#E94472" sw={2.4}/>
      </button>
    </div>
  );
}

// Module 3 — 今日密报详情透出 (preview)
function SecretPreviewCard() {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '16px 14px 16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      {/* 黄体期 · 第11天 header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: PINK_DEEP, letterSpacing: -0.2 }}>
          黄体期 · 第 11 天
        </div>
        <InfoIcon size={13} stroke={TEXT_MUTED}/>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: TEXT_DARK, marginTop: 4 }}>
        距离月经开始（5月30日）还有 3 天
      </div>

      {/* cycle ring */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 6px' }}>
        <CyclePhaseRing size={250}/>
      </div>

      {/* — 今日关注 — */}
      <div style={{ marginTop: 8 }}>
        <SectionTitle>今日关注</SectionTitle>
        <p style={{
          margin: '8px 2px 0', fontSize: 13.5, color: '#3A2D33', lineHeight: 1.65,
        }}>
          黄体期快结束这几天，她的雌激素和孕激素都在快速下降。
          今天她可能突然<b style={{ color: PINK_DEEP }}>话变少</b>、情绪也容易低落。
          提前帮她把晚饭安排好，<b style={{ color: PINK_DEEP }}>别让她一个人在家想太多</b>；
          如果她突然不想说话，就坐在旁边陪着。
        </p>
      </div>

      {/* — 今日症状预测 — */}
      <div style={{ marginTop: 18 }}>
        <SectionTitle>今日症状预测</SectionTitle>
        <p style={{
          margin: '8px 2px 0', fontSize: 13.5, color: '#3A2D33', lineHeight: 1.65,
        }}>
          体内激素变化引起的盆腔充血，可能会让她觉得腹部有一些
          <b style={{ color: PINK_DEEP }}>坠胀</b>甚至<b style={{ color: PINK_DEEP }}>疼痛感</b>。
        </p>
        <div style={{ display: 'flex', gap: 20, marginTop: 12, paddingLeft: 2 }}>
          {SYMPTOMS.slice(0, 2).map(s => (
            <div key={s.id} style={{ textAlign: 'center' }}>
              <SymptomBadge id={s.id} size={64}/>
              <div style={{ fontSize: 12, color: '#3A2D33', marginTop: 6, fontWeight: 500 }}>{s.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* — 小互动 — */}
      <div style={{ marginTop: 20 }}>
        <SectionTitle>小互动 · 今天你可以这样做</SectionTitle>
        <div style={{
          marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
        }}>
          {MICRO_ACTIONS.map(a => (
            <div key={a.id} style={{
              background: '#FFF6F8', borderRadius: 10, padding: '10px 12px',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', background: '#FFE0EA',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0,
              }}>{a.emoji}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: TEXT_DARK, whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.title}</div>
                <div style={{ fontSize: 10.5, color: TEXT_MUTED, marginTop: 1 }}>{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer line + 送关心 CTA */}
      <div style={{
        marginTop: 18, paddingTop: 12, borderTop: '1px solid #F4ECEE',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 12, color: TEXT_MUTED, letterSpacing: 0.2 }}>
          别急，这是在酝酿更好的相遇
        </div>
        <button style={{
          padding: '7px 14px', borderRadius: 100, border: 'none',
          background: `linear-gradient(120deg, ${PINK_GRAD_FROM}, ${PINK_GRAD_TO})`,
          color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4,
          boxShadow: '0 4px 10px rgba(255,108,140,0.3)',
        }}>
          <HeartIcon size={12} fill="#fff" stroke="#fff" sw={2}/> 送关心
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
//   DETAIL — 今日密报
// ────────────────────────────────────────────────────────────────
function BFDetail({ onBack }) {
  const [dayTab, setDayTab] = React.useState('today');
  return (
    <div style={{ background: BG_PAGE, minHeight: '100%' }}>
      {/* Pink gradient header */}
      <div style={{
        background: `linear-gradient(180deg, ${PINK_GRAD_FROM} 0%, ${PINK_GRAD_TO} 100%)`,
        paddingTop: 44, paddingBottom: 16, position: 'relative',
      }}>
        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px 4px' }}>
          <div onClick={onBack} style={{ width: 32, height: 32, display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <BackArrow size={22} stroke="#fff"/>
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>
            今日密报
          </div>
          <div style={{ width: 32 }}/>
        </div>
        {/* date tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '14px 8px 4px' }}>
          {[
            { id: 'tue',   day: '周二', date: '5月26日' },
            { id: 'today', day: '今天', date: '5月27日' },
            { id: 'thu',   day: '周四', date: '5月28日' },
          ].map(t => {
            const on = dayTab === t.id;
            return (
              <div key={t.id} onClick={() => setDayTab(t.id)} style={{
                display: 'flex', alignItems: 'baseline', gap: 4, padding: '4px 0',
                cursor: 'pointer', opacity: on ? 1 : 0.7,
                position: 'relative',
              }}>
                <span style={{ fontSize: on ? 17 : 14, fontWeight: on ? 700 : 500, color: '#fff' }}>
                  {t.day}
                </span>
                <span style={{ fontSize: on ? 13 : 11, color: '#fff', opacity: 0.92 }}>
                  ({t.date})
                </span>
                {on && <div style={{ position: 'absolute', bottom: -4, left: '50%',
                  transform: 'translateX(-50%)', width: 26, height: 3, borderRadius: 2, background: '#fff' }}/>}
              </div>
            );
          })}
        </div>
      </div>

      {/* white content sheet with rounded top */}
      <div style={{
        background: '#fff', marginTop: -12, borderTopLeftRadius: 16, borderTopRightRadius: 16,
        padding: '20px 16px 28px', position: 'relative', zIndex: 1,
      }}>
        {/* 黄体期 · 第11天 */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: PINK_DEEP, letterSpacing: -0.4 }}>
            黄体期 · 第 11 天
          </div>
          <InfoIcon size={14} stroke={TEXT_MUTED}/>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_DARK, marginTop: 6 }}>
          距离月经开始（5月30日）还有 3 天
        </div>

        {/* ring */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 4px' }}>
          <CyclePhaseRing size={280}/>
        </div>

        {/* 今日关注 */}
        <div style={{ marginTop: 6 }}>
          <SectionTitle size={16}>今日关注</SectionTitle>
          <p style={{ margin: '12px 2px 0', fontSize: 14.5, color: '#2A1F23', lineHeight: 1.72 }}>
            黄体期快结束这几天，她的雌激素和孕激素都在快速下降。
            今天她可能突然<b style={{ color: PINK_DEEP }}>话变少</b>、情绪也容易低落，
            平时随手能做的事都会让她觉得累。
            提前帮她把晚饭安排好，<b style={{ color: PINK_DEEP }}>别让她一个人在家想太多</b>；
            如果她突然不想说话，就坐在旁边陪着，比讲道理管用 10 倍。
          </p>
        </div>

        {/* 症状预测 */}
        <div style={{ marginTop: 22 }}>
          <SectionTitle size={16}>今日症状预测</SectionTitle>
          <p style={{ margin: '12px 2px 0', fontSize: 14.5, color: '#2A1F23', lineHeight: 1.72 }}>
            雌激素水平进一步下降，她的皮肤和头发会更<b style={{ color: PINK_DEEP }}>容易出油</b>；
            盆腔充血也可能让她觉得腹部<b style={{ color: PINK_DEEP }}>坠胀</b>。
            这两天她对气味、噪音都会更敏感。
          </p>
          <div style={{ display: 'flex', gap: 22, marginTop: 14, paddingLeft: 2 }}>
            {SYMPTOMS.map(s => (
              <div key={s.id} style={{ textAlign: 'center' }}>
                <SymptomBadge id={s.id} size={62}/>
                <div style={{ fontSize: 12, color: '#2A1F23', marginTop: 6, fontWeight: 500 }}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — 哪些症状说明月经要来 */}
        <div style={{
          marginTop: 22, padding: '14px 16px', borderRadius: 12,
          background: '#FFF0F5', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: PINK_DEEP }}>哪些症状说明月经要来</div>
            <div style={{ fontSize: 11.5, color: '#A99098', marginTop: 4 }}>查看往期规律评估本次情况</div>
          </div>
          <button style={{
            padding: '8px 16px', borderRadius: 100, border: 'none',
            background: PINK_PRIMARY, color: '#fff', fontWeight: 700, fontSize: 12.5,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 10px rgba(255,92,138,0.28)',
          }}>立即查看</button>
        </div>

        {/* 小互动 */}
        <div style={{ marginTop: 22 }}>
          <SectionTitle size={16}>小互动 · 你今天可以做</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            {MICRO_ACTIONS.map(a => (
              <div key={a.id} style={{
                background: '#FFF6F8', borderRadius: 12, padding: '12px 14px',
                display: 'flex', gap: 10, alignItems: 'center',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: '#FFE0EA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, flexShrink: 0,
                }}>{a.emoji}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: TEXT_DARK,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 1 }}>{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 白带变化 — extra section per ref */}
        <div style={{ marginTop: 24 }}>
          <SectionTitle size={16}>白带变化</SectionTitle>
          <p style={{ margin: '12px 2px 0', fontSize: 14.5, color: '#2A1F23', lineHeight: 1.72 }}>
            黄体期快结束这几天，白带可能会进一步变少，质地变干，颜色发白或微微发黄。
            这些都是正常的生理变化，不需要紧张。
          </p>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
//   DIARY — 恋爱日记
// ────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────
//   PUBLISH — 发布页 (新的恋爱手帐)
// ────────────────────────────────────────────────────────────────
function BFPublish({ onBack, onSave }) {
  const [text, setText] = React.useState('');
  return (
    <div style={{
      minHeight: '100%',
      // 米色方格纸背景
      background: '#F6EAD3',
      backgroundImage:
        'linear-gradient(rgba(170,140,90,0.10) 1px, transparent 1px),' +
        'linear-gradient(90deg, rgba(170,140,90,0.10) 1px, transparent 1px)',
      backgroundSize: '22px 22px',
      backgroundPosition: '0 0',
      paddingTop: 44, // status bar
      display: 'flex', flexDirection: 'column',
    }}>
      {/* top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px 14px',
      }}>
        <div onClick={onBack} style={{ width: 32, height: 32, display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: '#3A2A1A' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#3A2A1A', letterSpacing: 1 }}>
          写一篇恋爱手帐
        </div>
        <div onClick={() => onSave && onSave(text)} style={{
          width: 32, height: 32, display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: text ? '#E07A3B' : '#B6A4AC',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12l5 5L20 6"/>
          </svg>
        </div>
      </div>

      {/* note card */}
      <div style={{
        margin: '4px 16px 0',
        background: '#FBF1DD',
        borderRadius: 12,
        padding: '20px 22px 26px',
        boxShadow: '0 4px 12px rgba(160,120,60,0.10)',
        position: 'relative',
        minHeight: 220,
      }}>
        {/* date row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#D9633F', lineHeight: 1,
              letterSpacing: -1, fontFamily: '"Caveat", "Ma Shan Zheng", serif' }}>27</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#D9633F', letterSpacing: 0.5 }}>星期三</div>
              <div style={{ fontSize: 11, color: '#D9633F', marginTop: 2 }}>2026/5</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: '#7A6A5A', fontFamily: HANDWRITE_FONT, letterSpacing: 2 }}>
            四月十一
          </div>
        </div>

        {/* big opening quote mark */}
        <div style={{
          position: 'absolute', left: 16, top: 88,
          fontSize: 48, fontWeight: 700, color: 'rgba(122,90,40,0.35)',
          lineHeight: 0.6, fontFamily: '"Caveat", "Noto Serif SC", serif',
        }}>"</div>

        {/* text input area */}
        <div style={{ marginTop: 24, marginLeft: 36, position: 'relative' }}>
          <div style={{
            fontFamily: HANDWRITE_FONT,
            fontSize: 17, color: '#3A2A1A',
            lineHeight: 2, letterSpacing: 0.5, minHeight: 96,
            whiteSpace: 'pre-wrap',
          }}>
            {text || <span style={{ color: '#B6A492' }}>今天我们又留下了什么呢？</span>}
            <span style={{
              display: 'inline-block', width: 1.5, height: 18,
              background: '#D9633F', verticalAlign: 'text-bottom', marginLeft: 2,
              animation: 'caretBlink 1s steps(1) infinite',
            }}/>
          </div>
        </div>
      </div>

      {/* spacer */}
      <div style={{ flex: 1 }}/>

      {/* attachment toolbar */}
      <div style={{
        background: '#fff',
        padding: '10px 18px',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <ToolIcon kind="image"/>
          <ToolIcon kind="clock"/>
        </div>
        <ToolIcon kind="trash"/>
      </div>

      {/* faux iOS keyboard (using existing IOSKeyboard component) */}
      {typeof IOSKeyboard !== 'undefined' && <IOSKeyboard/>}

      <style>{`
        @keyframes caretBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

function ToolIcon({ kind }) {
  const stroke = '#3A2A1A';
  return (
    <div style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      {kind === 'image' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke}
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2.5"/>
          <circle cx="8.5" cy="10.5" r="1.6"/>
          <path d="M21 17l-5-5-9 9"/>
        </svg>
      )}
      {kind === 'clock' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke}
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 7v5l3 2"/>
        </svg>
      )}
      {kind === 'trash' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke}
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/>
          <path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/>
        </svg>
      )}
    </div>
  );
}

function BFDiary({ onBack, onPublish }) {
  return (
    <div style={{
      background: DIARY_BG,
      minHeight: '100%',
    }}>
      {/* hero header */}
      <DiaryHeader onBack={onBack}/>

      {/* timeline — 统一卡片，依次叠放 */}
      <div style={{
        padding: '16px 14px 28px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {DIARY.map((c) => (
          <DiaryEntry key={c.id} card={c} variant="full"/>
        ))}
        <div style={{
          textAlign: 'center',
          fontFamily: HANDWRITE_FONT, fontSize: 15, color: '#C5A4AC',
          padding: '8px 0 4px',
        }}>
          —  我们的故事，未完待续  —
        </div>
      </div>
    </div>
  );
}

function DiaryHeader({ onBack }) {
  return (
    <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
      {/* hero gradient backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(140deg, #FFD3B5 0%, #FFB8C5 40%, #FF9CB5 100%)',
      }}/>
      {/* warm glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%),' +
                    'radial-gradient(circle at 18% 78%, rgba(255,200,210,0.45) 0%, rgba(255,200,210,0) 55%)',
      }}/>
      {/* soft clouds */}
      <svg width="100%" height="100%" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}>
        <ellipse cx="320" cy="80" rx="90" ry="50" fill="rgba(255,255,255,0.20)"/>
        <ellipse cx="80" cy="180" rx="110" ry="40" fill="rgba(255,200,200,0.28)"/>
      </svg>
      {/* floating hearts decoration */}
      <HeartSparkle size={18} color="rgba(255,255,255,0.7)" style={{ top: 60, left: 30 }}/>
      <HeartSparkle size={12} color="rgba(255,255,255,0.5)" style={{ top: 92, left: 64 }}/>
      <HeartSparkle size={14} color="rgba(255,255,255,0.5)" style={{ top: 50, right: 60 }}/>
      <HeartSparkle size={10} color="rgba(255,255,255,0.6)" style={{ top: 110, right: 30 }}/>
      <HeartSparkle size={22} color="rgba(255,255,255,0.35)" style={{ top: 140, right: 110 }}/>

      {/* bottom gradient for legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.18) 100%)',
      }}/>

      {/* back button */}
      <div onClick={onBack} style={{
        position: 'absolute', top: 50, left: 12, width: 36, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <BackArrow size={22} stroke="#fff"/>
      </div>
      {/* title */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0,
        textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#fff',
        letterSpacing: 1, textShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }}>恋爱日记</div>

      {/* bottom-left: couple identity */}
      <div style={{
        position: 'absolute', bottom: 22, left: 16, right: 16,
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* paired avatar portraits */}
          <div style={{ position: 'relative', width: 78, height: 56 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, transform: 'rotate(-6deg)' }}>
              <AvatarPortrait kind="female" size={48}/>
            </div>
            <div style={{ position: 'absolute', right: 0, bottom: 0, transform: 'rotate(6deg)' }}>
              <AvatarPortrait kind="male" size={48}/>
            </div>
            {/* small heart in middle */}
            <HeartSparkle size={14} color="#fff" style={{ left: 31, top: 22 }}/>
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: 0.4,
              textShadow: '0 1px 3px rgba(0,0,0,0.22)' }}>福尔摩诗 & 夏洛克</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.95)', marginTop: 4,
              textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
              在一起 <b style={{ fontSize: 14 }}>102</b> 天 · 留下 <b style={{ fontSize: 14 }}>56</b> 篇手帐
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
//   DiaryEntry — scrapbook style (sticky note / polaroid / clipping / milestone)
//   variant: 'compact' (home) | 'full' (diary screen)
// ────────────────────────────────────────────────────────────────

// 引号 SVG（参考图里的灰色大引号）
const QuoteMark = ({ size = 22, color = '#C9BABF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M7.2 7C5.2 7 4 8.5 4 10.5 4 12.4 5.4 14 7.3 14c.4 0 .7 0 .9-.1-.5 1.6-1.6 2.8-3.4 3.6L5.5 18c2.6-.6 4.7-2.6 4.7-6.4 0-2.8-1.5-4.6-3-4.6zm9.5 0c-2 0-3.2 1.5-3.2 3.5 0 1.9 1.4 3.5 3.3 3.5.4 0 .7 0 .9-.1-.5 1.6-1.6 2.8-3.4 3.6L15 18c2.6-.6 4.7-2.6 4.7-6.4 0-2.8-1.5-4.6-3-4.6z"/>
  </svg>
);
const ExternalLinkIcon = ({ size = 18, stroke = '#B6A4AC', sw = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h6"/>
  </svg>
);
const PlayBadge = ({ size = 42 }) => (
  <div style={{
    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    pointerEvents: 'none',
  }}>
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '2px solid rgba(255,255,255,0.85)',
    }}>
      <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="#fff">
        <path d="M7 5l12 7-12 7V5z"/>
      </svg>
    </div>
  </div>
);

// 统一的恋爱日记卡片：日期行 + 引号 + 正文（可选照片网格）
function DiaryEntry({ card, variant = 'full' }) {
  const compact = variant === 'compact';
  const pics = card.pics;
  const isVideo = card.kind === 'video' || card.videoBadge;
  const photoCols = pics ? (pics.length === 1 ? 1 : pics.length === 2 ? 2 : pics.length === 3 ? 3 : 2) : 0;

  return (
    <div style={{
      background: '#fff', borderRadius: 14,
      padding: compact ? '16px 16px 14px' : '18px 18px 16px',
      boxShadow: '0 4px 14px rgba(255,140,170,0.08), 0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {/* date row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <div style={{
            fontSize: compact ? 28 : 32, fontWeight: 800, color: TEXT_DARK,
            lineHeight: 1, letterSpacing: -1, fontVariantNumeric: 'tabular-nums',
          }}>{card.day}</div>
          <div>
            <div style={{ fontSize: compact ? 12.5 : 13, fontWeight: 700, color: TEXT_DARK }}>
              {card.weekday}
            </div>
            <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 2 }}>{card.period}</div>
          </div>
        </div>
        <ExternalLinkIcon size={compact ? 16 : 18}/>
      </div>

      {/* badge (e.g. 100 天纪念日) */}
      {card.badge && (
        <div style={{
          marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '4px 11px', borderRadius: 100,
          background: 'linear-gradient(120deg, #FFD0DC, #FF95B5)',
          color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
          boxShadow: '0 2px 6px rgba(255,108,140,0.22)',
        }}>
          <HeartIcon size={11} fill="#fff" stroke="#fff"/> {card.badge}
        </div>
      )}

      {/* body with leading quote mark */}
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <div style={{ flexShrink: 0, paddingTop: 1 }}>
          <QuoteMark size={compact ? 18 : 22}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: compact ? 14 : 15, color: '#2A1F23',
            lineHeight: 1.85, whiteSpace: 'pre-line',
          }}>{card.body}</div>

          {/* photos / video thumbnails */}
          {pics && (
            <div style={{
              marginTop: 12, display: 'grid',
              gridTemplateColumns: `repeat(${photoCols}, 1fr)`,
              gap: 6,
            }}>
              {pics.map(([f, t], i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <PhotoBox from={f} to={t}
                    h={pics.length === 1 ? (compact ? 160 : 200) : (compact ? 100 : 130)}
                    radius={10}/>
                  {isVideo && i === 0 && <PlayBadge size={compact ? 38 : 46}/>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ────────────────────────────────────────────────────────────────
//   APP shell
// ────────────────────────────────────────────────────────────────
function BFApp({ initial = 'home' }) {
  const [screen, setScreen] = React.useState(initial);
  const onNav = (s) => setScreen(s);

  let body;
  if (screen === 'detail')       body = <BFDetail  onBack={() => setScreen('home')}/>;
  else if (screen === 'diary')   body = <BFDiary   onBack={() => setScreen('home')} onPublish={() => setScreen('publish')}/>;
  else if (screen === 'publish') body = <BFPublish onBack={() => setScreen('diary')} onSave={() => setScreen('diary')}/>;
  else                           body = <BFHome    onNav={onNav}/>;

  const showTab = screen === 'home';
  const showFab = screen === 'diary';

  return (
    <div style={{
      background: BG_PAGE, height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: '"Noto Sans SC", -apple-system, system-ui, sans-serif',
      color: TEXT_DARK, fontFeatureSettings: '"palt"',
      position: 'relative',
    }}>
      <div style={{ flex: 1, overflow: 'auto' }}>{body}</div>
      {showTab && <BottomTab active="home" onChange={() => {}}/>}
      {showFab && (
        <button onClick={() => setScreen('publish')} style={{
          position: 'absolute', right: 18, bottom: 26,
          width: 56, height: 56, borderRadius: '50%', border: 'none',
          background: `linear-gradient(135deg, ${PINK_GRAD_FROM}, ${PINK_DEEP})`,
          color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 8px 22px rgba(233,68,114,0.42), 0 2px 6px rgba(233,68,114,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      )}
    </div>
  );
}

Object.assign(window, { BFApp, BFHome, BFDetail, BFDiary });

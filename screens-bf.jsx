// screens-bf.jsx — Flow C: 男友版视角（4 screens）
// BFHome / BFSecretDetail / BFDiary / BFRecord
// 美柚设计规范：MY token，8dp 网格，触控 ≥44px

// ─── 周期环 SVG（参考页面14）─────────────────────────────────────
function CycleRing({ size = 240 }) {
  const cx = size / 2, cy = size / 2;
  const R = size * 0.36;   // 弧半径
  const sw = size * 0.11;  // 弧宽

  // SVG arc helper: startDeg / endDeg → path string (0° = top, clockwise)
  function arc(s, e, r) {
    const toRad = d => (d - 90) * Math.PI / 180;
    const x1 = cx + r * Math.cos(toRad(s)), y1 = cy + r * Math.sin(toRad(s));
    const x2 = cx + r * Math.cos(toRad(e)), y2 = cy + r * Math.sin(toRad(e));
    const large = (e - s) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }
  function pt(deg, r) {
    const rad = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  // 黄体期（橙，左侧 active）dots 指针
  const lutealDots = Array.from({ length: 9 }, (_, i) => {
    const deg = 195 + i * 14;
    return pt(deg, R);
  });
  // 指针从黄体期 → 中心吉祥物
  const pointerOuter = pt(270, R);
  const pointerInner = pt(270, R - sw * 0.6);

  // 排卵日小花（底部）
  const [fx, fy] = pt(172, R);

  // Label 坐标
  const labels = [
    { t: '黄体期', deg: 262, r: R + sw / 2 + 14, color: '#F08A2A', bold: true },
    { t: '月经期', deg: 38,  r: R + sw / 2 + 14, color: '#E8A0AB' },
    { t: '卵泡期', deg: 130, r: R + sw / 2 + 14, color: '#8ABF7E' },
    { t: '排卵日', deg: 176, r: R + sw / 2 + 20, color: '#B596E6' },
  ];

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 底层灰色轨道 */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth={sw}/>

        {/* 月经期 — 浅粉，上右 */}
        <path d={arc(352, 78, R)} fill="none" stroke="#FFD6DE" strokeWidth={sw} strokeLinecap="round"/>
        {/* 卵泡期 — 浅绿，右下 */}
        <path d={arc(84, 168, R)} fill="none" stroke="#C8E6C0" strokeWidth={sw} strokeLinecap="round"/>
        {/* 黄体期 — 橙，左侧 active */}
        <path d={arc(196, 344, R)} fill="none" stroke="#FFB347" strokeWidth={sw} strokeLinecap="round"/>

        {/* 黄体期白色小圆点 */}
        {lutealDots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={sw * 0.19} fill="rgba(255,255,255,0.82)"/>
        ))}

        {/* 排卵日小花 */}
        <g transform={`translate(${fx},${fy})`}>
          {[0, 60, 120, 180, 240, 300].map(d => (
            <ellipse key={d} cx="0" cy={-(sw * 0.32)} rx={sw * 0.16} ry={sw * 0.28}
              fill="#D4AAEC" opacity="0.85" transform={`rotate(${d})`}/>
          ))}
          <circle cx="0" cy="0" r={sw * 0.14} fill="#B596E6"/>
        </g>

        {/* 指针 stick (黄体期 → 中心) */}
        <line x1={pointerOuter[0]} y1={pointerOuter[1]}
              x2={pointerInner[0]} y2={pointerInner[1]}
              stroke="#F5C842" strokeWidth={sw * 0.18} strokeLinecap="round"/>
        {/* 指针头部放大圆 */}
        <circle cx={pointerOuter[0]} cy={pointerOuter[1]} r={sw * 0.38}
          fill="#fff" stroke="#F5C842" strokeWidth={sw * 0.1}/>
        <circle cx={pointerOuter[0]} cy={pointerOuter[1]} r={sw * 0.22} fill="#F5C842"/>
      </svg>

      {/* 中心：image-slot 拖拽上传区，fallback 为抽象粉色软团 */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          width: size * 0.33, height: size * 0.33,
          borderRadius: '50%', position: 'relative',
          pointerEvents: 'auto',
        }}>
          {/* fallback blob — visible until user drops an image */}
          <svg width="100%" height="100%" viewBox="0 0 80 80"
            style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <radialGradient id="blobG" cx="45%" cy="38%" r="60%">
                <stop offset="0%" stopColor="#FFE8ED"/>
                <stop offset="65%" stopColor="#FFB5C8"/>
                <stop offset="100%" stopColor="#FF8FAD"/>
              </radialGradient>
            </defs>
            <path d="M40 6 Q56 4 64 18 Q72 32 65 48 Q58 65 40 68 Q22 65 15 48 Q8 32 16 18 Q24 4 40 6Z"
              fill="url(#blobG)"/>
            <ellipse cx="31" cy="23" rx="9" ry="6" fill="rgba(255,255,255,0.55)" transform="rotate(-18,31,23)"/>
            <path d="M29 38 Q33 35 37 38" fill="none" stroke="#D06080" strokeWidth="2" strokeLinecap="round"/>
            <path d="M43 38 Q47 35 51 38" fill="none" stroke="#D06080" strokeWidth="2" strokeLinecap="round"/>
            <path d="M33 48 Q40 53 47 48" fill="none" stroke="#D06080" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          {/* 吉祥物固定图片 */}
          <img src="assets/blob_mascot.jpg" alt="吉祥物"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}/>
        </div>
      </div>

      {/* 文字标签 */}
      {labels.map((l, i) => {
        const rad = (l.deg - 90) * Math.PI / 180;
        const x = cx + l.r * Math.cos(rad);
        const y = cy + l.r * Math.sin(rad);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: x, top: y,
            transform: 'translate(-50%,-50%)',
            fontSize: size * 0.046, fontWeight: l.bold ? 700 : 400,
            color: l.color, whiteSpace: 'nowrap',
            letterSpacing: 0.5,
          }}>{l.t}</div>
        );
      })}
    </div>
  );
}

// ─── 症状圆形徽章 ──────────────────────────────────────────────────
function SymptomIcon({ label, size = 68, icon = 'bloat' }) {
  const icons = {
    bloat: (
      <g transform="translate(32,32)">
        <ellipse cx="0" cy="6" rx="14" ry="10" fill="#FFA0B5" opacity="0.35"/>
        <path d="M-12 -2 Q0 -11 12 -2" fill="none" stroke="#F4889E" strokeWidth="2.4" strokeLinecap="round"/>
        <path d="M0 0 L0 8 M-4 5 L0 8 L4 5" stroke="#F4889E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="0" cy="11" r="1.8" fill="#F4889E"/>
      </g>
    ),
    pain: (
      <g transform="translate(32,32)">
        <path d="M-12 -4 Q0 -13 12 -4 L12 10 Q0 16 -12 10 Z" fill="#FFB5C8" opacity="0.4"/>
        <path d="M0 -14 L-5 0 L0 0 L-3 14 L8 -4 L3 -4 L6 -14Z" fill="#EE6F88"/>
      </g>
    ),
    hair: (
      <g transform="translate(32,32)">
        <circle cx="0" cy="-2" r="11" fill="#FFD0DC" opacity="0.5"/>
        <circle cx="-4" cy="-8" r="2" fill="#D06080"/>
        <circle cx="4"  cy="-8" r="2" fill="#D06080"/>
        <path d="M-6 2 Q0 7 6 2" fill="none" stroke="#D06080" strokeWidth="2" strokeLinecap="round"/>
        {/* hair strands */}
        <path d="M-8 -14 Q-6 -8 -4 -11" stroke="#C05070" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M0 -16 Q0 -10 0 -13" stroke="#C05070" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M8 -14 Q6 -8 4 -11" stroke="#C05070" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      </g>
    ),
    mood: (
      <g transform="translate(32,32)">
        <circle cx="0" cy="0" r="14" fill="#E8D5F8" opacity="0.6"/>
        <circle cx="-5" cy="-3" r="1.8" fill="#B596E6"/>
        <circle cx="5" cy="-3" r="1.8" fill="#B596E6"/>
        <path d="M-6 8 Q0 3 6 8" fill="none" stroke="#B596E6" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M7 -2 q1.5 3 0 5 a2 2 0 0 1-3-1Z" fill="#B596E6" opacity="0.7"/>
      </g>
    ),
  };
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #fff 0%, #ffe3ea 55%, #ffcbd8 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(255,140,170,0.16)',
      }}>
        <svg width={size * 0.82} height={size * 0.82} viewBox="0 0 64 64">
          {icons[icon] || icons.bloat}
        </svg>
      </div>
      <div style={{ fontSize: 12, color: MY.textSec, fontWeight: 400, letterSpacing: 0 }}>{label}</div>
    </div>
  );
}

// ─── 今日关注 / 症状 文案 ──────────────────────────────────────────
const BF_FOCUS = '黄体期快结束这几天，她的激素水平正在快速下行，比上周更容易累、情绪也更敏感。哪怕一句话说错就可能让她难过。主动帮她把晚饭安排好，别让她一个人在家想太多。如果她突然不想说话，坐在旁边陪着就好。';
const BF_SYMPTOM_TEXT = '体内激素变化引起的盆腔充血，可能会让她觉得腹部有些坠胀甚至疼痛感。这两天她对噪音和气味也会更敏感。';
const BF_DISCHARGE = '黄体期快结束这几天，白带可能会进一步变少，质地变干，颜色发白或微微发黄。这些都是正常的生理变化，不需要紧张。';
const BF_INTERACTION = [
  { e: '🍵', t: '泡杯温牛奶',   s: '37°C 最贴心' },
  { e: '🤍', t: '5 秒拥抱',     s: '比说话管用' },
  { e: '🏠', t: '早点回家',     s: '今天别加班' },
  { e: '🚫', t: '别问"你咋了"', s: '会直接破防' },
];

// ─── 共用：密报详情卡（主页透出 + 密报页都用）───────────────────
function SecretCard({ compact = false }) {
  return (
    <div style={{
      background: MY.surface, borderRadius: MY.rmd, padding: '16px 16px 14px',
      boxShadow: MY.shadow1,
    }}>
      {/* 标题行 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: MY.brandRed }}>黄体期 · 第 11 天</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={MY.textTer} strokeWidth="1.6"/>
          <path d="M12 16v-5M12 8.5v.01" stroke={MY.textTer} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: MY.textPri, marginTop: 4 }}>
        距离月经开始（5月30日）还有 3 天
      </div>

      {/* 周期环 */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 4px' }}>
        <CycleRing size={compact ? 220 : 250}/>
      </div>

      {/* 今日关注 */}
      <SectionDot label="今日关注"/>
      <p style={{ fontSize: 13.5, lineHeight: '22px', color: MY.textPri, margin: '8px 0 0' }}>
        {BF_FOCUS}
      </p>

      {/* 今日症状预测 */}
      <div style={{ marginTop: 18 }}>
        <SectionDot label="今日症状预测"/>
        <p style={{ fontSize: 13.5, lineHeight: '22px', color: MY.textPri, margin: '8px 0 12px' }}>
          {BF_SYMPTOM_TEXT}
        </p>
        <div style={{ display: 'flex', gap: 20, paddingLeft: 2 }}>
          <SymptomIcon label="小腹坠胀" icon="bloat"/>
          <SymptomIcon label="腹痛"     icon="pain"/>
        </div>
      </div>

      {compact && (
        <>
          {/* 小互动 */}
          <div style={{ marginTop: 18 }}>
            <SectionDot label="小互动 · 今天你可以这样做"/>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
              {BF_INTERACTION.map((a, i) => (
                <div key={i} style={{
                  background: MY.bg, borderRadius: MY.rsm, padding: '10px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{a.e}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: MY.textPri,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.t}</div>
                    <div style={{ fontSize: 11, color: MY.textTer, marginTop: 2 }}>{a.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 送关心引导条已移除 */}
        </>
      )}
    </div>
  );
}

// 分节标题 · 红点
function SectionDot({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: MY.brandRed, flexShrink: 0 }}/>
      <span style={{ fontSize: 15, fontWeight: 600, color: MY.textPri }}>{label}</span>
    </div>
  );
}

// ─── Screen BF1: 男友主页 ──────────────────────────────────────────
function BFHome({ onSecretDetail, onDiary, onTabChange, diaryEmpty = false }) {
  return (
    <Phone bg={MY.bg}>
      <HomeTopBar/>
      <div style={{ position: 'absolute', inset: '44px 0 50px', overflowY: 'auto' }}>
        <div style={{ height: 8 }}/>

        {/* 模块1：今日密报 hero */}
        <div style={{
          margin: '0 16px', borderRadius: MY.rmd, padding: '16px 16px 56px',
          background: `linear-gradient(120deg, ${MY.brandRed} 0%, #ff80aa 55%, #ffafc8 100%)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
          boxShadow: `0 6px 16px rgba(255,77,136,0.28)`,
        }}>
          <div style={{ fontSize: 21, fontWeight: 600, lineHeight: '28px' }}>距月经开始还有 3 天</div>
          <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>预测经期开始日 5月30日</div>
          {/* 怀孕几率花形 */}
          <div style={{ position: 'absolute', right: 14, top: 12, width: 82, height: 82 }}>
            <svg width="82" height="82" viewBox="0 0 82 82" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <radialGradient id="pg2" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#fff"/>
                  <stop offset="55%" stopColor="#ffd6e8"/>
                  <stop offset="100%" stopColor="#ffafc8"/>
                </radialGradient>
              </defs>
              <g transform="translate(41 41)">
                {[0,72,144,216,288].map(d => (
                  <ellipse key={d} cx="0" cy="-20" rx="14" ry="20"
                    fill="url(#pg2)" transform={`rotate(${d})`}/>
                ))}
                <circle r="19" fill="#ffe0ec"/>
              </g>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 9, color: '#cc0066', fontWeight: 600 }}>今日怀孕几率</div>
              <div style={{ fontSize: 17, color: '#cc0066', fontWeight: 600, marginTop: 1 }}>4.1%</div>
            </div>
          </div>
        </div>

        {/* 模块2：密报详情透出 */}
        <div style={{ margin: '8px 16px 16px' }}>
          <SecretCard compact/>
        </div>
      </div>
      <BFTabBarNew active="home" onChange={onTabChange}/>
    </Phone>
  );
}

// ─── Screen BF2: 今日密报详情（男友视角）─────────────────────────
function BFSecretDetail({ onBack }) {
  const [tab, setTab] = React.useState('today');
  const tabs = [
    { id: 'prev',  label: '周二', sub: '5/26' },
    { id: 'today', label: '今天', sub: '5/27' },
    { id: 'next',  label: '周四', sub: '5/28' },
  ];

  return (
    <Phone bg={MY.bg} statusDark>
      {/* ── 粉色渐变顶部 header：marginTop:-36 延伸至状态栏区域 ── */}
      <div style={{
        background: `linear-gradient(180deg, ${MY.brandRed} 0%, #ff80aa 70%, #ffc0d0 100%)`,
        marginTop: -36,
      }}>
        {/* 顶栏：padding-top:36 将内容推到状态栏以下 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '36px 16px 0', height: 80,
        }}>
          <div onClick={onBack} style={{
            width: 32, height: 44, display: 'flex', alignItems: 'center', cursor: 'pointer',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 17, fontWeight: 500, color: '#fff' }}>今日密报</span>
          <div style={{ width: 32 }}/>
        </div>

        {/* 日期 tabs — 单行不换行 */}
        <div style={{
          display: 'flex', justifyContent: 'space-around',
          padding: '10px 16px 14px', gap: 4,
        }}>
          {tabs.map(t => {
            const on = tab === t.id;
            return (
              <div key={t.id} onClick={() => setTab(t.id)} style={{
                display: 'flex', alignItems: 'baseline', gap: 4,
                cursor: 'pointer', opacity: on ? 1 : 0.7,
                position: 'relative', padding: '2px 0 8px',
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: on ? 16 : 14, fontWeight: on ? 700 : 400, color: '#fff' }}>
                  {t.label}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.88)' }}>
                  ({t.sub})
                </span>
                {on && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 24, height: 3, background: '#fff', borderRadius: 2,
                  }}/>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 灰色内容区（圆角上边） ── */}
      <div style={{
        position: 'absolute', top: 104, left: 0, right: 0, bottom: 0,
        background: MY.bg, overflowY: 'auto',
      }}>
        {/* 白色内容卡 */}
        <div style={{
          background: MY.surface, borderRadius: '16px 16px 0 0',
          padding: '20px 16px 32px', minHeight: '100%',
        }}>
          {/* 阶段标题 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: MY.brandRed }}>黄体期 · 第 11 天</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke={MY.textTer} strokeWidth="1.6"/>
              <path d="M12 16v-5M12 8.5v.01" stroke={MY.textTer} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: MY.textPri, marginTop: 6 }}>
            距离月经开始（5月30日）还有 3 天
          </div>

          {/* 周期环 */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 6px' }}>
            <CycleRing size={256}/>
          </div>

          {/* 今日关注 */}
          <SectionDot label="今日关注"/>
          <p style={{ fontSize: 14, lineHeight: '23px', color: MY.textPri, margin: '8px 0 0' }}>
            {BF_FOCUS}
          </p>

          {/* 症状预测 */}
          <div style={{ marginTop: 20 }}>
            <SectionDot label="今日症状预测"/>
            <p style={{ fontSize: 14, lineHeight: '23px', color: MY.textPri, margin: '8px 0 14px' }}>
              {BF_SYMPTOM_TEXT}
            </p>
            <div style={{ display: 'flex', gap: 24, paddingLeft: 2 }}>
              <SymptomIcon label="小腹坠胀" icon="bloat" size={68}/>
              <SymptomIcon label="头发出油" icon="hair"  size={68}/>
              <SymptomIcon label="情绪低落" icon="mood"  size={68}/>
            </div>
          </div>

          {/* CTA 卡 */}
          <div style={{
            marginTop: 20, padding: '14px 16px', borderRadius: MY.rsm,
            background: MY.brandSoft,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: MY.brandRed }}>哪些症状说明月经要来</div>
              <div style={{ fontSize: 12, color: MY.textTer, marginTop: 3 }}>查看往期规律评估本次情况</div>
            </div>
            <button style={{
              padding: '0 16px', height: 36, borderRadius: MY.rpill, border: 'none',
              background: MY.brandRed, color: '#fff',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: MY.font,
            }}>立即查看</button>
          </div>

          {/* 白带变化 */}
          <div style={{ marginTop: 22 }}>
            <SectionDot label="白带变化"/>
            <p style={{ fontSize: 14, lineHeight: '23px', color: MY.textPri, margin: '8px 0 0' }}>
              {BF_DISCHARGE}
            </p>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ─── Screen BF3: 恋爱记（男友视角）— 与女性版 Screen5 结构一致 ──
function BFDiary({ onBack }) {
  const days = [
    {
      date: '今天', sub: '在一起 102 天',
      messages: [
        { who: 'F', text: '今天和你一起走完雁荡山，下山的时候我腿都软了 😂 但是真的好有成就感！', photos: ['合照','奶茶','夕阳'] },
        { who: 'M', text: '辛苦你了！明早我去买早餐让你睡个懒觉。下次我们一起去麦理浩径吧！' },
      ],
    },
    {
      date: '5月26日', sub: '在一起 101 天',
      messages: [
        { who: 'M', text: '记得明天要早睡，最近肚子是不是有点不舒服？今天看你扶了好几次腰。' },
        { who: 'F', text: '没事啦，就是经期前几天，谢谢你这么细心 ❤︎' },
      ],
    },
    {
      date: '5月23日', sub: '在一起 97 天',
      messages: [
        { who: 'F', text: '你送我的玫瑰真的好惊喜，第一次有人这样认真挑花给我。', photos: ['玫瑰','花瓶'] },
        { who: 'M', text: '你笑的样子比花还好看。下次纪念日我再带你去一次 🌹' },
      ],
    },
    {
      date: '5月20日', sub: '在一起 94 天',
      messages: [
        { who: 'F', text: '今天痛经痛了一整天 😭 一动也不想动。' },
        { who: 'M', text: '已经给你煮好红糖姜茶放保温杯里了，下班接你回家。', photos: ['热饮'] },
      ],
    },
  ];

  return (
    <Phone bg={MY.bg} statusDark>
      {/* ── Hero 图片区：top:-36 延伸至状态栏区域实现自然过渡 ── */}
      <div style={{ position: 'absolute', top: -36, left: 0, right: 0, height: 246, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #ffd3dd 0%, #f5a8b8 50%, #e8809a 100%)',
        }}/>
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 180, height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.38) 0%, transparent 65%)',
        }}/>
        {[{s:14,t:60,l:48},{s:9,t:85,l:80},{s:12,t:75,r:56}].map((h,i)=>(
          <svg key={i} width={h.s} height={h.s} viewBox="0 0 24 24"
            style={{ position:'absolute', top:h.t, left:h.l, right:h.r }}>
            <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" fill="rgba(255,255,255,0.55)"/>
          </svg>
        ))}

        {/* 返回：top:44 避开状态栏 36px */}
        <div onClick={onBack} style={{
          position: 'absolute', top: 44, left: 12,
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* 情侣身份 */}
        <div style={{
          position: 'absolute', bottom: 12, left: 16, right: 16,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ position: 'relative', width: 80, height: 54 }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, width: 48, height: 48,
              borderRadius: '50%', background: USER.bg, color: '#fff',
              fontSize: 18, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2.5px solid #fff', boxShadow: MY.shadow1,
            }}>{USER.initial}</div>
            <div style={{
              position: 'absolute', right: 0, bottom: 0, width: 48, height: 48,
              borderRadius: '50%', background: PARTNER.bg, color: '#fff',
              fontSize: 18, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2.5px solid #fff', boxShadow: MY.shadow1,
            }}>{PARTNER.initial}</div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
              女友殿下 ❤︎ 男友先生
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.92)', marginTop: 3 }}>
              在一起 102 天 · 共同记录 38 篇
            </div>
          </div>
        </div>
      </div>

      {/* ── 内容区（白底，时间轴）── */}
      <div style={{
        position: 'absolute', top: 210, left: 0, right: 0, bottom: 0,
        background: MY.surface, overflowY: 'auto',
        padding: '12px 16px 80px',
      }}>
        <DiaryFullTimeline/>
      </div>

      {/* + FAB */}
      <div style={{
        position: 'absolute', bottom: 24, right: 16,
        width: 48, height: 48, borderRadius: '50%',
        background: MY.brandRed,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 8px 16px rgba(255,77,136,0.38)`,
        cursor: 'pointer', zIndex: 5,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
        </svg>
      </div>
    </Phone>
  );
}

// ─── Screen BF4: 记录 tab（只读日历）──────────────────────────────
function BFRecord({ onTabChange }) {
  const weeks = ['日','一','二','三','四','五','六'];
  // May 2026: starts on Friday(5)
  const startDow = 5;
  const daysInMonth = 31;

  const getDayStyle = (d) => {
    if (!d) return {};
    if ([1,2,3,4,5].includes(d)) return { bg: '#ff4d88', color: '#fff', bold: true };
    if ([30,31].includes(d))     return { bg: '#FFD0DC', color: MY.textPri, bold: false };
    if (d >= 10 && d <= 16)      return { color: '#9B6FC8', bold: false };
    if (d === 28)                return { color: MY.textPri, border: `2px solid ${MY.danger}`, bold: false };
    return { color: MY.textSec };
  };

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const records = [
    { icon: '💞', label: '爱爱',   value: '避孕套' },
    { icon: '🩹', label: '症状',   value: '头痛、皮肤干燥' },
    { icon: '😊', label: '心情',   value: '😢😐😶😶🙂' },
    { icon: '💧', label: '白带',   value: '粘稠' },
    { icon: '🌡',  label: '体温',   value: '36.5°C' },
    { icon: '⚖️', label: '体重',   value: '50.50公斤' },
    { icon: '👍', label: '好习惯', value: '⚡🍎☕🎾' },
    { icon: '🟡', label: '便便',   value: '1次' },
  ];

  return (
    <Phone bg={MY.surface}>
      {/* 顶栏 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: 44, background: MY.surface,
        borderBottom: `1px solid ${MY.line}`,
      }}>
        <svg width="10" height="16" viewBox="0 0 10 16">
          <path d="M8 1L2 8l6 7" stroke={MY.textPri} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        </svg>
        <span style={{ fontSize: 17, fontWeight: 500, color: MY.textPri }}>5月</span>
        <svg width="10" height="16" viewBox="0 0 10 16"/>
      </div>

      <div style={{ position: 'absolute', inset: '44px 0 50px', overflowY: 'auto', background: MY.surface }}>
        {/* 星期头 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '8px 8px 0' }}>
          {weeks.map(w => (
            <div key={w} style={{ textAlign: 'center', fontSize: 13, color: MY.textTer, padding: '4px 0' }}>{w}</div>
          ))}
        </div>

        {/* 日历格 */}
        <div style={{ padding: '4px 8px 8px' }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px 0' }}>
              {Array.from({ length: 7 }).map((_, ci) => {
                const d = row[ci] || null;
                const s = getDayStyle(d);
                return (
                  <div key={ci} style={{
                    position: 'relative', textAlign: 'center',
                    padding: '3px 2px 6px',
                  }}>
                    {d && (
                      <>
                        {/* 排卵日小花 */}
                        {d === 16 && (
                          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: 10 }}>💜</div>
                        )}
                        {/* 今日心形 */}
                        {d === 28 && (
                          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', color: MY.brandRed, fontSize: 9 }}>♡</div>
                        )}
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 34, height: 34, borderRadius: MY.rxs,
                          background: s.bg || 'transparent',
                          border: s.border || 'none',
                          fontSize: 15, fontWeight: s.bold ? 700 : 400,
                          color: s.color || MY.textPri,
                          marginTop: d === 16 || d === 28 ? 12 : 0,
                        }}>{d}</div>
                        {/* 今日铅笔 */}
                        {d === 28 && (
                          <div style={{ fontSize: 9, color: '#F5C842', marginTop: 1 }}>✏</div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 图例 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '6px 16px',
          borderTop: `1px solid ${MY.line}`, borderBottom: `1px solid ${MY.line}`,
          background: MY.surface,
        }}>
          {[
            { color: '#ff4d88', label: '月经期' },
            { color: '#FFD0DC', label: '预测经期' },
            { color: '#9B6FC8', label: '排卵期', circle: true },
            { color: '#9B6FC8', label: '排卵日', flower: true },
          ].map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: MY.textSec }}>
              {l.flower
                ? <span style={{ fontSize: 11 }}>💜</span>
                : <div style={{ width: l.circle ? 9 : 9, height: 9, borderRadius: l.circle ? '50%' : 2, background: l.color, flexShrink: 0 }}/>
              }
              {l.label}
            </div>
          ))}
          <div style={{ marginLeft: 'auto' }}>
            <svg width="8" height="12" viewBox="0 0 8 14">
              <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 记录项（只读）*/}
        <div style={{ background: MY.surface }}>
          {records.map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '0 16px', height: 52,
              borderBottom: `1px solid ${MY.line}`,
            }}>
              <span style={{ fontSize: 20, marginRight: 12, flexShrink: 0 }}>{r.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 500, color: MY.textPri, flex: 1 }}>{r.label}</span>
              <span style={{ fontSize: 14, color: MY.brandRed }}>{r.value}</span>
              {/* 无 + 按钮 — 只读 */}
            </div>
          ))}
        </div>
      </div>

      <BFTabBarNew active="record" onChange={onTabChange}/>
    </Phone>
  );
}

// ─── Screen E1: 男生视角 · 消息 tab ──────────────────────────────
function Screen_BFMessages({ onOpenChat, onTabChange }) {
  return (
    <Phone bg={MY.surface}>
      {/* 顶部 */}
      <div style={{
        background: MY.surface, height: 44,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${MY.line}`, flexShrink: 0,
      }}>
        <span style={{ fontSize: 17, fontWeight: 500, color: MY.textPri }}>消息</span>
      </div>

      <div style={{ position: 'absolute', inset: '44px 0 50px', overflowY: 'auto' }}>
        {/* 通知 banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', background: '#FFF0F4',
          borderBottom: `1px solid ${MY.line}`,
        }}>
          <div style={{ flex: 1, fontSize: 13, color: MY.textPri }}>打开通知，及时接收重要消息</div>
          <button style={{
            padding: '5px 12px', borderRadius: MY.rpill, border: `1px solid ${MY.brandRed}`,
            background: 'transparent', color: MY.brandRed, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: MY.font,
          }}>去开启</button>
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" stroke={MY.textTer} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* 会话列表 */}
        {[
          {
            id: 'baby', name: '宝宝的亲友', sub: '妈妈:保存了条新记录',
            time: '昨天', badge: 2, bgColor: '#FF8A80',
            icon: '👶',
          },
          {
            id: 'gf', name: '女友殿下', sub: '解除伴侣关系',
            time: '昨天', badge: 0, bgColor: MY.brandRed,
            initial: '女',
          },
        ].map((item) => (
          <div key={item.id} onClick={item.id === 'gf' ? onOpenChat : undefined} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 16px', background: MY.surface,
            borderBottom: `1px solid ${MY.line}`,
            cursor: item.id === 'gf' ? 'pointer' : 'default',
          }}>
            {/* 头像 */}
            <div style={{
              width: 50, height: 50, borderRadius: 10, flexShrink: 0,
              background: item.bgColor,
              display: 'flex', alignItems: item.icon ? 'center' : 'flex-end', justifyContent: 'center',
              fontSize: item.icon ? 24 : 18, color: '#fff', fontWeight: 700,
              position: 'relative', overflow: 'hidden',
            }}>
              {item.icon
                ? item.icon
                : item.initial === '女'
                  ? <svg width={36} height={41} viewBox="0 0 36 41" fill="none">
                      <ellipse cx="18" cy="10" rx="7" ry="7.5" fill="rgba(255,255,255,0.92)"/>
                      <path d="M11 10 Q11 2 18 2 Q25 2 25 10" fill="rgba(255,255,255,0.92)"/>
                      <path d="M11 8 Q9 12 10 16" stroke="rgba(255,255,255,0.92)" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M25 8 Q27 12 26 16" stroke="rgba(255,255,255,0.92)" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M10 22 Q10 18 18 18 Q26 18 26 22 L29 41 H7 Z" fill="rgba(255,255,255,0.92)"/>
                    </svg>
                  : item.initial === '男'
                    ? <svg width={36} height={41} viewBox="0 0 36 41" fill="none">
                        <ellipse cx="18" cy="10" rx="7" ry="7.5" fill="rgba(255,255,255,0.92)"/>
                        <path d="M11 10 Q11 3 18 3 Q25 3 25 10 L25 8 Q18 5 11 8 Z" fill="rgba(255,255,255,0.92)"/>
                        <path d="M8 22 Q8 18 18 18 Q28 18 28 22 L27 41 H9 Z" fill="rgba(255,255,255,0.92)"/>
                      </svg>
                    : item.initial
              }
              {item.badge > 0 && (
                <div style={{
                  position: 'absolute', top: -4, right: -4,
                  minWidth: 18, height: 18, borderRadius: 9,
                  background: '#FF4D4D', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 4px', border: '2px solid #fff',
                }}>{item.badge}</div>
              )}
            </div>
            {/* 内容 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: MY.textPri }}>{item.name}</span>
                <span style={{ fontSize: 12, color: MY.textTer, flexShrink: 0 }}>{item.time}</span>
              </div>
              <div style={{ fontSize: 13, color: MY.textTer, marginTop: 3,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 简化 3-tab 底栏 — 与 D 流程一致，使用标准 TabBar */}
      <BFTabBarNew active="msg" onChange={onTabChange}/>
    </Phone>
  );
}

// ─── Screen E2: 男生视角 · 聊天详情（解除通知）─────────────────
function Screen_BFChatDetail({ onBack }) {
  return (
    <Phone bg={MY.surface}>
      {/* 顶部 */}
      <div style={{
        background: MY.surface, height: 44,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', borderBottom: `1px solid ${MY.line}`,
        flexShrink: 0,
      }}>
        <div onClick={onBack} style={{ width: 32, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke={MY.textPri} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontSize: 16, fontWeight: 500, color: MY.textPri }}>女友殿下</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={MY.textSec} strokeWidth="1.6"/>
          <path d="M9 9a3 3 0 0 1 6 0c0 2-3 3-3 5M12 18v.01" stroke={MY.textSec} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>

      <div style={{ position: 'absolute', inset: '44px 0 0', overflowY: 'auto', padding: '16px 14px 24px',
        background: MY.surface }}>
        {/* 时间戳 */}
        <div style={{ textAlign: 'center', fontSize: 11.5, color: MY.textTer, marginBottom: 12 }}>
          星期三 15:15
        </div>

        {/* 系统卡：成功绑定 */}
        <div style={{
          background: MY.surface, borderRadius: MY.rsm,
          padding: '14px 16px', marginBottom: 12,
          boxShadow: MY.shadow1,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 14, color: MY.textPri, fontWeight: 500,
          }}>
            <span style={{ color: MY.textSec }}>成功和</span>
            <span style={{ color: MY.brandRed, fontWeight: 700 }}>女友殿下</span>
            <span style={{ color: MY.textSec }}>成为伴侣</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 10, paddingTop: 10, borderTop: `1px solid ${MY.line}`,
          }}>
            <span style={{ fontSize: 14, color: MY.textPri }}>去查看</span>
            <svg width="8" height="14" viewBox="0 0 8 14">
              <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 时间戳 */}
        <div style={{ textAlign: 'center', fontSize: 11.5, color: MY.textTer, margin: '8px 0 12px' }}>
          昨天 09:29
        </div>

        {/* 解除通知卡 */}
        <div style={{
          background: MY.surface, borderRadius: MY.rsm,
          padding: '14px 16px', boxShadow: MY.shadow1,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: MY.textPri, marginBottom: 6 }}>
            解除伴侣关系
          </div>
          <div style={{ fontSize: 13.5, color: MY.textSec, lineHeight: '20px' }}>
            女友殿下与你解除了伴侣关系
          </div>
        </div>
      </div>
    </Phone>
  );
}

/* ── 男友版底栏：「返现」→「日记」(带小红点) ── */
function BFTabBarNew({ active = 'home', onChange }) {
  const [badgeDismissed, setBadgeDismissed] = React.useState(
    () => localStorage.getItem('bf_diary_badge_seen') === '1'
  );
  const handleChange = (id) => {
    if (id === 'diary') {
      setBadgeDismissed(true);
      localStorage.setItem('bf_diary_badge_seen', '1');
    }
    onChange && onChange(id);
  };
  const items = [
    { id: 'home', label: '美柚', icon: (c, on) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        {on
          ? <g fill={c}><ellipse cx="12" cy="5.5" rx="3" ry="4"/><ellipse cx="18.5" cy="12" rx="4" ry="3"/><ellipse cx="12" cy="18.5" rx="3" ry="4"/><ellipse cx="5.5" cy="12" rx="4" ry="3"/><circle cx="12" cy="12" r="3" fill="#fff"/></g>
          : <g stroke={c} strokeWidth="1.6" fill="none"><ellipse cx="12" cy="5.5" rx="3" ry="4"/><ellipse cx="18.5" cy="12" rx="4" ry="3"/><ellipse cx="12" cy="18.5" rx="3" ry="4"/><ellipse cx="5.5" cy="12" rx="4" ry="3"/></g>
        }
      </svg>
    )},
    { id: 'record', label: '日历', icon: (c, on) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="3" stroke={c} strokeWidth="1.8"/>
        <rect x="7" y="2" width="2" height="4" rx="1" fill={c}/>
        <rect x="15" y="2" width="2" height="4" rx="1" fill={c}/>
        <path d="M3 9h18" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
        {on && <><circle cx="8" cy="14" r="1.5" fill={c}/><circle cx="12" cy="14" r="1.5" fill={c}/><circle cx="16" cy="14" r="1.5" fill={c}/></>}
        {!on && <><circle cx="8" cy="14" r="1.2" fill={c}/><circle cx="12" cy="14" r="1.2" fill={c}/><circle cx="16" cy="14" r="1.2" fill={c}/></>}
      </svg>
    )},
    { id: 'diary', label: '恋爱记', badge: !badgeDismissed, icon: (c, on) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {on
          ? <><path d="M5 3h10l4 4v14H5V3z" fill={c} opacity=".18"/><path d="M5 3h10l4 4v14H5V3z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 9h6M9 13h6M9 17h4" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></>
          : <><path d="M5 3h10l4 4v14H5V3z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 9h6M9 13h6M9 17h4" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></>
        }
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
          <div key={it.id} onClick={() => handleChange(it.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            flex: 1, color: c, fontSize: 10, fontWeight: on ? 600 : 400,
            cursor: 'pointer', minHeight: 44, justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{ position: 'relative' }}>
              {it.icon(c, on)}
              {it.badge && (
                <div style={{
                  position: 'absolute', top: -2, right: -3,
                  width: 7, height: 7, borderRadius: '50%',
                  background: MY.danger,
                  border: '1.5px solid #fff',
                }}/>
              )}
            </div>
            <span style={{ letterSpacing: 0 }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── 日记 Tab 屏（男友视角）── */
function BFDiaryTab({ onTabChange }) {
  const [scrolled, setScrolled] = React.useState(false);
  const TABBAR_H = 50 + 20; // BFTabBarNew height + bottom padding
  return (
    <Phone bg={MY.surface} statusDark={false}>
      {/* DiaryScreenInner 占满，底部为 tabbar 留空 */}
      <div style={{ position:'absolute', inset:0, bottom: TABBAR_H }}>
        <DiaryScreenInner onBack={()=>{}} onPublish={()=>{}} onScrollChange={setScrolled}
          authorKey='M' showFilter={false} hideNav={true}/>
      </div>

      {/* 顶栏 overlay：top:-44 覆盖状态栏区域，滚动后全部封底 */}
      <div style={{
        position:'absolute', top:-44, left:0, right:0, height:88, zIndex:20,
        pointerEvents:'none',
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '.5px solid rgba(0,0,0,0.08)' : 'none',
        transition:'background 0.2s ease',
      }}>
        {/* 状态栏高度占位 */}
        <div style={{ height:44 }}/>
        {/* 返回 + 更多按钮行 */}
        <div style={{
          height:44, display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 12px',
          pointerEvents:'auto',
        }}>
          {/* 返回已移除 — 一级导航页无需返回 */}
          <div style={{ width:36, height:36 }}/>
          {/* 更多 */}
          <div style={{ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="1.5" fill={scrolled ? '#323232' : 'rgba(255,255,255,0.92)'}/>
              <circle cx="12" cy="12" r="1.5" fill={scrolled ? '#323232' : 'rgba(255,255,255,0.92)'}/>
              <circle cx="19" cy="12" r="1.5" fill={scrolled ? '#323232' : 'rgba(255,255,255,0.92)'}/>
            </svg>
          </div>
        </div>
      </div>

      {/* 一级底部导航栏 */}
      <BFTabBarNew active="diary" onChange={onTabChange}/>
    </Phone>
  );
}

Object.assign(window, { BFHome, BFSecretDetail, BFDiary, BFRecord, CycleRing, SymptomIcon,
  Screen_BFMessages, Screen_BFChatDetail, BFTabBarNew, BFDiaryTab });

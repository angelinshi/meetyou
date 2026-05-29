// screens-invite.jsx — Screen 1-4 + 发布页
// 美柚设计规范：经期业务场景，品牌红 #ff4d88，8dp 网格，触控 ≥44px

// ─── 复用：周期 Hero 卡 ───────────────────────────────────────────
function PeriodHeroCard() {
  return (
    <div style={{
      margin: '0 16px', borderRadius: MY.rmd, padding: '16px 16px 14px',
      background: `linear-gradient(120deg, ${MY.brandRed} 0%, #ff80aa 55%, #ffafc8 100%)`,
      color: '#fff', position: 'relative', overflow: 'hidden',
      boxShadow: `0 6px 16px rgba(255,77,136,0.28)`,
    }}>
      {/* 主文案 */}
      <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: 0, lineHeight: '28px' }}>
        距月经开始还有 3 天
      </div>
      <div style={{ fontSize: 13, opacity: 0.92, marginTop: 4, lineHeight: '18px' }}>
        预测经期开始日 5月30日 ›
      </div>
      <div style={{
        display: 'inline-block', marginTop: 12, padding: '6px 16px',
        background: 'rgba(255,255,255,0.22)', borderRadius: MY.rpill,
        fontSize: 12, fontWeight: 500, letterSpacing: 0,
      }}>查看详情</div>

      {/* 怀孕几率 — 5 瓣花形 */}
      <div style={{ position: 'absolute', right: 14, top: 12, width: 84, height: 84 }}>
        <svg width="84" height="84" viewBox="0 0 84 84" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <radialGradient id="pg" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#fff"/>
              <stop offset="55%" stopColor="#ffd6e8"/>
              <stop offset="100%" stopColor="#ffafc8"/>
            </radialGradient>
          </defs>
          <g transform="translate(42 42)">
            {[0,72,144,216,288].map(d => (
              <ellipse key={d} cx="0" cy="-21" rx="15" ry="21"
                fill="url(#pg)" transform={`rotate(${d})`}/>
            ))}
            <circle r="20" fill="#ffe0ec"/>
          </g>
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontSize: 9, color: '#cc0066', fontWeight: 600, letterSpacing: 0 }}>今日怀孕几率</div>
          <div style={{ fontSize: 17, color: '#cc0066', fontWeight: 600, marginTop: 1 }}>4.1%</div>
        </div>
      </div>
    </div>
  );
}

// ─── 复用：月经来了引导条 ─────────────────────────────────────────
function PeriodTodayRow() {
  return (
    <div style={{
      margin: '8px 16px 0', padding: '0 16px',
      background: MY.surface, borderRadius: MY.rmd,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 56, boxShadow: MY.shadow1,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M12 2c3.5 4 6 7.2 6 11a6 6 0 1 1-12 0c0-3.8 2.5-7 6-11z" fill={MY.brandRed}/>
        </svg>
        <span style={{ fontSize: 15, fontWeight: 500, color: MY.textPri }}>月经来了</span>
      </div>
      <div style={{ display: 'flex' }}>
        <button style={{
          padding: '0 20px', height: 36, borderRadius: `${MY.rsm}px 0 0 ${MY.rsm}px`, border: 'none',
          background: '#ECEAEC', color: MY.textSec,
          fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: MY.font,
        }}>是</button>
        <button style={{
          padding: '0 20px', height: 36, borderRadius: `0 ${MY.rsm}px ${MY.rsm}px 0`, border: 'none',
          background: MY.brandRed, color: '#fff',
          fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: MY.font,
        }}>否</button>
      </div>
    </div>
  );
}

// ─── 复用：社区帖子流 ─────────────────────────────────────────────
function CommunityFeed() {
  return (
    <div style={{ margin: '8px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* 求助帖 */}
      <div style={{ background: MY.surface, borderRadius: MY.rmd, padding: '14px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Avatar size={32} bg="#C5B0E8" initial="柳"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: MY.textPri }}>柳安·小满</div>
            <div style={{ fontSize: 12, color: MY.textTer, marginTop: 1 }}>宝宝 3 个月</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="1.5" fill={MY.textTer}/>
            <circle cx="12" cy="12" r="1.5" fill={MY.textTer}/>
            <circle cx="19" cy="12" r="1.5" fill={MY.textTer}/>
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 10 }}>
          <span style={{
            flexShrink: 0, padding: '2px 8px', background: '#FFF0E8', color: '#D9663E',
            borderRadius: MY.rxs, fontSize: 11, fontWeight: 600, lineHeight: '18px',
          }}>求助</span>
          <div style={{ fontSize: 14, lineHeight: '22px', color: MY.textPri }}>
            孕 40 周，今天去产检，做 B 超时医生问我下面是不是流东西了？说羊水 80，问是不是羊水…
            <span style={{ color: MY.brandRed, marginLeft: 4 }}>全文</span>
          </div>
        </div>
        <ImgSlot h={88} label="产检照片" radius={MY.rsm}/>
        <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: MY.textTer }}>
          <span>♥ 1.1k</span>
          <span>💬 592</span>
        </div>
      </div>

      {/* 广告卡 */}
      <div style={{ background: MY.surface, borderRadius: MY.rmd, padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              padding: '2px 5px', background: '#E8232C', color: '#fff',
              fontSize: 9, fontWeight: 700, borderRadius: MY.rxs, letterSpacing: 0.3,
            }}>JD</div>
            <span style={{ fontSize: 14, fontWeight: 500, color: MY.textPri }}>京东正品</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path d="M6 6l12 12M6 18L18 6" stroke={MY.textTer} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 13, color: MY.textSec, marginBottom: 8 }}>上海一站式整装全包家装</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
          <ImgSlot h={72} label="样板房" radius={MY.rxs}/>
          <ImgSlot h={72} label="装修"   radius={MY.rxs}/>
          <ImgSlot h={72} label="案例"   radius={MY.rxs}/>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 1: 首页 · 未绑定 ──────────────────────────────────────
function Screen1Home({ onInviteClick, onDiary, onTabChange }) {
  return (
    <Phone bg={MY.bg}>
      <HomeTopBar/>
      <div style={{ position: 'absolute', inset: '44px 0 50px', overflowY: 'auto' }}>
        <div style={{ height: 8 }}/>
        <PeriodHeroCard/>
        <PeriodTodayRow/>

        {/* 邀请 Banner */}
        <div onClick={onInviteClick} style={{
          margin: '8px 16px 0', borderRadius: MY.rmd, padding: '16px',
          background: `linear-gradient(140deg, #fff5f8 0%, #ffe8f0 60%, #ffd6e6 100%)`,
          position: 'relative', overflow: 'hidden', cursor: 'pointer',
          boxShadow: MY.shadow1,
        }}>
          {/* 关闭 */}
          <div style={{
            position: 'absolute', top: 10, right: 10, width: 24, height: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: MY.textTer, cursor: 'pointer',
          }} onClick={e => e.stopPropagation()}>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 装饰小心形 */}
          <svg width="14" height="14" viewBox="0 0 24 24" style={{ position: 'absolute', top: 12, right: 76 }}>
            <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" fill="rgba(255,77,136,0.3)"/>
          </svg>
          <svg width="9" height="9" viewBox="0 0 24 24" style={{ position: 'absolute', top: 30, right: 100 }}>
            <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" fill="rgba(255,77,136,0.45)"/>
          </svg>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* 双头像 */}
            <div style={{ flexShrink: 0, position: 'relative', width: 72, height: 56 }}>
              <div style={{
                position: 'absolute', left: 0, top: 2,
                width: 44, height: 44, borderRadius: '50%',
                background: USER.bg, border: '2.5px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 18, fontWeight: 600,
                boxShadow: MY.shadow1,
              }}>女</div>
              <div style={{ position: 'absolute', right: 0, bottom: 0, border: '2.5px solid #fff', borderRadius: '50%' }}>
                <MalePlaceholder size={40}/>
              </div>
              {/* 心形徽章 */}
              <div style={{
                position: 'absolute', left: 26, top: 16, width: 18, height: 18, borderRadius: '50%',
                background: MY.brandRed, border: '2px solid #fff', zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24">
                  <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" fill="#fff"/>
                </svg>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: MY.textPri, lineHeight: '22px' }}>
                邀请男友关注你的经期
              </div>
              <div style={{ fontSize: 12, color: MY.textSec, marginTop: 4, lineHeight: '18px' }}>
                经期预测 · 每日症状 · 恋爱日记
              </div>
            </div>
          </div>

          <button style={{
            display: 'block', width: '100%', marginTop: 14,
            padding: '0', height: 44, borderRadius: MY.rpill, border: 'none',
            background: MY.brandRed, color: '#fff',
            fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: MY.font,
            boxShadow: `0 4px 12px rgba(255,77,136,0.35)`,
          }}>去邀请</button>
        </div>

        <CommunityFeed/>
      </div>
      <PostFAB/>
      <TabBar active="home" firstLabel="推荐" onChange={onTabChange}/>
    </Phone>
  );
}

// ─── Screen 2: 发送邀请 ────────────────────────────────────────────
function Screen2Invite({ onFaceToFace, onBack, onWeChatInvite }) {
  return (
    <Phone bg="#fff5f8">
      <TopBar title="发送邀请" right="常见问题" onBack={onBack}/>

      {/* 双头像 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: USER.bg, color: '#fff', fontSize: 36, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px solid #fff', boxShadow: MY.shadow2,
          }}>女</div>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', background: '#ffc1d6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 -8px', zIndex: 2,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" fill="#fff"/>
            </svg>
          </div>
          <div style={{ border: '3px solid #fff', borderRadius: '50%', boxShadow: MY.shadow2 }}>
            <MalePlaceholder size={90}/>
          </div>
        </div>

        <div style={{ fontSize: 21, fontWeight: 600, marginTop: 20, color: MY.textPri, letterSpacing: 0 }}>
          邀请男友关注你的经期
        </div>
        <div style={{ fontSize: 14, color: MY.textSec, marginTop: 8, lineHeight: '22px', textAlign: 'center' }}>
          帮助他更了解你<br/>共同记录恋爱日记
        </div>
      </div>

      {/* 按钮区 */}
      <div style={{ padding: '32px 24px 0' }}>
        <button onClick={onWeChatInvite} style={{
          display: 'flex', width: '100%', height: 44, borderRadius: MY.rpill, border: 'none',
          background: '#1AAD19', color: '#fff', alignItems: 'center', justifyContent: 'center',
          gap: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: MY.font,
          boxShadow: '0 4px 12px rgba(26,173,25,0.3)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M9 3C4.6 3 1 6 1 9.7c0 2 1 3.8 2.7 5L3 17l2.6-1.3c.9.3 1.9.4 2.9.4 0-3.3 3.4-6 7.5-6h.5C16 6.9 12.9 3 9 3zM5.5 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16 11.5c-3.6 0-6.5 2.3-6.5 5.2 0 1.6 1 3 2.4 4l-.5 1.8 2.1-1.1c.8.2 1.6.3 2.4.3 3.6 0 6.5-2.3 6.5-5.2 0-2.9-2.9-5-6.4-5z"/>
          </svg>
          微信邀请
        </button>

        <button onClick={onFaceToFace} style={{
          display: 'flex', width: '100%', height: 44, borderRadius: MY.rpill, border: 'none',
          background: MY.brandRed, color: '#fff', alignItems: 'center', justifyContent: 'center',
          gap: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: MY.font,
          marginTop: 12, boxShadow: `0 4px 12px rgba(255,77,136,0.32)`,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.8"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.8"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.8"/>
            <rect x="15" y="15" width="2" height="2" fill="#fff"/>
            <rect x="19" y="15" width="2" height="2" fill="#fff"/>
            <rect x="15" y="19" width="2" height="2" fill="#fff"/>
            <rect x="19" y="19" width="2" height="2" fill="#fff"/>
          </svg>
          面对面邀请
        </button>
      </div>

      {/* 亲友模式 3 卡 */}
      <div style={{ marginTop: 28, padding: '0 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: MY.textPri, marginBottom: 12 }}>亲友模式</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { t: '经期提醒',  s: '下次经期提前知',     from: '#ffe0ec', to: '#ffc3d6' },
            { t: '懂你状态',  s: '症状提醒不再踩雷',   from: '#f1e6fb', to: '#ddcaf0' },
            { t: '恋爱日记',  s: '一起记录甜蜜日常',   from: '#e0eeff', to: '#bfd4f5' },
          ].map((c, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: MY.rsm, minWidth: 0,
              background: `linear-gradient(180deg, ${c.from} 0%, ${c.to} 100%)`,
              padding: '12px 10px 10px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: MY.textPri, letterSpacing: 0 }}>{c.t}</div>
              <div style={{ fontSize: 11, color: MY.textSec, marginTop: 4, lineHeight: '15px' }}>{c.s}</div>
              <div style={{
                marginTop: 10, height: 80, borderRadius: MY.rxs,
                background: 'rgba(255,255,255,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: MY.textTer, fontFamily: 'ui-monospace,monospace',
              }}>预览图</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// ─── Screen 3: 我的二维码 ──────────────────────────────────────────
function Screen3QR({ onPair, onBack }) {
  const grid = React.useMemo(() => {
    const cells = [];
    for (let i = 0; i < 21 * 21; i++) cells.push(Math.random() > 0.5 ? 1 : 0);
    const corner = (x, y) => {
      for (let dy = 0; dy < 7; dy++) for (let dx = 0; dx < 7; dx++) {
        const b = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const c = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        cells[(y + dy) * 21 + (x + dx)] = (b || c) ? 1 : 0;
      }
    };
    corner(0, 0); corner(14, 0); corner(0, 14);
    return cells;
  }, []);

  return (
    <Phone bg="#fff5f8">
      <TopBar title="我的二维码" onBack={onBack}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16 }}>
        <div style={{ fontSize: 17, fontWeight: 500, color: MY.textPri }}>女友殿下</div>

        <div style={{
          marginTop: 20, width: 248, padding: 16, borderRadius: MY.rmd,
          background: MY.surface, border: `1.5px dashed ${MY.brandRed}`,
          boxShadow: MY.shadow2,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(21, 1fr)', gap: 1 }}>
            {grid.map((v, i) => (
              <div key={i} style={{ aspectRatio: '1/1', background: v ? MY.textPri : MY.surface }}/>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 14, padding: '6px 16px', borderRadius: MY.rpill,
          background: MY.brandSoft, color: MY.brandRed,
          fontSize: 13, fontWeight: 500,
        }}>让伴侣扫描二维码，绑定成为伴侣</div>
      </div>

      {/* 底部按钮 — 置底 */}
      <div style={{
        position: 'absolute', bottom: 40, left: 16, right: 16,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* DEMO 按钮 — 缩小至 1/4，右下角小按钮 */}
        <div onClick={onPair} style={{
          alignSelf: 'flex-end',
          padding: '5px 10px', borderRadius: MY.rsm,
          background: 'rgba(50,50,50,0.72)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: 6,
          cursor: 'pointer', fontFamily: MY.font,
          border: '1px dashed rgba(255,255,255,0.35)',
          fontSize: 10,
        }}>
          <span style={{
            padding: '1px 4px', background: '#FFD93D', color: '#2A1F23',
            borderRadius: 3, fontSize: 8, fontWeight: 800,
            fontFamily: 'ui-monospace,monospace',
          }}>DEMO</span>
          模拟扫码
          <svg width="10" height="10" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{
            flex: 1, height: 44, borderRadius: MY.rpill,
            border: `1px solid ${MY.line}`, background: MY.surface,
            color: MY.textPri, fontSize: 14, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            cursor: 'pointer', fontFamily: MY.font,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            保存到相册
          </button>
          <button style={{
            flex: 1, height: 44, borderRadius: MY.rpill, border: 'none',
            background: '#1AAD19', color: '#fff', fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            cursor: 'pointer', fontFamily: MY.font,
            boxShadow: '0 4px 12px rgba(26,173,25,0.28)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <path d="M9 3C4.6 3 1 6 1 9.7c0 2 1 3.8 2.7 5L3 17l2.6-1.3c.9.3 1.9.4 2.9.4 0-3.3 3.4-6 7.5-6h.5C16 6.9 12.9 3 9 3z"/>
            </svg>
            分享到微信
          </button>
        </div>
      </div>
    </Phone>
  );
}

// ─── Screen 4: 首页 · 已绑定 ──────────────────────────────────────
function Screen4HomePaired({ onViewAll, onTabChange }) {
  return (
    <Phone bg={MY.bg}>
      <HomeTopBar/>
      <div style={{ position: 'absolute', inset: '44px 0 50px', overflowY: 'auto' }}>
        <div style={{ height: 8 }}/>
        <PeriodHeroCard/>
        <PeriodTodayRow/>

        {/* 恋爱日记模块 */}
        {/* 恋爱日记模块 */}
        <div style={{ margin: '8px 16px 0' }}>
          <DiaryHomeModule onViewAll={onViewAll}/>
        </div>

        <CommunityFeed/>
      </div>
      <PostFAB/>
      <TabBar active="home" firstLabel="推荐" onChange={onTabChange}/>
    </Phone>
  );
}

// ═══════════════════════════════════════════════════════════════════
// NEW SCREENS
// ═══════════════════════════════════════════════════════════════════

// ─── 女生记录页（含邀请 banner）— Flow A 第 2 张 ──────────────────
function Screen_RecordInvite({ onInviteClick }) {
  const weeks = ['日','一','二','三','四','五','六'];
  const startDow = 4; // May 2026 starts on Thursday(4) - actually Friday 5? Let me use Friday
  const daysInMonth = 31;
  const cells = [];
  for (let i = 0; i < 5; i++) cells.push(null); // May 1 is Thursday, 0-indexed: Fri=5 but let's match screenshot (1,2 on right)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const dayStyle = (d) => {
    if (!d) return {};
    if ([1,2,3,4,5].includes(d)) return { bg: MY.brandRed, color: '#fff', bold: true };
    if ([29,30,31].includes(d)) return { bg: '#FFD6DF', color: MY.textPri };
    if (d >= 10 && d <= 16) return { color: '#9B6FC8' };
    if (d === 28) return { border: `1.5px solid ${MY.brandRed}` };
    return {};
  };

  const recordItems = [
    { icon: '🩸', label: '月经来了', right: <div style={{ display:'flex', gap: 6 }}>
        <button style={{ padding:'5px 16px', borderRadius:'12px 0 0 12px', border:'none',
          background:'#EEEBEC', color:MY.textSec, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:MY.font }}>是</button>
        <button style={{ padding:'5px 16px', borderRadius:'0 12px 12px 0', border:'none',
          background:MY.brandRed, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:MY.font }}>否</button>
      </div> },
    { icon: '💗', label: '爱爱', right: <span style={{color:MY.brandRed}}>避孕套 <span style={{color:MY.brandRed,fontSize:16}}>⊕</span></span> },
    { icon: '🩺', label: '症状', right: <span style={{color:MY.brandRed}}>头痛、皮肤干燥</span> },
    { icon: '😊', label: '心情', right: <span>😖😐😶😶🙂 <span style={{color:MY.brandRed,fontSize:16}}>⊕</span></span> },
    { icon: '💧', label: '白带', right: <span style={{color:MY.textSec}}>粘稠</span> },
    { icon: '🌡', label: '体温', right: <span style={{color:MY.textSec}}>36.5℃</span> },
    { icon: '⚖️', label: '体重', right: <span style={{color:MY.brandRed}}>50.50公斤 <span style={{color:MY.brandRed,fontSize:16}}>⊕</span></span> },
    { icon: '📓', label: '日记', right: <span style={{color:MY.textTer}}>📷 &gt;</span> },
    { icon: '👍', label: '好习惯', right: <span>⚡🍎☕🎾</span> },
    { icon: '🚽', label: '便便', right: <span style={{color:MY.textSec}}>1次 <span style={{color:MY.brandRed,fontSize:16}}>⊕</span></span> },
    { icon: '💊', label: '营养补充', right: <span style={{color:MY.brandRed}}>叶酸片、钙片、铁剂</span> },
    { icon: '📋', label: '计划', right: <span style={{color:MY.brandRed,fontSize:16}}>⊕</span> },
  ];

  return (
    <Phone bg={MY.surface}>
      {/* 顶部 tab 行 */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '6px 12px 0', borderBottom: `1px solid ${MY.line}`,
        background: MY.surface,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
          <path d="M15 5l-7 7 7 7" stroke={MY.textSec} strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
        <span style={{ fontSize: 15, color: MY.textSec, marginRight: 8 }}>5月</span>
        {['经期','备孕','怀孕','育儿'].map((t,i) => (
          <div key={t} style={{
            padding: '8px 10px', fontSize: 14,
            fontWeight: i===0 ? 700 : 400,
            color: i===0 ? MY.brandRed : MY.textSec,
            borderBottom: i===0 ? `2px solid ${MY.brandRed}` : 'none',
            marginBottom: i===0 ? -1 : 0,
          }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display:'flex', alignItems:'center', gap:2, color:MY.textSec, fontSize:12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          分析
        </div>
      </div>

      <div style={{ position:'absolute', inset:'80px 0 50px', overflowY:'auto' }}>
        {/* 星期 */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', padding:'6px 0 2px' }}>
          {weeks.map(w => (
            <div key={w} style={{ textAlign:'center', fontSize:12.5, color:MY.textTer }}>{w}</div>
          ))}
        </div>
        {/* 日历 */}
        <div style={{ padding:'0 4px' }}>
          {rows.map((row,ri) => (
            <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px 0' }}>
              {Array.from({length:7}).map((_,ci) => {
                const d = row[ci] || null;
                const s = dayStyle(d);
                return (
                  <div key={ci} style={{ textAlign:'center', padding:'2px 1px 4px', position:'relative' }}>
                    {d && (
                      <>
                        {d===5 && <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',fontSize:8,color:'#F5A623'}}>▶</div>}
                        {d===16 && <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',fontSize:9}}>💜</div>}
                        {d===28 && <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',fontSize:8,color:MY.brandRed}}>♡</div>}
                        <div style={{
                          display:'inline-flex', alignItems:'center', justifyContent:'center',
                          width:32, height:32, borderRadius:6,
                          background: s.bg || 'transparent',
                          border: s.border || 'none',
                          color: s.color || MY.textPri,
                          fontSize: 14, fontWeight: s.bold ? 700 : 400,
                          marginTop: (d===5||d===16||d===28) ? 10 : 2,
                        }}>{d}</div>
                        {d===28 && <div style={{fontSize:9,color:'#F5C842',textAlign:'center'}}>✏</div>}
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
          display:'flex', alignItems:'center', gap:10,
          padding:'6px 12px 8px', borderTop:`1px solid ${MY.line}`,
          fontSize:10.5, color:MY.textSec,
        }}>
          {[
            {color:'#FF4D88',label:'月经期',rect:true},
            {color:'#FFD0DC',label:'预测经期',rect:true},
            {color:'#9B6FC8',label:'排卵期',rect:false},
            {label:'排卵日',flower:true},
          ].map((l,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:3}}>
              {l.flower ? <span style={{fontSize:10}}>💜</span>
                : l.rect
                  ? <div style={{width:9,height:9,borderRadius:2,background:l.color,flexShrink:0}}/>
                  : <div style={{width:9,height:9,borderRadius:'50%',background:'transparent',border:`1.5px solid ${l.color}`,flexShrink:0}}/>
              }
              {l.label}
            </div>
          ))}
          <svg width="8" height="12" viewBox="0 0 8 14" style={{marginLeft:'auto'}}>
            <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* 邀请 Banner */}
        <div onClick={onInviteClick} style={{
          margin:'0 12px 4px', padding:'12px 14px',
          background:MY.surface, borderRadius:MY.rsm,
          display:'flex', alignItems:'center', gap:10, cursor:'pointer',
          border:`1px solid ${MY.line}`,
        }}>
          <div style={{
            width:36, height:36, borderRadius:MY.rsm,
            background:'linear-gradient(135deg,#FF80AA,#FF4D88)',
            display:'flex', alignItems:'center', justifyContent:'center',
            flexShrink:0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 5h18M3 10h8M3 15h5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="18" cy="15" r="5" stroke="#fff" strokeWidth="2"/>
              <path d="M15.5 15h5M18 12.5v5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:700, color:MY.textPri }}>邀请男友关注你的经期</div>
            <div style={{ fontSize:11.5, color:MY.textTer, marginTop:2 }}>经期预测 · 每日症状 · 恋爱日记</div>
          </div>
          <div style={{
            padding:'6px 12px', borderRadius:MY.rpill, background:MY.brandSoft,
            color:MY.brandRed, fontSize:12.5, fontWeight:600, flexShrink:0,
          }}>去邀请</div>
        </div>

        {/* 记录列表 */}
        <div style={{ background:MY.surface, paddingTop:4 }}>
          {recordItems.map((item,i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', padding:'0 16px', height:52,
              borderBottom: i < recordItems.length-1 ? `1px solid ${MY.line}` : 'none',
            }}>
              <span style={{ fontSize:20, marginRight:12, flexShrink:0 }}>{item.icon}</span>
              <span style={{ flex:1, fontSize:15, fontWeight:500, color:MY.textPri }}>{item.label}</span>
              <div style={{ fontSize:14 }}>{item.right}</div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="record" firstLabel="美柚"/>
    </Phone>
  );
}

// ─── 微信内置浏览器顶栏 ───────────────────────────────────────────
function WCBrowserBar() {
  return (
    <div style={{
      background: '#fff', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '6px 14px',
      height: 48, borderBottom: '1px solid rgba(0,0,0,0.08)',
      flexShrink: 0,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#3C3C3C" strokeWidth="2.2" strokeLinecap="round"/></svg>
      </div>
      <div style={{ flex: 1, textAlign: 'center', lineHeight: 1.2, padding: '0 12px' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1F1F1F' }}>美柚</div>
        <div style={{ fontSize: 11, color: '#999', marginTop: 1 }}>link.xnmeiyou.com</div>
      </div>
      <div style={{ display: 'flex', gap: 14, flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#3C3C3C" strokeWidth="1.8"/>
          <path d="M17 17l4 4" stroke="#3C3C3C" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="1.6" fill="#3C3C3C"/>
          <circle cx="12" cy="12" r="1.6" fill="#3C3C3C"/>
          <circle cx="19" cy="12" r="1.6" fill="#3C3C3C"/>
        </svg>
      </div>
    </div>
  );
}

// ─── 微信聊天页 ────────────────────────────────────────────────────
function Screen_WeChatMsg({ onOpenLink }) {
  return (
    <Phone bg="#EDEDED">
      {/* 微信顶栏 */}
      <div style={{
        background: '#EBE9E9', display: 'flex', alignItems: 'center',
        padding: '6px 14px', height: 44, gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#1AAD19', fontSize: 13 }}>
          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" stroke="#1AAD19" strokeWidth="2.2" strokeLinecap="round" fill="none"/></svg>
          <span>11</span>
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 500, color: '#1F1F1F' }}>女友殿下</div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="5" cy="12" r="1.6" fill="#3C3C3C"/>
          <circle cx="12" cy="12" r="1.6" fill="#3C3C3C"/>
          <circle cx="19" cy="12" r="1.6" fill="#3C3C3C"/>
        </svg>
      </div>

      <div style={{ position: 'absolute', inset: '44px 0 60px', overflowY: 'auto', padding: '20px 12px' }}>
        {/* 时间戳 */}
        <div style={{ textAlign: 'center', fontSize: 11.5, color: '#999', marginBottom: 16 }}>14:07</div>

        {/* 女生发出的消息气泡 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg,#FFB5C8,#FF7898)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 16, fontWeight: 700,
          }}>女</div>
          <div style={{ maxWidth: '74%' }}>
            {/* 链接卡 — 微信分享链接样式：左文右图 */}
            <div onClick={onOpenLink} style={{
              background: '#fff', borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
              border: '1px solid rgba(0,0,0,0.06)',
              width: 240, padding: '10px 10px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              {/* 左侧文字 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1F1F1F', lineHeight: '18px', marginBottom: 6 }}>
                  点这里 👆邀请你成为美柚伴侣
                </div>
                <div style={{ fontSize: 12, color: '#888', lineHeight: '17px' }}>
                  开启经期陪伴模式，了解我的周期规律！
                </div>
              </div>
              {/* 右侧头像缩略图 */}
              <div style={{
                width: 48, height: 48, borderRadius: 6, flexShrink: 0,
                background: 'linear-gradient(135deg,#FFB5C8,#FF7898)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 18, fontWeight: 700,
              }}>女</div>
            </div>
          </div>
        </div>
      </div>

      {/* 微信输入栏 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
        background: '#F5F5F5', borderTop: '1px solid #E0E0E0',
        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 10,
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#999" strokeWidth="1.6"/>
          <path d="M8 13s1.5 2 4 2 4-2 4-2" stroke="#999" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          <circle cx="9.5" cy="10.5" r="0.8" fill="#999"/>
          <circle cx="14.5" cy="10.5" r="0.8" fill="#999"/>
        </svg>
        <div style={{ flex: 1, height: 34, background: '#fff', borderRadius: 4,
          border: '1px solid #E0E0E0' }}/>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#999" strokeWidth="1.6"/>
          <path d="M9 12h6M12 9v6" stroke="#999" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
    </Phone>
  );
}

// ─── 邀请 H5 页（微信内置浏览器视图）────────────────────────────
function Screen_InviteH5({ onAccept }) {
  const [phone, setPhone] = React.useState('');
  return (
    <Phone bg="#F2F2F7">
      <WCBrowserBar/>
      <div style={{
        position: 'absolute', inset: '48px 0 0',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '48px 28px 24px', background: '#fff',
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,200,210,0.35) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(255,220,180,0.25) 0%, transparent 55%)',
      }}>
        {/* 女生头像 */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg,#F0E0E0,#D8C0C0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, color: '#8A7070',
          boxShadow: '0 4px 14px rgba(0,0,0,0.10)',
        }}>女</div>

        <div style={{ fontSize: 20, fontWeight: 800, color: MY.textPri, marginTop: 22, letterSpacing: -0.3, textAlign: 'center' }}>
          邀请你成为我的美柚伴侣
        </div>
        <div style={{ fontSize: 13.5, color: MY.textSec, marginTop: 8, textAlign: 'center', lineHeight: '20px' }}>
          查收专属我们的经期陪伴攻略
        </div>

        {/* 手机号输入 */}
        <div style={{ width: '100%', marginTop: 36 }}>
          <input
            type="tel" placeholder="输入你的手机号，接受邀请"
            value={phone} onChange={e => setPhone(e.target.value)}
            style={{
              width: '100%', height: 50, borderRadius: 25,
              border: `1.5px solid ${phone ? MY.brandRed : MY.line}`,
              padding: '0 20px', fontSize: 15, color: MY.textPri,
              outline: 'none', background: '#F8F8F8', fontFamily: MY.font,
              textAlign: 'center',
            }}
          />
        </div>

        <button onClick={() => { setPhone('18700001122'); setTimeout(onAccept, 300); }} style={{
          width: '100%', height: 50, borderRadius: 25, border: 'none', marginTop: 16,
          background: MY.brandRed,
          color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
          fontFamily: MY.font, letterSpacing: 1,
          boxShadow: '0 6px 16px rgba(255,77,136,0.35)',
        }}>接受邀请</button>

        <div style={{ marginTop: 'auto', fontSize: 12, color: MY.textTer }}>
          邀请链接在6月1日前有效
        </div>
      </div>
    </Phone>
  );
}

// ─── 接受成功页（微信内置浏览器视图）────────────────────────────
function Screen_AcceptSuccess({ onOpen }) {
  return (
    <Phone bg="#F2F2F7">
      <WCBrowserBar/>
      <div style={{
        position: 'absolute', inset: '48px 0 0',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '60px 28px 24px', background: '#fff',
      }}>
        {/* 绿色 ✓ */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: '#07C160',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(7,193,96,0.3)',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, color: MY.textPri, marginTop: 24, letterSpacing: -0.3 }}>
          已成功接受邀请
        </div>
        <div style={{ fontSize: 14, color: MY.textSec, marginTop: 10, lineHeight: '22px', textAlign: 'center' }}>
          用 <b style={{ color: MY.textPri }}>手机号</b> 登录美柚，就能关注伴侣
        </div>

        <button onClick={onOpen} style={{
          width: '100%', height: 50, borderRadius: 25, border: 'none', marginTop: 48,
          background: MY.brandRed, color: '#fff', fontSize: 16, fontWeight: 700,
          cursor: 'pointer', fontFamily: MY.font, letterSpacing: 1,
          boxShadow: '0 6px 16px rgba(255,77,136,0.35)',
        }}>打开美柚</button>

        <div style={{ marginTop: 'auto', fontSize: 11, color: MY.textTer, textAlign: 'center', lineHeight: '18px' }}>
          美柚 版本：8.86.0.0 · 更新时间：2025.2.27<br/>
          产品介绍 | 应用权限 | 隐私政策<br/>
          开发者：厦门美柚股份有限公司 · 备案号：闽ICP备13020990号-5
        </div>
      </div>
    </Phone>
  );
}

// ─── 请选择模式（App Store 内） ────────────────────────────────────
function Screen_ModeSelect({ onInvited }) {
  const modes = [
    { color:'#FF4D88', bg:'#FFE8F0', icon:'🌸', title:'经期', sub:'经期管理、智能预测、健康分析' },
    { color:'#9B6FC8', bg:'#F0E8FB', icon:'🌱', title:'备孕', sub:'怀孕几率、排卵预测、爱爱建议' },
    { color:'#FF8A65', bg:'#FFF3E0', icon:'🤱', title:'怀孕', sub:'胎儿每日变化、食物能不能吃' },
    { color:'#4FC3F7', bg:'#E3F6FC', icon:'👶', title:'育儿', sub:'宝宝成长相册、育儿知识、经期预测' },
    { color:'#78909C', bg:'#ECEFF1', icon:'📩', title:'我是被邀请的', sub:null },
  ];

  return (
    <Phone bg="#F2F2F7">
      {/* App Store 顶栏 */}
      <div style={{
        background:'#F2F2F7', display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'8px 14px', height:44,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:3, color:'#007AFF', fontSize:13, cursor:'pointer' }}>
          <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke="#007AFF" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
          App Store
        </div>
        <div style={{ fontSize:16, fontWeight:700, color:'#1F1F1F' }}>请选择模式</div>
        <div style={{ width:60 }}/>
      </div>

      <div style={{ position:'absolute', inset:'44px 0 0', overflowY:'auto', padding:'12px 16px' }}>
        {modes.map((m, i) => (
          <div key={i} onClick={i===4 ? onInvited : undefined} style={{
            background:'#fff', borderRadius:14, padding:'14px 16px',
            display:'flex', alignItems:'center', gap:14,
            marginBottom: i === 3 ? 20 : 10,
            cursor: i===4 ? 'pointer' : 'default',
            boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              width:54, height:54, borderRadius:12, background:m.bg,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:24, flexShrink:0,
            }}>{m.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:16, fontWeight:700, color:MY.textPri }}>{m.title}</div>
              {m.sub && <div style={{ fontSize:12.5, color:MY.textSec, marginTop:3 }}>{m.sub}</div>}
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14">
              <path d="M1 1l6 6-6 6" stroke="#C0BEC0" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        ))}
        <div style={{ textAlign:'center', fontSize:12, color:MY.brandRed, padding:'6px 0 16px', cursor:'pointer' }}>
          已有账号，立即登录
        </div>
      </div>
    </Phone>
  );
}

// ─── 欢迎登录美柚 ─────────────────────────────────────────────────
function Screen_LoginPhone({ onLogin }) {
  return (
    <Phone bg="#F2F2F7">
      {/* App Store 顶栏 */}
      <div style={{
        background:'#F2F2F7', display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'8px 14px', height:44,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:3, color:'#007AFF', fontSize:13, cursor:'pointer' }}>
          <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke="#007AFF" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
          App Store
        </div>
        <div style={{ fontSize:16, fontWeight:600, color:'#1F1F1F' }}>遇到问题</div>
        <div style={{ width:60 }}/>
      </div>

      <div style={{
        position:'absolute', inset:'44px 0 0',
        background:'#fff', padding:'28px 24px 24px',
        display:'flex', flexDirection:'column',
      }}>
        {/* 关闭 + 标题 */}
        <div style={{ display:'flex', alignItems:'center', marginBottom:28 }}>
          <div style={{ width:30, height:30, borderRadius:'50%', background:'#EEEBEC',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <svg width="12" height="12" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke={MY.textPri} strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div style={{ flex:1, textAlign:'center', fontSize:18, fontWeight:800, color:MY.textPri, letterSpacing:-0.3 }}>
            欢迎登录美柚
          </div>
          <div style={{ width:30 }}/>
        </div>

        {/* 一键登录区 */}
        <div style={{
          padding:'16px 14px', borderRadius:12,
          border:`1px solid ${MY.line}`, background:'#FAFAFA', marginBottom:16,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{
              width:34, height:34, borderRadius:6,
              background:'linear-gradient(135deg,#20A553,#0AA045)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="4" height="12" rx="1" fill="#fff"/>
                <rect x="10" y="3" width="4" height="16" rx="1" fill="#fff"/>
                <rect x="17" y="9" width="4" height="10" rx="1" fill="#fff"/>
              </svg>
            </div>
            <div style={{ flex:1, fontSize:13, color:MY.textSec }}>中国移动认证</div>
          </div>
          <div style={{ marginTop:12, fontSize:16, fontWeight:600, color:MY.textPri }}>
            +86 187****9122
          </div>
          <div style={{ marginTop:4, fontSize:12, color:MY.brandRed, textAlign:'right', cursor:'pointer' }}>更改号码</div>
        </div>

        <button onClick={onLogin} style={{
          width:'100%', height:50, borderRadius:25, border:'none',
          background:MY.brandRed, color:'#fff', fontSize:16, fontWeight:700,
          cursor:'pointer', fontFamily:MY.font, letterSpacing:1,
          boxShadow:'0 6px 16px rgba(255,77,136,0.35)',
        }}>本机号码一键登录</button>

        <div style={{ fontSize:11, color:MY.textTer, marginTop:10, textAlign:'center', lineHeight:'17px' }}>
          我已阅读并同意 美柚用户服务协议、隐私政策 与 中国移动认证服务条款
        </div>

        {/* 社交登录 */}
        <div style={{ marginTop:'auto', display:'flex', justifyContent:'center', gap:20, paddingBottom:16 }}>
          {[
            { bg:'#1AAD19', label:'微信' },
            { bg:'#0055FF', label:'QQ' },
            { bg:'#FF6B35', label:'微博' },
            { bg:'#FF4444', label:'邮件' },
            { bg:'#000000', label:'苹果' },
            { bg:'#FF4D88', label:'美柚认证' },
          ].map((s, i) => (
            <div key={i} style={{
              width:40, height:40, borderRadius:'50%', background:s.bg,
              display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
            }}>
              <span style={{ fontSize:10, color:'#fff', fontWeight:600 }}>{s.label[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { Screen1Home, Screen2Invite, Screen3QR, Screen4HomePaired,
  Screen_RecordInvite, Screen_WeChatMsg, Screen_InviteH5, WCBrowserBar,
  Screen_AcceptSuccess, Screen_ModeSelect, Screen_LoginPhone });

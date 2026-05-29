// screens-me.jsx — Screen 5-9
// 美柚设计规范：8dp 网格，触控 ≥44px，字阶按规范

// ─── Screen 5: 恋爱日记 · 全部记录 ──────────────────────────────
function Screen5DiaryAll({ onPublish }) {
  const days = [
    {
      date: '今天', sub: '在一起 102 天',
      messages: [
        { who: 'F', text: '今天和你一起走完雁荡山，下山的时候我腿都软了 😂 但是真的好有成就感！', photos: ['合照','奶茶','夕阳'] },
        { who: 'M', text: '辛苦你了，明早我去买点早餐让你睡个懒觉。下次我们一起去麦理浩径吧！' },
      ],
    },
    {
      date: '5月26日', sub: '在一起 100 天',
      messages: [
        { who: 'M', text: '宝贝，最近肚子是不是有点不舒服？我看你今天扶了好几次腰。记得早睡。' },
        { who: 'F', text: '没事啦，就是经期前几天，明天好好休息就行。谢谢你这么细心 ❤︎' },
      ],
    },
    {
      date: '5月23日', sub: '在一起 97 天',
      messages: [
        { who: 'F', text: '你送我的玫瑰真的好惊喜，第一次有人这样认真挑花给我。', photos: ['玫瑰','花瓶'] },
        { who: 'M', text: '你笑的样子比花还好看。下次纪念日我再带你去一次。' },
      ],
    },
    {
      date: '5月20日', sub: '在一起 94 天',
      messages: [
        { who: 'F', text: '今天痛经痛了一整天 😭 一动也不想动。' },
        { who: 'M', text: '已经给你煮好红糖姜茶放保温杯里了，下班接你。', photos: ['热饮'] },
      ],
    },
  ];

  return (
    <Phone bg={MY.bg} statusDark>
      {/* ── Hero 图片区（固定高度，硬切底部）── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 210, overflow: 'hidden' }}>
        {/* 图片占位 — 粉色渐变模拟照片 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #ffd3dd 0%, #f5a8b8 50%, #e8809a 100%)',
        }}/>
        {/* 柔光装饰 */}
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 180, height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.38) 0%, transparent 65%)',
        }}/>
        {/* 爱心装饰 */}
        {[{s:14,t:60,l:48},{s:9,t:85,l:80},{s:12,t:75,r:56}].map((h,i)=>(
          <svg key={i} width={h.s} height={h.s} viewBox="0 0 24 24"
            style={{ position: 'absolute', top: h.t, left: h.l, right: h.r }}>
            <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" fill="rgba(255,255,255,0.55)"/>
          </svg>
        ))}

        {/* 返回按钮 */}
        <div style={{ position: 'absolute', top: 8, left: 12,
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* 情侣身份卡 — 叠在 hero 底部 */}
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
            }}>女</div>
            <div style={{
              position: 'absolute', right: 0, bottom: 0, width: 48, height: 48,
              borderRadius: '50%', background: PARTNER.bg, color: '#fff',
              fontSize: 18, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2.5px solid #fff', boxShadow: MY.shadow1,
            }}>男</div>
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

      {/* ── 内容区（灰底，从 hero 下方开始，无渐变过渡）── */}
      <div style={{
        position: 'absolute', top: 210, left: 0, right: 0, bottom: 0,
        background: MY.surface, overflowY: 'auto',
        padding: '12px 16px 80px',
      }}>
        <DiaryFullTimeline/>
      </div>

      {/* + FAB */}
      <div onClick={onPublish} style={{
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

// 单日日记卡：第一条是正文帖，其余是评论气泡
function DiaryDayCard({ day }) {
  const post = day.messages[0];
  const comments = day.messages.slice(1);
  const postIsF = post.who === 'F';
  const postWho = postIsF ? USER : PARTNER;
  const postName = postIsF ? '女友殿下' : '男友先生';
  const postTime = post.time || '21:42';

  return (
    <div style={{ background: MY.surface, borderRadius: MY.rmd, boxShadow: MY.shadow1, overflow: 'hidden' }}>
      {/* ── 正文区 ── */}
      <div style={{ padding: '12px 14px 10px' }}>
        {post.photos && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(post.photos.length, 3)}, 1fr)`,
            gap: 3, marginBottom: 8,
          }}>
            {post.photos.map((p, i) => <ImgSlot key={i} h={90} label={p} radius={MY.rxs}/>)}
          </div>
        )}
        <div style={{ fontSize: 14, lineHeight: '22px', color: MY.textPri }}>{post.text}</div>
        {/* 发帖人 + 操作栏 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginTop: 10, paddingTop: 8, borderTop: `1px solid ${MY.line}`,
        }}>
          <Avatar size={20} bg={postWho.bg} initial={postWho.initial}/>
          <span style={{ fontSize: 12, color: MY.textTer, flex: 1 }}>{postName} · {postTime}</span>
          <span style={{ fontSize: 12, color: MY.textTer, cursor: 'pointer' }}>🤍 赞</span>
          <span style={{ fontSize: 12, color: MY.textTer, marginLeft: 12, cursor: 'pointer' }}>💬 评论</span>
        </div>
      </div>

      {/* ── 评论区（灰底，与主页一致：无头像，纯文字行）── */}
      {comments.length > 0 && (
        <div style={{ background: MY.bg, padding: '8px 14px 10px', borderTop: `1px solid ${MY.line}` }}>
          {comments.map((c, ci) => {
            const isF = c.who === 'F';
            const name = isF ? '女友殿下' : '男友先生';
            const nameColor = isF ? MY.brandRed : MY.link;
            return (
              <div key={ci} style={{
                fontSize: 13, lineHeight: '20px', color: MY.textPri,
                marginBottom: ci < comments.length - 1 ? 6 : 0,
              }}>
                <span style={{ fontWeight: 600, color: nameColor, marginRight: 4 }}>{name}：</span>
                {c.photos && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(c.photos.length, 3)}, 1fr)`,
                    gap: 3, margin: '4px 0',
                  }}>
                    {c.photos.map((p, i) => <ImgSlot key={i} h={56} label={p} radius={MY.rxs}/>)}
                  </div>
                )}
                {c.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Screen 6: 我的页面 ────────────────────────────────────────────
function Screen6Me({ onAvatarClick, onProfileClick, onTabChange }) {
  return (
    <Phone bg={MY.bg}>
      <div style={{ position: 'absolute', inset: '36px 0 50px', overflowY: 'auto' }}>
        {/* 顶部行 */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px 8px', background: MY.surface }}>
          <div onClick={onAvatarClick} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, cursor: 'pointer', minHeight: 44 }}>
            <div style={{ position: 'relative', width: 52, height: 30 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 30, height: 30, borderRadius: '50%', border: '2px solid #fff', overflow: 'hidden' }}>
                <Avatar size={26} bg={USER.bg} initial={USER.initial}/>
              </div>
              <div style={{ position: 'absolute', right: 0, top: 0, width: 30, height: 30, borderRadius: '50%', border: '2px solid #fff', overflow: 'hidden', zIndex: 2 }}>
                <Avatar size={26} bg={PARTNER.bg} initial={PARTNER.initial}/>
              </div>
              <div style={{
                position: 'absolute', right: 0, bottom: -1, width: 8, height: 8,
                borderRadius: '50%', background: MY.brandRed, border: '1.5px solid #fff', zIndex: 3,
              }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 15, fontWeight: 500, color: MY.textPri }}>
              女友殿下
              <svg width="12" height="12" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke={MY.textSec} strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: MY.textPri }}>
            {[
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="3" rx="1" stroke="currentColor" strokeWidth="1.6"/><path d="M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.6"/></svg>,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 8h16v3H4z" stroke="currentColor" strokeWidth="1.6"/><path d="M5 11v9h14v-9M12 8v12M9 8c0-2 1-3.5 3-3.5s3 1.5 3 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
              <div style={{ position: 'relative' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 7l2-3h4l2 3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="13.5" r="3.5" stroke="currentColor" strokeWidth="1.6"/></svg>
                <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: MY.brandRed, border: '1.5px solid #fff' }}/>
              </div>
            ].map((ic, i) => <div key={i}>{ic}</div>)}
          </div>
        </div>

        {/* 会员卡 */}
        <div style={{ margin: '8px 16px 0', borderRadius: MY.rmd, background: 'linear-gradient(180deg, #ffe2d6 0%, #ffc8b5 100%)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px 8px' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#7A3B1C' }}>美柚会员</div>
              <div style={{ fontSize: 12, color: '#A86541', marginTop: 1 }}>开通享 12 项权益</div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, right: 6, padding: '1px 5px', background: MY.brandRed, color: '#fff', fontSize: 9, fontWeight: 600, borderRadius: `${MY.rxs}px ${MY.rxs}px ${MY.rxs}px 0` }}>限时首月9元</div>
              <button style={{ padding: '0 14px', height: 32, borderRadius: MY.rpill, border: 'none', background: '#fff', color: '#9C4519', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: MY.font }}>立即开通</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, padding: '2px 10px 10px' }}>
            {[
              { t: '月经推迟分析', s: '你的专属分析已更新', link: '立即查看 ›' },
              { t: '买年卡送好礼', s: '免费送价值 500 元爱康体检 ›' },
            ].map((c, i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.55)', borderRadius: MY.rsm, padding: '8px 10px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#7A3B1C' }}>{c.t}</div>
                <div style={{ fontSize: 11, color: '#A86541', marginTop: 2 }}>
                  {c.s}{c.link && <span style={{ color: MY.brandRed, fontWeight: 500 }}> {c.link}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 学生特惠 */}
        <div style={{ margin: '8px 16px 0', padding: '0 14px', background: MY.surface, borderRadius: MY.rsm, display: 'flex', alignItems: 'center', gap: 8, height: 44 }}>
          <span style={{ padding: '2px 6px', background: MY.brandSoft, color: MY.brandRed, borderRadius: MY.rxs, fontSize: 11, fontWeight: 600 }}>学生特惠</span>
          <span style={{ flex: 1, fontSize: 13, color: MY.textPri }}>前 6 个月 <b style={{ color: MY.brandRed }}>6.8 元/月</b></span>
          <span style={{ fontSize: 12, color: MY.textTer, display: 'flex', alignItems: 'center', gap: 2 }}>去看看<svg width="9" height="9" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke={MY.textTer} strokeWidth="2.4" strokeLinecap="round" fill="none"/></svg></span>
        </div>

        {/* 4 模式 */}
        <div style={{ margin: '8px 16px 0', padding: '12px 4px 4px', background: MY.surface, borderRadius: MY.rmd }}>
          <div style={{ display: 'flex' }}>
            {[
              { t: '经期模式', active: true,  grad: 'linear-gradient(180deg,rgba(255,77,136,0.15),rgba(255,77,136,0.08))' },
              { t: '备孕模式', active: false, grad: `linear-gradient(180deg,${MY.bg},#e5e3e5)` },
              { t: '怀孕模式', active: false, grad: `linear-gradient(180deg,${MY.bg},#e5e3e5)` },
              { t: '育儿模式', active: false, grad: `linear-gradient(180deg,${MY.bg},#e5e3e5)` },
            ].map((m, i) => (
              <div key={i} style={{ flex: 1, padding: '0 4px 10px', textAlign: 'center' }}>
                <div style={{
                  width: '100%', aspectRatio: '1/1', borderRadius: MY.rsm, background: m.grad,
                  marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: m.active ? `1.5px solid ${MY.brandRed}` : 'none',
                }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: m.active ? MY.brandRed : 'rgba(0,0,0,0.15)' }}/>
                </div>
                <div style={{ fontSize: 11, fontWeight: m.active ? 600 : 400, color: m.active ? MY.brandRed : MY.textSec }}>{m.t}</div>
                {m.active && <div style={{ fontSize: 10, color: MY.brandRed, fontWeight: 500 }}>当前</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 经期设置 */}
        <div style={{ margin: '8px 16px 0', padding: '0 14px', background: MY.surface, borderRadius: MY.rsm, display: 'flex', alignItems: 'center', gap: 10, height: 56 }}>
          <div style={{ width: 28, height: 28, borderRadius: MY.rxs, background: MY.brandSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2c3.5 4 6 7.2 6 11a6 6 0 1 1-12 0c0-3.8 2.5-7 6-11z" fill={MY.brandRed}/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: MY.textPri }}>经期设置</div>
            <div style={{ fontSize: 12, color: MY.textTer, marginTop: 1 }}>周期 28 天，经期 5 天</div>
          </div>
          <svg width="8" height="12" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
        </div>

        {/* 列表 */}
        <div style={{ margin: '8px 16px 0', background: MY.surface, borderRadius: MY.rsm, overflow: 'hidden' }}>
          {[{ i: '🏠', t: '个人主页' }, { i: '💰', t: '钱包' }, { i: '📦', t: '订单' }].map((r, i, a) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 14px', height: 52, borderBottom: i < a.length - 1 ? `1px solid ${MY.line}` : 'none' }}>
              <div style={{ width: 26, height: 26, borderRadius: MY.rxs, background: MY.brandSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, marginRight: 10 }}>{r.i}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 400, color: MY.textPri }}>{r.t}</div>
              <svg width="8" height="12" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
            </div>
          ))}
        </div>

        {/* 圈子 */}
        <div style={{ margin: '8px 16px 0', background: MY.surface, borderRadius: MY.rsm, padding: '12px 8px', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4 }}>
          {[{ t: '26年6月\n预产圈', bg: '#ffd3c4' }, { t: '26年8月\n预产圈', bg: '#ffe8b5' }, { t: '26年3月\n预产圈', bg: '#ffc3ce' }, { t: '孕中期\n妈咪', bg: '#d6bef0' }, { t: '更多\n圈子', bg: '#ffd3e2' }].map((c, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.bg, margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }}/>
              </div>
              <div style={{ fontSize: 10, color: MY.textPri, fontWeight: 400, lineHeight: '13px', whiteSpace: 'pre-line' }}>{c.t}</div>
            </div>
          ))}
        </div>

        {/* 服务 grid */}
        <div style={{ margin: '8px 16px 0', background: MY.surface, borderRadius: MY.rsm, padding: '12px 8px', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4 }}>
          {[{ i: '🍊', t: '柚子街' }, { i: '🩺', t: '问医生' }, { i: '📲', t: '桌面小组件' }, { i: '🍵', t: '爱享调养室' }, { i: '✨', t: '更多服务' }].map((it, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 34, height: 34, borderRadius: MY.rsm, background: MY.brandSoft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{it.i}</div>
              <div style={{ fontSize: 10, marginTop: 4, color: MY.textPri, fontWeight: 400 }}>{it.t}</div>
            </div>
          ))}
        </div>

        {/* 底部双卡 */}
        <div style={{ margin: '8px 16px 12px', display: 'flex', gap: 8 }}>
          {[{ i: '🧪', t: '柚子试用', s: '新奇好物先先试', bg: '#ffe0cc' }, { i: '☕', t: '经期活动', s: '姐妹支招提不…', bg: '#ffe0ea' }].map((c, i) => (
            <div key={i} style={{ flex: 1, background: MY.surface, borderRadius: MY.rsm, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{c.i}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: MY.textPri }}>{c.t}</div>
                <div style={{ fontSize: 11, color: MY.textTer, marginTop: 1 }}>{c.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="me" firstLabel="美柚" onChange={onTabChange}/>
    </Phone>
  );
}

// ─── Screen 7: 个人信息 ── 严格按原型图字段和分组 ────────────────
function Screen7Profile({ onPartnerClick, onBack }) {
  const Row = ({ label, value, muted, chevron = true, children }) => (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '0 16px',
      height: 52, borderBottom: `1px solid ${MY.line}`,
    }}>
      <div style={{ fontSize: 16, color: MY.textPri, flex: 'none', minWidth: 80 }}>{label}</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
        {children || (
          <span style={{ fontSize: 15, color: muted ? MY.textTer : MY.textSec }}>{value}</span>
        )}
      </div>
      {chevron && (
        <svg width="8" height="13" viewBox="0 0 8 14" style={{ marginLeft: 6 }}>
          <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        </svg>
      )}
    </div>
  );

  return (
    <Phone bg={MY.bg}>
      <TopBar title="个人信息" onBack={onBack}/>
      <div style={{ position: 'absolute', inset: '44px 0 0', overflowY: 'auto' }}>

        {/* 组 1：头像 + 昵称 */}
        <div style={{ background: MY.surface, borderRadius: MY.rmd, margin: '12px 16px 0', overflow: 'hidden' }}>
          {/* 头像行 */}
          <div style={{
            display: 'flex', alignItems: 'center', padding: '0 16px', height: 64,
            borderBottom: `1px solid ${MY.line}`,
          }}>
            <div style={{ fontSize: 16, color: MY.textPri, flex: 1 }}>头像</div>
            <Avatar size={36} bg={USER.bg} initial={USER.initial}/>
            <svg width="8" height="13" viewBox="0 0 8 14" style={{ marginLeft: 10 }}>
              <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          {/* 昵称行 — 无下边线（最后一行） */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 52 }}>
            <div style={{ fontSize: 16, color: MY.textPri, flex: 1 }}>昵称</div>
            <span style={{ fontSize: 15, color: MY.textSec }}>女友殿下</span>
            <svg width="8" height="13" viewBox="0 0 8 14" style={{ marginLeft: 6 }}>
              <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 组 2：伴侣 */}
        <div onClick={onPartnerClick} style={{ background: MY.surface, borderRadius: MY.rmd, margin: '8px 16px 0', overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 52 }}>
            <div style={{ fontSize: 16, color: MY.textPri, flex: 1 }}>伴侣</div>
            <Avatar size={28} bg={PARTNER.bg} initial={PARTNER.initial}/>
            <span style={{ fontSize: 15, color: MY.textSec, marginLeft: 8 }}>男友先生</span>
            <svg width="8" height="13" viewBox="0 0 8 14" style={{ marginLeft: 6 }}>
              <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 组 3：头像挂件 */}
        <div style={{ background: MY.surface, borderRadius: MY.rmd, margin: '8px 16px 0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 52 }}>
            <div style={{ fontSize: 16, color: MY.textPri, flex: 1 }}>头像挂件</div>
            <svg width="8" height="13" viewBox="0 0 8 14">
              <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 组 4：等级 */}
        <div style={{ background: MY.surface, borderRadius: MY.rmd, margin: '8px 16px 0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 52 }}>
            <div style={{ fontSize: 16, color: MY.textPri, flex: 1 }}>等级</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {['🧡','🧡','🧡','🧡'].map((h, i) => (
                <span key={i} style={{ fontSize: 18 }}>{h}</span>
              ))}
              <span style={{ fontSize: 15, color: MY.textSec, marginLeft: 4 }}>LV9</span>
            </div>
            <svg width="8" height="13" viewBox="0 0 8 14" style={{ marginLeft: 6 }}>
              <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 组 5：生日 / 身高 / 城市 / IP属地 */}
        <div style={{ background: MY.surface, borderRadius: MY.rmd, margin: '8px 16px 0', overflow: 'hidden' }}>
          {[
            { label: '生日',   value: '请填写生日',   muted: true },
            { label: '身高',   value: '请填写身高',   muted: true },
            { label: '城市',   value: '请选择城市',   muted: true },
            { label: 'IP属地', value: '福建',         muted: false, chevron: false },
          ].map((r, i, a) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '0 16px',
              height: 52,
              borderBottom: i < a.length - 1 ? `1px solid ${MY.line}` : 'none',
            }}>
              <div style={{ fontSize: 16, color: MY.textPri, flex: 1 }}>{r.label}</div>
              <span style={{ fontSize: 15, color: r.muted ? MY.textTer : MY.textSec }}>{r.value}</span>
              {r.chevron !== false && (
                <svg width="8" height="13" viewBox="0 0 8 14" style={{ marginLeft: 6 }}>
                  <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* 组 6：收货地址 / 收款账号 */}
        <div style={{ background: MY.surface, borderRadius: MY.rmd, margin: '8px 16px 24px', overflow: 'hidden' }}>
          {['收货地址', '收款账号'].map((label, i, a) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '0 16px',
              height: 52, borderBottom: i < a.length - 1 ? `1px solid ${MY.line}` : 'none',
            }}>
              <div style={{ fontSize: 16, color: MY.textPri, flex: 1 }}>{label}</div>
              <svg width="8" height="13" viewBox="0 0 8 14">
                <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>

      </div>
    </Phone>
  );
}

// ─── Screen 8: 我的伴侣 ── 严格按原型图 ───────────────────────────
function Screen8Partner({ onBack, onConfirmBreak }) {
  const [showModal, setShowModal] = React.useState(false);

  const toggleItems = [
    { t: '爱爱', on: true },
    { t: '症状', on: true },
    { t: '心情', on: true },
    { t: '白带', on: true },
    { t: '体温', on: true },
    { t: '体重', on: true },
    { t: '好习惯', on: true },
    { t: '便便', on: true },
  ];

  // 分组：每 2 个一组，放入同一个白卡片
  const groups = [];
  for (let i = 0; i < toggleItems.length; i += 2) {
    groups.push(toggleItems.slice(i, i + 2));
  }

  return (
    <Phone bg={MY.bg}>
      <TopBar title="我的伴侣" right="常见问题" onBack={onBack}/>
      <div style={{ position: 'absolute', inset: '44px 0 0', overflowY: 'auto' }}>

        {/* 情侣头像卡 */}
        <div style={{
          background: MY.surface, borderRadius: MY.rmd,
          margin: '12px 16px 0', padding: '20px 16px 16px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 28,
        }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar size={72} bg={USER.bg} initial={USER.initial}/>
            <div style={{ fontSize: 14, fontWeight: 500, color: MY.textPri, marginTop: 10 }}>女友殿下</div>
          </div>
          {/* 小心形 */}
          <div style={{ paddingTop: 24 }}>
            <svg width="28" height="24" viewBox="0 0 28 24">
              <path d="M14 21s-7-4-11-9a6 6 0 0 1 11-4 6 6 0 0 1 11 4c-4 5-11 9-11 9z" fill="#ff4d88"/>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size={72} bg={PARTNER.bg} initial={PARTNER.initial}/>
            <div style={{ fontSize: 14, fontWeight: 500, color: MY.textPri, marginTop: 10 }}>男友先生</div>
            <div style={{ fontSize: 12, color: MY.textTer, marginTop: 2 }}>来过224次</div>
          </div>
        </div>

        {/* 恋爱开始日 */}
        <div style={{ background: MY.surface, borderRadius: MY.rmd, margin: '8px 16px 0', overflow: 'hidden' }}>
          <div style={{
            display: 'flex', alignItems: 'center', padding: '0 16px', height: 56,
          }}>
            <div style={{ flex: 1, fontSize: 17, fontWeight: 500, color: MY.textPri }}>恋爱开始日</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: MY.textTer, fontSize: 15 }}>
              2023年9月9日
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 记录查看权限 — 全部并列在一个白卡 */}
        <div style={{ fontSize: 13, color: MY.textSec, padding: '12px 16px 6px' }}>记录查看权限</div>
        <div style={{ background: MY.surface, borderRadius: MY.rmd, margin: '0 16px', overflow: 'hidden' }}>
          {toggleItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '0 16px', height: 56,
              borderBottom: i < toggleItems.length - 1 ? `1px solid ${MY.line}` : 'none',
            }}>
              <div style={{ flex: 1, fontSize: 17, fontWeight: 500, color: MY.textPri }}>{item.t}</div>
              <Toggle on={item.on}/>
            </div>
          ))}
        </div>

        {/* 解除伴侣关系 */}
        <div style={{ background: MY.surface, borderRadius: MY.rmd, margin: '12px 16px 24px', overflow: 'hidden' }}>
          <div onClick={() => setShowModal(true)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 52, cursor: 'pointer',
          }}>
            <span style={{ fontSize: 16, color: MY.brandRed }}>解除伴侣关系</span>
          </div>
        </div>

      </div>

      {/* 解除确认弹窗 */}
      {showModal && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          paddingBottom: 60,
        }}>
          <div style={{
            background: MY.surface, borderRadius: 16, width: 280,
            padding: '24px 0 0', boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
          }}>
            <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 700, color: MY.textPri, padding: '0 24px' }}>
              确定要解除关系吗？
            </div>
            <div style={{ textAlign: 'center', fontSize: 13.5, color: MY.textSec, marginTop: 10, padding: '0 24px', lineHeight: '20px' }}>
              将无法再查看伴侣的经期等信息
            </div>
            <div style={{
              display: 'flex', borderTop: `1px solid ${MY.line}`, marginTop: 22,
            }}>
              <div onClick={() => setShowModal(false)} style={{
                flex: 1, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, color: MY.textSec, cursor: 'pointer',
                borderRight: `1px solid ${MY.line}`,
              }}>取消</div>
              <div onClick={() => { setShowModal(false); onConfirmBreak && onConfirmBreak(); }} style={{
                flex: 1, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, color: MY.brandRed, fontWeight: 700, cursor: 'pointer',
              }}>确定解除</div>
            </div>
          </div>
        </div>
      )}
    </Phone>
  );
}

// ─── Screen 9: 恋爱日记 · 发布 ────────────────────────────────────
function Screen9DiaryPublish({ onCancel, onSave }) {
  return (
    <Phone bg={MY.surface}>
      {/* 顶部 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: 44, background: MY.surface,
      }}>
        <div onClick={onCancel} style={{ fontSize: 15, color: MY.textSec, cursor: 'pointer', minWidth: 44, display: 'flex', alignItems: 'center' }}>取消</div>
        <span style={{ fontSize: 17, fontWeight: 500, color: MY.textPri }}>写日记</span>
        <div onClick={onSave} style={{
          minWidth: 64, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          cursor: 'pointer',
        }}>
          <span style={{
            padding: '0 16px', height: 32, display: 'inline-flex', alignItems: 'center',
            borderRadius: MY.rpill, background: MY.brandSoft, color: MY.brandRed,
            fontSize: 14, fontWeight: 600,
          }}>保存</span>
        </div>
      </div>

      {/* 输入区 */}
      <div style={{ background: MY.surface, padding: '16px 16px 12px', minHeight: 140 }}>
        <div style={{ fontSize: 15, color: MY.textTer, lineHeight: '24px' }}>写点什么…</div>
      </div>

      {/* 加图 */}
      <div style={{ background: MY.surface, padding: '0 16px 16px', borderTop: `1px solid ${MY.line}` }}>
        <div style={{
          width: 88, height: 88, borderRadius: MY.rsm, background: MY.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke={MY.textTer} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* 标签 */}
      <div style={{ background: MY.surface, padding: '8px 16px 12px', marginTop: 8 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '6px 14px', borderRadius: MY.rpill,
          background: MY.bg, color: MY.textSec, fontSize: 13,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M11 3H4v7l11 11 7-7-11-11z" stroke={MY.textSec} strokeWidth="1.6" strokeLinejoin="round"/>
            <circle cx="8" cy="8" r="1.5" fill={MY.textSec}/>
          </svg>
          标签
        </div>
      </div>

      {/* 设置行 */}
      <div style={{ background: MY.surface, marginTop: 8 }}>
        {[
          { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 3v18M5 4h12l-2 4 2 4H5" stroke={MY.textPri} strokeWidth="1.6" strokeLinejoin="round"/></svg>, label: '标记为大事记', right: <Toggle on={false}/> },
          { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={MY.textPri} strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke={MY.textPri} strokeWidth="1.6" strokeLinecap="round"/></svg>, label: '记录时间', right: <span style={{ display:'flex', alignItems:'center', gap:4, color:MY.textTer, fontSize:13 }}>2026-5-29<svg width="8" height="12" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={MY.textTer} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg></span> },
        ].map((r, i, a) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 52, borderBottom: i < a.length - 1 ? `1px solid ${MY.line}` : 'none' }}>
            <div style={{ marginRight: 12 }}>{r.icon}</div>
            <div style={{ flex: 1, fontSize: 15, fontWeight: 400, color: MY.textPri }}>{r.label}</div>
            {r.right}
          </div>
        ))}
      </div>
    </Phone>
  );
}

Object.assign(window, { Screen5DiaryAll, DiaryDayCard, Screen6Me, Screen7Profile, Screen8Partner, Screen9DiaryPublish });

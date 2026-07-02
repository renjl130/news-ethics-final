// ==================== 核心状态 ====================
const state = {
  currentScene: 0,
  riskValue: 0,
  choices: [],
  maxRisk: 100,
  trialPhase: 0,
  sceneCount: 8,
  audioEnabled: true,
  knowledgeViewed: new Set(),
};

// ==================== 法律数据 ====================
const lawData = {
  defamation: { name: '名誉权侵害', count: 0, icon: '📢' },
  privacy: { name: '隐私权侵害', count: 0, icon: '🔒' },
  portrait: { name: '肖像权侵害', count: 0, icon: '🖼️' },
  copyright: { name: '著作权侵害', count: 0, icon: '©️' },
  cybersecurity: { name: '网络安全违法', count: 0, icon: '🌐' },
  cyberviolence: { name: '网络暴力', count: 0, icon: '💢' },
};

const sceneLegal = {
  1: ['privacy', 'cybersecurity'],
  2: ['privacy', 'defamation'],
  3: ['portrait', 'cybersecurity'],
  4: ['defamation', 'cyberviolence'],
  5: ['cybersecurity', 'defamation'],
  6: ['defamation', 'privacy', 'portrait'],
  7: [],
  8: [],
};

// ==================== 知识弹窗数据 ====================
const knowledgeData = {
  1: {
    badge: '隐私权保护',
    title: '网络信息传播的法律边界',
    content: `
      <p>在互联网时代，信息传播速度极快，但传播行为必须遵守法律底线。</p>
      <div class="law-ref">
        <strong>《中华人民共和国民法典》第1032条</strong>
        自然人享有隐私权。任何组织或者个人不得以刺探、侵扰、泄露、公开等方式侵害他人的隐私权。隐私是自然人的私人生活安宁和不愿为他人知晓的私密空间、私密活动、私密信息。
      </div>
      <div class="law-ref">
        <strong>《中华人民共和国民法典》第1033条</strong>
        除法律另有规定或者权利人明确同意外，任何组织或者个人不得实施下列行为：（一）以电话、短信、即时通讯工具、电子邮件、传单等方式侵扰他人的私人生活安宁；（二）进入、拍摄、窥视他人的住宅、宾馆房间等私密空间；（三）拍摄、窥视、窃听、公开他人的私密活动；（四）处理他人的私密信息。
      </div>
      <p class="warning-text">⚠️ 重要提醒：</p>
      <p>• 即使你不是信息的首发者，转发、评论、扩散他人隐私信息同样构成侵权<br>
      • 网络平台对违法信息负有审核义务，用户也有举报义务<br>
      • 传播隐私信息可能导致民事赔偿，情节严重者可追究刑事责任</p>
    `,
  },
  2: {
    badge: '个人信息保护',
    title: '人肉搜索与个人信息保护',
    content: `
      <p>人肉搜索是指通过网络平台，利用网民的力量搜索特定个人的真实身份信息。这种行为严重侵犯了公民的个人信息权益。</p>
      <div class="law-ref">
        <strong>《中华人民共和国个人信息保护法》第10条</strong>
        任何组织、个人不得非法收集、使用、加工、传输他人个人信息，不得非法买卖、提供或者公开他人个人信息。
      </div>
      <div class="law-ref">
        <strong>《中华人民共和国刑法》第253条之一</strong>
        违反国家有关规定，向他人出售或者提供公民个人信息，情节严重的，处三年以下有期徒刑或者拘役，并处或者单处罚金；情节特别严重的，处三年以上七年以下有期徒刑，并处罚金。
      </div>
      <p class="warning-text">⚠️ 人肉搜索的法律后果：</p>
      <p>• 搜索并公开他人个人信息：侵犯个人信息权益<br>
      • 转发人肉搜索结果：构成共同侵权<br>
      • 造成严重后果：可能面临刑事追诉<br>
      • 网络平台未及时删除：承担连带责任</p>
    `,
  },
  3: {
    badge: 'AI深度伪造',
    title: 'AI换脸技术的法律规制',
    content: `
      <p>AI换脸（深度伪造）技术是利用人工智能生成逼真的虚假图像、视频的技术。该技术被滥用将严重侵害他人权益。</p>
      <div class="law-ref">
        <strong>《中华人民共和国民法典》第1019条</strong>
        任何组织或者个人不得以丑化、污损，或者利用信息技术手段伪造等方式侵害他人的肖像权。未经肖像权人同意，不得制作、使用、公开肖像权人的肖像。
      </div>
      <div class="law-ref">
        <strong>《互联网信息服务深度合成管理规定》</strong>
        深度合成服务提供者和使用者不得利用深度合成服务制作、复制、发布、传播虚假新闻信息。不得利用深度合成技术从事危害国家安全、破坏社会稳定、扰乱公共秩序等法律法规禁止的活动。
      </div>
      <div class="law-ref">
        <strong>《中华人民共和国刑法》第363条</strong>
        制作、复制、出版、贩卖、传播淫秽物品牟利罪。
      </div>
      <p class="danger-text">🚨 AI换脸可能面临的法律后果：</p>
      <p>• 制作AI换脸内容：侵犯肖像权，可能构成侮辱罪<br>
      • 传播AI换脸内容：侵犯肖像权、名誉权，可能构成传播淫秽物品罪<br>
      • 造成严重后果：可能面临三年以上有期徒刑<br>
      • 民事赔偿：精神损害抚慰金、经济损失赔偿</p>
    `,
  },
  4: {
    badge: '网络暴力治理',
    title: '网络暴力的法律界定与处罚',
    content: `
      <p>网络暴力是指在网络上以文字、图片、视频等形式对他人进行侮辱、诽谤、威胁等行为。近年来，网络暴力事件频发，已引起社会广泛关注。</p>
      <div class="law-ref">
        <strong>《中华人民共和国民法典》第1024条</strong>
        民事主体享有名誉权。任何组织或者个人不得以侮辱、诽谤等方式侵害他人的名誉权。
      </div>
      <div class="law-ref">
        <strong>《中华人民共和国刑法》第246条</strong>
        以暴力或者其他方法公然侮辱他人或者捏造事实诽谤他人，情节严重的，处三年以下有期徒刑、拘役、管制或者剥夺政治权利。
      </div>
      <div class="law-ref">
        <strong>《关于依法惩治网络暴力违法犯罪的指导意见》（2023年）</strong>
        明确了网络暴力入刑标准：造成被害人精神失常、自残、自杀等严重后果的，应当适用侮辱罪、诽谤罪的公诉程序追究刑事责任。
      </div>
      <p class="warning-text">⚠️ 网络暴力参与者的法律责任：</p>
      <p>• 发布侮辱、诽谤言论：侵犯名誉权，承担民事责任<br>
      • 情节严重：可能构成侮辱罪、诽谤罪<br>
      • 造成严重后果：三年以下有期徒刑<br>
      • 网络平台：未及时处理违法内容需承担连带责任</p>
    `,
  },
  5: {
    badge: '司法协助',
    title: '配合调查的法律义务',
    content: `
      <p>当公安机关依法开展调查时，公民有义务配合调查，提供相关信息和证据。</p>
      <div class="law-ref">
        <strong>《中华人民共和国网络安全法》第28条</strong>
        网络运营者应当为公安机关、国家安全机关依法维护国家安全和侦查犯罪的活动提供技术支持和协助。
      </div>
      <div class="law-ref">
        <strong>《中华人民共和国刑事诉讼法》第137条</strong>
        任何单位和个人，有义务按照人民检察院和公安机关的要求，交出可以证明犯罪嫌疑人有罪或者无罪的物证、书证、视听资料等证据。
      </div>
      <p class="danger-text">🚨 删除证据的法律后果：</p>
      <p>• 删除相关记录并不能免除法律责任<br>
      • 故意销毁证据可能构成帮助毁灭证据罪<br>
      • 可能因妨碍司法而加重处罚<br>
      • 主动配合调查、如实陈述是从轻处理的重要因素</p>
      <p class="warning-text">✅ 正确做法：</p>
      <p>• 主动配合公安机关调查<br>
      • 如实说明情况，不隐瞒、不撒谎<br>
      • 保留相关证据，配合调查取证<br>
      • 如有需要，可寻求法律援助</p>
    `,
  },
  6: {
    badge: '诉讼程序',
    title: '法院传票与应诉权利义务',
    content: `
      <p>收到法院传票后，被告应当依法应诉，这是法律规定的义务。</p>
      <div class="law-ref">
        <strong>《中华人民共和国民事诉讼法》第139条</strong>
        人民法院对必须到庭的被告，经两次传票传唤，无正当理由拒不到庭的，可以拘传。
      </div>
      <div class="law-ref">
        <strong>《中华人民共和国民事诉讼法》第146条</strong>
        被告经传票传唤，无正当理由拒不到庭的，或者未经法庭许可中途退庭的，可以缺席判决。
      </div>
      <p class="warning-text">⚠️ 不应诉的后果：</p>
      <p>• 法院可以缺席判决，对被告极为不利<br>
      • 可能被拘传到庭<br>
      • 丧失答辩、举证、质证等诉讼权利<br>
      • 可能承担更重的法律责任</p>
      <p class="warning-text">✅ 正确做法：</p>
      <p>• 收到传票后及时签收<br>
      • 在规定时间内提交答辩状<br>
      • 积极收集对自己有利的证据<br>
      • 可以委托律师代理诉讼<br>
      • 可以尝试庭前和解，争取从轻处理</p>
    `,
  },
};

// ==================== DOM 缓存 ====================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ==================== 音效系统 ====================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function playSound(type) {
  if (!state.audioEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.value = 0.1;

    switch (type) {
      case 'click':
        osc.frequency.value = 800;
        osc.type = 'sine';
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
        break;
      case 'risk-up':
        osc.frequency.value = 200;
        osc.type = 'sawtooth';
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
        break;
      case 'risk-down':
        osc.frequency.value = 600;
        osc.type = 'sine';
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
        break;
      case 'gavel':
        osc.frequency.value = 150;
        osc.type = 'square';
        gain.gain.value = 0.15;
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
        break;
      case 'success':
        osc.frequency.value = 523;
        osc.type = 'sine';
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.frequency.value = 659;
          osc2.type = 'sine';
          gain2.gain.value = 0.1;
          gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.3);
        }, 150);
        break;
    }
  } catch (e) {}
}

// ==================== 粒子系统 ====================
function initParticles() {
  const canvas = $('#particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 2 + 1,
    o: Math.random() * 0.3 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,140,255,${p.o})`;
      ctx.fill();
    });
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach((b) => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(168,85,247,${0.08 * (1 - d / 120)})`;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ==================== 场景管理 ====================
const sceneNames = ['序幕', '第一幕：热搜爆发', '第二幕：聊天记录曝光', '第三幕：AI换脸视频', '第四幕：网络暴力扩散', '第五幕：事件反转', '第六幕：收到法院传票', '第七幕：数字法庭审判', '第八幕：判决结果'];

function showScene(index) {
  const scenes = $$('.scene');
  const prev = scenes[state.currentScene];
  const next = scenes[index];

  if (prev) {
    prev.classList.add('scene-exit');
    setTimeout(() => {
      prev.classList.remove('active', 'scene-exit');
    }, 500);
  }

  setTimeout(() => {
    next.classList.add('active', 'scene-enter');
    setTimeout(() => next.classList.remove('scene-enter'), 800);
  }, 500);

  state.currentScene = index;
  updateProgress();
  updateNavInfo();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 显示/隐藏导航栏
  if (index > 0) {
    $('#topNav').classList.add('visible');
  } else {
    $('#topNav').classList.remove('visible');
  }
}

function updateProgress() {
  const pct = (state.currentScene / state.sceneCount) * 100;
  const fill = $('#progressFill');
  fill.style.width = pct + '%';

  // 高风险时进度条变红
  if (state.riskValue > 60) {
    fill.classList.add('danger');
  } else {
    fill.classList.remove('danger');
  }
}

function updateNavInfo() {
  $('#navSceneInfo').textContent = sceneNames[state.currentScene] || '';
}

// ==================== 风险系统 ====================
function updateRisk(delta, choiceType, sceneIndex) {
  const oldRisk = state.riskValue;
  state.riskValue = Math.max(0, Math.min(state.maxRisk, state.riskValue + delta));

  // 记录选择
  state.choices.push({
    scene: sceneIndex,
    delta,
    type: choiceType,
    total: state.riskValue,
  });

  // 更新法律类别
  const categories = sceneLegal[sceneIndex] || [];
  categories.forEach((cat) => {
    if (delta > 0) {
      lawData[cat].count++;
    }
  });

  // 更新UI
  const riskVal = $('#riskValue');
  const riskFill = $('#riskFill');
  const indicator = $('#riskIndicator');

  indicator.classList.add('visible');
  riskVal.textContent = state.riskValue;

  const pct = (state.riskValue / state.maxRisk) * 100;
  riskFill.style.width = pct + '%';

  riskFill.classList.remove('mid', 'high');
  riskVal.classList.remove('green', 'yellow', 'red');

  if (pct > 60) {
    riskFill.classList.add('high');
    riskVal.classList.add('red');
  } else if (pct > 30) {
    riskFill.classList.add('mid');
    riskVal.classList.add('yellow');
  } else {
    riskVal.classList.add('green');
  }

  // 风险值增加时的抖动效果
  if (delta > 0) {
    indicator.style.animation = 'shake 0.3s ease-in-out';
    setTimeout(() => (indicator.style.animation = ''), 300);
    playSound('risk-up');
  } else if (delta < 0) {
    playSound('risk-down');
  }

  // 更新选择历史
  updateChoiceHistory();
}

function updateChoiceHistory() {
  const historyEl = $('#choiceHistory');
  const listEl = $('#choiceHistoryList');

  if (state.choices.length > 0) {
    historyEl.classList.add('visible');
    listEl.innerHTML = state.choices
      .slice(-3)
      .map(
        (c) => `
        <div class="choice-history-item">
          第${c.scene}幕: ${c.type}
          <span class="${c.delta >= 0 ? 'delta-pos' : 'delta-neg'}">
            ${c.delta >= 0 ? '+' : ''}${c.delta}
          </span>
        </div>
      `
      )
      .join('');
  }
}

// ==================== 选择处理 ====================
function handleChoice(btn) {
  const sceneIndex = parseInt(btn.dataset.scene);
  const delta = parseInt(btn.dataset.risk);
  const choiceType = btn.dataset.type;

  playSound('click');

  // 禁用同组所有按钮
  const siblings = btn.parentElement.querySelectorAll('.choice-btn');
  siblings.forEach((s) => {
    s.style.pointerEvents = 'none';
    if (s === btn) {
      s.classList.add('selected');
      if (delta > 0) s.classList.add('risk-positive');
      else if (delta < 0) s.classList.add('risk-negative');
    } else {
      s.style.opacity = '0.4';
    }
  });

  // 更新风险值
  updateRisk(delta, choiceType, sceneIndex);

  // 显示法律提示
  setTimeout(() => {
    const hint = $(`#lawHint-${sceneIndex}`);
    if (hint) hint.classList.add('visible');
  }, 400);

  // 显示提示
  if (delta > 0) {
    showToast('⚠️', '你的法律风险值增加了！请谨慎传播信息');
  } else if (delta < 0) {
    showToast('✅', '正确做法！你的法律风险值降低了');
  }

  // 3秒后进入下一幕
  setTimeout(() => {
    if (sceneIndex < state.sceneCount) {
      if (sceneIndex === 6) {
        showScene(7);
      } else {
        showScene(sceneIndex + 1);
      }
    }
  }, 3000);
}

// ==================== 提示框 ====================
function showToast(icon, text) {
  const toast = $('#toast');
  $('#toastIcon').textContent = icon;
  $('#toastText').textContent = text;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2500);
}

// ==================== 知识弹窗 ====================
function showKnowledge(sceneIndex) {
  const data = knowledgeData[sceneIndex];
  if (!data) return;

  state.knowledgeViewed.add(sceneIndex);
  playSound('click');

  $('#knowledgeBadge').textContent = data.badge;
  $('#knowledgeTitle').textContent = data.title;
  $('#knowledgeContent').innerHTML = data.content;
  $('#knowledgeModal').classList.add('active');
}

function closeKnowledge() {
  playSound('click');
  $('#knowledgeModal').classList.remove('active');
}

// 点击弹窗外部关闭
document.addEventListener('click', (e) => {
  if (e.target.id === 'knowledgeModal') {
    closeKnowledge();
  }
});

// ==================== 庆祝效果 ====================
function createConfetti() {
  const container = $('#confettiContainer');
  container.innerHTML = '';
  const colors = ['#4f8cff', '#a855f7', '#22c55e', '#f59e0b', '#ef4444', '#f97316'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.width = (5 + Math.random() * 10) + 'px';
    confetti.style.height = (5 + Math.random() * 10) + 'px';
    container.appendChild(confetti);
  }

  setTimeout(() => container.innerHTML = '', 4000);
}

// ==================== 法庭审判 ====================
const trialData = {
  opening: {
    judge: '现在开庭。本案为原告张某某诉被告名誉权、隐私权、肖像权纠纷一案。首先由原告方陈述诉讼请求。',
    prosecution:
      '审判长，我方当事人因被告在社交平台的传播行为，遭受了严重的名誉损害和精神痛苦。被告转发了涉及原告的AI合成虚假不雅视频，并扩散原告个人信息，导致原告遭受大规模网络暴力。我方请求法院判令被告：一、公开赔礼道歉；二、赔偿精神损害抚慰金5万元；三、赔偿经济损失2万元。',
    defense: '',
  },
  evidence: {
    judge: '下面进行证据质证。请原告方出示证据。',
    prosecution:
      '证据一：被告在社交媒体平台的转发记录和评论截图，时间戳为2026年X月X日。证据二：AI合成视频的鉴定报告，证实该视频系利用深度伪造技术制作。证据三：原告因网络暴力导致的医疗诊断证明。证据四：原告社会评价降低的相关证据。',
    defense:
      '对于证据一，被告承认曾转发该视频。但我方认为，被告在转发时并不知道该视频系AI合成，主观上不存在恶意。对于证据三和证据四，我方认为其与被告的转发行为之间缺乏直接因果关系。',
  },
  debate: {
    judge: '下面进行法庭辩论。请双方发表辩论意见。',
    prosecution:
      '被告作为完全民事行为能力人，在社交媒体上转发未经核实的他人隐私内容，且该内容明显涉及他人名誉。即使被告不知视频系AI合成，其转发行为本身也构成了对他人隐私权和名誉权的侵害。《民法典》明确规定，网络用户利用网络侵害他人民事权益的，应当承担侵权责任。',
    defense:
      '我方当事人认识到转发行为的不当之处，深感悔意。但我方提请法庭注意：第一，该视频的首发者并非被告；第二，被告在得知真相后已主动删除相关内容；第三，被告愿意向原告公开道歉。我方请求法庭从轻处理。',
  },
  verdict: {
    judge: '',
    prosecution: '',
    defense: '',
  },
};

let currentTrialStep = 0;
const trialSteps = ['opening', 'evidence', 'debate', 'verdict'];

function initTrial() {
  renderTrialPhase('opening');
  updateTrialProgress(0);

  // 设置被告辩护人信息
  const lastChoice = state.choices[state.choices.length - 1];
  if (lastChoice && lastChoice.type === '庭前和解') {
    $('#defendantRep').textContent = '代理律师（庭前和解中）';
  } else if (lastChoice && lastChoice.type === '应诉') {
    $('#defendantRep').textContent = '代理律师';
  }
}

function renderTrialPhase(phase) {
  const data = trialData[phase];
  if (!data) return;

  const content = $(`#trial-${phase}`);
  content.classList.remove('hidden');

  if (phase === 'verdict') {
    renderVerdict();
    return;
  }

  content.innerHTML = '';

  const judgeDiv = document.createElement('div');
  judgeDiv.className = 'judge-speech';
  judgeDiv.innerHTML = `
    <div class="speech-label">审判长</div>
    <div class="speech-text">${data.judge}</div>
  `;
  content.appendChild(judgeDiv);

  const proseDiv = document.createElement('div');
  proseDiv.className = 'prosecution-speech';
  proseDiv.innerHTML = `
    <div class="speech-label">原告律师</div>
    <div class="speech-text">${data.prosecution}</div>
  `;
  content.appendChild(proseDiv);

  const defDiv = document.createElement('div');
  defDiv.className = 'defense-speech';
  defDiv.innerHTML = `
    <div class="speech-label">被告</div>
    <div class="speech-text">${data.defense}</div>
  `;
  content.appendChild(defDiv);

  setTimeout(() => judgeDiv.classList.add('show'), 200);
  setTimeout(() => proseDiv.classList.add('show'), 800);
  setTimeout(() => defDiv.classList.add('show'), 1400);
}

function updateTrialProgress(step) {
  $$('.trial-step').forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i < step) el.classList.add('done');
    if (i === step) el.classList.add('active');
  });
}

function advanceTrial() {
  playSound('click');
  currentTrialStep++;

  if (currentTrialStep >= trialSteps.length) {
    showScene(8);
    // 延迟渲染判决书，等待场景切换完成
    setTimeout(() => renderVerdictReport(), 800);
    return;
  }

  $$('.trial-phase').forEach((el) => el.classList.add('hidden'));
  renderTrialPhase(trialSteps[currentTrialStep]);
  updateTrialProgress(currentTrialStep);

  if (trialSteps[currentTrialStep] === 'verdict') {
    showGavelAnimation(() => {
      setTimeout(() => {
        showScene(8);
        // 法槌动画后延迟渲染判决书
        setTimeout(() => renderVerdictReport(), 800);
      }, 500);
    });
  }
}

function showGavelAnimation(callback) {
  const overlay = $('#courtOverlay');
  overlay.classList.add('active');
  playSound('gavel');
  setTimeout(() => {
    overlay.classList.remove('active');
    if (callback) callback();
  }, 1500);
}

// ==================== 判决生成 ====================
function getVerdictOpinion() {
  if (state.riskValue >= 70) {
    return '被告的行为情节严重，主观过错较大，应当承担较重的法律责任。';
  } else if (state.riskValue >= 40) {
    return '被告的行为存在明显过错，应当承担相应的法律责任。';
  } else if (state.riskValue >= 20) {
    return '被告的行为虽存在不当，但主观过错程度较轻。';
  } else {
    return '被告的行为情节较轻，且有主动纠正和弥补的行为，可以从轻处理。';
  }
}

function renderVerdict() {
  const content = $('#trial-verdict');
  content.innerHTML = '';

  const verdictJudge = document.createElement('div');
  verdictJudge.className = 'judge-speech';
  verdictJudge.innerHTML = `
    <div class="speech-label">审判长</div>
    <div class="speech-text">
      本院认为，被告在社交媒体平台上的传播行为，侵害了原告的合法权益。
      ${getVerdictOpinion()}
      现在宣判。
    </div>
  `;
  content.appendChild(verdictJudge);

  setTimeout(() => verdictJudge.classList.add('show'), 200);
}

function renderVerdictReport() {
  // 确保场景已激活
  const scene8 = $('#scene-8');
  if (!scene8 || !scene8.classList.contains('active')) {
    setTimeout(() => renderVerdictReport(), 200);
    return;
  }

  // 生成判决书事实部分 - 更详细的描述
  const sceneNames = ['热搜爆发', '聊天记录曝光', 'AI换脸视频', '网络暴力扩散', '事件反转', '收到法院传票'];
  const facts = state.choices
    .map((c) => {
      const sceneIdx = Math.min(c.scene - 1, sceneNames.length - 1);
      const sceneName = sceneNames[sceneIdx] || `第${c.scene}幕`;
      const riskDesc = c.delta > 0 ? '增加了法律风险' : c.delta < 0 ? '降低了法律风险' : '保持中立';
      return `${sceneName}中，被告${c.type}行为（${riskDesc}）`;
    })
    .join('；');

  const factsEl = $('#verdictFacts');
  if (factsEl) {
    factsEl.innerHTML = `
      <p>${facts}。</p>
      <p style="margin-top:12px">经本院审理查明：2026年X月，原告张某某的虚假不雅视频及个人信息在社交媒体平台被大量传播。被告作为网络用户，在上述平台转发、评论、扩散相关不实内容，导致原告遭受大规模网络暴力，社会评价显著降低，精神受到严重损害。</p>
      <p style="margin-top:12px">根据AI合成视频鉴定报告，该视频系利用深度伪造技术制作，与原告本人无关。被告的传播行为已构成对原告名誉权、隐私权和肖像权的侵害。</p>
    `;
  }

  // 生成更详细的法律分析
  const opinionEl = $('#verdictOpinion');
  if (opinionEl) {
    let opinion = '';
    if (state.riskValue >= 70) {
      opinion = `
        <p>本院认为，被告作为完全民事行为能力人，在社交媒体平台上多次转发、评论、扩散涉及原告的虚假AI合成不雅视频及相关个人信息，且在明知或应知内容可能虚假的情况下仍持续传播，主观过错较大。</p>
        <p style="margin-top:10px">根据《中华人民共和国民法典》第1024条、第1032条、第1019条之规定，被告的行为已构成对原告名誉权、隐私权和肖像权的侵害。根据《关于依法惩治网络暴力违法犯罪的指导意见》，被告的传播行为情节严重，应当承担较重的法律责任。</p>
        <p style="margin-top:10px;color:#8b0000;font-weight:600">被告的行为情节严重，主观过错较大，应当承担较重的法律责任。</p>
      `;
    } else if (state.riskValue >= 40) {
      opinion = `
        <p>本院认为，被告在社交媒体平台上转发了涉及原告的虚假内容，虽辩称不知道视频系AI合成，但作为网络用户，应当对传播内容的真实性承担合理审查义务。</p>
        <p style="margin-top:10px">根据《中华人民共和国民法典》第1024条之规定，被告的传播行为已对原告名誉权造成侵害。综合考虑被告的过错程度和损害后果，应当承担相应的法律责任。</p>
        <p style="margin-top:10px;color:#f59e0b;font-weight:600">被告的行为存在明显过错，应当承担相应的法律责任。</p>
      `;
    } else if (state.riskValue >= 20) {
      opinion = `
        <p>本院认为，被告虽参与了相关内容的传播，但传播范围和影响力有限，且在一定程度上采取了自我约束措施。</p>
        <p style="margin-top:10px">根据《中华人民共和国民法典》第1165条之规定，行为人因过错侵害他人民事权益造成损害的，应当承担侵权责任。被告的行为虽存在不当，但主观过错程度较轻。</p>
        <p style="margin-top:10px;color:#22c55e;font-weight:600">被告的行为虽存在不当，但主观过错程度较轻，可酌情从轻处理。</p>
      `;
    } else {
      opinion = `
        <p>本院认为，被告在面对网络热点事件时，能够保持理性判断，未积极参与传播未经证实的信息，且有主动纠正和维护网络秩序的行为。</p>
        <p style="margin-top:10px">根据《中华人民共和国民法典》第1165条之规定，被告虽与原告损害结果存在一定关联，但主观过错程度轻微，且有积极弥补行为。根据《民事诉讼法》相关规定，可以从轻处理。</p>
        <p style="margin-top:10px;color:#22c55e;font-weight:600">被告的行为情节较轻，且有主动纠正和弥补的行为，应当予以从轻处理。</p>
      `;
    }
    opinionEl.innerHTML = opinion;
  }

  // 生成判决结果
  let judgment = '';
  if (state.riskValue >= 70) {
    judgment = `
      <p><strong>一、</strong>被告应于本判决生效之日起三十日内，在其社交平台发布公开道歉声明，持续不少于三十日，内容须经本院审核；</p>
      <p><strong>二、</strong>被告赔偿原告精神损害抚慰金人民币<strong>50,000元</strong>；</p>
      <p><strong>三、</strong>被告赔偿原告经济损失人民币<strong>20,000元</strong>；</p>
      <p><strong>四、</strong>被告承担本案全部诉讼费用。</p>
      <p style="color:#8b0000;font-weight:700;margin-top:12px">如不服本判决，可在判决书送达之日起十五日内，向本院递交上诉状，上诉至北京市第三中级人民法院。</p>
    `;
  } else if (state.riskValue >= 40) {
    judgment = `
      <p><strong>一、</strong>被告应于本判决生效之日起三十日内，在其社交平台发布公开道歉声明，持续不少于十五日；</p>
      <p><strong>二、</strong>被告赔偿原告精神损害抚慰金人民币<strong>20,000元</strong>；</p>
      <p><strong>三、</strong>案件受理费由被告承担。</p>
      <p style="margin-top:8px;color:#666">如不服本判决，可在判决书送达之日起十五日内上诉。</p>
    `;
  } else if (state.riskValue >= 20) {
    judgment = `
      <p><strong>一、</strong>被告应于本判决生效之日起七日内，向原告发送书面道歉信；</p>
      <p><strong>二、</strong>被告赔偿原告精神损害抚慰金人民币<strong>5,000元</strong>；</p>
      <p><strong>三、</strong>案件受理费由被告承担。</p>
    `;
  } else {
    judgment = `
      <p><strong>一、</strong>被告应于本判决生效之日起七日内，向原告发送书面道歉信；</p>
      <p><strong>二、</strong>被告赔偿原告精神损害抚慰金人民币<strong>1,000元</strong>（象征性赔偿）；</p>
      <p><strong>三、</strong>案件受理费由被告承担。</p>
      <p style="color:#22c55e;font-weight:700;margin-top:12px">考虑到被告的配合态度和主动纠正行为，本院予以从轻处理。</p>
    `;
  }
  const judgmentEl = $('#verdictJudgment');
  if (judgmentEl) {
    judgmentEl.innerHTML = judgment;
  }

  // 生成等级评价
  renderGrade();

  // 生成风险报告
  renderRiskSummary();

  // 绘制风险图表
  drawRiskChart();

  // 渲染风险汇总卡
  renderRiskSummaryCard();

  // 低风险时庆祝
  if (state.riskValue < 30) {
    setTimeout(createConfetti, 1000);
    playSound('success');
  }
}

function renderGrade() {
  const gradeBadge = $('#gradeBadge');
  const gradeTitle = $('#gradeTitle');
  const gradeDesc = $('#gradeDesc');

  // Safety check
  if (!gradeBadge || !gradeTitle || !gradeDesc) return;

  let grade, title, desc;

  if (state.riskValue < 10) {
    grade = 'A+';
    title = '传播伦理守护者';
    desc = '你的选择展现了卓越的法律意识和传播伦理素养。你不仅保护了自己，也维护了他人的合法权益。';
    gradeBadge.className = 'grade-badge grade-a';
  } else if (state.riskValue < 25) {
    grade = 'A';
    title = '理性传播者';
    desc = '你具备良好的法律意识，大多数选择都是正确的。继续保持，成为网络空间的正能量。';
    gradeBadge.className = 'grade-badge grade-a';
  } else if (state.riskValue < 40) {
    grade = 'B';
    title = '法律认知者';
    desc = '你对法律有一定了解，但在某些情况下可能做出不够审慎的选择。建议加强对传播伦理的学习。';
    gradeBadge.className = 'grade-badge grade-b';
  } else if (state.riskValue < 60) {
    grade = 'C';
    title = '风险传播者';
    desc = '你的多个选择增加了法律风险。需要认识到网络传播的法律后果，谨慎对待每一条信息。';
    gradeBadge.className = 'grade-badge grade-c';
  } else {
    grade = 'D';
    title = '高危传播者';
    desc = '你的选择导致了严重的法律风险。必须认识到网络不是法外之地，传播行为必须承担法律责任。';
    gradeBadge.className = 'grade-badge grade-d';
  }

  gradeBadge.textContent = grade;
  gradeTitle.textContent = title;
  gradeDesc.textContent = desc;
}

function renderRiskSummary() {
  const report = $('#riskReport');
  if (!report) return;
  report.innerHTML = '';

  const categories = Object.values(lawData);
  categories.forEach((cat) => {
    if (cat.count > 0) {
      const item = document.createElement('div');
      item.className = 'risk-report-item';
      const color = cat.count >= 3 ? '#ef4444' : cat.count >= 2 ? '#f59e0b' : '#22c55e';
      item.innerHTML = `
        <div class="risk-report-dot" style="background:${color}"></div>
        <div class="risk-report-name">${cat.icon} ${cat.name}</div>
        <div class="risk-report-score" style="color:${color}">${cat.count}次</div>
      `;
      report.appendChild(item);
    }
  });

  const totalItem = document.createElement('div');
  totalItem.className = 'risk-report-item';
  totalItem.style.borderTop = '2px solid #333';
  totalItem.style.marginTop = '4px';
  totalItem.style.paddingTop = '8px';
  totalItem.style.fontWeight = '700';
  const totalColor =
    state.riskValue >= 60 ? '#ef4444' : state.riskValue >= 30 ? '#f59e0b' : '#22c55e';
  totalItem.innerHTML = `
    <div class="risk-report-dot" style="background:${totalColor}"></div>
    <div class="risk-report-name">总法律风险值</div>
    <div class="risk-report-score" style="color:${totalColor}">${state.riskValue}/100</div>
  `;
  report.appendChild(totalItem);
}

function renderRiskSummaryCard() {
  const stats = $('#summaryStats');
  if (!stats) return;
  stats.innerHTML = '';

  const highRiskCount = state.choices.filter((c) => c.delta > 0).length;
  const safeCount = state.choices.filter((c) => c.delta < 0).length;
  const neutralCount = state.choices.filter((c) => c.delta === 0).length;

  const statItems = [
    { value: state.riskValue, label: '总风险值', color: state.riskValue >= 60 ? 'red' : state.riskValue >= 30 ? 'yellow' : 'green' },
    { value: highRiskCount, label: '高风险选择', color: 'red' },
    { value: safeCount, label: '安全选择', color: 'green' },
  ];

  statItems.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'stat-item';
    div.innerHTML = `
      <span class="stat-value ${item.color}">${item.value}</span>
      <span class="stat-label">${item.label}</span>
    `;
    stats.appendChild(div);
  });

  // 法律知识点总结 - 根据实际违规情况动态生成
  const legalPoints = $('#summaryLegalPoints');
  legalPoints.innerHTML = '';

  // 基础法律知识
  const basePoints = [
    { icon: '📢', text: '名誉权：不得以侮辱、诽谤等方式侵害他人名誉（《民法典》第1024条）' },
    { icon: '🔒', text: '隐私权：不得非法泄露他人隐私信息（《民法典》第1032条）' },
    { icon: '🖼️', text: '肖像权：不得利用AI技术伪造他人肖像（《民法典》第1019条）' },
  ];

  // 根据实际违规情况添加针对性建议
  const advicePoints = [];
  if (lawData.privacy.count > 0) {
    advicePoints.push({ icon: '⚠️', text: `你涉及${lawData.privacy.count}次隐私权相关行为，请注意保护他人隐私信息` });
  }
  if (lawData.defamation.count > 0) {
    advicePoints.push({ icon: '⚠️', text: `你涉及${lawData.defamation.count}次名誉权相关行为，请勿传播未经证实的信息` });
  }
  if (lawData.portrait.count > 0) {
    advicePoints.push({ icon: '⚠️', text: `你涉及${lawData.portrait.count}次肖像权相关行为，请尊重他人肖像权` });
  }
  if (lawData.cyberviolence.count > 0) {
    advicePoints.push({ icon: '🚨', text: `你涉及${lawData.cyberviolence.count}次网络暴力相关行为，网络暴力已入刑` });
  }

  // 渲染基础法律知识
  basePoints.forEach((pt) => {
    const div = document.createElement('div');
    div.className = 'legal-point';
    div.innerHTML = `
      <span class="legal-point-icon">${pt.icon}</span>
      <span>${pt.text}</span>
    `;
    legalPoints.appendChild(div);
  });

  // 渲染针对性建议
  if (advicePoints.length > 0) {
    const divider = document.createElement('div');
    divider.className = 'legal-point';
    divider.style.borderTop = '1px solid rgba(255,255,255,0.1)';
    divider.style.marginTop = '8px';
    divider.style.paddingTop = '12px';
    divider.innerHTML = `<span class="legal-point-icon">📋</span><span style="font-weight:600;color:var(--accent-yellow)">你的行为分析</span>`;
    legalPoints.appendChild(divider);

    advicePoints.forEach((pt) => {
      const div = document.createElement('div');
      div.className = 'legal-point';
      div.innerHTML = `
        <span class="legal-point-icon">${pt.icon}</span>
        <span>${pt.text}</span>
      `;
      legalPoints.appendChild(div);
    });
  }

  // 添加普法总结
  const summaryDivider = document.createElement('div');
  summaryDivider.className = 'legal-point';
  summaryDivider.style.borderTop = '1px solid rgba(255,255,255,0.1)';
  summaryDivider.style.marginTop = '8px';
  summaryDivider.style.paddingTop = '12px';
  summaryDivider.innerHTML = `<span class="legal-point-icon">⚖️</span><span style="font-weight:600;color:var(--accent-blue)">普法总结</span>`;
  legalPoints.appendChild(summaryDivider);

  const summaryText = document.createElement('div');
  summaryText.className = 'legal-point';
  summaryText.style.lineHeight = '1.6';
  summaryText.innerHTML = `<span>网络不是法外之地。作为网络用户，我们应当：增强法律意识，不传播未经证实的信息；尊重他人隐私、名誉、肖像等合法权益；遇到网络暴力时勇于举报；发现虚假信息时主动辟谣。让我们共同营造清朗的网络空间。</span>`;
  legalPoints.appendChild(summaryText);
}

function drawRiskChart() {
  const canvas = $('#riskCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 100;

  ctx.clearRect(0, 0, size, size);

  const categories = Object.values(lawData).filter((c) => c.count > 0);
  if (categories.length === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34,197,94,0.2)';
    ctx.fill();
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('传播行为合规', cx, cy + 5);
    return;
  }

  const total = categories.reduce((s, c) => s + c.count, 0);
  const colors = ['#ef4444', '#f59e0b', '#a855f7', '#4f8cff', '#22c55e', '#f97316'];
  let startAngle = -Math.PI / 2;

  categories.forEach((cat, i) => {
    const slice = (cat.count / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    const midAngle = startAngle + slice / 2;
    const lx = cx + (radius + 30) * Math.cos(midAngle);
    const ly = cy + (radius + 30) * Math.sin(midAngle);
    ctx.fillStyle = '#fff';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(cat.name, lx, ly);
    ctx.fillText(cat.count + '次', lx, ly + 14);

    startAngle += slice;
  });

  ctx.beginPath();
  ctx.arc(cx, cy, 50, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a1a';
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(state.riskValue, cx, cy + 2);
  ctx.font = '10px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('风险值', cx, cy + 16);
}

// ==================== 截图导出 ====================
function exportScreenshot() {
  playSound('click');
  const card = $('#verdictCard');
  if (!card) return;

  html2canvas(card, {
    backgroundColor: '#faf8f0',
    scale: 2,
    useCORS: true,
  }).then((canvas) => {
    const link = document.createElement('a');
    link.download = '判决书_朋友圈法庭.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('📥', '判决书已导出');
  });
}

// ==================== 重启 ====================
function restart() {
  playSound('click');
  state.currentScene = 0;
  state.riskValue = 0;
  state.choices = [];
  state.trialPhase = 0;
  state.knowledgeViewed.clear();
  currentTrialStep = 0;

  Object.keys(lawData).forEach((k) => (lawData[k].count = 0));

  $$('.choice-btn').forEach((btn) => {
    btn.style.pointerEvents = '';
    btn.style.opacity = '';
    btn.classList.remove('selected', 'risk-positive', 'risk-negative');
  });

  $$('.law-hint').forEach((h) => h.classList.remove('visible'));

  $$('.trial-phase').forEach((el) => el.classList.add('hidden'));

  $('#riskIndicator').classList.remove('visible');
  $('#riskValue').textContent = '0';
  $('#riskFill').style.width = '0%';
  $('#choiceHistory').classList.remove('visible');
  $('#topNav').classList.remove('visible');

  showScene(0);
}

// ==================== 分享 ====================
function shareExperience() {
  playSound('click');
  if (navigator.share) {
    navigator.share({
      title: '如果你的朋友圈能上法庭',
      text: `传播伦理普法互动体验 - 我的法律风险值: ${state.riskValue}/100`,
      url: window.location.href,
    });
  } else {
    const text = `如果你的朋友圈能上法庭 - 传播伦理普法互动体验 | 我的法律风险值: ${state.riskValue}/100`;
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋', '分享文案已复制到剪贴板');
    }).catch(() => {
      showToast('📤', '请手动复制链接分享');
    });
  }
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();

  // 初始化音频上下文
  try {
    audioCtx = new AudioCtx();
  } catch (e) {}

  // 音频开关
  $('#audioToggle').addEventListener('click', () => {
    state.audioEnabled = !state.audioEnabled;
    $('#audioToggle').textContent = state.audioEnabled ? '🔊' : '🔇';
    $('#audioToggle').classList.toggle('muted', !state.audioEnabled);
  });

  // 加载屏幕
  setTimeout(() => {
    $('#loadingScreen').classList.add('hidden');
  }, 1800);

  // 开始按钮
  $('#btnStart').addEventListener('click', () => {
    playSound('click');
    showScene(1);
  });

  // 选择按钮
  $$('.choice-btn').forEach((btn) => {
    btn.addEventListener('click', () => handleChoice(btn));
  });

  // 审判继续按钮
  $('#btnTrialNext').addEventListener('click', advanceTrial);

  // 判决页面按钮
  $('#btnExport').addEventListener('click', exportScreenshot);
  $('#btnRestart').addEventListener('click', restart);
  $('#btnShare').addEventListener('click', shareExperience);

  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeKnowledge();
    }
  });

  // 序幕动画
  if (typeof gsap !== 'undefined') {
    gsap.from('.prelude-desc p', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.3,
      delay: 1.5,
    });
    gsap.from('.prelude-features', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 2.5,
    });
    gsap.from('.btn-start', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 3.5,
    });
  }
});
/* 토닥토닥 메타버스 방탈출게임 — 맵을 열면 시작 버튼을 누를 때까지 보이는 영화 포스터 */
(function(){
  const P={
    'library':{ep:1,title:'가남교육도서관',tag:'도서관 문이 닫힌 오후,\n책장 사이에 숨은 단서를 찾아라',eng:'GANAM LIBRARY · THE LOCKED VAULT',mission:'단서 4개를 모아 비밀서고 금고를 열어라',credit:'무대 가남교육도서관 1~3층 · 출연 중학생 20명',accent:'#f0b84a',font:'sans'},
    'little-prince':{ep:2,title:'어린왕자',tag:'별과 별 사이를 건너,\n장미가 기다리는 별로 돌아가라',eng:'THE LITTLE PRINCE · BACK TO B612',mission:'별 조각 4개를 모아 B612의 귀환 장치를 켜라',credit:'원작 앙투안 드 생텍쥐페리 · 출연 중학생 20명 · 무대 사막에서 소행성 B612까지',accent:'#f2c14e',font:'serif'},
    'human-acts':{ep:3,title:'소년이 온다',tag:'그해 오월의 언덕 마을,\n흩어진 기억을 한 권으로 잇다',eng:'HUMAN ACTS · THE BOOK OF MEMORY',mission:'기억 조각 4개를 모아 기억의 책을 완성하라',credit:'원작 한강 『소년이 온다』 · 출연 중학생 20명 · 무대 오월의 언덕 마을',accent:'#f2a65a',font:'serif'},
    'star-night':{ep:4,title:'별 헤는 밤',tag:'등불 켜진 언덕을 올라,\n시인이 헤던 별을 다시 잇다',eng:'COUNTING THE STARS AT NIGHT',mission:'별 4개를 모아 별자리를 완성하라',credit:'원작 윤동주 「별 헤는 밤」 · 출연 중학생 20명 · 무대 별빛 언덕 마을',accent:'#9fc4ff',font:'serif'},
    'hong-gildong':{ep:5,title:'홍길동전',tag:'아버지를 아버지라 부르지 못한 소년,\n바다 건너 나라를 세우다',eng:'HONG GILDONG · THE WAY OF HWALBIN',mission:'활빈 표식 4개를 모아 율도국 옥새를 찾아라',credit:'원작 허균 · 출연 중학생 20명 · 무대 조선 팔도와 율도국',accent:'#e2b04a',font:'serif'},
    'rabbit-turtle':{ep:6,title:'별주부전',tag:'용왕을 살릴 약은 토끼의 간,\n살아 돌아갈 길은 토끼의 꾀',eng:'THE TURTLE AND THE RABBIT',mission:'진주 4개를 모아 토끼의 꾀를 풀어라',credit:'원작 판소리 「수궁가」·소설 『토끼전』 · 출연 중학생 20명 · 무대 바닷속 용궁에서 산골짜기까지',accent:'#8fe0f0',font:'serif'},
    'alice':{ep:7,title:'이상한 나라의 앨리스',tag:'흰 토끼를 따라 떨어진 순간,\n모든 규칙이 뒤집힌다',eng:"ALICE'S ADVENTURES IN WONDERLAND",mission:'하트 카드 4장을 모아 재판을 끝내라',credit:'원작 루이스 캐럴 · 출연 중학생 20명 · 무대 토끼굴 아래 이상한 나라',accent:'#ff6b81',font:'sans'},
    'eighty-days':{ep:8,title:'80일간의 세계일주',tag:'2만 파운드를 건 내기,\n80일 안에 지구를 한 바퀴 돌아라',eng:'AROUND THE WORLD IN EIGHTY DAYS',mission:'여권 도장 4개를 모아 귀환 시각을 맞춰라',credit:'원작 쥘 베른 · 출연 중학생 20명 · 무대 런던에서 런던까지',accent:'#f0c45a',font:'sans'},
    'sherlock':{ep:9,title:'셜록 홈즈',tag:'안개 낀 런던의 일곱 사건,\n마지막 추리는 폭포 끝에서',eng:'SHERLOCK HOLMES · THE BAKER STREET CASEBOOK',mission:'증거 4개를 모아 마지막 추리를 끝내라',credit:'원작 아서 코넌 도일 · 출연 중학생 20명 · 무대 런던에서 라이헨바흐까지',accent:'#e0c27a',font:'serif'},
    'bari':{ep:10,title:'바리데기',tag:'버려진 일곱째 공주,\n저승 끝에서 생명을 길어 오다',eng:'BARIDEGI · THE WATER OF LIFE',mission:'생명꽃 4송이를 모아 약수 우물에서 되살려라',credit:'원작 서사무가 「바리데기」 · 출연 중학생 20명 · 무대 이승에서 서천서역국까지',accent:'#f2a6c0',font:'serif'},
    'dadada':{season:2,ep:1,title:'다다다 다른 별 학교',tag:'모두 다른 별에서 온 우리 반,\n흩어진 별 스티커를 찾아라',eng:'DADADA · THE SCHOOL OF DIFFERENT STARS',mission:'별 스티커 4장을 모아 우리 반 별자리 지도를 완성하라',credit:'원작 윤진현 『다다다 다른 별 학교』(천개의바람) · 출연 초등학생 20명 · 무대 다른 별 학교 교실에서 나의 별까지',accent:'#ff8ac2',font:'serif',rate:'초등학생 관람가'},
    'baekseok':{season:2,ep:2,title:'백석의 길',tag:'경성에서 통영으로, 정주에서 만주로,\n시인이 걸어간 길을 따라가라',eng:'BAEK SEOK · FROM GYEONGSEONG TO MANCHURIA',mission:'시 카드 5장을 모아 백석 시 지도를 완성하라',credit:'백석의 시 세계 · 출연 중학생 20명 · 무대 경성에서 만주까지 · 난이도 중 (4단계 12곳)',accent:'#d9c7a0',font:'serif'}
  };
  const css=`
#tdPoster{position:fixed;inset:0;z-index:30;display:none;background:#0b0d12;color:#f4efe4;font-family:'Noto Sans KR',system-ui,sans-serif;overflow:hidden}
#tdPoster .bg{position:absolute;inset:0;background-size:cover;background-position:center}
#tdPoster .sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,10,16,.85) 0%,rgba(8,10,16,.12) 28%,rgba(8,10,16,.06) 46%,rgba(8,10,16,.82) 68%,rgba(8,10,16,.97) 100%)}
#tdPoster.nobg .sh{background:linear-gradient(180deg,rgba(8,10,16,.88),rgba(8,10,16,.55) 40%,rgba(8,10,16,.95))}
#tdPoster .in{position:absolute;inset:0;margin:0 auto;max-width:560px;box-sizing:border-box;padding:max(20px,env(safe-area-inset-top)) 24px max(18px,env(safe-area-inset-bottom));display:flex;flex-direction:column}
#tdPoster .top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
#tdPoster .brand{display:flex;flex-direction:column;gap:2px}
#tdPoster .brand b{font-family:'Black Han Sans','Noto Sans KR',sans-serif;font-weight:400;font-size:26px;line-height:1.1;letter-spacing:.04em}
#tdPoster .brand{min-width:0} #tdPoster .brand span{font-size:10.5px;letter-spacing:.06em;font-weight:700;white-space:nowrap}
#tdPoster select{appearance:none;-webkit-appearance:none;border:1px solid rgba(244,239,228,.5);background:rgba(8,10,16,.4);color:#f4efe4;border-radius:999px;padding:0 14px;min-height:44px;font:inherit;font-size:12.5px;max-width:38%;flex:0 0 auto}
#tdPoster select option{color:#111}
#tdPoster .tag{margin-top:16px;font-family:'Noto Serif KR',serif;font-weight:600;font-size:clamp(16px,4.6vw,21px);line-height:1.5;text-align:center;white-space:pre-line}
#tdPoster .sp{flex:1}
#tdPoster .kick{text-align:center;font-size:10.5px;letter-spacing:.4em;font-weight:700}
#tdPoster h1{margin:6px 0 0;text-align:center;font-size:clamp(46px,17vw,96px);line-height:1.05;color:#fbf6ea;word-break:keep-all}
#tdPoster h1.serif{font-family:'Noto Serif KR',serif;font-weight:900}
#tdPoster h1.sans{font-family:'Black Han Sans','Noto Sans KR',sans-serif;font-weight:400}
#tdPoster h1.long{font-size:clamp(36px,11vw,64px)}
#tdPoster .eng{margin-top:8px;text-align:center;font-size:11px;letter-spacing:.24em}
#tdPoster .mis{margin-top:16px;text-align:center;font-size:15px;font-weight:700}
#tdPoster .teams{margin-top:10px;display:flex;justify-content:center;flex-wrap:wrap;gap:6px 14px;font-size:12.5px;color:#e6e0d2}
#tdPoster .teams i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;vertical-align:-1px}
#tdPoster .cr{margin-top:14px;border-top:1px solid rgba(244,239,228,.28);padding-top:10px;text-align:center;font-size:10.5px;line-height:1.6;color:#c9c3b6}
#tdPoster .cr .mk{color:#f4efe4;font-weight:500}
#tdPoster .go{margin-top:14px;border:none;border-radius:999px;min-height:52px;color:#14110c;font:inherit;font-size:17px;font-weight:700;cursor:pointer}
#tdPoster .row{margin-top:10px;display:flex;gap:8px}
#tdPoster .row button{flex:1;min-height:44px;border:1px solid rgba(244,239,228,.45);border-radius:999px;background:transparent;color:#f4efe4;font:inherit;font-size:13.5px;cursor:pointer}
#tdPoster .rate{display:inline-block;border:1.5px solid #f4efe4;border-radius:4px;padding:2px 6px;font-size:10.5px;font-weight:700;margin-right:6px}
@media (min-width:900px) and (min-height:700px){ #tdPoster .in{max-width:600px} }
`;
  let el=null, cb={};
  function ensure(){
    if(el) return el;
    const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    if(!document.querySelector('link[data-td-fonts]')){ const l=document.createElement('link'); l.rel='stylesheet'; l.dataset.tdFonts='1'; l.href='https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@600;900&display=swap'; document.head.appendChild(l); }
    el=document.createElement('div'); el.id='tdPoster'; el.setAttribute('role','dialog'); el.setAttribute('aria-label','게임 소개 포스터');
    el.innerHTML=`<div class="bg"></div><div class="sh"></div><div class="in">
      <div class="top"><div class="brand"><b>토닥토닥</b><span class="sub"></span></div><select aria-label="다른 맵 고르기"></select></div>
      <div class="tag"></div><div class="sp"></div>
      <div class="kick">TODAK TODAK METAVERSE ESCAPE</div><h1></h1><div class="eng"></div><div class="mis"></div><div class="teams"></div>
      <div class="cr"><div class="c1"></div><div>4팀 동시 탐험 · 제한 시간 <span class="min">60</span>분 · 힌트 팀당 3번 · <span class="rate">중학생 관람가</span></div><div class="mk">포스터 기획·제작 토닥토닥그림책도서관</div></div>
      <button type="button" class="go">▶ 게임 시작</button>
      <div class="row"><button type="button" class="rules">규칙 먼저 보기</button><button type="button" class="look">맵 둘러보기</button></div></div>`;
    document.body.appendChild(el);
    el.querySelector('.go').onclick=()=>{ hide(); cb.onStart&&cb.onStart(); };
    el.querySelector('.rules').onclick=()=>{ hide(); cb.onRules&&cb.onRules(); };
    el.querySelector('.look').onclick=()=>hide();
    el.querySelector('select').onchange=e=>{ const v=e.target.value; if(v&&cb.onPick) cb.onPick(v); };
    return el;
  }
  function esc(s){ return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function show(o){
    ensure(); cb=o; const d=P[o.id]||null, sc=o.scenario||{};
    const accent=(d&&d.accent)||'#f0c45a', title=(o.custom||!d)?(sc.title||'').replace(/\s*—.*$/,''):d.title;
    el.classList.toggle('nobg',!d||!!o.custom);
    el.querySelector('.bg').style.backgroundImage=(d&&!o.custom)?`url("${o.base}posters/${o.id}.jpg")`:'none';
    el.querySelector('.brand b').style.color=accent;
    el.querySelector('.sub').textContent='메타버스 방탈출게임'+(d&&!o.custom?` · 시즌 ${d.season||1} · 제${d.ep}편`:' · 우리가 만든 편');
    el.querySelector('.tag').textContent=(d&&!o.custom)?d.tag:(sc.subtitle||'');
    el.querySelector('.kick').style.color=accent; el.querySelector('.eng').style.color=accent;
    const h=el.querySelector('h1'); h.textContent=title; h.className=((d&&d.font)||'sans')+(title.length>7?' long':'');
    el.querySelector('.eng').textContent=(d&&!o.custom)?d.eng:'';
    el.querySelector('.mis').textContent=(d&&!o.custom)?d.mission:(sc.goalText||'');
    el.querySelector('.teams').innerHTML=(sc.teams||[]).map(t=>`<span><i style="background:${esc(t.color)}"></i>${esc(t.name)}</span>`).join('');
    el.querySelector('.c1').textContent=(d&&!o.custom)?d.credit:'출연 중학생 20명';
    el.querySelector('.min').textContent=Math.round((sc.limit||3600)/60);
    el.querySelector('.rate').textContent=(d&&!o.custom&&d.rate)||'중학생 관람가';
    el.querySelector('.go').style.background=accent;
    const s=el.querySelector('select'); s.innerHTML=`<option value="">다른 맵 ▾</option>`+(o.maps||[]).filter(m=>m.id!==o.id).map(m=>`<option value="${esc(m.id)}">${esc(m.title)}</option>`).join(''); s.value='';
    el.style.display='block';
  }
  function hide(){ if(el) el.style.display='none'; }
  function visible(){ return !!el && el.style.display==='block'; }
  window.TodakPoster={show,hide,visible,data:P};
})();

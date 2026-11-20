/* 토닥토닥 메타버스 방탈출게임 — 맵을 열면 시작 버튼을 누를 때까지 보이는 영화 포스터 */
(function(){
  const P={
    'library':{sp:1,ep:1,title:'지구마을도서관',tag:'도서관 문이 닫힌 오후,\n책장 사이에 숨은 단서를 찾아라',eng:'EARTHVILLAGE LIBRARY · THE LOCKED VAULT',mission:'단서 4개를 모아 비밀서고 금고를 열어라',credit:'무대 지구마을도서관 1~3층 · 출연 중학생 20명',accent:'#f0b84a',font:'sans'},
    'little-prince':{ep:1,title:'어린왕자',tag:'별과 별 사이를 건너,\n장미가 기다리는 별로 돌아가라',eng:'THE LITTLE PRINCE · BACK TO B612',mission:'별 조각 4개를 모아 B612의 귀환 장치를 켜라',credit:'원작 앙투안 드 생텍쥐페리 · 출연 중학생 20명 · 무대 사막에서 소행성 B612까지',accent:'#f2c14e',font:'serif'},
    'human-acts':{sp:2,ep:2,title:'소년이 온다',tag:'두 갈래로 엇갈리는 목소리,\n흩어진 기억을 한 권으로 잇다',eng:'HUMAN ACTS · THE BOOK OF MEMORY',mission:'기억 조각 4개를 모아 기억의 책을 완성하라',credit:'원작 한강 『소년이 온다』 · 출연 중학생 20명 · 무대 두 갈래 골목길',accent:'#f2a65a',font:'serif'},
    'star-night':{season:2,ep:3,title:'별 헤는 밤',tag:'북두칠성 일곱 별을 따라,\n북극성에서 시인의 별을 잇다',eng:'COUNTING THE STARS AT NIGHT',mission:'별 4개를 모아 별자리를 완성하라',credit:'원작 윤동주 「별 헤는 밤」 · 출연 중학생 20명 · 무대 북두칠성 별길',accent:'#9fc4ff',font:'serif'},
    'hong-gildong':{ep:3,title:'홍길동전',tag:'아버지를 아버지라 부르지 못한 소년,\n바다 건너 나라를 세우다',eng:'HONG GILDONG · THE WAY OF HWALBIN',mission:'활빈 표식 4개를 모아 율도국 옥새를 찾아라',credit:'원작 허균 · 출연 중학생 20명 · 무대 Y자로 갈라진 팔도 길과 율도국',accent:'#e2b04a',font:'serif'},
    'rabbit-turtle':{ep:4,title:'별주부전',tag:'용왕을 살릴 약은 토끼의 간,\n살아 돌아갈 길은 토끼의 꾀',eng:'THE TURTLE AND THE RABBIT',mission:'진주 4개를 모아 토끼의 꾀를 풀어라',credit:'원작 판소리 「수궁가」·소설 『토끼전』 · 출연 중학생 20명 · 무대 바닷속에서 산으로 오르는 사다리 길',accent:'#8fe0f0',font:'serif'},
    'alice':{season:3,ep:4,title:'이상한 나라의 앨리스',tag:'흰 토끼를 따라 떨어진 순간,\n모든 규칙이 뒤집힌다',eng:"ALICE'S ADVENTURES IN WONDERLAND",mission:'하트 카드 4장을 모아 재판을 끝내라',credit:'원작 루이스 캐럴 · 출연 중학생 20명 · 무대 빙글빙글 토끼굴 나선 내리막',accent:'#ff6b81',font:'sans'},
    'eighty-days':{season:3,ep:5,title:'80일간의 세계일주',tag:'2만 파운드를 건 내기,\n80일 안에 지구를 한 바퀴 돌아라',eng:'AROUND THE WORLD IN EIGHTY DAYS',mission:'여권 도장 4개를 모아 귀환 시각을 맞춰라',credit:'원작 쥘 베른 · 출연 중학생 20명 · 무대 지구 한 바퀴, 런던에서 런던까지',accent:'#f0c45a',font:'sans'},
    'sherlock':{season:3,ep:9,title:'셜록 홈즈',tag:'안개 낀 런던의 일곱 사건,\n마지막 추리는 폭포 끝에서',eng:'SHERLOCK HOLMES · THE BAKER STREET CASEBOOK',mission:'증거 4개를 모아 마지막 추리를 끝내라',credit:'원작 아서 코넌 도일 · 출연 중학생 20명 · 무대 바둑판 런던 거리에서 라이헨바흐까지',accent:'#e0c27a',font:'serif'},
    'bari':{ep:5,title:'바리데기',tag:'버려진 일곱째 공주,\n저승 끝에서 생명을 길어 오다',eng:'BARIDEGI · THE WATER OF LIFE',mission:'생명꽃 4송이를 모아 약수 우물에서 되살려라',credit:'원작 서사무가 「바리데기」 · 출연 중학생 20명 · 무대 저승 골짜기를 지나는 V자 길',accent:'#f2a6c0',font:'serif'},
    'dadada':{sp:3,ep:3,title:'다다다 다른 별 학교',tag:'모두 다른 별에서 온 우리 반,\n흩어진 별 스티커를 찾아라',eng:'DADADA · THE SCHOOL OF DIFFERENT STARS',mission:'별 스티커 2장을 모아 우리 반 별자리 지도를 완성하라',credit:'원작 윤진현 『다다다 다른 별 학교』(천개의바람) · 출연 초등학생 20명 · 무대 교실 광장과 친구들의 별 · 입문 (2단계)',accent:'#ff8ac2',font:'serif',rate:'초등학생 관람가'},
    'baekseok':{season:2,ep:1,title:'백석의 길',tag:'경성에서 통영으로, 정주에서 만주로,\n시인이 걸어간 길을 따라가라',eng:'BAEK SEOK · FROM GYEONGSEONG TO MANCHURIA',mission:'시 카드 5장을 모아 백석 시 지도를 완성하라',credit:'백석의 시 세계 · 출연 중학생 20명 · 무대 경성에서 만주까지 · 난이도 중 (4단계 12곳)',accent:'#d9c7a0',font:'serif'},
    'dongbaek':{season:2,ep:2,title:'동백꽃',tag:'느 집엔 이거 없지?\n감자 세 알에서 시작된 산골 마을 닭싸움',eng:'CAMELLIA · THE VILLAGE LOOP',mission:'닭 깃털 4개를 모아 화해의 동백꽃 다발을 완성하라',credit:'원작 김유정 「동백꽃」(1936) · 출연 중학생 20명 · 무대 강원도 산골 마을 고리길 · 기본 (3단계 10곳)',accent:'#e8c547',font:'serif'},
    'shirt':{ep:2,title:'만년 샤쓰',tag:'셔츠가 없어도 웃으며 대답하는 아이,\n창남이의 겨울 등굣길',eng:'THE EVERLASTING SHIRT',mission:'셔츠 단추 2개를 찾아 만년 샤쓰 칭찬 배지를 완성하라',credit:'원작 방정환 「만년 샤쓰」 · 출연 초등학생 20명 · 무대 창남이네 골목에서 학교 운동장까지 · 입문 (2단계 8곳)',accent:'#9fc7e8',font:'serif',rate:'초등학생 관람가'},
    'simcheong':{ep:6,title:'심청전',tag:'공양미 삼백 석에 몸을 던진 딸,\n연꽃을 타고 다시 피어나다',eng:'SIMCHEONG · THE DEVOTED DAUGHTER',mission:'연꽃잎 4장을 모아 아버지를 찾아라',credit:'원작 판소리계 소설 「심청전」 · 출연 중학생 20명 · 무대 도화동에서 인당수를 지나 황궁까지 · 기본 (3단계 7곳)',accent:'#f2a6c0',font:'serif'},
    'chunhyang':{ep:7,title:'춘향전',tag:'단옷날 그네 위에서 시작된 약속,\n어사출두로 끝나다',eng:'CHUNHYANG · THE FAITHFUL HEART',mission:'가락지 조각 4개를 모아 어사출두를 외쳐라',credit:'원작 판소리계 소설 「춘향전」 · 출연 중학생 20명 · 무대 8자로 이어진 남원 · 도전 (4단계 9곳)',accent:'#f27a8a',font:'serif'},
    'heungbu':{ep:8,title:'흥부전',tag:'다친 제비를 고쳐 준 착한 마음,\n박 속에서 복이 쏟아지다',eng:'HEUNGBU AND NOLBU',mission:'박씨 2개를 모아 형제 잔치를 열어라',credit:'원작 판소리계 소설 「흥부전」 · 출연 초등학생 20명 · 무대 박 넝쿨 등뼈 길 · 입문 (2단계 6곳)',accent:'#e8c84a',font:'serif',rate:'초등학생 관람가'},
    'guunmong':{ep:9,title:'구운몽',tag:'여덟 선녀와 한 번의 생,\n깨어 보니 한바탕 꿈',eng:'GUUNMONG · THE CLOUD DREAM OF THE NINE',mission:'꿈 구슬 5개를 모아 꿈에서 깨어나라',credit:'원작 김만중 「구운몽」 · 출연 고등학생 20명 · 무대 연화봉 꿈길 나선 · 심화 (5단계 11곳)',accent:'#c8a8f0',font:'serif',rate:'고등학생 관람가'},
    'odyssey':{season:3,ep:1,title:'오디세이아',tag:'전쟁은 10년, 귀향도 10년,\n막다른 섬을 피해 이타카로',eng:'THE ODYSSEY',mission:'올리브 잎 4장을 모아 이타카로 돌아가라',credit:'원작 호메로스 『오디세이아』 · 출연 중학생 20명 · 무대 지중해 섬 미로 · 도전 (4단계 9곳)',accent:'#6ac0e8',font:'serif'},
    'gulliver':{season:3,ep:3,title:'걸리버 여행기',tag:'손바닥만 한 사람, 열두 배 큰 거인,\n하늘 섬과 말의 나라',eng:"GULLIVER'S TRAVELS",mission:'지도 조각 4장을 모아 항해 지도를 완성하라',credit:'원작 조너선 스위프트 · 출연 중학생 20명 · 무대 네 나라 지그재그 계단 · 기본 (4단계 8곳)',accent:'#9fd08a',font:'sans'},
    'treasure':{season:3,ep:7,title:'보물섬',tag:'외다리 요리사와 앵무새,\nX 표시 아래 잠든 보물',eng:'TREASURE ISLAND',mission:'금화 4닢을 모아 보물 구덩이를 찾아라',credit:'원작 로버트 루이스 스티븐슨 · 출연 중학생 20명 · 무대 X자로 엇갈린 보물섬 · 기본 (3단계 8곳)',accent:'#f2c25a',font:'sans'},
    'robinson':{season:3,ep:2,title:'로빈슨 크루소',tag:'폭풍이 남긴 무인도의 28년,\n모래 위 발자국 하나',eng:'ROBINSON CRUSOE',mission:'눈금 막대 3개를 모아 구조선에 올라라',credit:'원작 대니얼 디포 · 출연 중학생 20명 · 무대 해변에서 세 갈래로 뻗은 삼지창 섬길 · 기본 (3단계 8곳)',accent:'#e8c87a',font:'sans'},
    'tomsawyer':{season:3,ep:6,title:'톰 소여의 모험',tag:'울타리 칠하기부터 동굴 속 보물까지,\n미시시피 강가의 장난꾸러기',eng:'THE ADVENTURES OF TOM SAWYER',mission:'동전 4개를 모아 동굴 속 보물을 찾아라',credit:'원작 마크 트웨인 · 출연 중학생 20명 · 무대 마을 큰길과 열쇠 구멍 동굴 · 기본 (3단계 10곳)',accent:'#e8a85a',font:'sans'},
    'oz':{season:3,ep:10,title:'오즈의 마법사',tag:'회오리바람에 날아간 소녀,\n노란 벽돌 길 끝에서 집을 찾다',eng:'THE WONDERFUL WIZARD OF OZ',mission:'노란 벽돌 2장을 모아 집으로 가는 길을 찾아라',credit:'원작 L. 프랭크 바움 · 출연 초등학생 20명 · 무대 S자 노란 벽돌 길 · 입문 (2단계 6곳)',accent:'#7ad89a',font:'sans',rate:'초등학생 관람가'},
    'pinocchio':{season:3,ep:8,title:'피노키오의 모험',tag:'거짓말하면 길어지는 코,\n유혹의 길과 바다의 길 사이',eng:'THE ADVENTURES OF PINOCCHIO',mission:'파란 별 4개를 모아 진짜 소년이 되어라',credit:'원작 카를로 콜로디 · 출연 초등학생 20명 · 무대 T자 유혹의 갈림길 · 기본 (3단계 7곳)',accent:'#8ab8f0',font:'sans',rate:'초등학생 관람가'},
    'wings':{season:2,ep:4,title:'날개',tag:'날자. 날자. 한 번만 더 날자꾸나.\n33번지 윗방에서 미쓰코시 옥상까지',eng:'WINGS · THE GYEONGSEONG MAZE',mission:'은화 6개를 모아 다시 날개를 돋게 하라',credit:'원작 이상 「날개」(1936) · 출연 고등학생·독서 동아리 20명 · 무대 경성 골목 미로 · 심화 (5단계 15곳)',accent:'#c9d4e0',font:'serif',rate:'고등학생 관람가'},
    'azalea':{season:2,ep:5,title:'진달래꽃',tag:'영변에 약산 진달래꽃,\n아름 따다 가실 길에 뿌리우리다',eng:'AZALEAS · THE SPIRAL PATH OF YAKSAN',mission:'진달래 꽃잎 4장을 모아 정상에 꽃길을 깔아라',credit:'원작 김소월 「진달래꽃」 「엄마야 누나야」 「산유화」 「가는 길」 · 출연 중학생 20명 · 무대 영변 약산 나선길 · 기본 (3단계 10곳)',accent:'#f08aaa',font:'serif'},
    'lucky':{season:2,ep:6,title:'운수 좋은 날',tag:'손님이 끊이지 않는 이상한 날,\n설렁탕 한 그릇을 들고 집으로',eng:'A LUCKY DAY · THE RICKSHAW ROAD',mission:'동전 4개를 모아 설렁탕 한 그릇을 집에 가져가라',credit:'원작 현진건 「운수 좋은 날」(1924) · 출연 중학생 20명 · 무대 동소문 안에서 남대문 정거장까지 · 도전 (4단계 10곳)',accent:'#b8c4cc',font:'serif'},    'hyangsu':{season:2,ep:7,title:'향수',tag:'넓은 벌 동쪽 끝으로\n실개천이 회돌아 나가는 곳',eng:'NOSTALGIA · ISLANDS OF THE LITTLE STREAM',mission:'그림엽서 2장을 모아 고향 그림책을 완성하라',credit:'원작 정지용 「향수」 · 출연 초등 고학년·중학생 20명 · 무대 실개천 섬 마을 · 입문 (2단계 8곳)',accent:'#e8c890',font:'serif',rate:'초등학생 관람가'},
    'memil':{season:2,ep:8,title:'메밀꽃 필 무렵',tag:'소금을 뿌린 듯 흐붓한 달빛,\n봉평에서 대화까지 팔십 리 밤길',eng:'WHEN BUCKWHEAT FLOWERS BLOOM',mission:'엽전 4닢을 모아 대화장에 닿아라',credit:'원작 이효석 「메밀꽃 필 무렵」(1936) · 출연 중학생 20명 · 무대 봉평에서 대화까지 · 도전 (4단계 10곳)',accent:'#e8eef4',font:'serif'},
    'sangnoksu':{season:2,ep:9,title:'상록수',tag:'마주 보는 두 마을,\n함께 심는 늘 푸른 꿈',eng:'THE EVERGREEN · TWIN VILLAGES',mission:'배움의 씨앗 4개를 모아 상록수의 다짐을 완성하라',credit:'원작 심훈 「상록수」(1935) · 출연 중학생 20명 · 무대 청석골과 한곡리 · 기본 (3단계 10곳)',accent:'#7ac07a',font:'serif'},
    'taepyeong':{season:2,ep:10,title:'태평천하',tag:'이 태평천하에!\n담장을 한 겹씩 넘어 금고방으로',eng:'PEACE UNDER HEAVEN · THE INNER COURTS',mission:'열쇠 4개를 모아 한가운데 금고를 열어라',credit:'원작 채만식 「태평천하」(1938) · 출연 중학생 20명 · 무대 윤 직원 영감 댁 · 도전 (4단계 12곳)',accent:'#d8b878',font:'serif'},
    'talchul':{season:2,ep:11,title:'탈출기',tag:'넓은 들판에서 좁은 골짜기로,\n김군에게 보내는 마지막 편지',eng:'ESCAPE · THE NARROWING VALLEY',mission:'편지 조각 6장을 모아 김군에게 쓰는 편지를 완성하라',credit:'원작 최서해 「탈출기」(1925) · 출연 고등학생·독서 동아리 20명 · 무대 간도의 골짜기 · 심화 (5단계 15곳)',accent:'#c8d0d8',font:'serif',rate:'고등학생 관람가'}
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
    el.querySelector('.sub').textContent='메타버스 방탈출게임'+(d&&!o.custom?(d.sp?` · 특별판 SP.${d.sp}`:` · 시즌 ${d.season||1} · 제${d.ep}편`):' · 우리가 만든 편');
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

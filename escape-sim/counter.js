/* 토닥토닥 메타버스 방탈출 — 접속자 카운터
   오늘 접속자: 오늘(한국 시간) 처음 들어온 기기 수
   총 접속자: 날마다 처음 들어온 기기 수를 모두 더한 값 (같은 기기가 매일 오면 매일 1씩)
   숫자는 무료 공개 카운터 Abacus(abacus.jasoncameron.dev)에 저장돼요. 가입·키 없음, 누구나 읽을 수 있는 숫자예요.
   주소에 ?nocount 를 붙이면 세지 않아요(촬영·시험용). */
(function(){
  const API='https://abacus.jasoncameron.dev', NS='todak-escape';
  const day=new Date(Date.now()+9*3600e3).toISOString().slice(0,10).replace(/-/g,'');   // 한국 날짜 YYYYMMDD
  const LSK='todakVisitDay';
  let last=null; try{ last=localStorage.getItem(LSK); }catch(_){}
  const skip=/[?&]nocount/.test(location.search) || navigator.webdriver;
  const first=!skip && last!==day;
  const op=first?'hit':'get';
  const get=u=>fetch(u,{cache:'no-store'}).then(r=>r.ok?r.json():(r.status===404?{value:0}:Promise.reject(r.status)));
  const fmtN=n=>Number(n||0).toLocaleString('ko-KR');
  function render(){
    const c=window.TodakCount; if(!c) return;
    const tip='오늘 접속자 · 총 접속자 (기기마다 하루 한 번 셈)';
    document.querySelectorAll('[data-todak-count]').forEach(el=>{ el.textContent=`👀 오늘 ${fmtN(c.today)} · 전체 ${fmtN(c.total)}`; el.title=tip; el.style.display=''; });
    document.querySelectorAll('[data-todak-count-short]').forEach(el=>{ el.innerHTML=`<span class="ic">👀 </span><span class="w">오늘 </span>${fmtN(c.today)} · <span class="w">전체 </span>${fmtN(c.total)}`; el.title=tip; el.hidden=false; });
  }
  function show(t,d){ window.TodakCount={today:d,total:t,day,render}; render(); }
  // 나중에 생기는 화면(시작 포스터 등)도 숫자를 받도록
  new MutationObserver(()=>{ if(window.TodakCount && document.querySelector('[data-todak-count-short][hidden],[data-todak-count][style*="none"]')) render(); }).observe(document.documentElement,{childList:true,subtree:true});
  function run(){
    Promise.all([get(`${API}/${op}/${NS}/total`), get(`${API}/${op}/${NS}/d${day}`)])
      .then(([t,d])=>{ if(first){ try{ localStorage.setItem(LSK,day); }catch(_){} } show(t.value,d.value); })
      .catch(()=>{});   // 카운터 서버가 안 되면 조용히 숨김 (게임에는 영향 없음)
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
})();

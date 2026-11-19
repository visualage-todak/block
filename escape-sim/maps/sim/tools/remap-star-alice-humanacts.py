import json, math
B='/home/claude/block/escape-sim/maps/sim/'
def load(mid): return json.load(open(B+f'maps/{mid}.json')), json.load(open(B+f'scenarios/{mid}.json'))
def save(mid,m,s):
    json.dump(m,open(B+f'maps/{mid}.json','w'),ensure_ascii=False,indent=1)
    json.dump(s,open(B+f'scenarios/{mid}.json','w'),ensure_ascii=False,indent=1)
def relayout(m,pos):
    by={p['id']:p for p in m['planets']}
    for i,(f,x,z,y) in pos.items():
        p=by[i]; p.update(f=f,x=x,z=z,y=y)
    # order planets by tier
    m['planets'].sort(key=lambda p:(p.get('final',False),p['f'],not p.get('start',False)))

# ---------- 별 헤는 밤 : 북두칠성 ----------
m,s=load('star-night')
# handle (Alkaid, Mizar) -> Alioth, Megrez, Phecda -> Merak, Dubhe -> Polaris(vault)
pos={"lobby":(0,-74,46,0),
 "kids":(0,-60,20,0.6),   # 요광(Alkaid)  명동촌 소학교
 "clubA":(0,-38,6,1.2),   # 개양(Mizar)   연희전문
 "cafe":(1,-16,-6,2.0),   # 옥형(Alioth)  자화상 우물
 "edu":(1,6,-18,2.8),     # 천권(Megrez)  서시의 방
 "stacks":(1,12,8,2.4),   # 천기(Phecda)  별 헤는 밤 언덕
 "clubB":(2,40,4,3.2),    # 천선(Merak)   육첩방
 "digital":(2,34,-26,4.2),# 천추(Dubhe)   마루 밑 원고
 "vault":(2,24,-78,7.5)}  # 북극성
relayout(m,pos)
m['bridges']=[["lobby","kids"],["kids","clubA"],["clubA","cafe"],["cafe","edu"],["edu","stacks"],["stacks","clubB"],["clubB","digital"],["digital","edu"],["digital","vault"]]
m['mountains']=[[0,-205,62,100],[-140,-95,46,62],[130,-115,50,72],[24,-100,12,36]]
m['extras']=[{"type":"sign","x":-84,"z":52,"text":"북두칠성 길","h":4},{"type":"sign","x":34,"z":-86,"text":"북극성","h":5},
 {"type":"sign","x":52,"z":-10,"text":"가리킴별 → 북극성","h":3.5},{"type":"mist","x":10,"z":-50}]
m['tiers']=["손잡이 별 (명동·연희)","국자 별 (시를 쓰던 가을)","가리킴 별 (바다 건너)"]
m['words']={"place":"별","link":"별길","layout":"북두칠성 모양 (손잡이 끝에서 출발해 국자를 돌고, 가리킴별 두 개를 따라 북극성으로)"}
m['roomNames']={"lobby":"마을 어귀 쉼터 (출발)","vault":"북극성 — 별을 헤는 마당 (최종)"}
m['goal']="손잡이 별 두 곳 가운데 1곳, 국자 별 세 곳 가운데 2곳, 가리킴 별 두 곳 가운데 1곳에서 별을 모아 모두 4개를 얻은 뒤, 가리킴별이 가리키는 북극성에서 별자리를 먼저 완성하는 팀이 이겨요."
R=s['rooms']
nm={"kids":"요광 — 명동촌 소학교","clubA":"개양 — 연희전문 교정","cafe":"옥형 — 자화상의 우물","edu":"천권 — 서시의 방","stacks":"천기 — 별 헤는 밤의 언덕","clubB":"천선 — 육첩방","digital":"천추 — 마루 밑 원고","vault":"북극성 — 별을 헤는 방"}
for k,v in nm.items(): R[k]['name']=v
s['subtitle']="독서 방탈출 · 중학생 20명 · 4팀 · 제한시간 60분 · 기본 · 3단계 7곳 · 북두칠성형"
s['story']=s['story'].replace("3층 '별을 헤는 방'","북두칠성 국자 끝 가리킴별이 가리키는 '북극성'").replace("도서관 곳곳에 시인의 삶과 시를 담은 방이 있어요.","북두칠성 일곱 별에 시인의 삶과 시를 담은 방이 하나씩 있어요. 손잡이 끝 요광에서 출발해 시인이 걸어온 차례대로 별을 따라가요.")
s['goalText']="북두칠성 일곱 별 가운데 손잡이 1곳·국자 2곳·가리킴별 1곳에서 별 4개를 모은 뒤, 북극성에서 별자리를 먼저 완성하는 팀이 활동을 마쳐요."
s['need']={"0":1,"1":2,"2":1}
save('star-night',m,s)

# ---------- 이상한 나라의 앨리스 : 토끼굴 나선 내리막 ----------
m,s=load('alice')
PD,PR=-22,60   # 굴(움푹 팬 땅)
def h(d): return 0 if d>=PR else PD*math.cos(d/PR*math.pi/2)**1.6
order=[("lobby",0),("edu",0),("cafe",0),("kids",1),("clubA",1),("clubB",1),("stacks",2),("digital",2),("vault",2)]
pos={}
for k,(i,f) in enumerate(order):
    th=math.radians(100-k*44); d=max(0,52-k*5.6)
    if i=='vault': d=0
    x,z=round(d*math.cos(th),1),round(d*math.sin(th)-40,1)
    pos[i]=(f,x,z,round(h(d)+0.6+ (10 if i=='lobby' else 0)*0,1))
relayout(m,pos)
m['bridges']=[[order[k][0],order[k+1][0]] for k in range(len(order)-1)]+[["stacks","vault"]]
m['bridges']=[b for i,b in enumerate(m['bridges']) if b not in m['bridges'][:i]]
m['mountains']=[[0,-40,PD,PR],[0,-200,50,90],[-140,-70,40,60],[140,-80,44,60]]
ex=[e for e in m['extras'] if e['type'] not in('hole','stream')]
lx,lz=pos['lobby'][1],pos['lobby'][2]
ex=[e for e in ex]
for e in ex:  # 소품을 굴 둘레 바깥으로
    d=math.hypot(e['x'],e['z']+40)
    if d<60: a=math.atan2(e['z']+40,e['x']); e['x']=round(66*math.cos(a),1); e['z']=round(66*math.sin(a)-40,1)
ex+= [{"type":"hole","x":lx+9,"z":lz-6,"r":2.2},{"type":"stream","points":[[-70,40],[-30,34],[10,38],[70,30]],"w":3.2},
 {"type":"sign","x":lx-10,"z":lz+6,"text":"토끼굴 ↓","h":4},{"type":"sign","x":10,"z":-36,"text":"재판정","h":3}]
m['extras']=ex
m['tiers']=["굴 입구 (떨어지는 중)","이상한 숲 (중간 깊이)","여왕의 정원 (굴 바닥)"]
m['words']={"place":"곳","link":"체크무늬 길","layout":"토끼굴 나선 내리막 (둘레에서 출발해 빙글빙글 돌며 굴 바닥 재판정까지 내려가요)"}
m['goal']="강둑에서 토끼굴로 뛰어들어 나선 길을 따라 내려가며 굴 입구 1곳·이상한 숲 2곳·여왕의 정원 1곳에서 하트 카드 4장을 모은 뒤, 굴 바닥 재판정에서 꿈을 먼저 끝내는 팀이 이겨요."
s['subtitle']="고전 방탈출 · 중학생 20명 · 4팀 · 제한시간 60분 · 기본 · 3단계 7곳 · 토끼굴 나선형"
s['goalText']="강둑에서 토끼굴로 뛰어들어 나선 길을 빙글빙글 내려가며 하트 카드 4장을 모은 뒤, 굴 바닥 하트 여왕의 재판정에서 꿈을 먼저 끝내는 팀이 활동을 마쳐요."
save('alice',m,s)

# ---------- 소년이 온다 : 두 갈래 땋은 길 ----------
m,s=load('human-acts')
# 새 방: 5·18 기록관 (에필로그 단계)
by={p['id']:p for p in m['planets']}
if 'archive' not in by:
    m['planets'].append({"id":"archive","f":3,"x":0,"z":0,"y":0,"r":7,"top":"#cfc8b8","rock":"#7a7366","decor":"stacks","wall":"#e2dccd","roof":"gable","roofColor":"#5a4636"})
X=26
pos={"lobby":(0,0,40,0),
 "edu":(0,-X,18,0.6),"cafe":(0,X,14,0.8),
 "kids":(1,X,-14,2.0),"clubA":(1,-X,-18,2.2),
 "clubB":(2,-X,-46,3.6),"stacks":(2,X,-50,3.8),
 "digital":(3,X,-78,5.4),"archive":(3,-X,-82,5.6),
 "vault":(3,0,-108,8.0)}
relayout(m,pos)
T=[["edu","cafe"],["kids","clubA"],["clubB","stacks"],["digital","archive"]]
L=[["lobby","edu"],["lobby","cafe"]]
for a,b in zip(T,T[1:]):
    for u in a:
        for v in b: L.append([u,v])   # 갈래마다 엇갈려 이어짐
L+= [["digital","vault"],["archive","vault"]]
m['bridges']=L
m['mountains']=[[0,-230,58,95],[-125,-145,42,62],[115,-165,46,72]]
m['extras']=[{"type":"sign","x":-14,"z":50,"text":"두 갈래 길","h":4},{"type":"sign","x":12,"z":-120,"text":"기억의 방","h":4}]
m['tiers']=["1·2장 (첫 목소리들)","3·4장 (남은 사람들)","5·6장 (그 뒤의 시간)","에필로그와 기록"]
m['words']={"place":"곳","link":"골목길","layout":"두 갈래 땋은 길 (왼쪽·오른쪽 두 목소리가 단계마다 엇갈리며 기억의 방으로 모여요)"}
m['roomNames']={"lobby":"동네 도서관 (출발)","vault":"기억의 방 (최종)"}
m['goal']="두 갈래로 엇갈리는 골목길을 따라 단계마다 두 장의 방 가운데 한 곳에서 기억 조각을 모아 모두 4개를 얻은 뒤, 기억의 방에서 '기억의 책'을 먼저 완성하는 팀이 활동을 마쳐요."
R=s['rooms']; P=s['puzzles']
R['archive']={"name":"5·18 기록관","floor":"#cfc8b8","decor":"stacks","puzzles":[["기록유산이 된 해","archive"],["기념일이 된 해","archive"]]}
R['archive']['puzzles']=[["기록유산이 된 해","logic"],["기념일이 된 해","logic"]]
P["기록유산이 된 해"]={"desc":"기록관 벽의 연표 카드에서 5·18 민주화운동 기록물이 유네스코 세계기록유산에 오른 해를 찾아 자물쇠에 입력한다.","answer":"2011년","hints":["2000년대가 아니라 2010년대예요.","세계기록유산 인증서 카드를 찾아보세요.","2010년에 1을 더해요."]}
P["기념일이 된 해"]={"desc":"5월 18일이 나라의 법정 기념일이 된 해를 연표 카드에서 찾는다. 소설 속 열흘에서 몇 년 뒤였는지도 계산해 말한다.","answer":"1997년 — 1980년에서 17년 뒤","hints":["1990년대예요.","국립5·18민주묘지가 만들어진 무렵이에요.","1997 − 1980"]}
s['subtitle']="독서 방탈출 · 중학생 20명 · 4팀 · 제한시간 60분 · 도전 · 4단계 8곳 · 두 갈래 땋은 길형"
s['story']=s['story'].replace("도서관 곳곳에 각 장을 상징하는 방이 있고,","두 갈래 골목길에 각 장을 상징하는 방이 왼쪽·오른쪽으로 엇갈려 있고(여러 화자의 목소리처럼),").replace("3층 '기억의 방'","길 끝 '기억의 방'")
s['goalText']="두 갈래로 엇갈리는 길에서 단계마다 한 곳씩 기억 조각 4개를 모은 뒤, 길 끝 기억의 방에서 '기억의 책'을 완성하는 팀이 먼저 활동을 마쳐요."
s['need']={"0":1,"1":1,"2":1,"3":1}
for k in ("기억의 책 A","기억의 책 B"):
    P[k]['desc']=P[k]['desc'].replace("모은 기억 조각 4개를 해당 장에 붙여","모은 기억 조각 4개를 해당 장(기록관 조각은 책 뒤표지)에 붙여")
save('human-acts',m,s)
print('ok')

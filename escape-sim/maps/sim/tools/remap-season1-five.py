import json, math
B='/home/claude/block/escape-sim/maps/sim/'
def load(mid): return json.load(open(B+f'maps/{mid}.json')), json.load(open(B+f'scenarios/{mid}.json'))
def save(mid,m,s):
    m['planets'].sort(key=lambda p:(p.get('final',False),p['f'],not p.get('start',False)))
    json.dump(m,open(B+f'maps/{mid}.json','w'),ensure_ascii=False,indent=1)
    json.dump(s,open(B+f'scenarios/{mid}.json','w'),ensure_ascii=False,indent=1)
def terr(m,x,z):
    h=0
    for a in m.get('mountains',[]):
        d=math.hypot(x-a[0],z-a[1])
        if d<a[3]: h+=a[2]*math.cos(d/a[3]*math.pi/2)**1.6
    return h
def relayout(m,pos,move_mount=26,keep=()):
    old={p['id']:(p['x'],p['z']) for p in m['planets']}
    new={i:(v[0],v[1]) for i,v in pos.items()}
    def near(x,z,lim=40):
        best=min(old,key=lambda i:math.hypot(x-old[i][0],z-old[i][1]))
        return best if math.hypot(x-old[best][0],z-old[best][1])<lim else None
    def mv(x,z,lim=40):
        i=near(x,z,lim)
        if not i or i in keep: return x,z
        return round(x+new[i][0]-old[i][0],1), round(z+new[i][1]-old[i][1],1)
    for e in m.get('extras') or []:
        if 'x' in e: e['x'],e['z']=mv(e['x'],e['z'])
        if 'points' in e:
            i=near(*e['points'][0])
            if i and i not in keep:
                dx,dz=new[i][0]-old[i][0],new[i][1]-old[i][1]
                e['points']=[[round(a+dx,1),round(b+dz,1)] for a,b in e['points']]
        if 'tower' in e:
            e['tower']=list(mv(*e['tower']))
    if m.get('lands'): m['lands']=[[*mv(l[0],l[1],30),*l[2:]] for l in m['lands']]
    if move_mount: m['mountains']=[[*mv(a[0],a[1],move_mount),*a[2:]] for a in m['mountains']]
    for p in m['planets']:
        f,x,z,y=pos[p['id']]; p.update(f=f,x=x,z=z,y=y)

# ---------- 홍길동전 : Y자 두 갈래 → 한양 합류 → 바닷길 ----------
m,s=load('hong-gildong')
pos={"lobby":(0,0,32,0),"edu":(0,-30,14,0.6),"cafe":(0,30,12,0.5),
 "kids":(1,-46,-14,4),"clubA":(1,-18,-30,5),"clubB":(1,36,-20,3),
 "stacks":(2,4,-54,5.5),"digital":(2,26,-72,2.5),"vault":(2,0,-112,2.6)}
relayout(m,pos,move_mount=0,keep=('vault',))
m['bridges']=[["lobby","edu"],["lobby","cafe"],["edu","kids"],["kids","clubA"],["cafe","clubB"],["clubB","clubA"],["clubA","stacks"],["clubB","stacks"],["stacks","digital"],["digital","vault"]]
m['piers']=[["digital","vault"]]
m['tiers']=["두 갈래 고을길","팔도 산하","한양과 바닷길"]
m['words']={"place":"곳","link":"길","layout":"Y자 두 갈래 길 (홍 판서 댁에서 왼쪽 별당 길·오른쪽 장터 길로 갈라졌다가 한양에서 만나 바다 건너 율도국으로)"}
m['goal']="홍 판서 댁에서 왼쪽 별당 길과 오른쪽 장터 길 가운데 하나를 골라 떠나고, 팔도 산하에서 갈래를 넘나들며 활빈 표식을 모아 한양에서 두 길이 만나요. 표식 4개를 모은 뒤 서해 나루에서 배를 타고 율도국 왕궁의 옥새를 먼저 찾는 팀이 이겨요."
s['subtitle']="고전 방탈출 · 중학생 20명 · 4팀 · 제한시간 60분 · 기본 · 3단계 7곳 · Y자 두 갈래형"
save('hong-gildong',m,s)

# ---------- 별주부전 : 사다리 오르막 (바닷속 → 바닷가 → 산) ----------
m,s=load('rabbit-turtle')
pos={"lobby":(0,0,30,-9),"edu":(0,-26,10,-8.5),"cafe":(0,26,4,-8),
 "kids":(1,-26,-18,-3.5),"clubA":(1,26,-26,1.2),"clubB":(1,-26,-46,2.5),
 "stacks":(2,26,-56,6),"digital":(2,-26,-74,6.5),"vault":(2,0,-96,10)}
relayout(m,pos,move_mount=0)
m['bridges']=[["lobby","edu"],["lobby","cafe"],["edu","cafe"],["edu","kids"],["cafe","clubA"],["kids","clubA"],["kids","clubB"],["clubA","stacks"],["clubB","stacks"],["clubB","digital"],["stacks","vault"],["digital","vault"]]
m['tiers']=["바닷속 용궁 (사다리 아래)","바닷가 (사다리 가운데)","산골짜기 (사다리 위)"]
m['words']={"place":"곳","link":"길","layout":"사다리 오르막 (왼쪽·오른쪽 두 기둥 길을 가로대로 넘나들며 바닷속에서 산으로 올라가요)"}
s['subtitle']="고전 방탈출 · 중학생 20명 · 4팀 · 제한시간 60분 · 기본 · 3단계 7곳 · 사다리 오르막형"
save('rabbit-turtle',m,s)

# ---------- 80일간의 세계일주 : 지구 한 바퀴 원형 ----------
m,s=load('eighty-days')
R,C=52,-42
order=["lobby","edu","cafe","kids","clubA","clubB","stacks","digital","vault"]
tier={"lobby":0,"edu":0,"cafe":0,"kids":1,"clubA":1,"clubB":1,"stacks":2,"digital":2,"vault":2}
pos={}
for k,i in enumerate(order):
    ph=math.radians(k*39 + (6 if i=='vault' else 0))
    pos[i]=(tier[i],round(-R*math.sin(ph),1) if False else round(R*math.sin(ph),1),round(C+R*math.cos(ph),1),1.6)
relayout(m,pos)
# 땅: 장소마다 작은 대륙/섬
m['lands']=[[pos[i][1],pos[i][2],14 if i in('lobby','vault','digital') else 11,10] for i in order]
m['bridges']=[[order[k],order[k+1]] for k in range(len(order)-1)]
m['mountains']=[[pos['cafe'][1]+8,pos['cafe'][2]+4,6,8],[pos['kids'][1]+6,pos['kids'][2]-6,7,9],[pos['digital'][1]-6,pos['digital'][2]+2,9,9]]
m['extras']=[e for e in m['extras'] if e['type']!='sign']+[
 {"type":"sign","x":pos['lobby'][1]+14,"z":pos['lobby'][2]+8,"text":"런던 출발 →","h":5},
 {"type":"sign","x":pos['edu'][1]+10,"z":pos['edu'][2]+6,"text":"이집트 · 수에즈","h":5},
 {"type":"sign","x":pos['kids'][1]+10,"z":pos['kids'][2],"text":"인도","h":6},
 {"type":"sign","x":pos['clubB'][1]-10,"z":pos['clubB'][2]-6,"text":"홍콩","h":5},
 {"type":"sign","x":pos['stacks'][1]-10,"z":pos['stacks'][2]-4,"text":"일본 · 요코하마","h":5},
 {"type":"sign","x":pos['digital'][1]-12,"z":pos['digital'][2],"text":"아메리카","h":6},
 {"type":"sign","x":pos['vault'][1]-10,"z":pos['vault'][2]+8,"text":"→ 다시 런던","h":5}]
for e in m['extras']:   # 바다에 있어야 할 배·야자수는 원 안쪽/둘레로
    if e['type']=='ship':
        a=math.atan2(e['x'],e['z']-C); e['x']=round(28*math.sin(a),1); e['z']=round(C+28*math.cos(a),1)
m['tiers']=["유럽에서 인도로","인도와 중국","태평양과 대서양"]
m['words']={"place":"곳","link":"항로와 철길","layout":"지구 한 바퀴 원형 (런던에서 동쪽으로 바다를 빙 돌아 다시 런던으로)"}
s['subtitle']="고전 방탈출 · 중학생 20명 · 4팀 · 제한시간 60분 · 기본 · 3단계 7곳 · 지구 한 바퀴 원형"
save('eighty-days',m,s)

# ---------- 셜록 홈즈 : 바둑판 거리 ----------
m,s=load('sherlock')
S=24; z0=10
def cell(c,r): return round((c-r)*S,1), round(z0-(c+r)*S,1)
g={"lobby":(0,0,0,0),"edu":(1,0,0,0.4),"cafe":(0,1,0,0.4),"kids":(2,0,1,3),"clubA":(1,1,1,3.5),"clubB":(0,2,1,3),"stacks":(2,1,2,6.5),"digital":(1,2,2,7)}
pos={i:(f,*cell(c,r),y) for i,(c,r,f,y) in g.items()}
pos["vault"]=(2,0,-95,15.5)
relayout(m,pos,move_mount=0,keep=('vault',))
adj=[]
ids=list(g)
for a in ids:
    for b in ids:
        if a<b and abs(g[a][0]-g[b][0])+abs(g[a][1]-g[b][1])==1: adj.append([a,b])
m['bridges']=adj+[["stacks","vault"],["digital","vault"]]
m['tiers']=["런던 (바둑판 첫 줄)","잉글랜드 시골 (가운데 줄)","황야 (마지막 줄)"]
m['words']={"place":"사건 현장","link":"돌길","layout":"바둑판 거리 (베이커 가 모퉁이에서 출발해 가로·세로 거리를 골라 대각선 끝 라이헨바흐 폭포로)"}
s['subtitle']="고전 방탈출 · 중학생 20명 · 4팀 · 제한시간 60분 · 기본 · 3단계 7곳 · 바둑판 거리형"
save('sherlock',m,s)

# ---------- 바리데기 : V자 (저승 바닥까지 내려갔다 서천으로 올라옴) ----------
m,s=load('bari')
m['mountains']=[[0,-200,55,90],[-140,-90,44,62],[140,-100,46,62],[-2,-30,-10,44],[64,28,8,26],[-68,30,3,22]]
xy={"lobby":(0,-64,26),"edu":(0,-50,4),"cafe":(0,-30,14),"kids":(1,-30,-20),"clubB":(1,-4,-10),"clubA":(1,2,-40),
    "stacks":(2,30,-18),"digital":(2,40,8),"vault":(2,60,28)}
pos={i:(f,x,z,round(terr(m,x,z)+0.6,1)) for i,(f,x,z) in xy.items()}
mt=m['mountains']; m['mountains']=[[0,-170,55,90],[-125,-60,44,62],[125,-70,46,62],[0,-44,-6,22]]
relayout(m,pos,move_mount=0)
m['mountains']=mt
m['bridges']=[["lobby","edu"],["lobby","cafe"],["edu","kids"],["cafe","clubB"],["kids","clubB"],["kids","clubA"],["clubB","clubA"],["clubA","stacks"],["clubB","stacks"],["stacks","digital"],["digital","vault"]]
m['extras']=[e for e in m['extras'] if e['type'] not in('stream','sign','mist','souls')]+[
 {"type":"stream","points":[[-40,-34],[-14,-30],[2,-46],[22,-34],[44,-42]],"w":3},
 {"type":"mist","x":-4,"z":-28,"r":30,"n":30,"c":"#c8ccd8","o":0.22},{"type":"souls","x":-6,"z":-26,"r":24,"n":28,"c":"#bfe0ff"},
 {"type":"sign","x":-76,"z":14,"text":"이승 · 불라국","h":5},{"type":"sign","x":-26,"z":-44,"text":"저승길 (골짜기 바닥)","h":4,"bg":"rgba(40,44,70,.88)"},
 {"type":"sign","x":72,"z":16,"text":"서천서역국","h":6,"bg":"rgba(150,90,120,.88)"}]
m['tiers']=["이승 (내리막)","저승길 (골짜기 바닥)","서천서역국 (오르막)"]
m['words']={"place":"곳","link":"길","layout":"V자 골짜기 (왼쪽 이승에서 저승 골짜기 바닥까지 내려갔다가 오른쪽 서천서역국으로 올라가요)"}
s['subtitle']="고전 방탈출 · 중학생 20명 · 4팀 · 제한시간 60분 · 기본 · 3단계 7곳 · V자 골짜기형"
save('bari',m,s)
for k,v in pos.items(): print(k,v)

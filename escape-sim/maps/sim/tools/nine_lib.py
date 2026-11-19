import json
from common import build, pz, B
SKIP={'id','planets','bridges','story','goal','tiers','words','roomNames','extras','mountains','lands','sea','piers','gates','startHour','noHouse','ringNorthOnly','water','roadChecker','autoTrains','roadStyle'}
def donor(mid, keep=()):
    m=json.load(open(B+f'maps/{mid}.json'))
    return {k:v for k,v in m.items() if k not in SKIP or k in keep}
IDEAS={"obs":["그림 속 작은 차이를 알아챔","다들 지나친 단서를 짚어 냄","숨은 카드를 먼저 찾아냄","소품 개수를 정확히 셈"],
 "logic":["이야기 순서를 정리함","인물 관계를 연결함","숫자를 차근차근 계산함","단서 두 개를 연결함"],
 "both":["모은 단서를 제자리에 놓음","팀원 모두의 생각을 모음","빠진 단서를 찾아냄"]}
def mk(mid, menu, cfg, rooms, links, sc, ybase=1.4, ystep=1.0):
    """rooms: (id, f, x, z, name, decor, roof, top, puzzles, extra) ; extra may hold 'y','r','short'"""
    P=[]; Rm={}
    for rr in rooms:
        if len(rr)==9: rr=(*rr,{})
        i,f,x,z,nm,dec,roof,top,pl,ex=rr
        ex=dict(ex); y=ex.pop('y', round(ybase+max(f,0)*ystep,1)); r=ex.pop('r', 8 if i in('lobby','vault') else 6.5); short=ex.pop('short',None)
        if i=='lobby': ex['start']=True
        if i=='vault': ex['final']=True
        if roof=='none': ex.setdefault('yard',True); ex.setdefault('wallH',0.4)
        P.append((i,f,x,z,y,r,top,dec,roof,ex)); Rm[i]=(nm,short,pl)
    sc=dict(sc); sc.setdefault('ideas',IDEAS); sc.setdefault('limit',3600)
    build(mid,menu,P,links,cfg,Rm,sc)
def team(*a):
    cols=["#e74c3c","#3498db","#27ae60","#e2b30b"]
    return [{"name":n,"color":c} for n,c in zip(a,cols)]
def obs(name, what, hint3):
    return pz(name,"obs",f"방 안 그림·소품에서 {what}을(를) 찾아 자물쇠에 넣는다. (활동용 과제예요. 정답은 진행자가 소품을 준비하며 정해요.)",f"{what} (진행자가 정함)",["방 구석구석을 천천히 둘러보세요.","눈높이보다 낮은 곳도 보세요.",hint3])

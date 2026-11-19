import json
B='/home/claude/block/escape-sim/maps/sim/'
def build(mid, menu_title, P, L, mapcfg, Rm, sc):
    planets=[]
    for i,f,x,z,y,r,top,dec,roof,ex in P:
        d=dict(id=i,f=f,x=x,z=z,y=y,r=r,top=top,rock=mapcfg.pop('_rock','#6a6050') if False else mapcfg.get('_rock','#6a6050'),decor=dec,roof=roof); d.update(ex); planets.append(d)
    mp={k:v for k,v in mapcfg.items() if not k.startswith('_')}
    mp.update({"id":mid,"planets":planets,"bridges":[list(l) for l in L]})
    rooms={}; puz={}
    for p in P:
        i=p[0]; nm,short,pl=Rm[i]; r={"name":nm,"floor":p[6],"decor":p[7]}
        if short: r["short"]=short
        if pl: r["puzzles"]=[[a,b] for a,b,*_ in pl]
        rooms[i]=r
        for a,b,d,ans,h in pl:
            assert a not in puz, a; puz[a]={"desc":d,"answer":ans,"hints":h}
    sc=dict(sc); sc.update({"id":mid,"rooms":rooms,"puzzles":puz,"defaultSeed":7})
    # sanity: each tier rooms >= need
    from collections import Counter
    cnt=Counter(p['f'] for p in planets if not p.get('start') and not p.get('final'))
    for k,v in sc['need'].items(): assert cnt[int(k)]>=v,(mid,k,cnt)
    json.dump(mp,open(B+f'maps/{mid}.json','w'),ensure_ascii=False,indent=1)
    json.dump(sc,open(B+f'scenarios/{mid}.json','w'),ensure_ascii=False,indent=1)
    d=json.load(open(B+'maps/index.json'))
    if not any(m['id']==mid for m in d['maps']):
        d['maps'].append({"id":mid,"title":menu_title,"map":f"maps/{mid}.json","scenario":f"scenarios/{mid}.json"})
    json.dump(d,open(B+'maps/index.json','w'),ensure_ascii=False,indent=1)
    print(mid,len(planets),len(L),len(puz))
def pz(*a): return a
JOSEON={"islandStyle":"town","joseon":True,"roofStyle":"choga","roofGhost":0.22,"roofColor":"#3b4048","wallColor":"#efe6d2","trimColor":"#6b4a34","stepColor":"#9d998f","pathColor":"#a8936a","lampStyle":"lantern","lampColor":"#ffcf7a","archColor":"#7a4a34","windowGlow":"#ffd99a","windowGlowI":0.8,"roomLight":"#ffe2b0","roomLightI":10,"ringR":70}

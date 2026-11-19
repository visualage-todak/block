import random, sys
random.seed(11)
W, H = 1080, 1920
withText = len(sys.argv) > 1

stars = "".join(
    f'<circle cx="{random.uniform(0,W):.0f}" cy="{random.uniform(0,H*0.85):.0f}" r="{random.choice([0.8,1,1.2,1.6,2.2]):.1f}" fill="#fff" opacity="{random.uniform(.35,.95):.2f}"/>'
    for _ in range(420))
sparkles = "".join(
    f'<path transform="translate({x},{y}) scale({s})" d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3Z" fill="{c}" opacity=".9"/>'
    for x, y, s, c in [(140,260,1.2,"#ffe27a"),(930,330,1,"#ffb3cf"),(860,760,.8,"#a8eef5"),(190,900,.9,"#d7b8f0"),(980,1180,1.1,"#ffe27a"),(90,1400,.8,"#b9e4a8"),(540,170,.7,"#fff")])

# planets: (x, y, r, top, rock, name)
P = {
 "vault": (540, 380, 105, "#fff3c4", "#c9a86a"),
 "clubB": (150, 490, 72, "#ffe27a", "#b39430"),
 "stacks": (930, 490, 72, "#a9d3ff", "#5a7fae"),
 "edu": (290, 690, 72, "#b9e4a8", "#6f9a62"),
 "lobby": (540, 730, 115, "#ffe0a3", "#b88f5c"),
 "cafe": (790, 690, 72, "#ffc1a8", "#b06a52"),
 "kids": (370, 930, 72, "#d7b8f0", "#7f63a3"),
 "clubA": (710, 930, 72, "#ffb3cf", "#b0577e"),
 "digital": (540, 1100, 74, "#a8eef5", "#4f9aa1"),
}
L = [("lobby","edu"),("lobby","cafe"),("lobby","kids"),("lobby","clubA"),("edu","kids"),("cafe","clubA"),("edu","clubB"),("cafe","stacks"),("kids","digital"),("clubA","digital"),("lobby","vault")]

def bridge(a, b):
    (x1, y1, *_), (x2, y2, *_) = P[a], P[b]
    mx, my = (x1+x2)/2, (y1+y2)/2 - 40
    return f'<path d="M{x1},{y1} Q{mx},{my} {x2},{y2}" fill="none" stroke="#ffe9a8" stroke-width="5" stroke-dasharray="2 16" stroke-linecap="round" opacity=".85"/>'

def planet(k):
    x, y, r, top, rock = P[k]
    g = f'''<g>
 <ellipse cx="{x}" cy="{y+r*0.55}" rx="{r*1.05}" ry="{r*0.75}" fill="{rock}"/>
 <path d="M{x-r*0.9},{y+r*0.35} Q{x-r*0.5},{y+r*1.5} {x},{y+r*1.65} Q{x+r*0.5},{y+r*1.5} {x+r*0.9},{y+r*0.35}Z" fill="{rock}" opacity=".85"/>
 <ellipse cx="{x}" cy="{y+r*0.3}" rx="{r*1.08}" ry="{r*0.5}" fill="{top}"/>
 <ellipse cx="{x-r*0.35}" cy="{y+r*0.18}" rx="{r*0.35}" ry="{r*0.12}" fill="#fff" opacity=".35"/>
</g>'''
    return g

def kid(x, y, s, body, eye="#2b2340", ant=1, arms=True):
    # original round alien kid: blob body, big eyes, antenna(e)
    a = ""
    for i in range(ant):
        dx = (i - (ant-1)/2) * 14 * s
        a += f'<line x1="{x+dx}" y1="{y-26*s}" x2="{x+dx*1.6}" y2="{y-44*s}" stroke="{body}" stroke-width="{4*s}" stroke-linecap="round"/><circle cx="{x+dx*1.6}" cy="{y-46*s}" r="{5*s}" fill="#ffe27a"/>'
    arm = f'<path d="M{x-24*s},{y} q-14,-10 -18,-24" stroke="{body}" stroke-width="{7*s}" fill="none" stroke-linecap="round"/><path d="M{x+24*s},{y} q14,-8 20,-22" stroke="{body}" stroke-width="{7*s}" fill="none" stroke-linecap="round"/>' if arms else ""
    return f'''<g>{a}{arm}
 <ellipse cx="{x}" cy="{y}" rx="{26*s}" ry="{30*s}" fill="{body}"/>
 <ellipse cx="{x-9*s}" cy="{y-6*s}" rx="{6*s}" ry="{7.5*s}" fill="#fff"/><ellipse cx="{x+9*s}" cy="{y-6*s}" rx="{6*s}" ry="{7.5*s}" fill="#fff"/>
 <circle cx="{x-8*s}" cy="{y-5*s}" r="{3.2*s}" fill="{eye}"/><circle cx="{x+10*s}" cy="{y-5*s}" r="{3.2*s}" fill="{eye}"/>
 <path d="M{x-7*s},{y+9*s} q{7*s},{7*s} {14*s},0" stroke="{eye}" stroke-width="{2.4*s}" fill="none" stroke-linecap="round"/>
 <ellipse cx="{x-17*s}" cy="{y+5*s}" rx="{4*s}" ry="{2.5*s}" fill="#ff8fb3" opacity=".7"/><ellipse cx="{x+17*s}" cy="{y+5*s}" rx="{4*s}" ry="{2.5*s}" fill="#ff8fb3" opacity=".7"/>
</g>'''

def props():
    o = ""
    # vault: tiny house + flag (나의 별)
    x, y = 540, 380
    o += f'<rect x="{x-38}" y="{y-38}" width="76" height="56" rx="6" fill="#ffd166"/><path d="M{x-48},{y-36} L{x},{y-80} L{x+48},{y-36}Z" fill="#ff7aa8"/><rect x="{x-10}" y="{y-12}" width="20" height="30" rx="4" fill="#8a5a3a"/>'
    o += f'<line x1="{x+70}" y1="{y+20}" x2="{x+70}" y2="{y-90}" stroke="#fff" stroke-width="4"/><path d="M{x+70},{y-90} l50,14 l-50,14Z" fill="#ffe27a"/><text x="{x+86}" y="{y-71}" font-size="18" fill="#7a4a00" font-family="Noto Sans CJK KR" font-weight="700">?</text>'
    # lobby: desk + book (교실)
    x, y = 540, 730
    o += f'<rect x="{x-150}" y="{y-30}" width="120" height="14" rx="4" fill="#a0703f"/><rect x="{x-142}" y="{y-16}" width="10" height="40" fill="#7a5230"/><rect x="{x-48}" y="{y-16}" width="10" height="40" fill="#7a5230"/>'
    o += f'<path d="M{x-120},{y-32} l30,-10 l30,10 l-30,6Z" fill="#fff"/><rect x="{x+60}" y="{y-90}" width="80" height="60" rx="5" fill="#2f5d50" stroke="#a0703f" stroke-width="6"/>'
    o += f'<path transform="translate({x+100},{y-62}) scale(.9)" d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3Z" fill="#ffe27a"/>'
    return o

kids = "".join([
    kid(560, 740, 1.3, "#7ec8ff", ant=2),          # lobby
    kid(495, 758, 0.95, "#ff9ec7", ant=1),
    kid(290, 695, 0.7, "#9be37a", ant=1),          # 작아도 (small)
    kid(800, 685, 1.25, "#ff9a76", ant=2),         # 아맛나 (round)
    kid(370, 932, 0.95, "#c39bff", ant=3),         # 생각대로
    kid(710, 938, 0.9, "#ff7aa8", ant=1, arms=False),  # 두근두근
    kid(150, 488, 0.95, "#ffd23f", ant=2),         # 장난쳐
    kid(930, 495, 0.95, "#6fb6ff", ant=1),         # 반듯반듯
    kid(540, 1102, 0.95, "#5fe0e8", ant=2),        # 물음표
])

hearts = '<path transform="translate(770,880) scale(1.2)" d="M0,8 C-14,-6 -8,-18 0,-10 C8,-18 14,-6 0,8Z" fill="#ff7aa8"/>'
qmark = '<text x="600" y="1065" font-size="46" fill="#fff" font-family="Noto Sans CJK KR" font-weight="900" opacity=".9">?</text>'
think = '<circle cx="430" cy="890" r="8" fill="#fff" opacity=".8"/><circle cx="450" cy="865" r="12" fill="#fff" opacity=".8"/><ellipse cx="485" cy="830" rx="34" ry="22" fill="#fff" opacity=".85"/><path transform="translate(485,830) scale(.8)" d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3Z" fill="#c39bff"/>'

text = ""
if withText:
    text = '''<rect width="1080" height="1920" fill="url(#shade)"/>
<g font-family="Noto Sans CJK KR" text-anchor="middle" fill="#fff">
<text x="540" y="120" font-size="34" letter-spacing="6" fill="#ffd166">토닥토닥</text>
<text x="540" y="168" font-size="28" fill="#e4e0ff">메타버스 방탈출게임 · 시즌 2 · 제1편</text>
<text x="540" y="1760" font-size="92" font-weight="900">다다다 다른 별 학교</text>
<text x="540" y="1815" font-size="30" fill="#ffd6ea">모두 다른 별에서 온 우리 반, 흩어진 별 스티커를 찾아라</text>
<text x="540" y="1880" font-size="22" fill="#cfc8f5">원작 윤진현 · 포스터 기획·제작 토닥토닥그림책도서관</text></g>'''

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#141a46"/><stop offset=".45" stop-color="#3b2f7a"/><stop offset=".78" stop-color="#7a4a9e"/><stop offset="1" stop-color="#ff9ec7"/>
 </linearGradient>
 <radialGradient id="glow" cx=".5" cy=".27" r=".35"><stop offset="0" stop-color="#fff3c4" stop-opacity=".45"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>
 <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".15" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient>
</defs>
<rect width="{W}" height="{H}" fill="url(#sky)"/>
<rect width="{W}" height="{H}" fill="url(#glow)"/>
<circle cx="930" cy="200" r="70" fill="#ff9ec7" opacity=".9"/><ellipse cx="930" cy="200" rx="120" ry="20" fill="none" stroke="#ffd6ea" stroke-width="6" opacity=".8"/>
<circle cx="120" cy="560" r="44" fill="#7ec8ff" opacity=".85"/><circle cx="105" cy="548" r="10" fill="#fff" opacity=".35"/>
<circle cx="980" cy="1180" r="36" fill="#ffd166" opacity=".8"/>
{stars}{sparkles}
{''.join(bridge(a,b) for a,b in L)}
{''.join(planet(k) for k in P)}
{props()}{kids}{hearts}{qmark}{think}
{text}
</svg>'''
open("poster-text.html" if withText else "poster.html", "w").write(
    f'<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{{margin:0;background:#000}}</style></head><body>{svg}</body></html>')

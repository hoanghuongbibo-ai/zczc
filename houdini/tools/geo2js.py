#!/usr/bin/env python3
"""Natural Earth (public domain) GeoJSON -> assets/geo/world.js : window.GEO = { land: [ring...], lakes: [ring...], rivers: [line...] }
Rings/lines are flat arrays [lon,lat,lon,lat,...] rounded to 0.02 deg. usage: python3 tools/geo2js.py"""
import json
def rings(path, kinds=('Polygon', 'MultiPolygon')):
    out = []
    for f in json.load(open(path))['features']:
        g = f['geometry']
        if not g: continue
        polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates'] if g['type'] == 'MultiPolygon' else []
        for p in polys:
            for r in p[:1]:
                pts = []; last = None
                for x, y in r:
                    q = (round(x / .02) * .02, round(y / .02) * .02)
                    if q != last: pts += [round(q[0], 2), round(q[1], 2)]; last = q
                if len(pts) >= 6: out.append(pts)
    return out
def lines(path, minrank=6):
    out = []
    for f in json.load(open(path))['features']:
        if (f['properties'].get('scalerank') or 99) > minrank: continue
        g = f['geometry']; ls = [g['coordinates']] if g['type'] == 'LineString' else g['coordinates']
        for l in ls: out.append([round(v, 2) for xy in l for v in xy])
    return out
G = {'land': rings('assets/geo/ne_50m_land.geojson'), 'lakes': rings('assets/geo/ne_50m_lakes.geojson'), 'rivers': lines('assets/geo/ne_50m_rivers.geojson')}
open('assets/geo/world.js', 'w').write('/* Natural Earth 1:50m land, lakes, rivers — public domain (naturalearthdata.com) */\nwindow.GEO = ' + json.dumps(G, separators=(',', ':')) + ';\n')
print(len(G['land']), len(G['lakes']), len(G['rivers']))

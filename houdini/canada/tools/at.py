import json,re,sys
W=json.loads(open('js/timing.js').read()[len('window.WORDS='):-1])
def at(ph,frm=0):
    t=[re.sub(r"[^a-z0-9']",'',x) for x in ph.lower().replace('-',' ').split()]
    for i in range(len(W)-len(t)+1):
        if W[i][1]>=frm and all(W[i+k][0]==t[k] for k in range(len(t))): return W[i][1]
    return None
for ph in sys.argv[1:]: print('%8s  %s'%(at(ph),ph))

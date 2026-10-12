/* Supporting cast for the skit format (original designs in Theo's style). Spread into Guide.draw options:
 *   Guide.draw(ctx, x, y, s, Object.assign({ t, pose, face }, Cast.marcus)) */
(function (G) {
  'use strict';
  G.Cast = {
    // Marcus: a portly Roman senator — bald dome with a grey fringe, big round nose, double chin, toga with the purple stripes
    marcus: { outfit: 'toga', hat: 'none', look: { hair: 'bald', hairCol: '#b9b4ab', nose: 'big', width: 1.2, chin: true, brow: 8.5, browCol: '#7d7870' } },
  };
})(window);

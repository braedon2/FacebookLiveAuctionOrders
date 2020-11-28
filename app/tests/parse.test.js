import { TestScheduler } from "jest";
import { parseOrders, parseProfileLinks } from "../utils/parse";

const newDesign1 = `
Top Fan
Kaleigh Dieterle
  · 48:56
I'm tempted to order 2 more just to get over 5 and screw with you lol
 · Reply · 6d

Top Fan
Richard Radillo
  · 48:11
Sold 1 dragon $57.50
 · Reply · 6d
Laura Frasher
  · 48:08
Sold 1 large dragon green 57.50
 · Reply · 6d

Top Fan
Kaleigh Dieterle
  · 47:58
I ruined it for you lol
 · Reply · 6d

Top Fan
Kaleigh Dieterle
  · 47:38
Sold 2 large dragons @ $57.50 - 1 blue/green, 1 pink/purple
 · Reply · 6d
Donna Funflower
  · 47:15
Wow great price
 · Reply · 6d
Donna Halden
  · 46:39
Forgot about the ear's lol
 · Reply · 6d

Top Fan
Kaleigh Dieterle
  · 46:49
holy hell!
`;



test('new design', () => {
    const orders = parseOrders(newDesign1, "new");
    console.log(orders);
    
    expect(true).toBe(true);
});
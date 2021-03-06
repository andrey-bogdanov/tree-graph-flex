import { PathFunction, PathShape } from "./interfaces";

/**
* calculates radius for angles arcs
* @param x1 - start point x
* @param y1 - start point y
* @param x8 - end point x
* @param y8 - end point y
* @returns - function staticRadiusRoundedAngles 
*/
export function roundedAngles(x1: number, y1: number, x8: number, y8: number): string {
  const radius: number = Math.min(Math.abs(y1 - y8) / 3, Math.abs(x1 - x8) / 3)
  return staticRadiusRoundedAngles(x1, y1, x8, y8, radius)
}

/**
 * calculates d attribute for path tag from two nodes coordinates. 
 * @param x1 - starp point x
 * @param y1 - starp point x
 * @param x2 - end point x
 * @param y2 - end point x
 * @returns { string } - d attribute for <path>
 */
export function bezier(x1: number, y1: number, x2: number, y2: number): string {
  return `M${x1} ${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`;
}

/**
 * calculates d attribute for path tag from two nodes coordinates.
 * @param x1 - start point x
 * @param y1 - start point y
 * @param x8 - end point x
 * @param y8 - end point y
 * @param radius -  angles arcs radius
 * @returns - d attribute for <path>
 */
export function staticRadiusRoundedAngles(x1: number, y1: number, x8: number, y8: number, radius: number): string {
  const x3: number = (x8 + x1) / 2;
  const y3: number = y1;
  const x2: number = x3 - radius * Math.sign(x8 - x1);
  const y2: number = y1;
  const x4: number = x3;
  const y4: number = y3 + radius * Math.sign(y8 - y1);
  const x6: number = x3;
  const y6: number = y8;
  const x5: number = x3;
  const y5: number = y8 - radius * Math.sign(y8 - y1);
  const x7: number = x6 + radius * Math.sign(x8 - x1);
  const y7: number = y8;
  return `M ${x1} ${y1} L ${x2} ${y2} Q ${x3} ${y3}, ${x4} ${y4} L ${x5} ${y5} Q ${x6} ${y6}, ${x7} ${y7} L ${x8} ${y8}`;
}

/**
* calculates d attribute for path tag from two nodes coordinates. 
* @param x1 - starp point x
* @param y1 - starp point x
* @param x2 - end point x
* @param y2 - end point x
* @returns { string } - d attribute for <path>
*/
export function straight(x1: number, y1: number, x2: number, y2: number): string {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

const pathShapes: { [key in PathShape]: PathFunction } = {
  bezier: bezier,
  roundedAngles: roundedAngles,
  straight: straight
};

export default pathShapes;

// you can define a number as rgba using #RRGGBBAA
// so we just append the opacity value to the color hex value
export function getTranslucentColor(colorHexValue: string, opacity: number) {
  // convert opacity to 0-255 range
  const roundedOpacity = Math.round(opacity * 255);
  // convert to hex string
  const hexOpacity = roundedOpacity.toString(16).padStart(2, "0");
  // return rgba value
  return `${colorHexValue}${hexOpacity}`;
}

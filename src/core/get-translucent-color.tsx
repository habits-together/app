/**
 * Takes a hex color value and opacity and returns a hex color with alpha channel.
 * @param colorHexValue - The hex color value (e.g. '#FF0000')
 * @param opacity - A number between 0 and 1 representing the opacity
 * @returns A hex color string with alpha channel (e.g. '#FF0000FF')
 */
export function getTranslucentColor(colorHexValue: string, opacity: number) {
  // convert opacity to 0-255 range
  const roundedOpacity = Math.round(opacity * 255);
  // convert to hex string
  const hexOpacity = roundedOpacity.toString(16).padStart(2, '0');
  // return rgba value (works because you can define a number as rgba using #RRGGBBAA)
  return `${colorHexValue}${hexOpacity}`;
}

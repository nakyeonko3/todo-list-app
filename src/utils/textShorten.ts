export const textShortener = (
  text: string,
  maxLength: number = 20,
  ellipsis: string = "..."
): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + ellipsis;
  }
  return text;
};

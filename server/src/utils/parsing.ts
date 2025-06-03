export function parseValue(valueStr: string): any {
  const trimmed = valueStr.trim();
  if (trimmed === '') return trimmed;
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed.replace(/^['"]?(.*?)['"]?$/, '$1');
  }
}

export function parseInput(inputStr: string): Record<string, any> {
  const obj: Record<string, any> = {};
  const regex = /(\w+)\s*=\s*(\[[^\]]*\]|[^,]+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(inputStr)) !== null) {
    const key = match[1];
    const valueStr = match[2];
    obj[key] = parseValue(valueStr);
  }
  return obj;
}

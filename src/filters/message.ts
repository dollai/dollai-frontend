
import * as authT from '@/store/auth/types';

export function formatting(origText: string, vars: any) {
  let text = origText;
  Object.keys(vars).forEach((attr) => {
    const rgx = new RegExp('\\${' + attr + '}', 'g');
    text = text.replace(rgx, vars[attr]);
  });
  return text;
}

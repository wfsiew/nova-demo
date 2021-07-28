import { AppConstant } from 'src/app/shared/constants/app.constant';

export class Helper {

  public static isEmpty(s: any) {
    let b = false;

    if (s == null || s == undefined) b = true;
    else if (Array.isArray(s) && s.length < 1) b = true;

    return b;
  }
  
  public static getStart(page: number, limit: number) {
    return (page - 1) * limit;
  }

  public static toDateStr(dt: any) {
    let ds = dt;
    if (dt != null && dt != undefined) {
      if (typeof dt === 'string' || dt instanceof String) {
        
      }

      else {
        ds = Helper.getDateStr(dt);
      }
    }

    return ds;
  }

  public static getDateStr(dt: Date | null) {
    if (dt == null) {
      return dt;
    }
    
    let s = `${dt.getFullYear()}-${this.paddZero(dt.getMonth() + 1)}-${Helper.paddZero(dt.getDate())}`;
    return s;
  }

  public static getDateStr1(dt: Date) {
    let s = `${dt.getFullYear()}${this.paddZero(dt.getMonth() + 1)}${Helper.paddZero(dt.getDate())}`;
    return s;
  }

  public static paddZero(i: number) {
    let s = `${i}`;
    if (i < 10) {
      s = `0${i}`;
    }

    return s;
  }

  public static replaceNone(s: string) {
    let r = s;
    if (s == null) return s;

    if (s.toLowerCase() === 'none') {
      r = '';
    }

    return r;
  }

  public static formatAmount(x: number) {
    return x.toFixed(2);
  }

  public static getColorList(list: any[]) {
    return list.map((x, i) => {
      return AppConstant.DEFAULT_COLORS[i % AppConstant.DEFAULT_COLORS.length];
    });
  }

  public static getPercentage(x: number, total: number) {
    let pct = x * 100 / total;
    pct = Math.round(pct * 10) / 10;
    return `${pct} %`;
  }
}
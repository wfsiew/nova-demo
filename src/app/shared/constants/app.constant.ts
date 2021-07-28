export class AppConstant {
  
  public static PAGE_SIZE = 10;
  public static MAX_PAGE_NUMBERS = 10;
  public static NETWORK_TIMEOUT = 600000;
  public static MAX_PHOTO_SIZE = 5242880;
  public static MAX_PHOTO_SIZE_TEXT = '5 MB';

  public static ROLE = {
    ADMIN: 'Admin',
    super_admin: 'Super Admin'
  };

  public static HTTP_HEADER = {
    LINK: 'link',
    X_TOTAL_COUNT: 'x-total-count',
    X_TOTAL_PAGE: 'x-total-page'
  };

  public static VALIDATE = {
    ALPHABETS: /^[A-Za-z]+$/,
    POSITIVE_INTEGERS: /^[0-9]+$/,
    NUMBER: /^(0|[1-9][0-9]*)$/,
    AMOUNT: /^\d+(\.\d{1,2})?$/,
    CHAR:
      '[^A-Za-z0-9-/#s,@./\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]',
    EMAIL: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  };

  public static DEFAULT_COLORS = [
    '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
    '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
    '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
    '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
  ];
}

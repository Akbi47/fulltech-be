export const TYPE = {
  ERROR: 'errors',
  WARNING: 'warning',
  INFO: 'info',
};

export const RESPONSE_MESSAGE = {
  SET_UP_NEW_BOX_NO: {
    type: TYPE.WARNING,
    code: '',
    message:
      '車両番号：{0}に対して、\r\n新規に紐づけを行いますが、よろしいですか?',
  },
  SET_UP_REPLACE_BOX_NO: {
    type: TYPE.WARNING,
    code: '',
    message:
      '車両番号：{0}に対して、既に紐づけがありますが、\r\n上書きしてもよろしいですか？',
  },
  SET_UP_SERIAL_MAINTENANCE: {
    type: TYPE.ERROR,
    code: '',
    message: 'シリアル番号がメンテナンス中です',
  },
  SET_UP_BOX_NO_NOT_EXIST_UQEY: {
    type: TYPE.ERROR,
    code: '',
    message: 'BOXシリアル番号がありません',
  },
  SET_UP_VEHICLE_OBE_NOT_EXIST: {
    type: TYPE.ERROR,
    code: '',
    message: 'シリアル番号がありません',
  },
  SET_UP_VEHICLE_OBE_MORE_THAN_TWO: {
    type: TYPE.ERROR,
    code: '',
    message: 'シリアル番号が2件以上あります',
  },
  SET_UP_BOX_NO_EMPTY: {
    type: TYPE.ERROR,
    code: '',
    message: 'BOXシリアル番号は必須項目です',
  },
  BATCH_SETUP_BLANK: {
    type: TYPE.ERROR,
    code: '0',
    message: '',
  },
  BATCH_SETUP_MISSING_CV_SERIAL_NO: {
    type: TYPE.ERROR,
    code: '1',
    message: 'シリアル番号がCSVファイルにありません',
  },
  BATCH_SETUP_MISSING_CV_BOX_SERIAL_NO: {
    type: TYPE.ERROR,
    code: '2',
    message: 'BOXシリアル番号がCSVファイルにありません',
  },
  BATCH_SETUP_MISSING_SERIAL_NO: {
    type: TYPE.ERROR,
    code: '3',
    message: 'シリアル番号がありません',
  },
  BATCH_SETUP_MISSING_MORE_THAN_TWO_SERIAL_NO: {
    type: TYPE.ERROR,
    code: '4',
    message: 'シリアル番号が2件以上あります',
  },
  BATCH_SETUP_UNDER_MAINTENANCE: {
    type: TYPE.ERROR,
    code: '5',
    message: 'メンテナンス中です',
  },
};

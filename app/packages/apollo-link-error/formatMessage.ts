const formatMessage = (errorType: any, operation: any) => {
  const headerCss = [
    'color: gray; font-weight: lighter', // title
    'color: red;', // operationType
    'color: #000;', // operationName
  ];

  const parts = ['%c apollo'];

  parts.push(`%c${errorType}`);
  parts.push(`%c${operation.operationName}`);

  return [parts.join(' '), ...headerCss];
};

export default formatMessage;

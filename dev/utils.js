const generatePassphrase = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const parseDate = (date) => {
  const parsedDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  console.log('parsedDate is ', parsedDate);

  return parsedDate;
};


module.exports = {
  generatePassphrase,
  parseDate,
};

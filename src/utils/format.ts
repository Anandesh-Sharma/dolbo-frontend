import numeral from 'numeral';

export const formatAmount = (amount: number | string, format: string = '0,0') => {
  return numeral(amount).format(format);
};

export const formatCurrency = (amount: number | string) => {
  return numeral(amount).format('$0,0.00');
};

export const formatCredits = (credits: number | string) => {
  return numeral(credits).format('0,0');
}; 
export const dateFormat = {
  mon: 'mon',
  month: 'month',
  monDate: 'mon date',
  monthDate: 'month date',
  monDateYear: 'mon date year',
  monthDateYear: 'month date year',
  m_d_yy: 'm-d-yy',
  m_d_yyyy: 'm-d-yyyy',
  monDate_monDate: 'mon date - mon date',
  monthDate_monthDate: 'month date - month date',
  monDateYear_monDateYear: 'mon date year - mon date year',
  monthDateYear_monthDateYear: 'month date year - month date year',
};

export const weekdayFormat = {
  initial: 'initial',
  abbreviation: 'abbreviation',
  full: 'full',
};

// These strings are sooooooo long,should I think of another way to do it
// I could write the funtion and then just use comments to explain, hmmmm,
// Now for consistency I am doing it this way
// I just wanted to use a singe function for this
// And I prefer a single function over long ass function names
export const randFormat = {
  iMin_eMax: 'inclusive min and exclusive max',
  whole_iMin_eMax: 'whole number inclusive min and exclusive max',
  whole_iMin_iMax: 'whole number inclusive min and exclusive max',
};

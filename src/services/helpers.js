
/**
 * 
 * @param {*} x
 */
export const numberWithCommas = (x) => Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
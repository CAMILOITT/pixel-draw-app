/**
 * Calculates the percentage of a given amount.
 * @param {number} amount - The amount to calculate the percentage of.
 * @param {number} percentage - The percentage value to calculate.
 * @returns The percentage of the amount.
 */

export function calculatePercentage(amount: number, percentage: number) {
  if (amount === 0 || percentage === 0) return 0

  return (amount * percentage) / 100
}

/**
 * Calculates the amount of a given percentage.
 * @param {number} percentage - The percentage value to calculate.
 * @param {number} total - The percentage value to calculate.
 * @returns The percentage of the amount.
 */

export function calculateAmountFromPercentage(percentage: number, total: number) {
  if (percentage === 0 || total === 0) 
    return 0
  

  return (percentage * total) / 100
}

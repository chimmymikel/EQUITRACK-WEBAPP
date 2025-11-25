/**
 * Prepares income data for line chart visualization
 * Groups transactions by month and calculates total income per month
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Formatted data for chart with {name, value} structure
 */
export const prepareIncomeLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  // Since we're on the Income page, all transactions are already income
  // No need to filter by type
  const incomeTransactions = transactions;

  // Group transactions by month
  const monthlyData = {};

  incomeTransactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = {
        total: 0,
        timestamp: date.getTime()
      };
    }

    monthlyData[monthYear].total += parseFloat(transaction.amount) || 0;
  });

  // Convert to array and sort by date
  const chartData = Object.entries(monthlyData)
    .map(([month, data]) => ({
      name: month,
      value: Math.round(data.total * 100) / 100, // Round to 2 decimal places
      timestamp: data.timestamp
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ name, value }) => ({ name, value })); // Remove timestamp from final output

  return chartData;
};

/**
 * Prepares expense data for line chart visualization
 * Groups transactions by month and calculates total expenses per month
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Formatted data for chart with {name, value} structure
 */
export const prepareExpenseLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  // Since we're on the Expense page, all transactions are already expenses
  // No need to filter by type
  const expenseTransactions = transactions;

  // Group transactions by month
  const monthlyData = {};

  expenseTransactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = {
        total: 0,
        timestamp: date.getTime()
      };
    }

    monthlyData[monthYear].total += parseFloat(transaction.amount) || 0;
  });

  // Convert to array and sort by date
  const chartData = Object.entries(monthlyData)
    .map(([month, data]) => ({
      name: month,
      value: Math.round(data.total * 100) / 100,
      timestamp: data.timestamp
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ name, value }) => ({ name, value }));

  return chartData;
};

/**
 * Prepares data for category-based pie/bar charts
 * @param {Array} transactions - Array of transaction objects
 * @param {String} type - 'income' or 'expense'
 * @returns {Array} Formatted data with {name, value} structure
 */
export const prepareCategoryChartData = (transactions, type) => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  const filteredTransactions = transactions.filter(
    (t) => t.type?.toLowerCase() === type.toLowerCase()
  );

  const categoryData = {};

  filteredTransactions.forEach((transaction) => {
    const category = transaction.category || 'Uncategorized';
    
    if (!categoryData[category]) {
      categoryData[category] = 0;
    }

    categoryData[category] += parseFloat(transaction.amount) || 0;
  });

  // Convert to array and sort by value
  const chartData = Object.entries(categoryData)
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100
    }))
    .sort((a, b) => b.value - a.value);

  return chartData;
};
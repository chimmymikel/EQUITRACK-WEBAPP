export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    // Convert number to string to handle decimals
    const numStr = num.toString();
    const parts = numStr.split('.'); // Split into integer and fractional parts

    let integerPart = parts[0];
    const fractionalPart = parts[1];

    // Standard numbering system - comma every 3 digits
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine integer and fractional parts
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};
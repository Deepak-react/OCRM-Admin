// Correct and safe function to format ISO string to readable format
const formatDate = (rawDate) => {
  const date = new Date(rawDate); // Convert string to Date object
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default formatDate;

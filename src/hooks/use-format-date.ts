const useFormatDate = (dateString: Date | undefined) => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleString('rs', options);
};

export default useFormatDate;
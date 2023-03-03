function sorted(filter, books) {
  let copyBooks = [...books];

  if (filter.price !== 'all') {
    if (filter.price !== '30') {
      copyBooks = copyBooks.filter(book => {
        return (
          Number(book.price) > Number(filter.price) &&
          Number(book.price) < Number(filter.price) + 15
        );
      });
    } else {
      copyBooks = copyBooks.filter(book => {
        return Number(book.price) > Number(filter.price);
      });
    }
  }

  if (filter.title) {
    copyBooks = copyBooks.filter(book =>
      book.title.toLowerCase().includes(filter.title.toLowerCase()),
    );
  }

  return copyBooks;
}
export default sorted;

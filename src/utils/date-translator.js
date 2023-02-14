export const dateTranslator = (createdAt) =>
  new Date(createdAt).toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

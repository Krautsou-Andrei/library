export const dateTranslator = (createdAt) =>
  new Date(createdAt).toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const dateTranslatorShort = (createdAt) =>
  new Date(createdAt).toLocaleDateString('ru', {
    day: 'numeric',
    month: 'numeric',
  });

const regex = /\S+\/([0-9]+)\//;

export const idFromUrl = (url) => {
  return regex.exec(url)[1];
};

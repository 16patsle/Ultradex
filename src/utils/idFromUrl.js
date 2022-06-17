const regex = /\S+\/([0-9]+)\//;

export const idFromUrl = (url) => (url ? Number(regex.exec(url)[1]) : null);

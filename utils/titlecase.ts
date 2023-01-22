export function titlecase(value: string) {
  if (!value) return "";
  value = value.toString();
  const valueSplit = value.split(" ");
  const newValue: string[] = [];
  valueSplit.forEach((val) => {
    newValue.push(capitalize(val));
  });
  return newValue.join(" ");
}

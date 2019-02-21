export default function idGenerator() {
  let generate = Math.random()
    .toString(36)
    .substr(2, 10);
  return generate + generate;
}

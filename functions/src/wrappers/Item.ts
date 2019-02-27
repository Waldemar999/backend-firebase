export default class Item {
  name!: string;
  count!: number;

  static createFull(name: string, count: number) {
    let item = new Item();
    item.name = name;
    item.count = count;
    return item;
  }
}

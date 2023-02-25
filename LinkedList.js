const Node = require('./Node');

class LinkedList {
  constructor() {
    this.list = null;
    this.tail = null;
    this.length = 0;
  }
  head() {
    return this.list;
  }

  /**
   * Add node to the front of list
   * @param {*} value - value
   */
  append(value) {
    this.length++;
    const node = new Node(value);
    node.nextNode = this.list;
    this.list = node;
    if (this.tail === null) this.tail = node;
  }

  /**
   * add node to the end of the list
   * @param {*} value - value of the node
   */
  prepend(value) {
    const node = new Node(value);

    if (this.tail === null) {
      this.append(value);
    } else {
      this.length++;
      this.tail.nextNode = node;
      this.tail = node;
    }
  }

  /**
   * get list's length;
   * @param {*} list
   * @returns {number} length of the list
   */
  size() {
    return this.length;
  }

  /**
   * get the node of the given index.
   * @param {number} index - index of the node
   * @returns {Node|null} return the node or null if node not found.
   */
  at(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let i = 0;
    let node = this.list;
    while (i < index) {
      node = node.nextNode;
      i++;
    }
    return node;
  }

  /**
   * remove and return the last node of the list;
   * @returns {object} Deleted node.
   */
  pop() {
    if (this.list === null) return null;
    if (this.list.nextNode === null) {
      const deletedNode = { ...this.list };
      this.list = null;
      this.length--;
      return deletedNode;
    }

    const newLastNode = this.at(this.length - 2);
    const deletedNode = { ...newLastNode.nextNode };
    newLastNode.nextNode = null;
    this.tail = newLastNode;
    this.length--;
    return deletedNode;
  }

  /**
   * Check if a value is contained in the list
   * @param {string | number} value - value to check;
   * @returns {boolean} true if value is appear, false if is not.
   */
  contains(value) {
    return this.find(value) === null ? false : true;
  }

  /**
   * find index of the value
   * @param {*} value - value to find
   * @returns {number | null} the index. null if the value not found in the list.
   */
  find(value) {
    let result = null;
    let i = 0;
    let node = this.list;
    while (result === null && node !== null) {
      if (node.value === value) result = i;

      node = node.nextNode;
      i++;
    }
    return result;
  }

  /**
   * return string of linked list
   * @returns {string} string of linked list
   */
  toString(node = this.list) {
    let result = '';
    if (node === null) return ` ${null}`;
    result += `( ${node.value} ) => `;
    return (result += this.toString(node.nextNode));
  }

  /**
   * Add node in specific index
   * @param {*} value
   * @param {number} index
   * @returns return -1 if the method get invalid value or null if the node not found;
   */
  insertAt(value, index) {
    if (index < 0) return -1;
    if (index > this.length) return null;
    if (index === 0) {
      this.list = new Node().nextNode = this.list;
      this.length++;
      return;
    }
    const prevNode = this.at(index - 1);
    const secondNextNode = prevNode.nextNode;

    prevNode.nextNode = new Node(value);
    prevNode.nextNode.nextNode = secondNextNode;
    this.length++;
  }

  /**
   * delete node at the given index
   * @param {number} index - index of node to be deleted
   * @returns {Node | null} deleted node. null if there are no node deleted.
   */
  removeAt(index) {
    if (this.length === 0) return null;
    if (index < 0) return null;
    if (index >= this.length) return null;

    if (index === 0) {
      const deletedNode = { ...this.list };
      this.list = this.list.nextNode;
      this.length--;
      return deletedNode;
    } else if (index === this.length - 1) {
      return this.pop();
    }

    const prevNode = this.at(index - 1);
    const deletedNode = { ...prevNode.nextNode };
    prevNode.nextNode = prevNode.nextNode.nextNode;
    this.length--;
    return deletedNode;
  }
}

module.exports = LinkedList;

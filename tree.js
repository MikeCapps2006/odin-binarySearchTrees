import Node from './node.js';

export default class Tree {
    constructor (arr) {
        this.root = this.buildTree(arr);
    }

    #sortAndRemoveDuplicates(arr){
        const arrSorted = [... new Set(arr)].sort((a, b) => a - b);
        return arrSorted;
    }

    #minValue(root){
        let minV = root.data;
        while (root.left != null) {
            minV = root.left.data;
            root = root.left;
        }
        return minV;
    }

    buildTree(arr){
        //Takes in an array of data and turns it into a balanced binary tree full of node objects
        //placed appropriately (dont forget to sort and remove duplicates)
        //Return the level-0 root node
        let sorted = this.#sortAndRemoveDuplicates(arr);
        if (sorted.length === 0) return null;
        const mid = parseInt(sorted.length / 2);
        const root = new Node(
            sorted[mid], 
            this.buildTree(sorted.slice(0, mid)),
            this.buildTree(sorted.slice(mid + 1))
        );
        return root;
    }

    insert (value, root = this.root) {
        //accepts a 'value' to insert into the tree
        if (root === null) return new Node(value);
        if (root.key < value) {
            root.right = this.insert(value, root.right);
        } else {
            root.left = this.insert(value, root.left);
        }
        return root;
    }

    delete (value, root = this.root) {
        //accepts a 'value' to delete from the tree
        if (root === null) return root;
        if (root.key < value) {
            root.right = this.delete(value, root.right);
        } else if (root.key > value) {
            root.left = this.delete(value, root.left);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            } else {
                root.key = this.#minValue(root.right);
                root.right = this.delete(value, root.right);
            }
        }
        return root;
    }

    find (value, root = this.root) {
        //accepts a 'value' and returns the node with the given value
        const node = root;
        if (node === null) {
            return null;
        }
        if (node.key !== value) {
            if (node.key < value){
                return this.find(value, node.right);
            } else {
                return this.find(value, node.left);
            }
        }
        return node;
    }

    


}






const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
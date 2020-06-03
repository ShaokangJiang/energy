// User defined class node 
class Node {
    // constructor 
    constructor(element) {
        this.element = element;
        this.next = null
    }
}

// a customized version of linkedlist class to record most recent recording 
class LinkedList {
    constructor(limit) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.limitation = limit;
    }

    // functions to be implemented 
    // add(element) 
    // insertAt(element, location) 
    // removeFrom(location) 
    // removeElement(element) 

    // Helper Methods 
    // isEmpty 
    // size_Of_List 
    // PrintList 

    // adds an element at the end 
    // of list 
    add(element) {
        // creates a new node 
        var node = new Node(element);

        // to store current node 
        var current;

        // if list is Empty add the 
        // element and make it head 
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        } else {
            if (this.size >= this.limitation) this.removeFrom(0);

            this.tail.next = node;
            this.tail = node;
        }
        this.size++;

    }

    // removes an element from the 
    // specified location 
    removeFrom(index) {
        if (index > 0 && index > this.size)
            return -1;
        else {
            var curr, prev, it = 0;
            curr = this.head;
            prev = curr;

            // deleting first element 
            if (index == 0) {
                this.head = curr.next;
                if (this.size == 1) this.tail = curr.next;
            } else {
                // iterate over the list to the 
                // position to removce an element 
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }

                // remove the element 
                prev.next = curr.next;
                if (this.tail == curr) this.tail = prev;
            }
            this.size--;

            // return the remove element 
            return curr.element;
        }
    }

    // checks the list for empty 
    isEmpty() {
        return this.size == 0;
    }

    // gives the size of the list 
    size_of_list() {
        console.log(this.size);
    }

    getSize() {
        return this.size;
    }

    getLast() {
        if (this.tail != null)
            return this.tail.element;
        else return null;
    }

    getFirst() {
        if (this.head != null)
            return this.head.element;
        else return null;
    }

    // prints the list items 
    printList() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element + " ";
            curr = curr.next;
        }
        console.log(str);
    }

    toArray() {
        var toRe = [];
        var curr = this.head;
        while (curr) {
            toRe.push(curr.element);
            curr = curr.next;
        }
        return toRe;
    }

}
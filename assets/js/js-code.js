//1
class ListItem {
    constructor(value){
        this._data = value
        this.next = null
        this.prev = null
    }
    set (value){
        this.data = value
    }
    get(){
        return this.data
    }
}

class LinkedList {
    constructor(...args) {
        this.length = 0
        this.head = null
        this.tail= null
        for(const i of args){
            this.push(i)
        }
    }
    push(value){
        const newItem = new ListItem(value)
        if(this.length === 0 ){
            this.head = newItem
            this.tail = newItem
        } else {
            this.tail.next = newItem
            newItem.prev =this.tail
            this.tail = newItem
        }
        return ++this.length
    }
    pop(){
        const deleted = this.tail
        const preLast = this.tail.prev
        preLast.next = null
        this.tail = preLast
        this.length --
        return deleted
    }
    unshift(value){
        const newItem = new ListItem(value)
        if(this.length === 0 ){
            this.head = newItem
            this.tail = newItem
        } else {
            this.head.prev = newItem
            newItem.next =this.head
            this.head = newItem
        }
        return ++this.length
    }
    shift(){
        const deleted = this.head
        const nextElement = this.head.next
        nextElement.prev = null
        this.head = nextElement
        this.length --
        return deleted
    }
    find(value){
        let currentItem = this.head
        do {
            if (currentItem._data === value) {
                return currentItem
            } else {
                currentItem = currentItem.next
            }
        } while(currentItem !== null)
    return null
    }

    newFind(value){
        for (const item of this) {
            if(item._data === value){
                return item
            }
        }
        return null
    }
    static fromArrey (arr){
        return new LinkedList(...arr)
    }
    toArrey(){
        const newArr = []
        for(const item of this){
            newArr.push(item._data)
        }
        return newArr
    }
    deleteItem(value){
        if(this.head._data === value){
            return this.shift()
        }
        if(this.tail._data === value){
            return this.pop()
        }
        for (const item of this) {
           if (item._data === value){
                // const nextElement = item.next
                // const prevElement = item.prev
                // prevElement.next = nextElement
                // nextElement.prev = prevElement
                item.prev.next = item.next
                item.next.prev = item.prev
                this.length--
                return item
           }
        }
        return null
    }
    addNthElement(data, position){
        let counter = 0
        if(position >= this.length){
            return this.push(data)
        }
        if(position <= 0){
            return this.unshift(data)
        }
        for (const item of this) {
            if(counter === position){
                const newItem = new ListItem(data)
                this.length++
                newItem.prev = item.prev
                newItem.next = item
                item.prev.next = newItem
                item.prev = newItem
                return this.length
            } else{
                counter++
            }
        }
        return null
    }

    [Symbol.iterator](){
        return new LinkedListIterator(this)
    }
}

const ll = new LinkedList(5,8,10)
console.log(ll);

class LinkedListIterator{
    constructor(list) {
        this.list = list
        this.currentNode = null
    }

    next(){
        this.currentNode = this.currentNode ? this.currentNode.next : this.list.head
        return{
            value : this.currentNode,
            done: !this.currentNode
        }
        
    }
}
const iter = ll[Symbol.iterator]()

//2
class MyArrey {
    constructor(...arr){
        this.length = 0

        for (const item of arr) {
            this.push(item)
        }
    }
    push(v){
        this.length++
        this[`*${this.length}*`] = v
        return this.length
    }
}
//4
class Stack{
    constructor(maxSize, ...arr) {
        this._maxSize = maxSize
        this._size = 0

        for (const item of arr) {
            this.push(item)
        }
    }
    get size(){
        return this._size
    }
    get isEmpty(){
        return this._size === 0
    }
    push(value){
        if(this._size >= this._maxSize){
            throw new RangeError('Stack is full')
        }
        this[`_${this._size}`] = value
        this._size++
        return this._size
    }
    pop(){
        if(this._size <= 0){
            return
        }
        const lastItem = this[`_${this._size - 1}`]
        delete this[`_${this._size - 1}`]
        this._size--
        return lastItem
    }
    pick(){
        return this[`_${this._size - 1}`]
    }
}
const brackets = {
    '(':')',
    '{':'}',
    '[':']',
    '<':'>'
}
function checkSequence (str, brackets){
    const stack = new Stack(str.length)
    const closeBrackets = Object.values(brackets)
    for (const symb of str) {
        if(brackets[symb]){
            stack.push(symb)
            continue
        } 
        if(stack.isEmpty && closeBrackets.includes(symb)){
            return false
        }
        const lastItemFromStack = stack.pick()
        const correctCloseBracket = brackets[lastItemFromStack]
        if(symb === correctCloseBracket){
            stack.pop()
            continue
        } if(closeBrackets.includes(symb)){
            return false
        }
    }
    return stack.isEmpty
}

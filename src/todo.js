class Todo {
    #id;
    #text;
    #completed;
    constructor(id, text, completed = false) {
        this.#id = id;
        this.#text = text;
        this.#completed = completed;
    }

    toggle() {
        this.#completed = !this.#completed;
    }

    get id() {
        return this.#id;
    }

    get text() {
        return this.#text;
    }

    get completed() {
        return this.#completed;
    }

    set completed(value) {
        this.#completed = value;
    }


}

const todo = new Todo(1, "Buy milk");
console.log(todo);
todo.toggle();
console.log(todo);
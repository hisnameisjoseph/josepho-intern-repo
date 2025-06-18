// This is an intentionally bad design, generating multiple code smells by ChatGPT.
// It includes a God class, duplicate logic, and misleading method names.

class A {
    data: any;
    db: any;
    constructor() {
        this.data = [];
        this.db = {};
    }

    // God method doing everything
    doEverything(user: any, send: boolean, save: boolean, log: boolean) {
        if (typeof user.name === 'string') {
            user.name = user.name.trim();
        }

        this.data.push(user);

        if (save) {
            this.db[user.id] = user;
        }

        if (send) {
            console.log("Sending email to " + user.name);
        }

        if (log) {
            console.log("User added: " + JSON.stringify(user));
        }
    }

    // Duplicate logic
    doStuffWithUser(user: any) {
        user.name = user.name.trim();
        this.data.push(user);
        this.db[user.id] = user;
    }

    // Misleading naming
    blah(x: any) {
        return this.db[x];
    }
}

// Usage
const a = new A();
a.doEverything({ id: "123", name: " Joseph " }, true, true, true);
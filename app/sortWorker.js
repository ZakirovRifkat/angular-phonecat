onmessage = (e) => {
    const key = e.data[0];
    const phoneData = e.data[1];
    let sortFunc;

    switch (key) {
        case "age":
            sortFunc = (a, b) => a.age - b.age;
            break;
        case "-age":
            sortFunc = (a, b) => b.age - a.age;
            break;
        case "name":
            sortFunc = (a, b) => a.name.localeCompare(b.name);
            break;
    }

    postMessage(phoneData.sort(sortFunc));
};

onmessage = (e) => {
    const query = e.data[0].trim();
    const phones = e.data[1];

    const filteredPhones =
        query !== ""
            ? phones.filter((item) => item.name.toLowerCase().includes(query))
            : phones;

    postMessage(filteredPhones);
};

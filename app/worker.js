onmessage = (e) => {
    console.log("Data received");
    const query = e.data[0].trim();
    const phones = e.data[1];
    
    console.log(query);

    const filteredPhones =
        query !== ""
            ? phones.filter((item) => item.name.toLowerCase().includes(query))
            : phones;

    postMessage(filteredPhones);
};

phoneListModule.component("phoneList", {
    templateUrl: "phone-list/phone-list.template.html",
    controller: [
        "$http",
        "$log",
        "$scope",
        "$timeout",
        "$worker",
        "Phone",
        function PhoneListController(
            $http,
            $log,
            $scope,
            $timeout,
            $worker,
            Phone
        ) {
            const self = this;
            self.orderProp = "age";
            self.phones = Phone.query();
            $scope.filteredPhones = self.phones;
            self.query = "";

            self.foo = () => {
                console.log("1231232131");
                $timeout(() => {
                    $scope.filteredPhones = $scope.filteredPhones.slice(0, 5);
                    console.log("Done");
                }, 2000);
            };

            const myWorker = new $worker("worker.js", { type: "module" });
            self.handleSearch = () => {
                if (window.Worker) {
                    myWorker.postMessage([self.query, self.phones]);
                } else {
                    const data =
                        self.query !== ""
                            ? self.phones.filter((item) =>
                                  item.name.toLowerCase().includes(self.query)
                              )
                            : self.phones;
                    self.filteredPhones = data;
                    console.log(self.filteredPhones);
                }
            };

            myWorker.onmessage = (e) => {
                $log.info(e.data);
            };
        },
    ],
});

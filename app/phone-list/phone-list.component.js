phoneListModule.component("phoneList", {
    templateUrl: "phone-list/phone-list.template.html",
    controller: [
        "$http",
        "$log",
        "$scope",
        "$timeout",
        "Phone",
        function PhoneListController($http, $log, $scope, $timeout, Phone) {
            $scope.orderProp = "age";
            $scope.query = "";

            $scope.phones = Phone.query();
            $scope.phoneData = $scope.phones;

            $scope.searchWorker = new Worker("searchWorker.js");
            $scope.sortWorker = new Worker("sortWorker.js");

            $scope.searchWorker.onmessage = addData;
            $scope.sortWorker.onmessage = addData;

            $scope.handleWorker = (key, data, worker) => {
                if (window.Worker) {
                    worker.postMessage([key, data]);
                }
            };

            function addData(e) {
                $scope.$apply(() => {
                    $scope.phones = e.data;
                });
            }
        },
    ],
});

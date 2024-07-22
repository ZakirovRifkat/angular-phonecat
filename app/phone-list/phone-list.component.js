const searchWorker = new Worker("searchWorker.js");
const sortWorker = new Worker("sortWorker.js");

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

            $scope.handleSearch = () => {
                if (window.Worker) {
                    searchWorker.postMessage([$scope.query, $scope.phoneData]);
                }
            };

            $scope.handleSort = () => {
                if (window.Worker) {
                    sortWorker.postMessage([
                        $scope.orderProp,
                        $scope.phoneData,
                    ]);
                }
            };

            searchWorker.onmessage = (e) => {
                $scope.$apply(() => {
                    $scope.phones = e.data;
                });
            };

            sortWorker.onmessage = (e) => {
                $scope.$apply(() => {
                    $scope.phones = e.data;
                });
            };
        },
    ],
});

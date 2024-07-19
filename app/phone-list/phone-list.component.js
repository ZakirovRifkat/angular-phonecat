phoneListModule.component("phoneList", {
  templateUrl: "phone-list/phone-list.template.html",
  controller: [
    "$http",
    "$log",
    "Phone",
    function PhoneListController($http, $log, Phone) {
      this.orderProp = "age";
      this.phones = Phone.query();
    },
  ],
});

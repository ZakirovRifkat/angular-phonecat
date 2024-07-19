phoneDetail.component("phoneDetail", {
  templateUrl: "phone-detail/phone-detail.template.html",
  controller: [
    "$routeParams",
    "$http",
    "$log",
    "Phone",
    function PhoneDetailController($routeParams, $http, $log, Phone) {
      var self = this;
      
      self.phone = Phone.get(
        { phoneId: $routeParams.phoneId },
        function (phone) {
          self.setImage(phone.images[0]);
        }
      );

      self.setImage = function setImage(imageUrl) {
        self.mainImageUrl = imageUrl;
      };
    },
  ],
});

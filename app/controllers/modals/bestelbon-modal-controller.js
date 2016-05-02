'use strict';


angular.module('coordinatorentoolControllers').controller("BestelbonModalController", ["$uibModalInstance", "title", "body",
function($uibModalInstance, title, body) {
    this.title = title;
    this.body = body;

    console.log("Injexted title %o", title);
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };
    // this.ok = () => {
    //     $uibModalInstance.close(true);
    // };
}]);

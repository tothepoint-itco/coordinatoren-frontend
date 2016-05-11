'use strict';


angular.module('coordinatorentoolControllers').controller("CreateUserController", ["$uibModalInstance","BusinessUnitResource",
function($uibModalInstance, BusinessUnit) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };
    this.users = [];
    console.log("DIEDE")
    // this.businessUnits = [];
    // this.selectedBediende = undefined;
    // this.selectedBusinessUnit = undefined;
    // this.selectedBediendeLabel = undefined;
    //this.contract.bediendeId = this.bediende.id;

    // BusinessUnit.query(
    //     (businessUnit) => {
    //         this.businessUnits = businessUnit;
    //     }
    // );
    //
    // this.selectBusinessUnit = (businessUnit) => {
    //     if (businessUnit != undefined) {
    //         this.selectedBusinessUnit = businessUnit;
    //         this.contract.businessUnitId = businessUnit.id;
    //     }
    // }
    this.user = {
        user: undefined,
        password: undefined,
        lastPasswordReset: null,
        email: undefined,
        authorities: "USER"
    };
    this.ok = () => {
        $uibModalInstance.close({user: this.user});
    };
}]);

'use strict';


angular.module('coordinatorentoolControllers').controller("CreateBeheerderController",
["$uibModalInstance",
function($uibModalInstance) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };
    // this.rollen = [];
    // this.businessUnits = [];
    // this.selectedRol = undefined;
    // this.selectedBusinessUnit = undefined;
    // this.selectedRolLabel = undefined;
    //
    // Rol.query(
    //     (rollen) => {
    //         this.rollen = rollen;
    //     }
    // );
    // BusinessUnit.query(
    //     (businessUnit) => {
    //         this.businessUnits = businessUnit;
    //     }
    // );
    //
    // this.selectRol = (rol) => {
    //     if (rol != undefined) {
    //         this.selectedRol = rol;
    //         this.selectedRolLabel = "RolId:"+rol.id;
    //         this.beheerder.rolId = rol.id;
    //     }
    // }
    //
    // this.selectBusinessUnit = (businessUnit) => {
    //     if (businessUnit != undefined) {
    //         this.selectedBusinessUnit = businessUnit;
    //         this.beheerder.businessUnitId = businessUnit.id;
    //     }
    // }

    this.beheerder = {
        voorNaam: undefined,
        familieNaam: undefined,
        email: undefined,
        passwoord: undefined,
        // rol: undefined,
        // businessUnit: undefined,
    };

    this.ok = () => {
        $uibModalInstance.close(this.beheerder);
    };
}]);

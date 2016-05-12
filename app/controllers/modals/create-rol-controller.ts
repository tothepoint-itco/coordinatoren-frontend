'use strict';


angular.module('coordinatorentoolControllers').controller("CreateRolController",
["$uibModalInstance", "BeheerderResource", "BusinessUnitResource",
function($uibModalInstance, Beheerder, BusinessUnit) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };

    this.beheerders = [];
    this.businessUnits = [];
    this.selectedBeheerder = undefined;
    this.selectedBusinessUnit = undefined;
    this.selectedBeheerderLabel = undefined;

    Beheerder.query(
        (beheerders) => {
            this.beheerders = beheerders;
        }
    );
    BusinessUnit.query(
        (businessUnit) => {
            this.businessUnits = businessUnit;
        }
    );

    this.selectBeheerder = (beheerder) => {
        if (beheerder != undefined) {
            this.selectedBeheerder = beheerder;
            this.selectedBeheerderLabel = beheerder.voorNaam + " " + beheerder.familieNaam;
            this.rol.beheerderId = beheerder.id;
        }
    }

    this.selectBusinessUnit = (businessUnit) => {
        if (businessUnit != undefined) {
            this.selectedBusinessUnit = businessUnit;
            this.rol.businessUnitId = businessUnit.id;
        }
    }

    this.rol = {
        rolNaam: undefined,
        beheerderId: undefined,
        businessUnitId: undefined

    };

    this.ok = () => {
        $uibModalInstance.close(this.rol);
    };
}]);

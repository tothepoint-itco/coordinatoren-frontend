'use strict';


angular.module('coordinatorentoolControllers').controller("CreateBediendeController", ["$uibModalInstance","BusinessUnitResource", "ContractResource",
function($uibModalInstance, BusinessUnit, Contract) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };
    this.bediendes = [];
    this.businessUnits = [];
    this.selectedBediende = undefined;
    this.selectedBusinessUnit = undefined;
    this.selectedBediendeLabel = undefined;
    //this.contract.bediendeId = this.bediende.id;

    BusinessUnit.query(
        (businessUnit) => {
            this.businessUnits = businessUnit;
        }
    );

    this.selectBusinessUnit = (businessUnit) => {
        if (businessUnit != undefined) {
            this.selectedBusinessUnit = businessUnit;
            this.contract.businessUnitId = businessUnit.id;
        }
    }
    this.bediende = {
        voorNaam: undefined,
        familieNaam: undefined,
        geboorteDatum: undefined,
        telefoonNummer: undefined
    };
    this.contract = {
        bediendeId: undefined,
        businessUnitId: undefined,
        startDatum: undefined,
        eindDatum: undefined
    };

    this.ok = () => {
        $uibModalInstance.close({bediende: this.bediende, contract:this.contract});
    };
}]);

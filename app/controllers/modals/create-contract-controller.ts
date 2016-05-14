'use strict';


angular.module('coordinatorentoolControllers').controller("CreateContractController",
["$uibModalInstance", "BediendeResource", "BusinessUnitResource",
function($uibModalInstance, Bediende, BusinessUnit) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };

    this.bediendes = [];
    this.businessUnits = [];
    this.selectedBediende = undefined;
    this.selectedBusinessUnit = undefined;
    this.selectedBediendeLabel = undefined;

    Bediende.query(
        (bediendes) => {
            this.bediendes = bediendes;
        }
    );
    BusinessUnit.query(
        (businessUnit) => {
            this.businessUnits = businessUnit;
        }
    );

    this.selectBediende = (bediende) => {
        if (bediende != undefined) {
            this.selectedBediende = bediende;
            this.selectedBediendeLabel = bediende.voorNaam + " " + bediende.familieNaam;
            this.contract.bediendeId = bediende.id;
        }
    }

    this.selectBusinessUnit = (businessUnit) => {
        if (businessUnit != undefined) {
            this.selectedBusinessUnit = businessUnit;
            this.contract.businessUnitId = businessUnit.id;
        }
    }

    this.contract = {
        bediendeId: undefined,
        businessUnitId: undefined,
        startDatum: undefined,
        eindDatum: undefined
    };

    this.ok = () => {
        $uibModalInstance.close(this.contract);
    };
}]);

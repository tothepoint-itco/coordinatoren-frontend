'use strict';


angular.module('coordinatorentoolControllers').controller("CreateContractController",
["$uibModalInstance", "BediendeResource", "BusinessUnitResource", "updateMode", "contract",
function($uibModalInstance, Bediende, BusinessUnit, updateMode, contract) {
    if (contract != undefined && updateMode == true) {
        this.contract = contract;
    } else {
        this.contract = {
            bediendeId: undefined,
            businessUnitId: undefined,
            startDatum: undefined,
            eindDatum: undefined
        };
    }

    this.updateMode = updateMode;


    this.bediendes = [];
    this.businessUnits = [];
    this.selectedBediende = undefined;
    this.selectedBusinessUnit = undefined;
    this.selectedBediendeLabel = undefined;
    this.selectedBusinessUnitLabel = undefined;

    Bediende.query(
        (bediendes) => {
            this.bediendes = bediendes;
            if (this.updateMode == true && this.contract.bediendeId != undefined) {
                bediendes.map((bediende) => {
                    if (this.contract.bediendeId == bediende.id) {
                        this.selectBediende(bediende);
                    }
                });
            }
        }
    );
    BusinessUnit.query(
        (businessUnits) => {
            this.businessUnits = businessUnits;
            if (this.updateMode == true && this.contract.businessUnitId != undefined) {
                businessUnits.map((businessUnit) => {
                    if (this.contract.businessUnitId == businessUnit.id) {
                        this.selectBusinessUnit(businessUnit);
                    }
                });
            }
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


    this.cancel = () => {
        $uibModalInstance.dismiss();
    };
    this.ok = () => {
        $uibModalInstance.close(this.contract);
    };
}]);

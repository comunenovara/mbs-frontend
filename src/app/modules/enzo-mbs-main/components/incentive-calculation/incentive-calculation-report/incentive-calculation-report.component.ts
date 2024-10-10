import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveAssignationDto, MbsIncentiveAssignationResourceService, MbsIncentiveCalculationDto, MbsIncentiveCalculationFactorResourceService, MbsIncentiveCalculationResourceService, MbsIncentiveCalculationValueDto, MbsIncentiveCalculationValueResourceService, MbsIncentiveRegulationDto, MbsIncentiveRegulationValueDto, MbsIncentiveRegulationValueResourceService, MbsIncentiveRoleAssignationDto, MbsIncentiveRoleAssignationResourceService, MbsIncentiveRoleDto, MbsIncentiveStageDto, MbsIncentiveStageResourceService, MbsIncentiveWithheldDto, MbsIncentiveWithheldResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-incentive-calculation-report',
	templateUrl: './incentive-calculation-report.component.html',
	styleUrls: ['./incentive-calculation-report.component.scss']
})
export class EnzoIncentiveCalculationReportComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveCalculationResourceService,
	) { super(eacs, route); }

	@Input() incentiveValueByBeneficiary: any;
	@Input() beneficiaries: any[];
	@Input() incentiveAmount: number;

	override onLoad() {
		
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculation") this.reloadPage();
		if(event.data === "incentiveCalculationValue") this.reloadPage();
		if(event.data === "incentiveRoleAssignation") this.reloadPage();
		if(event.data === "incentiveAssignation") this.reloadPage();
	}

	override async reloadPage() {
		
	}

	incentiveTotalValue = 0;

	calculateBeneficiaryAmountByIncentiveValue(incentiveValues: any[], fortotal=true) {
		let amount = 0;
		for(let incentiveValue of incentiveValues)
			amount += (this.incentiveAmount/100*incentiveValue.value*incentiveValue.calculationValue.value)/100;
		if (fortotal)
		this.incentiveTotalValue += amount;
		return amount;
	}

}

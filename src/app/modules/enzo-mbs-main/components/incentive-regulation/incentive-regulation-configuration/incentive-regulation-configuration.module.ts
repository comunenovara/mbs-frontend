import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnzoIncentiveRegulationConfigurationComponent } from './incentive-regulation-configuration.component';
import { MbsMainLibModule } from '@mbs-main';
import { EngeCommonAppModule } from '@enge/common-app';

@NgModule({
	imports: [ 
		RouterModule.forChild([
            {
				path: 'procurement-type/:typeId', 
				component: EnzoIncentiveRegulationConfigurationComponent,
			}
        ]),
		MbsMainLibModule,
		//EngeCommonAppModule,

    ],
	declarations: [
        EnzoIncentiveRegulationConfigurationComponent,

    ]
})
export class EnzoMbsIncentiveRegulationConfiguratorModule {}
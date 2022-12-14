import { AgalEvent, AgalEventerService, AgalEventType } from "@agal-core/modules/eventer/services/eventer.service";
import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";

@Directive()
export abstract class EnzoGenericDetailPageComponent implements OnInit, OnDestroy {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected eventer: AgalEventerService,
    ) { }

    protected subscriptions: Subscription[] = [];

    protected id: number;

    ngOnInit(): void {
        this._onLoad();

        this.subscriptions.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
            (event: any) => this._onLoad()
        ));

        this.subscriptions.push(this.eventer.onEvent().subscribe(
			(event: AgalEvent) => {
				switch (event.type) {
					case AgalEventType.RELOAD: this.reloadFromEvent(event); break;
					default: break;
				}
			}
		));
    }

    private _onLoad() {
        var id = this.route.snapshot.paramMap.get('id');
        if (id === null) throw new Error('Not valid Id');
        this.id = +id;
        this.onLoad();
    }

    protected onLoad() { }
    protected async reloadPage() { }
    protected reloadFromEvent(event: AgalEvent) { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}




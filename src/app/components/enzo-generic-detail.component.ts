import { StalEventerService, StalEvent, StalEventType } from "@stal/eventer";
import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";

@Directive()
export abstract class EnzoGenericDetailPageComponent implements OnInit, OnDestroy {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected eventer: StalEventerService,
    ) { }

    protected subscriptions: Subscription[] = [];

    protected id: number;

    ngOnInit(): void {
        this._onLoad();

        this.subscriptions.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
            (event: any) => this._onLoad()
        ));

        this.subscriptions.push(this.eventer.onEvent().subscribe(
			(event: StalEvent) => {
				switch (event.type) {
					case StalEventType.RELOAD: this.reloadFromEvent(event); break;
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
    protected reloadFromEvent(event: StalEvent) { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}




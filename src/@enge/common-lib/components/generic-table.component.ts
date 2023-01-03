import { Directive, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { StalEvent, StalEventType } from "@stal/eventer";

import { EngeLibGenericComponent } from "./generic.component";
import { EngeCommonService } from "../services/common.service";

export enum EngeListDisplayModality {
	NONE,
	TABLE,
	CARD
}

@Directive()
export abstract class EngeLibGenericTable extends EngeLibGenericComponent {
	_apiFilters: any = {};

	@Input() filters: any;
	@Input() paginator: any;
	@Input() sort: string[] = [];
	@Output() sortChange = new EventEmitter<string[]>();

	@Input() view: EngeListDisplayModality = EngeListDisplayModality.TABLE;

	@Input() dcs: string[] = ['_ck', 'id'];
	@Input() buttons: any[];

	@Output() resultList = new EventEmitter<any[]>();
	@Output() resultCount = new EventEmitter<number>();

	@Input() selectedElements: any[] = [];
	@Output() selectedElementsChange = new EventEmitter<any[]>()

	constructor(
		ecs: EngeCommonService,
	) { super(ecs); }

	ds: any[];
	totalRecords: number = 0;

	override init() {
		this.subscriptions.push(this.ecs.eventer.onEvent().subscribe(
			(event: StalEvent) => {
				switch (event.type) {
					case StalEventType.RELOAD: this.reloadFromEvent(event); break;
					default: break;
				}
			}
		));
	}

	protected reloadFromEvent(event: StalEvent) { }

	ngOnChanges(changes: SimpleChanges) {
		let nOfChange = 0;
		for (let change in changes) { nOfChange++ }

		if (nOfChange == 1 && changes['selectedElements'] !== undefined) {
			return;
		}
		if (nOfChange == 1 && changes['dcs'] !== undefined) {
			return;
		}
		this.loadData();
	}

	lazyLoad(event: LazyLoadEvent) {
		if (event.sortField !== undefined && event.sortOrder !== undefined) {
			let sort = [];
			{
				let sortable: string = event.sortField + ',';
				sortable += (event.sortOrder > 0) ? 'asc' : 'desc';
				sort.push(sortable);
			}
			this.sort = sort;
			this.loadData();
			this.sortChange.emit(sort);
		}
	}

	decoreButtons(items: any[], e: any) {
		let arr: any[] = [];
		for (let item of items) {
			arr.push({
				label: item.label,
				icon: item.icon,
				command: item.command,
				data: e
			})
		}
		return arr;
	}

	selection(elements: any[]) {
		this.selectedElements = elements;
		this.selectedElementsChange.emit(this.selectedElements);
	}

	override async _loadData() {
		this._apiFilters = { ...this.filters };
		if (this._apiFilters === undefined) {
			this._apiFilters = {};
		}
		if (this.paginator !== undefined) {
			this._apiFilters.page = this.paginator.page;
			this._apiFilters.size = this.paginator.size;
		}
		if (this.sort.length > 0) {
			this._apiFilters.orderBy = this.sort;
		}
		await this.callApi(this._apiFilters);
		this.emitUpdate();
	}

	protected async callApi(filters: any) { }

	protected emitUpdate() {
		this.resultCount.emit(this.totalRecords);
		this.resultList.emit(this.ds);
	}
}
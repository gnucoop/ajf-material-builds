import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
export declare class AjfReportBuilderWidgetsToolbar {
    private _service;
    chartTypes: string[];
    widgetTypes: string[];
    /**
     *
     * @param private _afjBuilderService: AjfBuilderService
     */
    constructor(_service: AjfReportBuilderService);
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragStartHandler(): void;
    /**
     * sign the end of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragEndHandler(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderWidgetsToolbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderWidgetsToolbar, "ajf-report-builder-widgets-toolbar", never, {}, {}, never, never>;
}

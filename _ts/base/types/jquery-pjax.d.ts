//pjax沒有原生 type, 手動加入
import 'jquery';

declare global {
    interface JQuery {
        /**
         * 啟用 PJAX
         * @param selector 觸發 PJAX 的元素選擇器或 jQuery 物件
         * @param container 要更新內容的容器選擇器或 jQuery 物件
         * @param options 可選參數
         */
        pjax(
            selector: string | JQuery,
            container: string | JQuery,
            options?: {
                type?: string;
                timeout?: number;
                push?: boolean;
                replace?: boolean;
                scrollTo?: number;
                maxCacheLength?: number;
                version?: string;
                fragment?: string;
                url?: string;
                data?: Record<string, any>;
            }
        ): JQuery;
    }

    interface JQueryStatic {
        pjax(
            options: {
                url: string;
                container: string | JQuery;
                type?: string;
                data?: Record<string, any>;
                push?: boolean;
                replace?: boolean;
                timeout?: number;
                scrollTo?: number;
                fragment?: string;
            }
        ): JQuery.jqXHR<any>;
    }

    interface JQueryEventObject {
        relatedTarget?: HTMLElement;
    }
}

export { };

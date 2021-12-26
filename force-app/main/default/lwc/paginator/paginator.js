import { LightningElement, api } from 'lwc';

export default class Paginator extends LightningElement {
    /** The current page number. */
    @api pageNum;

    /** The number of items on a page. */
    @api pageSize;

    /** The total number of items in the list. */
    @api totalProductCount;

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
    }

    get currentPageNum() {
        return this.totalProductCount === 0 ? 0 : this.pageNum;
    }

    get isFirstPage() {
        return this.pageNum === 1;
    }

    get isLastPage() {
        return this.pageNum >= this.totalPages;
    }

    get totalPages() {
        return Math.ceil(this.totalProductCount / this.pageSize);
    }
}
import { LightningElement, api, wire } from 'lwc';
import getAllProducts from '@salesforce/apex/ProductController.getAllProducts';
import getProductFamily from '@salesforce/apex/ProductController.getProductFamily';

// Use LMS and message channels to pass selected product from an event
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_PRODUCT_MESSAGE from '@salesforce/messageChannel/SelectedProduct__c';

// import apex method to get products from a controller class
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class ProductCatalog extends LightningElement {
    @api searchBarVisible = false;
    @api tilesAreDraggable = false;
    
    // Declare default values for page number, products on page, and empty array for search filters
    pageNum = 1;
    totalProductCount = 0;
    pageSize;
    filters={};

    // Loads the context for the LMS
    @wire(MessageContext) messageContext;

    // use wire to access valid products and use $ to keep the filters and pageNum dynamic
    @wire(getProducts, { filters: '$filters', pageNum: '$pageNum' })
    products;

    // publishes the selected productId for LMS access
    handleSelectedProduct(event) {
        publish(this.messageContext, SELECTED_PRODUCT_MESSAGE, {
            productId: event.detail
        });
    }

    // handler for search bar filters
    handleSearchKeyChange(event) {
        this.filters = { searchKey: event.target.value.toLowerCase()};
        this.pageNum = 1;
    }

    // handlers for tracking the current page number
    handlePreviousPage() {
        this.pageNum = this.pageNum - 1;
    }
    handleNextPage() {
        this.pageNum = this.pageNum + 1;
    }
}
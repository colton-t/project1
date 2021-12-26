import { LightningElement, wire } from 'lwc';

// LMS and message channel. NavigationMixin allows traveling to another page
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, MessageContext } from 'lightning/messageService';
import SELECTED_PRODUCT_MESSAGE from '@salesforce/messageChannel/SelectedProduct__c';

// Utils to extract field values from record
import { getFieldValue } from 'lightning/uiRecordApi';

import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import BRAND_FIELD from '@salesforce/schema/Product2.Brand__c';
import PRODUCT_CODE_FIELD from '@salesforce/schema/Product2.ProductCode';
import FAMILY_FIELD from '@salesforce/schema/Product2.Family';
import STANDARD_UNIT_PRICE_FIELD from '@salesforce/schema/Product2.Standard_Unit_Price__c';
import AVAILABILITY_FIELD from '@salesforce/schema/Product2.Availability__c';
// import DESCRIPTION_FIELD from '@salesforce/schema/Product2.Description';
// import DISPLAY_URL_FIELD from '@salesforce/schema/Product2.DisplayUrl';

export default class ProductCard extends NavigationMixin(LightningElement) {
    brandField = BRAND_FIELD;
    prodCodeField = PRODUCT_CODE_FIELD;
    familyField = FAMILY_FIELD;
    priceField = STANDARD_UNIT_PRICE_FIELD;
    availabilityField = AVAILABILITY_FIELD;
    // descField = DESCRIPTION_FIELD;

    recordId;
    productName;
    // productUrl;

    @wire(MessageContext)
    messageContext;

    prodSelectSubsciption;

    // use callback to subscibe to selected product message
    connectedCallback() {
        this.prodSelectSubsciption = subscribe(
            this.messageContext,
            SELECTED_PRODUCT_MESSAGE,
            (message) => this.handleSelectedProduct(message.productId)
        );
    }

    handleRecordUpdate(event) {
        const { records } = event.detail;
        const recordData = records[this.recordId];
        this.productName = getFieldValue(recordData, NAME_FIELD);
        // this.productUrl = getFieldValue(recordData, DISPLAY_URL_FIELD);
    }

    // handler for when product is selected, when recordId updates
    // the view form component will display new data
    handleSelectedProduct(productId) {
        this.recordId = productId;
    }

    handleNavigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }
}
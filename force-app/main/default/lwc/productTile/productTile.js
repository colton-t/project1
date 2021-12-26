import { LightningElement, api } from 'lwc';

export default class ProductTile extends LightningElement {
    // sets whether the title is draggable
    @api draggable;

    _product;

    // getter and setter for product
    @api
    get product() {
        return this._product;
    }
    set product(value) {
        this._product = value;
        // this.picturUrl = value.DisplayUrl;
        this.name = value.Name;
        this.brand = value.Brand__c;
        this.price = value.Standard_Unit_Price__c;
    }

    // picturUrl;
    name;
    brand;
    price;

    // Listens for a click to dispatch
    handleClick() {
        const selectedEvent = new CustomEvent('selected', {
            detail: this.product.Id
        });
        this.dispatchEvent(selectedEvent);
    }

    // event to hand dragging tile
    handleDragStart(event) {
        event.dataTransfer.setData('product', JSON.stringify(this.product));
    }
}
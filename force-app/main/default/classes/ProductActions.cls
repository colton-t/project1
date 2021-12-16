global class ProductActions {
    @InvocableMethod(label='Add Product Codes')
    public static void addMissingProductCodes() {
        List<Product2> products = [SELECT Id, ProductCode, Family, Standard_Unit_Price__c FROM Product2];
        ProductTriggerHelper.generateProductCode(products);
    }
}
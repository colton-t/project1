public with sharing class ProductTriggerHelper {
    // Add/Updates standard pricebook for product based on "Standard Unit Price" custom field in product.
    public static void updateStandardPrice(Map<Id, Product2> newProducts) {
        // List of existing pricebook entries in the newProducts map
        List<PricebookEntry> existPBEntryList = [SELECT Id, UnitPrice, Product2Id FROM PricebookEntry WHERE Product2ID IN: newProducts.keySet()];
        // Null and empty checks
        if (existPBEntryList != null && !existPBEntryList.isEmpty()) {
            // Iterate through entries and update unitprice of non-null values
            for (PricebookEntry pbe : existPBEntryList){
                if(pbe != null){
                    pbe.UnitPrice = newProducts.get(pbe.Product2Id).Standard_Unit_Price__c;
                }
                
            }
            update existPBEntryList;
        }
    }

    public static void addStandardPrice(Map<Id, Product2> newProducts) {
        // Active standard pricebook that holds product prices
        Pricebook2 priceBook = [SELECT Id FROM Pricebook2 WHERE IsStandard = TRUE AND IsActive = TRUE];
        // Create empty pricebook entry list for new entries
        List<PricebookEntry> pbEntryList = new List<PricebookEntry>();

        // Iterate through products and add an entry to the pricebook
        for(Product2 p : newProducts.values()) {
            pbEntryList.add(
                new PricebookEntry( Pricebook2Id = priceBook.Id, 
                                    Product2Id = p.Id, 
                                    UnitPrice = p.Standard_Unit_Price__c, 
                                    IsActive = p.IsActive, 
                                    UseStandardPrice = FALSE
                                    
            ));
        }
        insert pbEntryList;
    }
}

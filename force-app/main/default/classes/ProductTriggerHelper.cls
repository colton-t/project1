public with sharing class ProductTriggerHelper {
    // Add/Updates standard pricebook for product based on "Standard Unit Price" custom field in product.
    public static void UpdateStandardPricebook(Map<Id, Product2> newProducts, Boolean isInsert, Boolean isUpdate) {
        // unique product Id set
        Set<Id> prodIdSet = newProducts.keySet();
        // Active standard pricebook
        Pricebook2 priceBook = [SELECT Id FROM Pricebook2 WHERE IsStandard = TRUE AND IsActive = TRUE];
        // Create empty pricebook entry list
        List<PricebookEntry> pbEntryList = new List<PricebookEntry>();

        if(isInsert) {
            for(Product2 p : newProducts.values()) {
                pbEntryList.add(new PricebookEntry(Pricebook2Id = priceBook.Id, Product2Id = p.Id, 
                                UnitPrice = p.Standard_Unit_Price__c, IsActive = p.IsActive, UseStandardPrice = FALSE));
            }
            insert pbEntryList;
        }
        else if(isUpdate) {
            Map<Id, PricebookEntry> prodPBEntryMap = new Map<Id, PricebookEntry>();
            List<PricebookEntry> existPBEntryList = [SELECT Id, UnitPrice, Product2Id FROM PricebookEntry WHERE Product2ID IN: prodIdSet];
            if (existPBEntryList != null && !existPBEntryList.isEmpty()) {
                for (PricebookEntry pbe : existPBEntryList){
                    prodPBEntryMap.put(pbe.Product2Id, pbe);
                }
            }

            for(Product2 p : newProducts.values()) {
                PricebookEntry temp = prodPBEntryMap.get(p.Id);
                if (temp != null) {
                    temp.UnitPrice = p.Standard_Unit_Price__c;
                }
            }
            update prodPBEntryMap.values();
        }
    }
}

public with sharing class AccountTriggerHelper {
    public static void checkForDuplicates(List<Account> accounts) {
        // Check for duplicate by name, email, phone, and type.
        Set<string> nameSet = new Set<string>();
        Set<string> emailSet = new Set<string>();
        Set<string> phoneSet = new Set<string>();
        Set<string> typeSet = new Set<string>();

        // Assign new record values to unique sets
        for(Account a : accounts) {
            nameSet.add(a.Name);
            emailSet.add(a.Account_Email__c);
            phoneSet.add(a.Phone);
            typeSet.add(a.Type);
        }
        
        // Query accounts based on unique values
        List<Account> aList = [SELECT Name, Account_Email__c, Phone, Type 
                                FROM Account
                                WHERE Name IN :nameSet AND Account_Email__c IN : emailSet
                                AND Phone IN :phoneSet AND Type IN :typeSet];
        // Check for duplicate account and add error if duplicate.
        if(aList.size() > 0) {
            for(Account a : accounts) {
                for(Account acc : aList) {
                    if(acc.Name == a.Name && acc.Account_Email__c == a.Account_Email__c 
                    && acc.Phone == a.Phone && acc.Type == a.Type) {
                        a.addError('Duplicate account found. Account ' + a.Name + ' already exists.');
                    }
                }
            }
        }
    }
}

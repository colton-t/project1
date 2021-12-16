trigger ProductTrigger on Product2 (before insert, before update, 
before delete, after insert, after update, after delete, after undelete) {
    Switch on Trigger.OperationType {
        when BEFORE_INSERT {
            
        } 
        when BEFORE_UPDATE {
            
        }
        when BEFORE_DELETE {
            
        }
        when AFTER_INSERT {
            ProductTriggerHelper.UpdateStandardPricebook(trigger.newMap, trigger.isInsert, trigger.isUpdate);
        }
        when AFTER_UPDATE {
            ProductTriggerHelper.UpdateStandardPricebook(trigger.newMap, trigger.isInsert, trigger.isUpdate);
        }
        when AFTER_DELETE {
            
        }
        when AFTER_UNDELETE {
            
        } when else {
            
        }
        
    }
}
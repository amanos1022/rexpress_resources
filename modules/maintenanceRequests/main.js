require(['../maintenanceRequests/MaintenanceRequest', '../maintenanceRequests/MaintenanceRequestComments'], function(MaintenanceRequest, MaintenanceRequestComments){
	MaintenanceRequest($('form[MaintenanceRequest]'));
	MaintenanceRequestComments();
});
define(['../maintenanceRequests/MaintenanceRequest', '../maintenanceRequests/MaintenanceRequestComments'], function(MaintenanceRequest, MaintenanceRequestComments){
	return function(formSelector){
		MaintenanceRequest($(formSelector));
		MaintenanceRequestComments();
	}
});
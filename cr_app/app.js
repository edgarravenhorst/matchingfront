define(function(require){

    var appController = require('controller/AppController');
    //var templateController = require('controller/TemplateController');
    //var interfaceController = require('controller/InterfaceController');

    //var moduleService = require('service/ModuleService');
    //var templateService = require('service/TemplateService');
    var modules = require('modules');

    var editor = angular.module('Xtalus_app');

    //editor.factory('moduleService', moduleService);
    //editor.factory('TemplateService', templateService);

    editor.controller("interfaceController", ['$scope', '$compile', 'moduleService', appController] );

    return editor;
});

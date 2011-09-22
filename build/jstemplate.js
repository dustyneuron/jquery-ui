// Ultra-basic JS-like templating for Apache Ant
//
// Doesn't support proper JSON yet - no nested objects.
//
// Be aware this will probably be running in an ancient Rhino JS engine

(function () {	
	eval('var data = ' + project.getProperty("jstemplate.jsonData") + ';');
	
	importClass(java.io.File);
	
	var copy = project.createTask('copy');
	copy.setFile(new File(project.getProperty("jstemplate.templateFile")));
	
	var outputFile = new File(project.getProperty("jstemplate.outputFile"));
	outputFile.setWritable(true);
	
	copy.setOverwrite(true);
	copy.setTofile(outputFile);
	
	var addCommentTokens = project.getProperty("jstemplate.addCommentTokens");
	
	var filterSet = copy.createFilterSet();
	filterSet.setBeginToken('<%=');
	filterSet.setEndToken('%>');
	filterSet.setRecurse(false);
	var key, value;
	for (key in data) {
		value = data[key];
		if (addCommentTokens == 'true') {
			value += '/*{' + key + '}*/';
		}
		
		filterSet.addFilter(key, value);
	}
	
	copy.perform();
})();

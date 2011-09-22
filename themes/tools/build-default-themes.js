#!/usr/bin/env node

(function () {
    var fs = require('fs');
    
    var toolsDir = __dirname + '/';
    var uiDir = toolsDir + '../../';
    
    var templateFile = uiDir + 'themes/base/jquery.ui.theme.template';
    var defaultsFile = uiDir + 'themes/defaults.json';
    var outputDir = uiDir + 'themes/themes-data/';
    
    try {
        fs.mkdirSync(outputDir, 0755);
    } catch (e) {
    }
    
    var qsToJSON = require(toolsDir + 'qs-to-json.js').qsToJSON;
    var addTokens = require(toolsDir + 'add-tokens.js').addTokens;
    var renderFile = require(toolsDir + 'template.js').renderFile;
    
    var qstrings = fs.readFileSync(uiDir + '/build/themes', 'utf8').split(',');
    qstrings.forEach(function (qs) {
        
        var results = qsToJSON(qs);
        var themeName = results.themeName;
        
        fs.writeFileSync(outputDir + themeName + '.json', results.json, 'utf8');
        console.log(themeName + '.json');
        
        var data = JSON.parse(results.json);
        //data = addTokens(data);
        
        var output = renderFile(templateFile, data, defaultsFile);
        fs.writeFileSync(outputDir + themeName + '.css', output, 'utf8');
        console.log(themeName + '.css');
    });
})();

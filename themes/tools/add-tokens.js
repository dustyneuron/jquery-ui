#!/usr/bin/env node

(function () {
        
    function addTokens(data) {
        for (var k in data) {
            data[k] += '/*{' + k + '}*/';
        }
    }
    
    exports.addTokens = addTokens;
    
    function readInput(callback) {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        
        var stdin = '';
        process.stdin.on('data', function (chunk) {
          stdin += chunk;
        });
        process.stdin.on('end', function () {
          callback(JSON.parse(stdin));
        });
    }
    
    var scriptName = require('path').basename(process.argv[1]);
    var usage = 'Usage:\n' +
        '\t' + scriptName + ' < in-json > out-json\n' +
        'Add backwards-compatible /*{TOKENS}*/ to theme files.\n';
        
    if (require.main === module) {
        try {
            if (process.argv.length > 2) {
                throw new Error('Usage');
            }
            
            readInput(function (jsonData) {
                addTokens(jsonData);
                process.stdout.write(JSON.stringify(jsonData, null, 4));
                process.stdout.end();
            }); 
        }
        catch (err) {
            console.error(err + '\n');
            console.error(usage);
            process.exit(1);
        }
    }
})();

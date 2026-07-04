const fs = require('fs');
fetch('http://13.124.130.226/v3/api-docs')
  .then(res => res.json())
  .then(doc => {
    // 1. Fix the space in the security scheme key
    if (doc.components && doc.components.securitySchemes && doc.components.securitySchemes['Bearer Authentication']) {
      doc.components.securitySchemes.Bearer_Authentication = doc.components.securitySchemes['Bearer Authentication'];
      delete doc.components.securitySchemes['Bearer Authentication'];
      
      // Fix security requirements array if it exists
      if (doc.security) {
        doc.security.forEach(req => {
          if (req['Bearer Authentication']) {
            req.Bearer_Authentication = req['Bearer Authentication'];
            delete req['Bearer Authentication'];
          }
        });
      }
      
      // Fix operation level security requirements
      if (doc.paths) {
        Object.values(doc.paths).forEach(pathItem => {
          Object.values(pathItem).forEach(operation => {
            if (operation.security) {
              operation.security.forEach(req => {
                if (req['Bearer Authentication']) {
                  req.Bearer_Authentication = req['Bearer Authentication'];
                  delete req['Bearer Authentication'];
                }
              });
            }
          });
        });
      }
    }
    
    // 2. Remove invalid properties 'name' and 'in' for type 'http' scheme 'bearer'
    if (doc.components && doc.components.securitySchemes && doc.components.securitySchemes.Bearer_Authentication) {
      delete doc.components.securitySchemes.Bearer_Authentication.name;
      delete doc.components.securitySchemes.Bearer_Authentication.in;
    }

    fs.writeFileSync('api-docs.json', JSON.stringify(doc, null, 2));
    console.log('Fixed and saved to api-docs.json');
  })
  .catch(err => {
    console.error('Error fetching or fixing:', err);
  });

describe("complex schemas", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

   it("arrays", function()
   {
      var schema = schemajs.create(
      {
          input: 
          {
            type:'array',
            schema:
            {
               type: 'number'
            }
          }
      });
      
      var input1 = schema.validate({input: 'username'});
      var input2 = schema.validate({input: [112390123]});
      var input3 = schema.validate({input: [112390123, 'username']});
      var input4 = schema.validate({});
   
      expect(!input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("testing complex object type", function()
   {
      var schema = schemajs.create(
      {
          input: 
          {
            type:'object',
            schema:
            {
               name:  { type: "string", properties: { max: 255 }, required: true},
               email: { type: "email", error: "email is not a valid email address"}
            }
          }
      });
      
      var input1 = schema.validate({input: 'username'});
      var input2 = schema.validate({input: {name:"x", email:"x@xyz.com"}});
      var input3 = schema.validate({input: {name:123, email:"x@xyz.com"}});
      var input4 = schema.validate({});
   
      expect(!input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
});

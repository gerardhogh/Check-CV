import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  formData.append("cv", new Blob(["test"], { type: "text/plain" }), "test.pdf");
  
  // We need to fetch it from the running server. We don't have the server's session, so it will return 401.
  console.log("Cannot test without session");
}
testUpload();

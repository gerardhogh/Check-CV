const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  "https://seteigcwsvyitnawgarw.supabase.co",
  "sb_publishable_bjtihg061pWEhTRtzMKeDA_EyswSY73"
);

async function run() {
  const fileContent = "test content";
  const { data, error } = await supabase.storage.from('cvs').upload('test.txt', fileContent, {
    contentType: 'text/plain',
    upsert: true
  });
  console.log('Data:', data);
  console.log('Error:', error);
}

run();

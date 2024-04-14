// const { Client } = require('@notionhq/client');

// const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nwncmfpmeztjfdjzyxto.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bmNtZnBtZXp0amZkanp5eHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwNTI4MzMsImV4cCI6MjAyODYyODgzM30.Wkt5HHttvWquMKwYy713dOPpbRYSTvNMUhdAsFR5J3c';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function signInWithNotion() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'notion',
      options: {
        redirectTo: `${window.location.origin}/success`
      }
    })
    if (!error) {
        console.log(data);
    } else {
        console.log(error)
    }

  }



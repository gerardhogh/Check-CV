const fs = require('fs');
let content = fs.readFileSync('app/dashboard/talent/components/TalentPremium.tsx', 'utf8');

// Replace success text colors
content = content.replace(/text-white/g, 'text-slate-900').replace(/bg-white\/20/g, 'bg-green-100').replace(/backdrop-blur-sm/g, '').replace(/text-white\/80/g, 'text-slate-500').replace(/bg-white\/10/g, 'bg-green-50').replace(/text-white\/70/g, 'text-slate-500').replace(/border-white\/20/g, 'border-green-200').replace(/text-white\/60/g, 'text-slate-400').replace(/text-white\/40/g, 'text-slate-300').replace(/text-white\/50/g, 'text-slate-400');

// specifically for buttons and checks that need white
content = content.replace(/className="text-slate-900"/g, 'className="text-slate-900"'); // keep this
// this script is too dangerous because "text-white" is used in many buttons!


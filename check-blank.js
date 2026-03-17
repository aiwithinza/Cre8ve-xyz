const fs = require('fs');

const files = fs.readdirSync('Brand-Guidelines').filter(f => f.endsWith('.png'));
files.forEach(f => {
    const stat = fs.statSync(`Brand-Guidelines/${f}`);
    console.log(`${f}: ${stat.size} bytes`);
});

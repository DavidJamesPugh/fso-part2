const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Paths
const distPath = path.join(__dirname, '../dist');
const fsoPart2Path = path.join(__dirname, '../../fso-part2');
const fsoPart3Path = path.join(__dirname, '../../fso-part3');

// Remove dist folder
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('dist folder removed');
}

// Build and copy
exec('npm run build', { cwd: fsoPart2Path }, (error, stdout, stderr) => {
    if (error) {
        console.error(`Build error: ${stderr}`);
        return;
    }
    console.log(stdout);

    fs.cpSync(path.join(fsoPart2Path, 'dist'), path.join(fsoPart3Path, 'dist'), { recursive: true });
    console.log('dist folder copied to fso-part3');
});
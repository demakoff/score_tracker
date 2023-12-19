export async function register() {

    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { spawnSync } = await require('node:child_process');
        const { stdout, stderr, status } = await spawnSync('npx', ['prisma', 'migrate', 'deploy']);

        if (stdout) console.log(`stdout: ${stdout}`);
        if (stderr) console.error(`stderr: ${stderr}`);
        if (status) console.log(`child process exited with code ${status}`);
    }
}
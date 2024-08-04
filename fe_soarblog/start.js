import { execSync } from "child_process";
import { platform } from "os";

const port = 3000;

function clearPort(port) {
    try {
        if (platform() === "win32") {
            // 查找占用端口的进程 ID
            const result = execSync(
                `netstat -ano | findstr :${port}`
            ).toString();
            const lines = result.split("\r").filter((line) => line.trim());
            for (const line of lines) {
                const pid = line.split(/\s+/).pop();
                if (pid && !isNaN(parseInt(pid, 10))) {
                    console.log(`Killing process ${pid} on port ${port}...`);
                    execSync(`taskkill /PID ${pid} /F`);
                    console.log(`Port ${port} has been cleared.`);
                }
            }
            console.log(`No process found on port ${port}.`);
        } else {
            // macOS 或 Linux 上的命令
            const pid = execSync(`lsof -ti :${port}`).toString().trim();
            if (pid) {
                console.log(`Killing process ${pid} on port ${port}...`);
                execSync(`kill -9 ${pid}`);
                console.log(`Port ${port} has been cleared.`);
            } else {
                console.log(`No process found on port ${port}.`);
            }
        }
    } catch (error) {
        console.error(`Error clearing port ${port}: ${error.message}`);
    }
}

function startServer() {
    try {
        console.log("Starting server...");
        execSync("npm run dev", { stdio: "inherit" });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
    }
}

clearPort(port);
startServer();

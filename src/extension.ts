// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { readFileSync, writeFileSync } from 'fs';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "find-cached" is now active!');
	const extension = vscode.extensions.getExtension("undefined_publisher.find-cached");
	const folders = vscode.workspace.workspaceFolders;

	if (folders) {
		const uri = folders[0].uri;
		const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.Uri.file('/tmp'), 'find-cached.file'));
		watcher.onDidChange(e => {
			const filePath = readFileSync(e.fsPath).toString().trim();
			if (filePath) {
				vscode.window.showTextDocument(vscode.Uri.joinPath(uri, filePath));
			}
		});

		// The command has been defined in the package.json file
		// Now provide the implementation of the command with registerCommand
		// The commandId parameter must match the command field in package.json
		const disposable = vscode.commands.registerCommand('find-cached.findCached', () => {
			const term = vscode.window.createTerminal({ name: "find-cached", shellPath: `${extension?.extensionPath}/find-cached.sh` });
			term.show();
		});

		context.subscriptions.push(disposable);
	}
}

/*
vscode.window.onDidChangeTerminalShellIntegration(async ({ terminal, shellIntegration }) => {
	if (terminal === term) {
		const command = shellIntegration.executeCommand(`${extension?.extensionPath}/find-cached.sh`);
		for await (const data of command.read()) {
			console.log(data);
		}
		console.log(`Command exited with code ${code}`);
	}

});
*/
// This method is called when your extension is deactivated
export function deactivate() { }

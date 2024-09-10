import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let webview = vscode.commands.registerCommand("dev-utils.open", () => {
    let panel = vscode.window.createWebviewPanel(
      "webview",
      "Dev Utils",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true, // Add this to retain state
      }
    );

    let scriptSrc = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.js")
    );

    let cssSrc = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.css")
    );

    panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="${cssSrc}" />
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `;

    panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.type) {
          case "copy":
            vscode.window.showInformationMessage("Copied to clipboard!");
            break;
          case "openLink":
            const url = vscode.Uri.parse(message.url);
            vscode.env.openExternal(url);
            break;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(webview);
}

export function deactivate() {}


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

const p5jsCdnUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.3/p5.min.js';

/**
 * A simple p5.js sketch runner component.
 */
@customElement('gdm-playground')
export class Playground extends LitElement {
  private readonly previewFrame: HTMLIFrameElement =
    document.createElement('iframe');

  constructor() {
    super();
    this.previewFrame.classList.add('preview-iframe');
    this.previewFrame.setAttribute('allowTransparency', 'true');
    this.previewFrame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    this.previewFrame.setAttribute('allowfullscreen', 'true');
    this.previewFrame.setAttribute('allow', 'fullscreen');
  }

  /** Disable shadow DOM */
  createRenderRoot() {
    return this;
  }

  setCode(code: string) {
    this.runCode(code);
  }

  private runCode(code: string) {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>p5.js Sketch</title>
          <style>
              body { margin: 0; overflow: hidden; }
          </style>
          <script src="${p5jsCdnUrl}"></script>
          <script>
            if (typeof p5 === 'undefined') {
              document.write('<script src="p5.min.js"><\\/script>');
            }
          </script>
      </head>
      <body>
          <script>
            window.addEventListener('load', function() {
              if (typeof p5 === 'undefined') {
                document.body.innerHTML = '<div style="color:#ef4444; background:#0f172a; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif; text-align:center;"><h2>Unable to load p5.js</h2><p>Please verify your internet connection or reload the page.</p></div>';
              }
            });
            try {
              ${code}
            } catch (error) {
              console.error("Error in sketch:", error);
              document.body.innerHTML = '<pre style="color:red; padding: 1em;">Error: ' + error.message + '</pre>';
            }
          </script>
      </body>
      </html>
    `;

    this.previewFrame.setAttribute('srcdoc', htmlContent);
  }

  render() {
    return html`<div class="playground">
      <div class="main-container">
        ${this.previewFrame}
      </div>
    </div>`;
  }
}

import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

const LOG_SOURCE: string = 'VLibrasWidgetApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IVLibrasWidgetApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class VLibrasWidgetApplicationCustomizer
  extends BaseApplicationCustomizer<IVLibrasWidgetApplicationCustomizerProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized VLibras Widget`);

        // Adiciona o código VLibras dinamicamente
        const script = document.createElement('script');
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.onload = () => {
            const div = document.createElement('div');
            div.innerHTML = `
              <div vw class="enabled">
                <div vw-access-button class="active"></div>
                <div vw-plugin-wrapper>
                  <div class="vw-plugin-top-wrapper"></div>
                </div>
              </div>
            `;
            document.body.appendChild(div);

            // Inicia o widget
            new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
        };

        document.body.appendChild(script);

        return Promise.resolve();
  }
}

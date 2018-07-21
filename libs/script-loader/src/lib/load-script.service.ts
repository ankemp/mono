import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable, Observer } from 'rxjs';
import { Script } from '../model';

/** @dynamic */
@Injectable()
export class LoadScriptService {
  private scripts: Script[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  load(script: Script): Observable<Script> {
    return new Observable<Script>((observer: Observer<Script>) => {
      const existingScript = this.scripts.find(
        ({ name }) => name === script.name
      );
      // Complete if already loaded
      if (existingScript && existingScript.loaded) {
        observer.next(existingScript);
        observer.complete();
      } else {
        // Add the script
        this.scripts = [...this.scripts, script];

        // Load the script
        const scriptElement = this.document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = script.src;
        scriptElement.async = true;

        scriptElement.onload = () => {
          script.loaded = true;
          observer.next(script);
          observer.complete();
        };

        scriptElement.onerror = () => {
          observer.error(`Couldn't load script ${script.src}`);
        };

        this.document
          .getElementsByTagName('body')[0]
          .appendChild(scriptElement);
      }
    });
  }
}

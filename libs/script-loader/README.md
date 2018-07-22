# ng-script-loader - Another Angular Script Loader

`ng-script-loader` is a very simple external script loader for Angular 6+. You can use it to load 3rd part scripts dynamically, or settings from your server.

## Installation

With NPM:

```bash
npm install ng-script-loader --save-dev
```

With Yarn:

```bash
yarn add ng-script-loader
```

## Setup

Import `ScriptLoaderModule` into your application

```typescript
import { ScriptLoaderModule } from 'ng-script-loader';

@NgModule({
  ...
  imports: [
    ...
    ScriptLoaderModule
  ]
})
```

## Usage

```typescript
import { ScriptLoaderService, Script } from 'ng-script-loader';

@Component({})
export class ExampleComponent implements OnInit {
  constructor(private scriptLoader: ScriptLoaderService) {}

  ngOnInit() {
    const script: Script = {
      name: 'example',
      src: 'https://example.com/path/to/script.js'
    };
    this.scriptLoader.load(script).pipe(skipWhile((s = !s.loaded)));
  }
}
```

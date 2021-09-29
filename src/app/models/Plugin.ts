import { PluginSettings } from "./PluginSettings";

export class Plugin {

    constructor(
        public type: string,
        public name: string,
        public description: string,
        public avalibleConfigs: PluginSettings[],
        public configs?: PluginSettings[],
    ) {}
  }
  
  
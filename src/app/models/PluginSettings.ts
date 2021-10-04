import { Dependences } from "./Dependences";

export class PluginSettings {

    constructor(
        public setting: string,
        public type: string,
        public required: boolean,
        public hasValueList: boolean,
        public requiredDepends: boolean,
        public dependence?: Dependences[], 
        public valueList?: any[],
        public selectedValue?: any[]
    ) {}
  }
  
  
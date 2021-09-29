
export class PluginSettings {

    constructor(
        public setting: string,
        public type: string,
        public required: boolean,
        public hasValueList: boolean,
        public valueList?: any[],
        public selectedValue?: any[]
    ) {}
  }
  
  
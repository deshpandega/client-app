export interface Event{
    eventName:string;
    venue:string;
    city: string;
    host: string;
    aboutEvent:number;
    hobbyTags : any[];
    createdDate: Date;
    eventStartDate: Date;
    eventEndDate: Date;
    eventStartTime: TimeRanges;
    eventEndTime: TimeRanges;
    eventFee: number;
    imageUrl: string;
  }
  
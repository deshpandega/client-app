export interface Event{
    name:string;
    venue:string;
    host: {name:String,email:String,profileIcon:String};
    description:number;
    hobbies : any[];
    date: Date;
    duration:String;
    entryFee: number;
    attendee: [ 
      {
        email:String,
        name:String,
        profileIcon:String
      }];
    banner: string;
    rating: number;
    comments: [
      {
          commenter: String,
        comment: String,
        created: Date,
        replies: [
            {
              reply:String,
            replier: String,
            created: String
          }
        ]
      }
    ]
  }
  
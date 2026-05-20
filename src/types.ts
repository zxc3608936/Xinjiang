export type Category = 'food' | 'activity' | 'shopping' | 'attraction' | 'hotel' | 'transport' | 'flight';

export interface Event {
  id: string;
  time?: string;
  category: Category;
  title: string;
  desc: string;
  detailedDesc?: string;
  query?: string;
  image?: string;
  flightNo?: string;
  trackingNo?: string;
  flightInfo?: {
    origin: string;
    originCode: string;
    originTerminal?: string;
    dest: string;
    destCode: string;
    destTerminal?: string;
    duration: string;
  };
}

export interface DayData {
  id: string;
  dayNum: number;
  date: string;
  shortDate: string;
  locations: string;
  weather: string;
  temp: string;
  dress: string;
  events: Event[];
}

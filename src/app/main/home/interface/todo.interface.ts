export interface Todo {
  title:         string;
  description:   string;
  priority:      Priority;
  creationDate:  Date;
  expiration:    Date;
  state:         State;
  tags:          string[];
  comments:      string[];
}

export enum Priority {
  LOW =         'LOW',
  MEDIUM =      'MEDIUM',
  HIGH =        'HIGH'
}

export enum State {
  PENDING =     'PENDING',
  PROGRESS =    'PROGRESS',
  DONE =        'DONE'
}


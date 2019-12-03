import 'reflect-metadata';

export interface IStory {
  category: string;
  code: string;
  name: string;
  description: string | null;
  style: IStyle;
  required_auth: boolean;
  status: string;
  attachments: string[];
  start_scene?: string | null;
}

export interface IStyle {
  template?: string;
}

export interface IScene {
  story: string;
  uid: string;
  prev: string | null;
  transition: string | null;
  style: ITransition;
  attachments: string[];
  start_message?: string | null;
}

export interface ITransition {
  code: string;
}

export interface IMessage {
  uid: string;
  kind: string;
  scene: string;
  next_scenes?: string[] | null;
  players: IPlayer[];
  prev: string | null;
  nexts: Array<string | null>;
  transition: string | null;
  style: ITransition;
  attachments: string[];
  objective_options?: IObjectiveOption[];
}

export interface IPlayer {
  code: string;
  name: string;
  image: string;
}

export interface IObjectiveOption {
  message: string;
  content: string;
  number: number;
  next_message: string;
  next_scene: string | null;
  style: IStyle;
  attachments: string[];
}

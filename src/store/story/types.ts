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
}

export interface ITransition {
  code: string;
}

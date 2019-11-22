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
}

export interface IStyle {
  template?: string;
}

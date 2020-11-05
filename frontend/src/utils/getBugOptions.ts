import { OptionTypeBase, GroupedOptionsType, OptionsType } from 'react-select';

export interface IOption {
  label: string;
  value: number | string;
  backColor?: string;
}

export const groupOptions: Array<IOption> = [
  {
    label: 'Aberto',
    value: 0,
  },
  {
    label: 'Em progresso',
    value: 1,
  },
  {
    label: 'Em teste',
    value: 2,
  },
  {
    label: 'Fechado',
    value: 3,
  },
];

export const typeOptions: Array<IOption> = [
  {
    label: 'WEB',
    value: 'web',
    backColor: '#B080F8',
  },
  {
    label: 'BACKEND',
    value: 'backend',
    backColor: '#34495e',
  },
  {
    label: 'DESIGN',
    value: 'design',
    backColor: '#00a5e3',
  },
  {
    label: 'OUTRO',
    value: 'outro',
    backColor: '#74737a',
  },
];

export const priorityOptions: Array<IOption> = [
  {
    label: 'ALTA',
    value: 'alta',
    backColor: '#FF3333',
  },
  {
    label: 'MÉDIA',
    value: 'media',
    backColor: '#F1C73F',
  },
  {
    label: 'BAIXA',
    value: 'baixa',
    backColor: '#5CD439',
  },
];

export const allPriorityWithoutColors:
  | GroupedOptionsType<OptionTypeBase>
  | OptionsType<OptionTypeBase>
  | undefined = priorityOptions.map(option => {
  return { label: option.label, value: option.value };
});

export const allTypeWithoutColors:
  | GroupedOptionsType<OptionTypeBase>
  | OptionsType<OptionTypeBase>
  | undefined = typeOptions.map(option => {
  return { label: option.label, value: option.value };
});

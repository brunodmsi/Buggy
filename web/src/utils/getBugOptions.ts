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
    backColor: '#4882FF',
  },
  {
    label: 'Em progresso',
    value: 1,
    backColor: '#39ff14',
  },
  {
    label: 'Em teste',
    value: 2,
    backColor: '#eead2d',
  },
  {
    label: 'Fechado',
    value: 3,
    backColor: '#FF3333',
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

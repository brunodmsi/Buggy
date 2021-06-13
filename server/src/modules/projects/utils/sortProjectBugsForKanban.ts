import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import { IParsedBug } from '../services/ListProjectBugsService';

export default function sortProjectBugsForKanban(bugs: Bug[]): IParsedBug {
  const newBugs = {
    '0': {
      name: 'Aberto',
      items: [],
    },

    '1': {
      name: 'Em progresso',
      items: [],
    },

    '2': {
      name: 'Em teste',
      items: [],
    },

    '3': {
      name: 'Fechado',
      items: [],
    },
  } as IParsedBug;

  bugs.forEach((bug: Bug) => {
    const id = `${bug.group}`;

    newBugs[id].items.push(bug);
  });

  return newBugs;
}

import { Class } from '@/types/_index';

type SortOrder = 'asc' | 'desc';

export const sortClasses = (classes: Class[], sort: SortOrder = 'asc') => {
  return classes.sort((a, b) => {
    return b.startAt.getTime() - a.startAt.getTime();
  });
};

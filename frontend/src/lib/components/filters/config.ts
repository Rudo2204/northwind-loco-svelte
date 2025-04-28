type StringOperator = 'eq' | 'neq' | 'q';
type NumberOperator = 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte';
type BooleanOperator = 'eq';
type PlaceholderOperator = 'eq';

type ComparisonOperator = StringOperator | NumberOperator | BooleanOperator | PlaceholderOperator;
type FilterType = 'string' | 'number' | 'boolean' | 'placeholder';

const labelMap: Record<string, string> = {
  eq: '=',
  neq: '!=',
  q: 'Contains',
  gt: '>',
  lt: '<',
  gte: '>=',
  lte: '<='
};

export interface FilterOperator<T = ComparisonOperator> {
  value: T;
  label: string;
  type: 'single' | 'multiple';
}

export interface SingleFilterConfig {
  operators: Array<FilterOperator>;
  filterType: FilterType;
  defaultValue: string | number | boolean | undefined;
}

export type FiltersConfig = Record<string, SingleFilterConfig>;

export function placeholderFilter(): SingleFilterConfig {
  const operators: Array<FilterOperator<PlaceholderOperator>> = [];
  const textFilterConfig: SingleFilterConfig = {
    operators: operators,
    filterType: 'placeholder',
    defaultValue: ''
  };
  return textFilterConfig;
}

export function textFilter(): SingleFilterConfig {
  const operators: Array<FilterOperator<StringOperator>> = [
    { value: 'eq', label: labelMap.eq, type: 'single' },
    { value: 'neq', label: labelMap.neq, type: 'single' },
    { value: 'q', label: labelMap.q, type: 'single' }
  ];
  const textFilterConfig: SingleFilterConfig = {
    operators: operators,
    filterType: 'string',
    defaultValue: ''
  };
  return textFilterConfig;
}

export function numberFilter(defaultValue?: number): SingleFilterConfig {
  const operators: Array<FilterOperator<NumberOperator>> = [
    { value: 'eq', label: labelMap.eq, type: 'single' },
    { value: 'neq', label: labelMap.neq, type: 'single' },
    { value: 'gt', label: labelMap.gt, type: 'single' },
    { value: 'lt', label: labelMap.lt, type: 'single' },
    { value: 'gte', label: labelMap.gte, type: 'single' },
    { value: 'lte', label: labelMap.lte, type: 'single' }
  ];
  const numberFilterConfig: SingleFilterConfig = {
    operators: operators,
    filterType: 'number',
    defaultValue: defaultValue || 0
  };
  return numberFilterConfig;
}

export function booleanFilter(): SingleFilterConfig {
  const operators: Array<FilterOperator<BooleanOperator>> = [
    { value: 'eq', label: labelMap.eq, type: 'single' }
  ];
  const booleanFilterConfig: SingleFilterConfig = {
    operators: operators,
    filterType: 'boolean',
    defaultValue: false
  };
  return booleanFilterConfig;
}

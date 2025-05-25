import { v4 as uuidv4 } from 'uuid';

export type StringOperator = 'eq' | 'neq' | 'q';
export type NumberOperator = 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte';
export type BooleanOperator = 'eq';
export type PlaceholderOperator = 'eq';

export type ComparisonOperator =
  | StringOperator
  | NumberOperator
  | BooleanOperator
  | PlaceholderOperator;
type FilterType = 'string' | 'number' | 'boolean' | 'placeholder';

export const labelMap: Record<string, string> = {
  eq: '=',
  neq: '!=',
  q: 'Contains',
  gt: '>',
  lt: '<',
  gte: '>=',
  lte: '<='
};

export interface FilterOperator<T = ComparisonOperator> {
  value: any;
  operator?: T;
  operatorLabel: string;
  type: 'single' | 'multiple';
}

export interface SingleFilterConfig {
  id: string;
  source: string | null;
  filterType: FilterType;
  validOperators: Array<FilterOperator>;
  operator?: ComparisonOperator;
  value: string | number | boolean | undefined;
  defaultValue: string | number | boolean | undefined;
}

export type FiltersConfig = Record<string, SingleFilterConfig>;

export function placeholderFilter(id: string = uuidv4()): SingleFilterConfig {
  const operators: Array<FilterOperator<PlaceholderOperator>> = [];
  const textFilterConfig: SingleFilterConfig = {
    id,
    source: null,
    validOperators: operators,
    filterType: 'placeholder',
    value: '',
    defaultValue: ''
  };
  return textFilterConfig;
}

export function textFilter(source: string, id: string = uuidv4()): SingleFilterConfig {
  const operators: Array<FilterOperator<StringOperator>> = [
    { value: 'eq', operatorLabel: labelMap.eq, type: 'single' },
    { value: 'neq', operatorLabel: labelMap.neq, type: 'single' },
    { value: 'q', operatorLabel: labelMap.q, type: 'single' }
  ];
  const textFilterConfig: SingleFilterConfig = {
    id,
    source,
    validOperators: operators,
    filterType: 'string',
    value: '',
    defaultValue: ''
  };
  return textFilterConfig;
}

export function numberFilter(
  source: string,
  defaultValue?: number,
  id: string = uuidv4()
): SingleFilterConfig {
  const operators: Array<FilterOperator<NumberOperator>> = [
    { value: 'eq', operatorLabel: labelMap.eq, type: 'single' },
    { value: 'neq', operatorLabel: labelMap.neq, type: 'single' },
    { value: 'gt', operatorLabel: labelMap.gt, type: 'single' },
    { value: 'lt', operatorLabel: labelMap.lt, type: 'single' },
    { value: 'gte', operatorLabel: labelMap.gte, type: 'single' },
    { value: 'lte', operatorLabel: labelMap.lte, type: 'single' }
  ];
  const numberFilterConfig: SingleFilterConfig = {
    id,
    source,
    validOperators: operators,
    filterType: 'number',
    value: defaultValue || 0,
    defaultValue: defaultValue || 0
  };
  return numberFilterConfig;
}

export function booleanFilter(source: string, id: string = uuidv4()): SingleFilterConfig {
  const operators: Array<FilterOperator<BooleanOperator>> = [
    { value: 'eq', operatorLabel: labelMap.eq, type: 'single' }
  ];
  const booleanFilterConfig: SingleFilterConfig = {
    id,
    source,
    validOperators: operators,
    filterType: 'boolean',
    value: false,
    defaultValue: false
  };
  return booleanFilterConfig;
}

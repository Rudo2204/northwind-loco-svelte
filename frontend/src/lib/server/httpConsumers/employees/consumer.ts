import type { EmployeeCollectionResponse, EmployeeResponse } from '$lib/shared/responses';
import { NORTHWIND_API_URL } from '$env/static/private';

export abstract class EmployeeConsumer {
  public static async getEmployeeCollection(query?: string): Promise<EmployeeCollectionResponse> {
    const endpoint = `${NORTHWIND_API_URL}employees${query}`;
    const response = await fetch(endpoint);
    const employees: EmployeeCollectionResponse = await response.json();
    return employees;
  }

  public static async getCharacter(employeeid: number): Promise<EmployeeResponse> {
    const endpoint = `${NORTHWIND_API_URL}employees/${employeeid}`;
    const response = await fetch(endpoint);
    const employee: EmployeeResponse = await response.json();
    return employee;
  }
}

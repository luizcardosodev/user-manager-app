import { DepartmentModel } from "./DepartmentModel";

export class UserModel {
    id: number;
    name: string;
    email: string;
    department?: DepartmentModel | null;

    constructor(data?: UserModel) {
        this.id = data?.id || 0;
        this.name = data?.name || "";
        this.email = data?.email || "";
        this.department = data?.department || null;
    }
}
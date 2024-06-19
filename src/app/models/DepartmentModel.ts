export class DepartmentModel {
    id?: number | null;
    name: string;

    constructor(data?: DepartmentModel) {
        this.id = data?.id || null;
        this.name = data?.name || "";
    }
}
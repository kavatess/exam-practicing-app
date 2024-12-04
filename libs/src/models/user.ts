export enum UserProperties {
    id = 'id',
    firstName = 'firstName',
    lastName = 'lastName',
    username = 'username',
    email = 'email',
    phone = 'phone',
    schoolName = 'schoolName',
    city = 'city',
    yob = 'yob',
    role = 'role',
    status = 'status',
    password = 'password',
}

export enum UserRoles {
    Admin = 'Admin',
    SuperAdmin = 'SuperAdmin',
    User = 'User',
}

export enum UserStatus {
    Active = 'Active',
    Inactive = 'Inactive',
}

export interface User {
    [UserProperties.id]: string;
    [UserProperties.username]: string;
    [UserProperties.firstName]: string;
    [UserProperties.lastName]: string;
    [UserProperties.schoolName]: string;
    [UserProperties.city]: string;
    [UserProperties.yob]: number;
    [UserProperties.phone]: string;
    [UserProperties.email]: string;
    [UserProperties.role]?: UserRoles;
    [UserProperties.status]: UserStatus;
    [UserProperties.password]?: string;
}

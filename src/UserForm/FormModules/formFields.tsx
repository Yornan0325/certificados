import Icon from '@mdi/react';
import { mdiEyeLock, mdiEyeLockOpen } from '@mdi/js';

export interface LoginFields {
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    isRequired?: boolean;
    placeholder: string;
    icons?: {
        icon_A: JSX.Element;
        icon_B: JSX.Element;
    };
}
export interface SignupFields {
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    isRequired?: boolean;
    placeholder: string;
    
}

export const LIST_DATA_LOGIN: LoginFields[] = [
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete:"true",
        isRequired: true,
        placeholder: "Correo electrónico",
        icons: {
            icon_A: <Icon path={mdiEyeLock} size={1.2} />,
            icon_B: <Icon path={mdiEyeLockOpen} size={1.2} />
        },
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete:"false",
        isRequired: true,
        placeholder: "Contraseña",
        icons: {
            icon_A: <Icon path={mdiEyeLock} size={1.2} />,
            icon_B: <Icon path={mdiEyeLockOpen} size={1.2} />
        },
    }
];

export const LIST_DATA_SIGNUP: SignupFields[] = [
    {
        labelText: "Username",
        labelFor: "username",
        id: "username",
        name: "username",
        type: "text",
        autoComplete: "true",
        isRequired: true,
        placeholder: "Nombre de usuario",
        
    },
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "true",
        isRequired: true,
        placeholder: "Correo electrónico"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Contraseña"
    },
    {
        labelText: "Confirm Password",
        labelFor: "confirm-password",
        id: "confirm-password",
        name: "confirm-password",
        type: "password",
        autoComplete: "confirm-password",
        isRequired: true,
        placeholder: "Confirmar Contraseña"
    }
];



 
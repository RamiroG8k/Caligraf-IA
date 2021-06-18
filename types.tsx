// Principal routes stack
export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Root: undefined;
    NotFound: undefined;
};

// BottomTab routes stack
export type BottomTabParamList = {
    Home: undefined;
    Analyze: undefined;
    Profile: undefined;
};

export type TabHome = {
    HomeScreen: undefined;
};

export type TabAnallize = {
    AnalizeScreen: undefined;
    CameraScreen: undefined;
};

export type TabProfile = {
    ProfileScreen: undefined;
};

export type ThemeProps = {
    light?: string;
    dark?: string;
    themed?: boolean;
    primary?: boolean;
    secondary?: boolean;
};

export type IconProps = {
    name: any;
    size: number;
    color?: string;
    module?: string;
};

export type FormData = {
    name: string;
    lastName: string;
    email: string;
    password: string;
};

export type LoginFormData = {
    email: string;
    password: string;
};

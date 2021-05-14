export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Root: undefined;
    NotFound: undefined;
};

export type BottomTabParamList = {
    Home: undefined;
    Analyze: undefined;
    Profile: undefined;
};

export type TabHomeParamList = {
    TabHomeScreen: undefined;
};

export type TabAnallizeNavigator = {
    AnalizeScreen: undefined;
    CameraScreen: undefined;
};

export type TabProfileParamList = {
    TabProfileScreen: undefined;
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

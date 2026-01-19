interface ButtonProps {
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    text?: string;
    type?: 'submit' | 'reset' | 'button';
}

export type { ButtonProps };

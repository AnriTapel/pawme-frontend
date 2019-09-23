export interface AlertMessage {
    visible?: boolean,
    messageList: string[],
    titleText?: string,
    titleClass?: string;
    button1Text?: string,
    button2Text?: string,
    button1Class?: string,
    button2Class?: string,
    button1Function?: Function,
    button2Function?: Function
}

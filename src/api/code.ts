declare interface codeMessageMapTypes {
    400: string
    401: string
    403: string
    404: string
    405: string
    500: string
    [key: string]: string
}

const codeMessageMap: codeMessageMapTypes = {
    400: "[400]: Request parameter error",
    401: "[401]: Account not logged in",
    403: "[403]: Access Denied",
    404: "[404]: Request path error",
    405: "[405]: Request method error",
    500: "[500]: Server Error",
}

const showCodeMessage = (code: number | string): string => {
    return codeMessageMap[JSON.stringify(code)] || "The network connection is abnormal, please try again later!"
}

export default showCodeMessage

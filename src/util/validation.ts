export function isValidEmail(email: string): boolean {
    const mainParts = email.split("@");
    if (mainParts.length !== 2) return false;
    const endParts = mainParts[1].split(".");
    if (endParts.length !== 2) return false;
    return endParts[1].length > 1;
}
/**
 * Formats a wallet address by showing the first 4 and last 4 characters
 * with ellipsis in between
 */
export const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

/**
 * Composable for formatting points values throughout the application
 */
export const usePointsFormatter = () => {
    /**
     * Format points for display
     * Rounds to 2 decimal places and removes unnecessary trailing zeros
     */
    const formatPoints = (points: number): string => {
        if (points === 0) return '0'

        // Round to 2 decimal places
        const rounded = Math.round(points * 100) / 100

        // Convert to string and remove unnecessary trailing zeros
        return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(2).replace(/\.?0+$/, '')
    }

    /**
     * Format points with abbreviations for large numbers
     * e.g., 1000 -> 1K, 1000000 -> 1M
     */
    const formatPointsShort = (points: number): string => {
        const absPoints = Math.abs(points)

        if (absPoints >= 1000000) {
            return formatPoints(points / 1000000) + 'M'
        } else if (absPoints >= 1000) {
            return formatPoints(points / 1000) + 'K'
        } else {
            return formatPoints(points)
        }
    }

    /**
     * Parse points from string input (useful for forms)
     */
    const parsePoints = (value: string): number => {
        const parsed = parseFloat(value)
        return isNaN(parsed) ? 0 : parsed
    }

    return {
        formatPoints,
        formatPointsShort,
        parsePoints
    }
}

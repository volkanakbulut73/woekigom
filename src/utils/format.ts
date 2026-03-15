export const formatProfileName = (fullName: string | undefined | null): string => {
    if (!fullName) return 'Kullanıcı';

    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
        // If there's only one word, just capitalize the first letter
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
    }

    // Last part is the surname, make it ALL CAPS
    const lastName = parts.pop()?.toUpperCase() || '';

    // First parts are names, capitalize first letters
    const firstNames = parts.map(part =>
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    ).join(' ');

    return `${firstNames} ${lastName}`;
};

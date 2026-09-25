export function getInitials(user) {
    const first = user?.first_name?.[0] || user?.username?.[0] || "U";
    const last = user?.last_name?.[0] || "";
    return (first + last).toUpperCase();
}

export function getFullName(user) {
    if (user?.first_name) {
        return `${user.first_name} ${user.last_name ?? ""}`.trim();
    }
    return user?.username ?? "Usuario";
}
export const checkRole = (...roles) => {
	return (req, res, next) => {
		if (!req.user) return res.status(401).json({ message: "Not authorized" });

		const hasRole = roles.includes(req.user.userType.primaryRole);
		if (!hasRole) return res.status(403).json({ message: "Not authorized to perform this action" });

		next();
	};
};

export const pageVariantDesktop = {
	initial: {
		y: "100vh",
	},
	animate: {
		y: 0,
		transition: {
			duration: 0.5,
			type: "tween",
			// stiffness: 300,
		},
	},
	exit: {
		y: "-100vh",
		transition: { ease: "easeInOut", type: "tween", duration: 0.5 },
	},
};

export const pageVariantMobile = {
	initial: {
		x: "100vw",
	},
	animate: {
		x: 0,
		transition: {
			duration: 0.5,
			type: "tween",
			// stiffness: 300,
		},
	},
	exit: {
		x: "-100vw",
		transition: { ease: "easeInOut", type: "tween", duration: 0.5 },
	},
};

export const navVariants = {
	open: {
		opacity: 1,
		x: 0,
		// transition: { duration: 0.5, type: "tween" },
		transition: { stiffness: 100 },
	},
	close: {
		opacity: 0,
		x: "-100%",
		transition: { stiffness: 230 },
		// transition: { duration: 1, type: "tween" },
	},
};
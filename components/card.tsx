"use client";

import { PropsWithChildren, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const cardRect = cardRef.current?.getBoundingClientRect();
		if (!cardRect) return;

		const { left, top, width, height } = cardRect;
		const mouseXPos = event.clientX - left;
		const mouseYPos = event.clientY - top;
		const maxDimension = Math.max(width, height);
		const gradientSize = Math.min(maxDimension, 800);

		mouseX.set(mouseXPos);
		mouseY.set(mouseYPos);
		setGradientSize(gradientSize);
	}

	const [gradientSize, setGradientSize] = useState(1800);
	const maskImage = useMotionTemplate`radial-gradient(${gradientSize}px at ${mouseX}px ${mouseY}px, white, transparent)`;

	
	return (
		<motion.div
			ref={cardRef}
			className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-900 group md:gap-8 hover:border-white border-zinc-600"
			onMouseMove={onMouseMove}
			style={{ maskImage, WebkitMaskImage: maskImage }}
		>
			<motion.div
				className="absolute inset-0 z-10 bg-gradient-to-br opacity-0 via-zinc-100/10"
				animate={{
				opacity: mouseX.get() ? 0.5 : 0,
				scale: mouseX.get() ? 1.2 : 1,
				x: mouseX.get() - 100,
				y: mouseY.get() - 100,
				}}
				transition={{ duration: 0.3 }}
			/>
			{children}
		</motion.div>
	);
};
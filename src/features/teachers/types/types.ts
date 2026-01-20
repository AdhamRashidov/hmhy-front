import type { LucideIcon } from "lucide-react";

export interface StatsCardProps {
	label: string;
	value: number | string;
	icon: LucideIcon;
	iconColor: string;
	labelColor: string;
}
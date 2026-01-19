import { z } from 'zod';

export const loginFormSchemaTeacher = z.object({
	email: z
		.string()
		.trim()
		.min(5, "Email juda qisqa")
		.max(254, "Email juda uzun")
		.email({ message: "Email formati noto‘g‘ri" })
		.transform((v) => v.trim()),
	password: z
		.string()
		.min(8, "Uzunlik: Kamida 8 ta belgi bo'lishi kerak")
		.superRefine((val, ctx) => {
			if (!/[A-Z]/.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Katta harf: Kamida 1 ta katta harf (A-Z) bo'lishi kerak",
				});
			}
			if (!/[a-z]/.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Kichik harf: Kamida 1 ta kichik harf (a-z) bo'lishi kerak",
				});
			}
			if (!/[0-9]/.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Raqam: Kamida 1 ta raqam (0-9) bo'lishi kerak",
				});
			}
			const specialCharsRegex = /[!@#$%^&*()_+}{":?><,.\/]/;
			if (!specialCharsRegex.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Maxsus belgi: Kamida 1 ta maxsus belgi (!@#$%...) bo'lishi kerak",
				});
			}
		}),
});


export type LoginFormValuesTeacher = z.infer<typeof loginFormSchemaTeacher>;
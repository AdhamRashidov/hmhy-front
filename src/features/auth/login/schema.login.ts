import { z } from 'zod';

export const loginFormSchema = z.object({
	username: z
		.string()
		.min(2, "Kamida 2 ta harf bo'lishi kerak")
		.max(15, 'Maximal 15 ta harfdan oshmasligi kerak')
		.regex(/^[a-zA-Z0-9_]+$/, 'Faqat harf, raqam va _ ishlatish mumkin'),
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


export type LoginFormValues = z.infer<typeof loginFormSchema>;
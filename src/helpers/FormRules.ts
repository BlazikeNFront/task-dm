export const FormRules= {
    required: {
        rule: (value: string) => !!value,
        message: 'Required field'
    },
    minLength:(minLength:number)=>({
        rule: (value: string) => value.length >= minLength,
        message:`Type at least ${minLength} characters`
    }),  
     maxLength:(maxLength: number) => ({
        rule: (value: string) => value.length <= maxLength,
        message:`Value cannot contain more than ${maxLength} characters`
    }),
 
} as const
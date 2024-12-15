import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
});

type FormFields = z.infer<typeof schema>;

const Form = () => {
    const { register, handleSubmit, setError, formState: {errors, isSubmitting} } = useForm<FormFields>({
        defaultValues: {
            email: "vicky@gmail.com",
        },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
        } catch (error) {
            setError("root", {message: `Make sure you filled the input fields. ${error}`});
        }
    };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
            <input {...register("email")} type="email" placeholder="Email" className="border py-2 px-3 rounded-md" />
            {errors.email && <div className="text-red-600 text-sm">{errors.email.message}</div>}
            
            <input {...register("password")} type="password" placeholder="Password" className="border py-2 px-3 rounded-md" />
            {errors.password && <div className="text-red-600 text-sm">{errors.password.message}</div>}
            
            <button disabled={isSubmitting} type="submit" className={`${isSubmitting ? 'opacity-60' : ''} py-2 px-3 bg-blue-600 hover:bg-blue-700 rounded-md`}>
                {isSubmitting ? "Loading..." : "Submit"}
            </button>
            {errors.root && <div className="text-red-600 text-sm">{errors.root.message}</div>}
        </form>
    </div>
  )
}

export default Form
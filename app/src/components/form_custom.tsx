import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"


const FormSchema = z.object({
    mail: z.string().email(),
})

export function Form_Custom() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        mail: "",
      },
    })
   
    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        toast({
          title: "Success",
          description: "Form submitted successfully."
        })
    }
   
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-end justify-between gap-6">
            <div className="w-full">
                <FormField
                    control={form.control}
                    name="mail"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-semibold text-lg">Mail</FormLabel>
                        <FormControl>
                        <Input placeholder="Your mail" {...field} className="bg-white opacity-100" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }
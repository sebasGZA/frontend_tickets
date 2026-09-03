import { useNavigate } from "react-router"
import { useState, type SubmitEvent } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/auth/store/auth.store"

export const LoginPage = () => {

  const navigate = useNavigate()
  const [isPosting, setIsPosting] = useState(false);
  const { login } = useAuthStore()

  const handleLogin = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPosting(true)

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const isValid = await login(email, password)
    if(isValid) {
      navigate('/')
    } else {
      toast.error('Emall or Password invalid')
    }

    setIsPosting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1>Tickets</h1>
                <p className="text-balance text-muted-foreground">Accede con tu cuenta</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name="password" placeholder="Password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isPosting}>
                Login
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/public/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}